'use client';

import React from 'react';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { TutorWeeklyScheduleGrid } from '../../../src/components/tutor/TutorWeeklyScheduleGrid';
import { TutorStudentDrawer } from '../../../src/components/tutor/TutorStudentDrawer';
import { useDrawer } from '../../../src/hooks/useDrawer';
import { MOCK_SESSIONS } from '../../../src/data/mockData';
import { StudentSession } from '../../../src/types';
import Link from 'next/link';
import { Calendar, Clock, Sparkles } from 'lucide-react';

export interface TutorSchedulePageProps {
  readonly initialSessionId?: string;
}

export default function TutorSchedulePage({
  initialSessionId,
}: TutorSchedulePageProps) {
  const {
    isOpen: isDrawerOpen,
    data: selectedSession,
    open: openDrawer,
    close: closeDrawer,
  } = useDrawer<StudentSession>({
    initialOpen: false,
    initialData: MOCK_SESSIONS[0],
  });

  const handleSelectSession = (session: StudentSession) => {
    openDrawer(session);
  };

  return (
    <div className="bg-surface dark:bg-slate-950 text-text-primary dark:text-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <TopNavBar
        activeRoute="/tutor/schedule"
        role="tutor"
        userName="Sarah Amanda, S.Pd."
        userBadge="Pengajar Terverifikasi"
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary dark:text-white">
              Kalender Jadwal Mengajar
            </h1>
            <p className="text-sm text-text-muted dark:text-gray-400 mt-1">
              Klik pada kotak sesi untuk melihat detail alamat siswa, kontak orang tua, dan materi belajar.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tutor/availability"
              className="bg-surface-container-low dark:bg-surface-container-high hover:bg-primary-container hover:text-white text-primary dark:text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-border-whisper transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>Kelola Jam Rutin</span>
            </Link>
          </div>
        </div>

        {/* Weekly Calendar Schedule Grid */}
        <TutorWeeklyScheduleGrid
          sessions={MOCK_SESSIONS}
          onSelectSession={handleSelectSession}
        />
      </main>

      {/* Slide-over Drawer for Student Session Details */}
      <TutorStudentDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        session={selectedSession}
      />

      <Footer />
    </div>
  );
}
