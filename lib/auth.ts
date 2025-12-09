import { NextRequest } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';
  // Ensure we have a consistent secret
  console.log('JWT Secret length:', secret.length);
  return new TextEncoder().encode(secret);
};

export interface AdminUser {
  username: string;
  isAdmin: boolean;
}

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (!adminUsername || !adminPassword) {
    console.error('Admin credentials not configured in environment variables');
    return false;
  }
  
  return username === adminUsername && password === adminPassword;
}

export async function createAdminToken(username: string): Promise<string> {
  const token = await new SignJWT({ username, isAdmin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getJWTSecret());

  return token;
}

export async function verifyAdminToken(token: string): Promise<AdminUser | null> {
  try {
    const { payload } = await jwtVerify(token, getJWTSecret());

    if (payload.username && payload.isAdmin) {
      return {
        username: payload.username as string,
        isAdmin: payload.isAdmin as boolean,
      };
    }

    return null;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getAdminFromRequest(request: NextRequest): Promise<AdminUser | null> {
  const token = request.cookies.get('admin-token')?.value;
  
  if (!token) {
    return null;
  }
  
  return await verifyAdminToken(token);
}

export function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith('/admin');
}
