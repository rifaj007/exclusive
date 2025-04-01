import NextAuth from "next-auth";
import authConfig from "@/libs/auth/auth.config";
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname)
})

// Apply middleware only to relevant routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
