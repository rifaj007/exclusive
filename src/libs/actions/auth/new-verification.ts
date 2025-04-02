"use server";

import connectToDatabase from "@/libs/database/dbConnect";
import { User } from "@/libs/database/models/auth.model";
import { isTokenError, verifyToken } from "@/libs/jwt-token";

export const newVerification = async (token: string) => {
  const res = await verifyToken(token);

  if (isTokenError(res)) {
    return { error: res.error };
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email: res.email });

    if (existingUser) {
      await User.findByIdAndUpdate(existingUser._id, {
        emailVerified: true,
      });

      return { success: "Email verified successfully!" };
    } else {
      return { error: "Email doesn't exist!" };
    }
  } catch (error) {
    console.log(error);
    return { error: "Invalid verification request!" };
  }
};
