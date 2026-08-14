'use client';

import React, { useState, useEffect } from'react';
import { TutorTopNavBar } from'@/src/components/tutor/TutorTopNavBar';
import { Footer } from'@/src/components/shared/Footer';
import { TutorWeeklyScheduleGrid } from'@/src/components/tutor/TutorWeeklyScheduleGrid';
import { TutorStudentDrawer } from'@/src/components/tutor/TutorStudentDrawer';
import { useDrawer } from'@/src/hooks/useDrawer';
import { StudentSession } from'@/src/types';
import Link from'next/link';
import { Calendar, Clock, Sparkles, ChevronLeft } from 'lucide-react';

export interface TutorSchedulePageProps {
 readonly initialSessionId?: string;
}

export default function TutorSchedulePage({
 initialSessionId,
}: TutorSchedulePageProps) {
 const [sessions, setSessions] = useState<StudentSession[]>([]);
 const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSchedule() {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tutor/schedule');
        const data = await response.json();
        if (data.success && data.sessions) {
          setSessions(data.sessions);
        } else {
          setSessions([]);
        }
      } catch (error) {
        console.error('Failed to load schedule', error);
        setSessions([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSchedule();
  }, []);

 const {
 isOpen: isDrawerOpen,
 data: selectedSession,
 open: openDrawer,
 close: closeDrawer,
 } = useDrawer<StudentSession>({
 initialOpen: false,
 initialData: null,
 });

 const handleSelectSession = (session: StudentSession) => {
 openDrawer(session);
 };

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col">
 {/* Header */}
 <TutorTopNavBar activeRoute="/tutor/schedule" />

 <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <Link 
 href="/tutor/dashboard" 
 className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-3"
 >
 <ChevronLeft className="w-4 h-4" />
 Kembali ke Dashboard
 </Link>
 <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 Kalender Jadwal Mengajar
 </h1>
 <p className="text-sm text-text-muted mt-1">
 Klik pada kotak sesi untuk melihat detail alamat siswa, kontak orang tua, dan materi belajar.
 </p>
 </div>

 <div className="flex items-center gap-3">
 <Link
 href="/tutor/availability"
 className="bg-surface-container-low hover:bg-primary-container hover:text-white text-primary text-xs font-bold px-4 py-2.5 rounded-xl border border-border-whisper transition-all flex items-center gap-2"
 >
 <Clock className="w-4 h-4" />
 <span>Kelola Jam Rutin</span>
 </Link>
 </div>
 </div>

 {/* Weekly Calendar Schedule Grid */}
 <TutorWeeklyScheduleGrid
 sessions={sessions}
 isLoading={isLoading}
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
