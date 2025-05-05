"use server";
import { auth } from "@/libs/auth";
import connectToDatabase from "@/libs/database/dbConnect";
import { User } from "@/libs/database/models/auth.model";
import { PartialUserUpdate } from "@/types/auth";
import bcrypt from "bcryptjs";

// get user by email
export const getUserById = async () => {
  const session = await auth();
  const email = session?.user?.email;

  try {
    await connectToDatabase();

    const user = await User.findOne({
      email,
    });

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};

// update user by email
export const updateUserByEmail = async (data: PartialUserUpdate & {
  currentPassword?: string;
  confirmPassword?: string;
}) => {
  const session = await auth();
  const email = session?.user?.email;

  try {
    await connectToDatabase();

    const user = await User.findOne({ email }).select("+password");

    if (!user) throw new Error("User not found");

    // handle password update if applicable
    if (data.confirmPassword) {
      const isMatch = await bcrypt.compare(data.currentPassword || "", user.password);
      if (!isMatch) throw new Error("Current password is incorrect");

      user.password = await bcrypt.hash(data.confirmPassword, 10);
    }

    // update other fields
    user.name = data.name || user.name;
    user.address = data.address || user.address;
    user.image = data.image || user.image;

    await user.save();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

