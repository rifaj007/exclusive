"use server";
import bcrypt from "bcryptjs";
import User from "@/libs/database/models/user.model";
import connectToDatabase from "@/libs/database/dbConnect";
import { RegisterUserParams } from "@/types/auth";

export const registerUser = async ({ user }: RegisterUserParams) => {
  try {
    await connectToDatabase();

    // check if user already exists
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      throw new Error("User already exists! Please log in.");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password: hashedPassword });
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "Something went wrong!" };
  }
};
