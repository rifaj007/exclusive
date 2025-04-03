"use server";

import connectToDatabase from "@/libs/database/dbConnect";
import { User } from "@/libs/database/models/auth.model";
import { isTokenError, verifyToken } from "@/libs/jwt-token";
import { newPasswordSchema } from "@/libs/validator";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token" };
  }

  const res = await verifyToken(token);

  if (isTokenError(res)) {
    return { error: res.error };
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email: res.email });

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  if (existingUser.provider === "google") {
    return { error: "Email is already associated with a Google account" };
  }

  const { confirmPassword } = values;

  if (existingUser.password === confirmPassword) {
    return { error: "Existing password cannot be same as new password" };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(confirmPassword, salt);

  await User.findByIdAndUpdate(existingUser._id, { password: hashedPassword });

  return { success: "Password updated successfully!" };
};
