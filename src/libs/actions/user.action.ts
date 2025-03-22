"use server";
import bcrypt from "bcryptjs";
import { handleError } from "@/utils";
import User from "@/libs/database/models/user.model";
import connectToDatabase from "@/libs/database/dbConnect";
import { LoginParams, RegisterUserParams } from "@/types/auth";
import { signIn } from "@/libs/auth";

export const login = async ({ email, password }: LoginParams) => {
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    handleError(error);
  }
};

export const registerUser = async ({ user }: RegisterUserParams) => {
  try {
    await connectToDatabase();
    console.log(user);

    // check if user already exists
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await User.create({ ...user, password: hashedPassword });

    await login({ email: user.email, password: user.password });
  } catch (error) {
    handleError(error);
  }
};
