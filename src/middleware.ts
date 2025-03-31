import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { privateRoutes } from "./constants";
import { auth } from "./libs/auth";

export default auth(async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const isAuthenticated = !!token;
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);

  // Redirect unauthenticated users trying to access private pages
  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(
      new URL(
        `/log-in?callbackUrl=${encodeURIComponent(nextUrl.pathname)}`,
        req.url
      )
    );
  }

  // Redirect authenticated users away from login/signup
  if (
    isAuthenticated &&
    ["/log-in", "/sign-up", "/forgot-password"].includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// Apply middleware only to relevant routes
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
