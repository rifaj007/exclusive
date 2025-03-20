import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";
import connectToDatabase from "../database/dbConnect";
import User from "@/libs/database/models/user.model";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    /* Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }), */

    Credentials({
      name: "User",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        await connectToDatabase();

        /* const userExist = await User.findOne({ email: credentials?.email }).select("+password");
        if (!userExist) {
          throw new Error("User not found");
        }

        const passwordMatch = await compare(credentials.password, userExist.password);
        if (!passwordMatch) {
          throw new Error("Invalid password");
        } */

        return user
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;  // Use token.id instead of token.sub for clarity
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectToDatabase();
          // const existingUser = await User.findOne({ email: user.email });
/* 
          if (!existingUser) {
            await User.create({
              email: user.email,
              name: user.name,
              image: user.image,
              authProviderId: user.id,
            });
          } */
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
  /* 
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  }, */
});
