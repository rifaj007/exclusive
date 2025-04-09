import { object, string } from "zod";

/* contact section form validation schema */
export const contactFormSchema = object({
  name: string().nonempty("Please! give your name."),
  email: string().min(1, "Please! give your email.").email("Invalid email."),
  phone: string().regex(
    /^(\+?\d{1,4})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
    "Please! provide a valid phone number."
  ),
  message: string().min(
    20,
    "Please provide your message with at least 20 characters."
  ),
});

/* sign up form validation schema */
export const signUpFormSchema = object({
  name: string().nonempty("Please! provide your name."),
  email: string().min(1, "Please! provide your email.").email("Invalid email"),
  password: string()
    .min(1, "Please! provide your password.")
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
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

/* login form validation schema */
export const loginFormSchema = object({
  email: string().min(1, "Please! provide your email.").email("Invalid email"),
  password: string()
    .min(1, "Please! provide your password.")
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
});

/* reset password schema */
export const resetPasswordSchema = object({
  email: string().min(1, "Please! provide your email.").email("Invalid email"),
});

/* new password after reset password schema */
export const newPasswordSchema = object({
  password: string()
    .min(1, "Please! provide your password.")
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
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

/* coupon code validation schema */
export const couponCodeSchema = object({
  couponCode: string().min(1, "Please! provide a coupon code."),
});
