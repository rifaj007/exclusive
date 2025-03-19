import { Schema, model, models, Model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address?: string;
  emailVerified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, select: false },
    address: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User: Model<IUser> = (models.User as Model<IUser>) || model<IUser>("User", userSchema);

export default User;
