import React from 'react';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { AuthHubCard } from '../../../src/components/auth/AuthHubCard';

export interface RegisterTutorPageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function RegisterTutorPage({ searchParams }: RegisterTutorPageProps) {
  if (searchParams) await searchParams;

  return (
    <div className="bg-surface dark:bg-slate-950 text-text-primary dark:text-gray-100 min-h-screen flex flex-col">
      <TopNavBar activeRoute="/auth" role="guest" />
      <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <AuthHubCard initialTab="tutor" />
      </main>
      <Footer />
    </div>
  );
}
