export interface RegisterUserParams {
  user: {
    name: string;
    email: string;
    password: string;
    address?: string;
    emailVerified: boolean;
    role: string;
    image?: string;
    authProviderId?: string;
  };
}

export interface LoginParams {
  email: string;
  password: string;
}