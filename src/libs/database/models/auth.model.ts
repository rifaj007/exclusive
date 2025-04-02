import { Schema, model, models, Model, Document } from "mongoose";

// User
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  address: string;
  emailVerified: boolean;
  role: "user" | "admin";
  image?: string;
  authProviderId?: string;
  provider: "google" | "credentials";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    address: { type: String, default: "" },
    emailVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: { type: String },
    authProviderId: { type: String },
    provider: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
    },
  },
  { timestamps: true }
);

const User: Model<IUser> =
  (models?.User as Model<IUser>) || model<IUser>("User", userSchema);

// Verification Token
const verificationTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, unique: true, required: true },
  expires: { type: Date, required: true },
});

const VerificationToken =
  models?.VerificationToken ||
  model("VerificationToken", verificationTokenSchema);

// Password Reset Token
const passwordResetTokenSchema = new Schema({
  email: { type: String, required: true },
  token: { type: String, unique: true, required: true },
  expires: { type: Date, required: true },
});

const PasswordResetToken =
  models?.PasswordResetToken ||
  model("PasswordResetToken", passwordResetTokenSchema);

// Two factor Token
const twoFactorTokenSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    unique: true,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});

const TwoFactorToken =
  models?.TwoFactorToken || model("TwoFactorToken", twoFactorTokenSchema);

// Two factor Confirmation
export const twoFactorConfirmationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
});

const TwoFactorConfirmation =
  models?.TwoFactorConfirmation ||
  model("TwoFactorConfirmation", twoFactorConfirmationSchema);

export {
  User,
  VerificationToken,
  PasswordResetToken,
  TwoFactorToken,
  TwoFactorConfirmation,
};
