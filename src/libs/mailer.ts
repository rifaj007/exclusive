"use server";
import nodemailer from "nodemailer";

const baseURL = process.env.NEXT_PUBLIC_APP_URL;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  auth: { user: emailUser, pass: emailPass },
});

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${baseURL}/new-verification?token=${token}`;

  const mailOptions = {
    from: emailUser,
    to: email,
    subject: "Confirm your email",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #000; text-align: center;">Welcome to Exclusive!</h2>
                <p style="font-size: 16px; color: #333;">Hi there,</p>
                <p style="font-size: 16px; color: #333;">Thank you for signing up with <strong>Exclusive</strong>! Please confirm your email address to verify your account.</p>
                
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${confirmLink}" 
                        style="display: inline-block; padding: 12px 20px; font-size: 16px; font-weight: bold; 
                        color: #ffffff; background-color: #DB4444; text-decoration: none; 
                        border-radius: 5px;">
                        Confirm Email
                    </a>
                </div>

                <p style="font-size: 16px; color: #333;">If you didn’t request this, you can safely ignore this email.</p>
                
                <p style="font-size: 14px; color: #777;">Best regards, <br><strong>Exclusive Team</strong></p>
            </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
