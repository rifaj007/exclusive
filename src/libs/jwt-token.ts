import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import crypto from "crypto"
import connectToDatabase from "./database/dbConnect";
import { TwoFactorToken } from "./database/models/auth.model";

export interface IPayload extends JwtPayload {
  email: string;
}

export interface IError {
  error: string;
}

export const isTokenError = (res: IPayload | IError): res is IError => {
  return (res as IError).error !== undefined;
};

export const generateToken = async (
  payload: { email: string },
  expiresIn: string = "1h"
) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const verifyToken = async (
  token: string
): Promise<IPayload | IError> => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as IPayload;
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { error: "Token has expired!" };
    } else {
      return { error: "Invalid token!" };
    }
  }
};

export const generateCode = async (email: string) => {
  const token = crypto.randomInt(100000, 1000000).toString(); //generate a six digit random number

  const expires = new Date(new Date().getTime() + 5 * 60 * 1000) // 5 minutes

  await connectToDatabase();

  await TwoFactorToken.deleteOne({email})

  const twoFactorToken = new TwoFactorToken({
    email, token, expires
  })

  await twoFactorToken.save()

  return token
}