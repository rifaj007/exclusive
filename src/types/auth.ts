import { IUser } from "@/libs/database/models/auth.model";

export interface SignUpWithCredentialsParams {
  user: {
    name: string;
    email: string;
    password: string;
    address: string;
    emailVerified: boolean;
    role: string;
    image?: string;
    authProviderId?: string;
    provider: "google" | "credentials";
  };
}

export type UserParams = {
  user: IUser;
};

export type PartialUserUpdate = {
  name: string;
  email: string;
  address: string;
  image?: string;
};