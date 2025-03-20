"use server";

import bcrypt from "bcryptjs";
import { handleError } from "@/utils";
import User, { IUserCreate } from "../database/models/user.model";
import connectToDatabase from "../database/dbConnect";

export const registerUser = async ({ user }: IUserCreate) => {
  try {
    await connectToDatabase();

    // check if user already exists
    const userExists = await User.findOne({ email: user.email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await User.create({ ...user, password: hashedPassword });
    return { message: "User registered successfully", user: newUser };
  } catch (error) {
    handleError(error);
  }
};
