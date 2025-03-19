import { object, string } from "zod";

/* contact section form validation schema */
export const contactFormSchema = object({
  name: string().nonempty("Please! give your name."),
  email: string().email("Please! give your email."),
  phone: string().regex(
    /^(\+?\d{1,4})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
    "Please! provide a valid phone number."
  ),
  message: string().min(
    20,
    "Please provide your message with at least 20 characters."
  ),
});

/* Sign up form validation schema */
export const signUpFormSchema = object({
  name: string().nonempty("Please! give your name."),
  email: string().email("Please! give your email."),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: string().nonempty("Please confirm your password."),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      path: ["confirmPassword"],
      message: "Passwords don't match",
      code: "custom",
    });
  }
});