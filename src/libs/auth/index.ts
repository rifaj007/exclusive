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

        if (!password) {
          throw new Error("Invalid password");
        }

        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          console.log("Invalid credentials");
          return null;
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
          console.log("Invalid password");
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
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
