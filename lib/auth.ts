import { NextRequest } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "adaam507";
const AUTH_COOKIE_NAME = "admin_auth_token";

// Simple token generation (in production, use a proper JWT library)
function generateToken(): string {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString("base64");
}

export async function verifyAuth(request: NextRequest): Promise<boolean> {
  const authToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!authToken) {
    return false;
  }
  
  // In a real app, you'd verify the token signature
  // For now, we'll just check if it exists and is recent
  try {
    const decoded = Buffer.from(authToken, "base64").toString();
    const timestamp = parseInt(decoded.split("-")[0]);
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    return Date.now() - timestamp < maxAge;
  } catch {
    return false;
  }
}

export async function authenticate(password: string): Promise<string | null> {
  if (password === ADMIN_PASSWORD) {
    return generateToken();
  }
  return null;
}

export function getAuthCookie(token: string): string {
  return `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`;
}

export function getLogoutCookie(): string {
  return `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
