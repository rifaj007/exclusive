import { getToken } from "next-auth/jwt";
import { privateRoutes } from "./constants";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  
  // Extract the token from the request headers
  const token = await getToken({req, secret: process.env.AUTH_SECRET});

  const pathname = nextUrl.pathname;

  // Check authentication status
  const isAuthenticated = !!token;

  const isPrivateRoute = privateRoutes.includes(pathname);

  // Prevent unauthenticated users from accessing protected routes
  if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL(`/log-in?callbackUrl=${pathname}`, req.url));
  }

  // Prevent authenticated users from accessing auth routes
  if (
    isAuthenticated &&
    ["/log-in", "/sign-up", "/forgot-password"].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
}

// Apply middleware only to relevant routes
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
