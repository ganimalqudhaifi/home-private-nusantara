import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Admin role and session verification is handled safely in app/admin/layout.tsx
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
