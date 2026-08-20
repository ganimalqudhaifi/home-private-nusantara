'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import Link from 'next/link';

import { Footer } from '../../../src/components/shared/Footer';
import { AdminKPICards } from '../../../src/components/admin/AdminKPICards';
import { UrgentTutorVerificationQueueTable } from '../../../src/components/admin/UrgentTutorVerificationQueueTable';
import { TutorAuditDrawer } from '../../../src/components/admin/TutorAuditDrawer';
import { TutorActionModal, ActionType } from '../../../src/components/admin/TutorActionModal';
import { CreateScheduleRundownModal } from '../../../src/components/admin/CreateScheduleRundownModal';
import { useDrawer } from '../../../src/hooks/useDrawer';
import { useModal } from '../../../src/hooks/useModal';
import { Tutor, TutorStatus, StudentSession } from '../../../src/types';
import { Calendar, Users, GraduationCap, ShieldCheck, ArrowRight, Clock, MapPin, Plus } from 'lucide-react';

export interface AdminDashboardPageProps {
  readonly initialRole?: string;
}

export default function AdminDashboardPage({ initialRole = 'admin' }: AdminDashboardPageProps) {
  const { data: statsData, isLoading: isLoadingStats } = useSWR('/api/admin/stats');
  const { data: tutorsData, isLoading: isLoadingTutors, mutate: mutateTutors } = useSWR('/api/admin/tutors');
  const { data: sessionsData, isLoading: isLoadingSessions, mutate: mutateSessions } = useSWR('/api/admin/bookings?view=weekly');

  const stats = React.useMemo(() => {
    if (statsData?.stats) {
      return {
        activeTutors: Number(statsData.stats.activeTutors || 0),
        pendingTutors: Number(statsData.stats.pendingTutors || 0),
        registeredStudents: {
          total: Number(statsData.stats.registeredStudents?.total || 0),
          calistung: Number(statsData.stats.registeredStudents?.calistung || 0),
          sd: Number(statsData.stats.registeredStudents?.sd || 0),
          smp: Number(statsData.stats.registeredStudents?.smp || 0),
        },
        totalBookings: Number(statsData.stats.totalBookings || 0),
        doubleBookingRate: '0%',
      };
    }
    return {
      activeTutors: 0,
      pendingTutors: 0,
      registeredStudents: { total: 0, calistung: 0, sd: 0, smp: 0 },
      totalBookings: 0,
      doubleBookingRate: '0%',
    };
  }, [statsData]);

  const tutorsList: Tutor[] = React.useMemo(() => {
    if (tutorsData?.tutors && Array.isArray(tutorsData.tutors)) {
      return tutorsData.tutors.map((t: any) => ({
        id: t.id,
        name: t.name || 'Pengajar',
        phone: t.phone || '-',
        portfolioUrl: t.portfolioUrl,
        avatar: t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        degree: t.major || t.degree || 'S1',
        university: t.university || '-',
        gpa: 3.8,
        subjects: Array.isArray(t.subjects) && t.subjects.length > 0 ? t.subjects : ['Matematika SD'],
        grades: Array.isArray(t.grades) && t.grades.length > 0 ? t.grades : ['SD (1-6)', 'SMP (7-9)'],
        teachingArea: 'Makassar & Gowa',
        rating: Number(t.rating || 5.0),
        reviewCount: Number(t.reviewCount || 0),
        hourlyRate: Number(t.hourlyRate || 150000),
        isVerified: t.status === 'verified',
        status: t.status || 'pending',
        experienceYears: Number(t.experienceYears || 1),
        avatarUrl: t.avatar || undefined,
        documents: {
          cvUploaded: !!t.portfolioUrl,
          diplomaUploaded: true,
          idCardUploaded: true,
          certificateUploaded: false,
        },
      }));
    }
    return [];
  }, [tutorsData]);

  const weeklySessions: StudentSession[] = React.useMemo(() => {
    if (sessionsData?.success && Array.isArray(sessionsData.bookings)) {
      return sessionsData.bookings.map((b: any) => ({
        id: b.id,
        code: b.code || `SES-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: b.studentId || 'st-1',
        studentName: b.studentName || 'Siswa Nusantara',
        tutorId: b.tutorId || 'tu-1',
        tutorName: b.tutorName || 'Pengajar',
        level: b.level || 'SD',
        grade: Number(b.grade ?? 4),
        subject: b.subject || 'Matematika SD',
        date: b.date || new Date().toISOString().split('T')[0],
        day: b.day || 'Senin',
        time: b.time || '16:00 - 17:30',
        address: b.address || 'Jl. Hertasning No. 25',
        district: b.district || 'Rappocini',
        city: b.city || 'Kota Makassar',
        status: b.status || 'scheduled',
        amount: Number(b.amount || 150000),
      }));
    }
    return [];
  }, [sessionsData]);

  const [isRundownModalOpen, setIsRundownModalOpen] = useState(false);
  const pendingTutors = tutorsList.filter((t) => t.status === 'pending');

  const handleSaveRundownFromDashboard = async (newSessionsPayload: Partial<StudentSession>[]) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSessionsPayload),
      });
      const data = await res.json();
      if (data.success) {
        await mutateSessions();
        return { success: true };
      } else {
        return { success: false, error: data.error, collisions: data.collisions };
      }
    } catch (err) {
      console.error('Error saving rundown from dashboard:', err);
      return { success: false, error: 'Gagal menghubungi server.' };
    }
  };

  const {
    isOpen: isAuditOpen,
    data: auditTutor,
    open: openAudit,
    close: closeAudit,
  } = useDrawer<Tutor>();

  const {
    isOpen: isActionOpen,
    data: actionModalData,
    open: openAction,
    close: closeAction,
  } = useModal<{ actionType: ActionType; tutor: Tutor }>();

  const handleAuditTutor = (tutor: Tutor) => {
    openAudit(tutor);
  };

  const handleOpenActionModal = (actionType: ActionType, tutor: Tutor) => {
    openAction({ actionType, tutor });
  };

  const handleConfirmAction = async (
    tutorId: string,
    actionType: ActionType,
    notes: string
  ) => {
    const statusMap: Record<ActionType, TutorStatus> = {
      approve: 'verified',
      reject: 'rejected',
      freeze: 'suspended',
      leave: 'on_leave',
      deactivate: 'inactive',
    };
    const targetStatus = statusMap[actionType] || 'verified';

    try {
      await fetch('/api/admin/tutors', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId,
          status: targetStatus,
          rejectionReason: notes,
        }),
      });
      await mutateTutors();
    } catch (err) {
      console.error('Error updating verification status in database:', err);
    }
  };

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
      {/* Top Navigation */}
      

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        {/* Welcome Section */}
        <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border-whisper">
          <div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
              Pusat Kendali Operasional (Admin Hub)
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Pantau KPI pengajar, direktori siswa, dan antrean verifikasi berkas hari ini.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/tutors"
              className="bg-primary-container hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              Kelola Seluruh Tutor
            </Link>
            <Link
              href="/admin/students"
              className="bg-surface-container-low hover:bg-surface-container-highest text-primary text-xs font-bold px-4 py-2.5 rounded-xl border border-border-whisper transition-colors"
            >
              Direktori Siswa
            </Link>
          </div>
        </section>

        {/* 1. Admin KPI Metrics Cards */}
        <AdminKPICards stats={stats} isLoading={isLoadingStats} />

        {/* 2. Urgent Verification Queue Table */}
        <section>
          <UrgentTutorVerificationQueueTable
            pendingTutors={pendingTutors}
            isLoading={isLoadingTutors}
            onAuditTutor={handleAuditTutor}
          />
        </section>

        {/* 3. Real-Time Weekly Sessions Monitoring Feed (Monday to Sunday) */}
        <section className="bg-white border border-border-whisper rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-border-whisper">
            <h3 className="font-headline text-base font-bold text-primary flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-container" />
              <span>Monitoring Sesi Belajar Minggu Ini & Mendatang</span>
            </h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsRundownModalOpen(true)}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat Jadwal Paket</span>
              </button>
              <Link
                href="/admin/bookings"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>Kalender Sesi Bimbingan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {isLoadingSessions ? (
            /* Skeleton Loading State */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-xl border border-border-whisper bg-gray-50 space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="pt-2 border-t border-gray-200 flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : weeklySessions.length === 0 ? (
            /* Empty State */
            <div className="p-8 text-center space-y-3 bg-surface-container-lowest rounded-xl border border-dashed border-border-whisper">
              <Calendar className="w-8 h-8 text-text-muted mx-auto" />
              <h4 className="font-headline text-sm font-bold text-primary">
                Belum Ada Sesi Belajar Terjadwal Minggu Ini
              </h4>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                Terbitkan rundown jadwal bimbingan baru untuk wali murid agar jadwal muncul di monitoring ini.
              </p>
              <button
                type="button"
                onClick={() => setIsRundownModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Buat Rundown Sesi Sekarang</span>
              </button>
            </div>
          ) : (
            /* Weekly Sessions Feed Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weeklySessions.map((ses) => (
                <div
                  key={ses.id}
                  className="p-4 rounded-xl border border-border-whisper bg-surface-container-low/40 flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-bold text-primary">
                        #{ses.code}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                        {ses.status === 'completed' ? 'Selesai' : 'Terkonfirmasi'}
                      </span>
                    </div>
                    <h4 className="font-headline text-sm font-bold text-primary">
                      {ses.studentName} ({ses.level} {ses.grade})
                    </h4>
                    <p className="text-xs text-emerald-800 font-semibold">{ses.subject}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">
                      {ses.day ? `${ses.day}, ` : ''}{ses.date}
                    </p>
                  </div>

                  <div className="text-[11px] text-text-muted pt-2 border-t border-border-whisper flex justify-between items-center">
                    <span className="truncate">Tutor: {ses.tutorName}</span>
                    <span className="font-mono font-semibold text-text-primary shrink-0 ml-1">
                      {ses.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Tutor Audit Drawer */}
      <TutorAuditDrawer
        isOpen={isAuditOpen}
        onClose={closeAudit}
        tutor={auditTutor}
        onOpenActionModal={handleOpenActionModal}
      />

      {/* Action Confirmation Modal */}
      {actionModalData && (
        <TutorActionModal
          isOpen={isActionOpen}
          onClose={closeAction}
          actionType={actionModalData.actionType}
          tutor={actionModalData.tutor}
          onConfirm={handleConfirmAction}
        />
      )}

      {/* Generator Rundown Modal from Dashboard */}
      <CreateScheduleRundownModal
        isOpen={isRundownModalOpen}
        onClose={() => setIsRundownModalOpen(false)}
        onSaveRundown={handleSaveRundownFromDashboard}
      />

      <Footer />
    </div>
  );
}
