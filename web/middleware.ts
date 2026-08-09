import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getUserById, syncUserRoleWithAuth } from '@/src/lib/db-services';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    try {
      const { data, error } = await auth.getSession();
      if (error || !data || !data.user) {
        const loginUrl = new URL('/auth', request.url);
        return NextResponse.redirect(loginUrl);
      }

      const authRole = (data.user as any).role;
      const userEmail = data.user.email;
      const dbUser =
        (await syncUserRoleWithAuth(data.user.id, userEmail, authRole)) ||
        (await getUserById(data.user.id, userEmail));

      const userRole = dbUser?.role || authRole;

      if (userRole !== 'admin') {
        const loginUrl = new URL('/auth', request.url);
        loginUrl.searchParams.set('error', 'unregistered_admin');
        return NextResponse.redirect(loginUrl);
      }
    } catch (err) {
      console.error('Middleware admin check error:', err);
      const loginUrl = new URL('/auth', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
