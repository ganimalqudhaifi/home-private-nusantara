import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const authUrl = new URL('/api/user/me', request.url);
    try {
      const userRes = await fetch(authUrl.toString(), {
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      });

      if (!userRes.ok) {
        const loginUrl = new URL('/auth', request.url);
        return NextResponse.redirect(loginUrl);
      }

      const userData = await userRes.json();

      if (!userData?.authenticated) {
        const loginUrl = new URL('/auth', request.url);
        return NextResponse.redirect(loginUrl);
      }

      if (userData?.user?.role !== 'admin') {
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
