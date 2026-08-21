'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { TutorMetricsGrid } from '@/src/components/tutor/TutorMetricsGrid';
import { TutorUpcomingSessionsCard } from '@/src/components/tutor/TutorUpcomingSessionsCard';
import { TutorRecentStudentsCard } from '@/src/components/tutor/TutorRecentStudentsCard';
import { CalendarPlus, ShieldCheck, Coffee, AlertTriangle, UserX, PhoneCall } from 'lucide-react';
import { StudentSession, Student } from '@/src/types';
import { BRAND_INFO } from '@/src/data/mockData';
import { useUser } from '@/src/hooks/useUser';

export interface TutorDashboardPageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function TutorDashboardPage({ searchParams }: TutorDashboardPageProps) {
  const { user, isLoading: isLoadingUser } = useUser();
  const { data: dashboardData, isLoading: isLoadingData } = useSWR('/api/tutor/dashboard-data');

  const sessions = dashboardData?.sessions || [];
  const students = dashboardData?.students || [];
  const stats = dashboardData?.stats || {
    completedSessions: 0,
    activeStudentsCount: 0,
    sdStudentsCount: 0,
    smpStudentsCount: 0,
    activeDaysCount: 0,
  };

  const userName = user?.full_name || user?.name || '';
  const userAvatar = user?.avatar_url || user?.image || undefined;
  const userRole = (user?.role as 'guest' | 'student' | 'tutor' | 'admin') || 'tutor';
  const tutorStatus = user?.status || 'verified';
  const isVerified = tutorStatus === 'verified' || tutorStatus === 'active';

  const renderStatusBanner = () => {
    if (tutorStatus === 'on_leave') {
      return (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-headline text-sm font-bold">Status Akun: Sedang Cuti</h4>
              <p className="text-xs text-amber-800 mt-0.5">
                Akun Anda sedang dalam masa izin cuti. Slot jadwal baru dinonaktifkan sementara dan profil Anda disembunyikan dari katalog pencarian.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (tutorStatus === 'suspended') {
      return (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-headline text-sm font-bold">Status Akun: Dibekukan (Suspended)</h4>
              <p className="text-xs text-red-800 mt-0.5">
                Akun Anda dibekukan sementara oleh Tim Kurasi Admin. Hubungi helpdesk untuk klarifikasi dan pengaktifan kembali.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${BRAND_INFO.contact.whatsappRaw}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Hubungi Admin</span>
          </a>
        </div>
      );
    }

    if (tutorStatus === 'inactive') {
      return (
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-300 text-slate-900 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <UserX className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-headline text-sm font-bold">Status Akun: Nonaktif</h4>
              <p className="text-xs text-slate-700 mt-0.5">
                Akun Anda saat ini berstatus nonaktif (vakum mengajar). Pengaturan slot jadwal mengajar baru tidak aktif.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getStatusBadgeText = () => {
    switch (tutorStatus) {
      case 'on_leave':
        return 'Status: Sedang Cuti';
      case 'suspended':
        return 'Status: Akun Dibekukan';
      case 'inactive':
        return 'Status: Akun Nonaktif';
      case 'verified':
      case 'active':
      default:
        return isVerified ? 'Pengajar Terverifikasi Resmi' : 'Status: Dalam Antrean Verifikasi';
    }
  };

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
      {/* Top Header */}
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 flex flex-col gap-8">
        {/* Status Notice Banner */}
        {renderStatusBanner()}

        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-border-whisper">
          <div className="flex flex-col gap-2">
            {isLoadingUser ? (
              <div className="h-6 w-40 bg-gray-200 rounded-full animate-pulse" />
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold w-fit border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{getStatusBadgeText()}</span>
              </div>
            )}
            
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary flex items-center gap-2">
              Halo, {isLoadingUser ? (
                <span className="h-8 md:h-10 w-48 md:w-64 bg-gray-200 rounded-lg animate-pulse inline-block" />
              ) : (
                userName || 'Pengajar Nusantara'
              )}
            </h1>
            <p className="text-sm text-text-muted">
              Berikut ringkasan performa bimbingan dan jadwal mengajar Anda hari ini.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {isVerified ? (
              <Link
                href="/tutor/availability"
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl px-5 py-3 text-sm font-bold active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Atur Slot Jadwal</span>
              </Link>
            ) : (
              <button
                disabled
                className="bg-gray-200 text-gray-400 cursor-not-allowed rounded-xl px-5 py-3 text-sm font-bold flex items-center justify-center gap-2"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Slot Jadwal Terkunci</span>
              </button>
            )}
          </div>
        </section>

        {/* Metrics Grid */}
        <TutorMetricsGrid
          isLoading={isLoadingData}
          completedSessions={stats.completedSessions}
          activeStudentsCount={stats.activeStudentsCount}
          sdStudentsCount={stats.sdStudentsCount}
          smpStudentsCount={stats.smpStudentsCount}
          activeDaysCount={stats.activeDaysCount}
        />

        {/* 2-Column Content Grid: Upcoming Sessions & Recent Students */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <TutorUpcomingSessionsCard sessions={sessions} isLoading={isLoadingData} />
          </div>

          <div className="lg:col-span-5">
            <TutorRecentStudentsCard students={students} isLoading={isLoadingData} />
          </div>
        </div>
      </main>

    </div>
  );
}
