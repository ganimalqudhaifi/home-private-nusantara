import React from 'react';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { StudentSessionsTabs } from '../../../src/components/student/StudentSessionsTabs';
import { MOCK_SESSIONS } from '../../../src/data/mockData';

export interface StudentMyBookingsPageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StudentMyBookingsPage({
  searchParams,
}: StudentMyBookingsPageProps) {
  if (searchParams) await searchParams;

  return (
    <div className="bg-surface dark:bg-slate-950 text-text-primary dark:text-gray-100 min-h-screen flex flex-col">
      <TopNavBar
        activeRoute="/student/dashboard"
        role="student"
        userName="Ibu Ratna (Fajar - SD 5)"
        userBadge="Siswa Terdaftar"
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        <div>
          <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary dark:text-white">
            Riwayat Sesi & Pemesanan Belajar
          </h1>
          <p className="text-sm text-text-muted dark:text-gray-400 mt-1">
            Pantau seluruh sesi bimbingan yang akan datang maupun sesi yang telah selesai terlaksana.
          </p>
        </div>

        <StudentSessionsTabs sessions={MOCK_SESSIONS} initialTab="history" />
      </main>

      <Footer />
    </div>
  );
}
