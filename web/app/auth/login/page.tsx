import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/src/lib/auth-server';

export const dynamic = 'force-dynamic';
import { getUserById, syncUserRoleWithAuth } from '@/src/lib/db-services';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { AuthHubCard } from '../../../src/components/auth/AuthHubCard';

export interface LoginPageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  try {
    const { data } = await auth.getSession();
    if (data?.user) {
      const authRole = (data.user as { role?: string }).role;
      const dbUser =
        (await syncUserRoleWithAuth(data.user.id, data.user.email, authRole)) ||
        (await getUserById(data.user.id, data.user.email));
      const userRole = dbUser?.role || authRole;

      if (userRole === 'admin') {
        redirect('/admin/dashboard');
      } else {
        redirect('/tutor/dashboard');
      }
    }
  } catch (err: unknown) {
    if (
      typeof err === 'object' &&
      err !== null &&
      'digest' in err &&
      typeof (err as { digest: string }).digest === 'string' &&
      (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')
    ) {
      throw err;
    }
  }

  if (searchParams) await searchParams;

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
      <TopNavBar activeRoute="/auth" role="guest" />
      <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <AuthHubCard initialTab="login" />
      </main>
      <Footer />
    </div>
  );
}
