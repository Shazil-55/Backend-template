import jwt from 'jsonwebtoken';
import { Jwt } from '../helpers/env';

// Function to generate JWT token
export function createAccessToken(payload: Record<string, string>): string {
  const token = jwt.sign(payload, Jwt.JWT_SECRET, { expiresIn: Jwt.accessTokenExpiresIn });
  return token;
}

// Function to generate JWT token
export function createRefreshToken(payload: Record<string, string>): string {
  const token = jwt.sign({ ...payload, isRefreshToken: true }, Jwt.JWT_SECRET, {
    expiresIn: Jwt.refreshTokenExpiresIn,
  });
  return token;
}

export function verifyRefreshToken(token: string): {
  id: string;
  isRefreshToken: boolean;
} | null {
  try {
    const decoded: any = jwt.verify(token, Jwt.JWT_SECRET || '');

    if (decoded.isRefreshToken) return decoded;

    return null;
  } catch (error) {
    return null;
  }
}
