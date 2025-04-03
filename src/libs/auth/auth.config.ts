import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectToDatabase from "../database/dbConnect";
import { compare } from "bcryptjs";
import { User } from "../database/models/auth.model";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
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
          return null;
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      console.log(user, account, profile);
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

    async session({ session, token }) {
      if (session?.user) {
        session.user._id = token._id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/log-in",
  },
} satisfies NextAuthConfig;
