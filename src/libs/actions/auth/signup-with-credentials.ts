'use server'
import connectToDatabase from "@/libs/database/dbConnect";
import { User } from "@/libs/database/models/auth.model";
import { generateToken } from "@/libs/jwt-token";
import { sendVerificationEmail } from "@/libs/mailer";
import { SignUpWithCredentialsParams } from "@/types/auth";
import bcrypt from "bcryptjs";

export const signUpWithCredentials = async ({
  user,
}: SignUpWithCredentialsParams) => {
  await connectToDatabase();

  // check if user already exists
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    const error =
      existingUser.provider === "credentials"
        ? "User already exists! Please log in."
        : "User already exists! Please sign in with Google.";
    return { error };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  await User.create({ ...user, password: hashedPassword });

  const verificationToken = await generateToken({ email: user.email });

  await sendVerificationEmail(user.email, verificationToken);

  return { success: "Confirmation email sent! Please check your email, including the spam folder." };
};
