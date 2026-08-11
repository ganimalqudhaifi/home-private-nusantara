import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/src/lib/auth-server';
import { getUserById, syncUserRoleWithAuth } from '@/src/lib/db-services';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  try {
    const { data, error } = await auth.getSession();

    if (!data || !data.user) {
      // If user session is not found yet, allow page to render so authClient can process neon_auth_session_verifier token if present
      return <>{children}</>;
    }

    const authRole = (data.user as any).role;
    const userEmail = data.user.email;
    const userName = data.user.name;
    const userImage = data.user.image || (data.user as any).avatarUrl || (data.user as any).picture || null;

    const dbUser =
      (await syncUserRoleWithAuth(data.user.id, userEmail, authRole, userName, userImage)) ||
      (await getUserById(data.user.id, userEmail));

    const userRole = dbUser?.role || authRole;



    if (userRole !== 'admin') {
      redirect('/auth?error=unregistered_admin');
    }
  } catch (err: any) {
    if (err?.digest?.startsWith('NEXT_REDIRECT')) {
      throw err;
    }
    console.error('Admin layout auth notice:', err);
  }

  return <>{children}</>;
}
