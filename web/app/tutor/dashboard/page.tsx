'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { TutorMetricsGrid } from '../../../src/components/tutor/TutorMetricsGrid';
import { TutorUpcomingSessionsCard } from '../../../src/components/tutor/TutorUpcomingSessionsCard';
import { TutorRecentStudentsCard } from '../../../src/components/tutor/TutorRecentStudentsCard';
import { CalendarPlus, ShieldCheck, Sparkles } from 'lucide-react';
import { MOCK_SESSIONS, MOCK_STUDENTS } from '../../../src/data/mockData';

export interface TutorDashboardPageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function TutorDashboardPage({ searchParams }: TutorDashboardPageProps) {
  const [userName, setUserName] = useState('Pengajar Nusantara');
  const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
  const [isVerified, setIsVerified] = useState(true);

  useEffect(() => {
    fetch('/api/user/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          if (data.user.full_name || data.user.name) {
            setUserName(data.user.full_name || data.user.name);
          }
          if (data.user.avatar_url || data.user.image) {
            setUserAvatar(data.user.avatar_url || data.user.image);
          }
          if (data.user.status) {
            setIsVerified(data.user.status === 'verified');
          }
        }
      })
      .catch((err) => console.error('Error fetching user profile:', err));
  }, []);

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
      {/* Top Header */}
      <TopNavBar
        activeRoute="/tutor/dashboard"
        role="tutor"
        userName={userName}
        userAvatar={userAvatar}
        userBadge={isVerified ? 'Pengajar Terverifikasi' : 'Menunggu Verifikasi'}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-8">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-whisper">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold w-fit border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isVerified ? 'Pengajar Terverifikasi Resmi' : 'Status: Dalam Antrean Verifikasi'}</span>
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
              Halo, {userName}
            </h1>
            <p className="text-sm text-text-muted">
              Berikut ringkasan performa bimbingan dan jadwal mengajar Anda hari ini.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tutor/availability"
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl px-5 py-3 text-sm font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Atur Slot Jadwal</span>
            </Link>
          </div>
        </section>

        {/* Metrics Grid */}
        <TutorMetricsGrid
          completedSessions={18}
          activeStudentsCount={4}
          sdStudentsCount={2}
          smpStudentsCount={2}
          activeDaysCount={4}
          rating={4.9}
        />

        {/* 2-Column Content Grid: Upcoming Sessions & Recent Students */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <TutorUpcomingSessionsCard sessions={MOCK_SESSIONS} />
          </div>

          <div className="lg:col-span-5">
            <TutorRecentStudentsCard students={MOCK_STUDENTS} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
