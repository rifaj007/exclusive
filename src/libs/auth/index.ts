import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectToDatabase from "../database/dbConnect";
import User from "@/libs/database/models/user.model";
import { compare } from "bcryptjs";

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

        if (!email) {
          throw new Error("missing_email");
        }

        if (!password) {
          throw new Error("missing_password");
        }

        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          throw new Error("invalid_email");
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
          throw new Error("invalid_password");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/log-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
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
      try {
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
                role: "user",
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
      } catch (error) {
        console.error("Error in signIn callback:", error);
        throw new Error("Authentication failed");
      }
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
