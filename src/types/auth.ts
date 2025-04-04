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
