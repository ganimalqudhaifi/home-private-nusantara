import { createNeonAuth } from '@neondatabase/neon-js/auth/next/server';

if (!process.env.NEXT_PUBLIC_NEON_AUTH_URL) {
  throw new Error('NEXT_PUBLIC_NEON_AUTH_URL environment variable is missing.');
}

if (!process.env.NEON_AUTH_COOKIE_SECRET) {
  throw new Error('NEON_AUTH_COOKIE_SECRET environment variable is missing.');
}

export const auth = createNeonAuth({
  baseUrl: process.env.NEXT_PUBLIC_NEON_AUTH_URL,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET,
  },
});
