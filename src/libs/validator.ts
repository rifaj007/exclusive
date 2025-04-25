import { array, number, object, string, z } from "zod";

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

/* admin add product form validation schema */
export const adminAddProductFormSchema = object({
  name: string().nonempty("Product name cannot be empty."),
  description: string().nonempty("Product description cannot be empty."),
  offerPrice: number({
    required_error: "Please! provide a price",
    invalid_type_error: "Price must be a number",
  }).min(0, "Price must be at least 0"),
  originalPrice: number({
    required_error: "Please! provide a price",
    invalid_type_error: "Price must be a number",
  }).min(0, "Price must be at least 0"),
  discount: number({ invalid_type_error: "Discount must be a number" })
    .optional()
    .refine((val) => val === undefined || val > 0, {
      message: "Discount must be greater than 0",
    }),
  rating: number({
    required_error: "Please! provide rating.",
    invalid_type_error: "Rating must be a number",
  })
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be less than or equal to 5"),
  reviews: number({
    required_error: "Please! provide reviews.",
    invalid_type_error: "Reviews must be a number",
  }).min(0, "Reviews must be at least 0"),
  image: array(string().url("upload one image")).min(
    1,
    "Please upload at least one image."
  ),
  category: string().nonempty("Please! provide a category."),
  type: string().optional(),
  size: array(string()).optional(),
  colors: array(string()).optional(),
  availability: z.enum(["In Stock", "Out of Stock"], {
    errorMap: () => ({ message: "Select availability status" }),
  }),
});
