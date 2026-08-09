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
    if (error || !data || !data.user) {
      redirect('/auth');
    }

    const authRole = (data.user as any).role;
    const userEmail = data.user.email;
    const userName = data.user.name;
    const userImage = data.user.image;

    const dbUser =
      (await syncUserRoleWithAuth(data.user.id, userEmail, authRole, userName, userImage)) ||
      (await getUserById(data.user.id, userEmail));

    const userRole = dbUser?.role || authRole;

    console.log('[Admin Access Audit]', {
      email: userEmail,
      userId: data.user.id,
      dbRole: dbUser?.role,
      userRole,
    });

    if (userRole !== 'admin') {
      redirect('/auth?error=unregistered_admin');
    }
  } catch (err: any) {
    if (err?.digest?.startsWith('NEXT_REDIRECT')) {
      throw err;
    }
    console.error('Admin layout auth error:', err);
    redirect('/auth');
  }

  return <>{children}</>;
}
