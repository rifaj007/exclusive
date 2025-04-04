import NextAuth from "next-auth";
import authConfig from "@/libs/auth/auth.config";
import { routes } from "./constants/routes";

const { auth: withAuthMiddleware } = NextAuth(authConfig);

export default withAuthMiddleware((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isApiAuthRoute = nextUrl.pathname.startsWith(routes.apiAuthPrefix);
  const isPrivateRoute = routes.private.includes(nextUrl.pathname);
  const isAuthRoute = routes.auth.includes(nextUrl.pathname);
  const defaultLoginRedirectUrl = new URL(routes.defaultLoginRedirect, nextUrl);

  if (isApiAuthRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(defaultLoginRedirectUrl);
    }
    return undefined;
  }

  if (isPrivateRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/log-in?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return undefined;
});

export const config = {
  runtime: "nodejs",
  unstable_allowDynamic: [
    "/src/libs/database/dbConnect.ts",
    "/node_modules/mongoose/dist/**",
  ],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
