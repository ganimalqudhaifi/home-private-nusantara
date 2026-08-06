import React from 'react';
import Link from 'next/link';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { StudentSessionsTabs } from '../../../src/components/student/StudentSessionsTabs';
import { MOCK_SESSIONS } from '../../../src/data/mockData';
import { Calendar, Users, Clock, Plus, BookOpen } from 'lucide-react';

export interface StudentDashboardPageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function StudentDashboardPage({
  searchParams,
}: StudentDashboardPageProps) {
  if (searchParams) await searchParams;

  const totalSessions = 8;
  const connectedTutors = 2;

  return (
    <div className="bg-surface dark:bg-slate-950 text-text-primary dark:text-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <TopNavBar
        activeRoute="/student/dashboard"
        role="student"
        userName="Ibu Ratna (Fajar - SD 5)"
        userBadge="Siswa Terdaftar"
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-whisper dark:border-outline-variant">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary dark:text-white mb-2">
              Halo, Fajar Pratama & Ibu Ratna
            </h1>
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-800">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SD Kelas 5 • Bimbingan Tatap Muka</span>
            </div>
          </div>

          <Link
            href="/student/search"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-6 py-3 rounded-xl font-bold text-xs md:text-sm shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Pesan Sesi Les Baru</span>
          </Link>
        </section>

        {/* Metrics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-surface-container-low border border-border-whisper dark:border-outline-variant rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-primary-container dark:text-blue-300 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Total Pertemuan</p>
              <p className="font-headline text-xl font-bold text-primary dark:text-white">
                {totalSessions} Sesi Belajar
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-container-low border border-border-whisper dark:border-outline-variant rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-300 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Guru Terhubung</p>
              <p className="font-headline text-xl font-bold text-primary dark:text-white">
                {connectedTutors} Pengajar Aktif
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-surface-container-low border border-border-whisper dark:border-outline-variant rounded-2xl p-6 shadow-sm flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-text-muted">Sesi Terdekat</p>
              <p className="font-headline text-base font-bold text-primary dark:text-white">
                Senin, 10 Ags • 16:00 WIB
              </p>
            </div>
          </div>
        </section>

        {/* Sessions Tabs & List */}
        <section>
          <StudentSessionsTabs sessions={MOCK_SESSIONS} initialTab="upcoming" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
