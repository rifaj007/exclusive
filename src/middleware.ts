import NextAuth from "next-auth";
import authConfig from "@/libs/auth/auth.config";
import { routes } from "./constants/routes";

const { auth: withAuthMiddleware } = NextAuth(authConfig);

export default withAuthMiddleware((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;
  const { nextUrl } = req;

  // redirect api routes to api auth route
  const isApiAuthRoute = nextUrl.pathname.startsWith(routes.apiAuthPrefix);
  if (isApiAuthRoute) return;

  // redirect logged in user from auth routes to login page
  const isAuthRoute = routes.auth.includes(nextUrl.pathname);
  const defaultLoginRedirectUrl = new URL(routes.defaultLoginRedirect, nextUrl);

  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(defaultLoginRedirectUrl);
  }

  // function for checking if route matches
  function isRouteMatch(pathname: string, route: string) {
    return pathname === route || pathname.startsWith(`${route}/`);
  }

  const protectedRoutes = [...routes.private, ...routes.adminOnly].some(
    (route) => isRouteMatch(nextUrl.pathname, route)
  );

  // redirect not logged in user from private and admin routes to login page
  if (protectedRoutes && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/log-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  // redirect non admin user from admin routes to login page
  const isAdminRoute = routes.adminOnly.some((route) =>
    isRouteMatch(nextUrl.pathname, route)
  );

  if (isAdminRoute && userRole !== "admin") {
    return Response.redirect(new URL("/403", nextUrl));
  }

  return;
});

export const config = {
  runtime: "nodejs",
  unstable_allowDynamic: [
    "/src/libs/database/dbConnect.ts",
    "/node_modules/mongoose/dist/**",
  ],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
