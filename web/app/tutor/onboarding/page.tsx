import React from 'react';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';
import { auth } from '@/src/lib/auth-server';

export const dynamic = 'force-dynamic';
import { getUserById, syncUserRoleWithAuth } from '@/src/lib/db-services';
import { TopNavBar } from '@/src/components/shared/TopNavBar';
import { TutorOnboardingForm } from '@/src/components/tutor/TutorOnboardingForm';
import { GraduationCap } from 'lucide-react';

export default async function TutorOnboardingPage() {
  const { data } = await auth.getSession({ fetchOptions: { headers: await headers() } });
  if (!data?.user) {
    redirect('/auth');
  }

  const authRole = (data.user as any).role;
  const userName = data.user.name;
  const userImage = data.user.image || (data.user as any).avatarUrl || (data.user as any).picture || null;

  const user = 
    (await syncUserRoleWithAuth(data.user.id, data.user.email, authRole, userName, userImage)) || 
    (await getUserById(data.user.id, data.user.email));

  if (user && user.status) {
    // If user already has a tutor record, go to pending or dashboard
    if (user.status === 'pending') {
      redirect('/tutor/pending');
    } else {
      redirect('/tutor/dashboard');
    }
  }

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
      <TopNavBar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-border-whisper shadow-sm w-full max-w-2xl">
          <div className="flex flex-col items-center text-center gap-3 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-container/10 text-primary-container flex items-center justify-center mb-2">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary tracking-tight">
              Lengkapi Data Pengajar
            </h1>
            <p className="text-sm md:text-base text-text-muted max-w-lg">
              Anda telah login, namun kami memerlukan beberapa informasi tambahan untuk mendaftarkan Anda sebagai pengajar.
            </p>
          </div>
          <TutorOnboardingForm />
        </div>
      </main>
    </div>
  );
}
