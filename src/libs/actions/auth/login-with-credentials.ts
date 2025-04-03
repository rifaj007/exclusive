"use server";

import { routes } from "@/constants/routes";
import { signIn } from "@/libs/auth";
import connectToDatabase from "@/libs/database/dbConnect";
import { User } from "@/libs/database/models/auth.model";
import { generateToken } from "@/libs/jwt-token";
import { sendVerificationEmail } from "@/libs/mailer";
import { loginFormSchema } from "@/libs/validator";
import { AuthError } from "next-auth";
import { z } from "zod";

export const logInWithCredentials = async (
  values: z.infer<typeof loginFormSchema>,
  callbackUrl?: string | null
) => {
  await connectToDatabase();

  const existingUser = await User.findOne({ email: values.email });

  if (!existingUser || !existingUser.email) {
    return { error: "Email doesn't exist." };
  }

  // check if user is verified
  if (!existingUser.emailVerified) {
    const verificationToken = await generateToken({
      email: existingUser.email,
    });

    await sendVerificationEmail(existingUser.email, verificationToken);

    return { success: "Confirmation email sent!" };
  }

  try {
    await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    return { url: callbackUrl || routes.defaultLoginRedirect };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }

    throw error;
  }
};
