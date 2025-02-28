import { object, string } from "zod";

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
