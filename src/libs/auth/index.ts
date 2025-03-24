import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectToDatabase from "../database/dbConnect";
import User from "@/libs/database/models/user.model";
import { compare } from "bcryptjs";
import { privateRoutes } from "@/constants";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!password) {
          throw new Error("Please! provide your password");
        }

        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("Wrong password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;

      const searchTerm = request.nextUrl.pathname
        .split("/")
        .slice(0, 2)
        .join("/");

      // prevent unauthenticated users (who did not log in) from accessing private routes
      if (privateRoutes.includes(searchTerm)) {
        return !!auth;
        // prevent authenticated users from accessing pages such as login, forgot password, sign up
      } else if (
        pathname.startsWith("/login") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/signup")
      ) {
        const isLoggedIn = !!auth;

        if (isLoggedIn) {
          // redirect authenticated users to the home page
          return Response.redirect(new URL("/", request.nextUrl));
        }

        // if user is not authenticated, proceed
        return true;
      }

      return true;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          await connectToDatabase();
          const existingUser = await User.findOne({ email });

          if (!existingUser) {
            await User.create({
              email,
              name,
              address: "",
              image,
              authProviderId: id,
              emailVerified: true,
            });
          }
          return true;
        } catch (error) {
          console.error("Error while creating user:", error);
          return false;
        }
      }

      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
