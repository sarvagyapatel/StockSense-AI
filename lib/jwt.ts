import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface AuthTokenPayload extends JwtPayload {
  userId: string;
  username: string;
}

export function signToken(payload: AuthTokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): AuthTokenPayload {
  return jwt.verify(token, JWT_SECRET) as AuthTokenPayload;
}
