import { auth } from '@/src/lib/auth-server';

export const proxy = auth.middleware({ loginUrl: '/auth/sign-in' });

export const config = {
  matcher: ['/admin/:path*', '/tutor/:path*'],
};
