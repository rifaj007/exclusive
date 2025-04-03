"use server";

import connectToDatabase from "@/libs/database/dbConnect";
import { User } from "@/libs/database/models/auth.model";
import { generateToken } from "@/libs/jwt-token";
import { sendPasswordResetEmail } from "@/libs/mailer";
import { resetPasswordSchema } from "@/libs/validator";
import { z } from "zod";

export const resetPassword = async (
  values: z.infer<typeof resetPasswordSchema>
) => {
  await connectToDatabase();

  const existingUser = await User.findOne({ email: values.email });

  if (!existingUser) {
    return { error: "User not found" };
  }

  if (existingUser.provider === "google") {
    return { error: "Email is already associated with a Google account" };
  }

  const passwordResetToken = await generateToken({ email: values.email });

  await sendPasswordResetEmail(values.email, passwordResetToken);

  return {
    success:
      "Reset email sent! Please check your email including your spam folder.",
  };
};
