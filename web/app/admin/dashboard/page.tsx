'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { AdminKPICards } from '../../../src/components/admin/AdminKPICards';
import { UrgentTutorVerificationQueueTable } from '../../../src/components/admin/UrgentTutorVerificationQueueTable';
import { TutorAuditDrawer } from '../../../src/components/admin/TutorAuditDrawer';
import { TutorActionModal, ActionType } from '../../../src/components/admin/TutorActionModal';
import { useDrawer } from '../../../src/hooks/useDrawer';
import { useModal } from '../../../src/hooks/useModal';
import { ADMIN_STATS, MOCK_TUTORS, MOCK_SESSIONS } from '../../../src/data/mockData';
import { Tutor, TutorStatus } from '../../../src/types';
import { Calendar, Users, GraduationCap, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

export interface AdminDashboardPageProps {
  readonly initialRole?: string;
}

export default function AdminDashboardPage({ initialRole = 'admin' }: AdminDashboardPageProps) {
  const [tutorsList, setTutorsList] = useState<readonly Tutor[]>([]);
  const [isLoadingTutors, setIsLoadingTutors] = useState<boolean>(true);
  const [stats, setStats] = useState(ADMIN_STATS);
  const pendingTutors = tutorsList.filter((t) => t.status === 'pending');

  useEffect(() => {
    // Fetch real stats from database
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) {
          setStats((prev) => ({
            ...prev,
            activeTutors: data.stats.activeTutors || prev.activeTutors,
            pendingTutors: data.stats.pendingTutors || prev.pendingTutors,
            registeredStudents: {
              ...prev.registeredStudents,
              total: data.stats.registeredStudents?.total || prev.registeredStudents.total,
              sd: data.stats.registeredStudents?.sd || prev.registeredStudents.sd,
              smp: data.stats.registeredStudents?.smp || prev.registeredStudents.smp,
            },
            totalBookings: data.stats.totalBookings || prev.totalBookings,
          }));
        }
      })
      .catch((err) => console.error('Failed to fetch admin stats:', err));

    // Fetch real tutors from database
    fetch('/api/admin/tutors')
      .then((res) => res.json())
      .then((data) => {
        if (data.tutors && data.tutors.length > 0) {
          const dbTutors: Tutor[] = data.tutors.map((t: any) => ({
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
          setTutorsList(dbTutors);
        }
      })
      .catch((err) => console.error('Failed to fetch admin tutors:', err))
      .finally(() => setIsLoadingTutors(false));
  }, []);

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
    } catch (err) {
      console.error('Error updating verification status in database:', err);
    }

    setTutorsList((prev) =>
      prev.map((t) => {
        if (t.id === tutorId) {
          return {
            ...t,
            status: targetStatus,
            isVerified: targetStatus === 'verified' || targetStatus === 'active',
          };
        }
        return t;
      })
    );
  };

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col">
 {/* Top Navigation */}
 <TopNavBar
 activeRoute="/admin/dashboard"
 role="admin"
 userName="Administrator Pusat"
 userBadge="Admin Master"
 />

 <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
 {/* Welcome Section */}
 <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-border-whisper">
 <div>
 <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 Pusat Kendali Operasional (Admin Hub)
 </h1>
 <p className="text-sm text-text-muted mt-1">
 Pantau KPI pengajar, direktori siswa se-Indonesia, dan antrean verifikasi berkas hari ini.
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
      <AdminKPICards stats={stats} />

  {/* 2. Urgent Verification Queue Table */}
  <section>
  <UrgentTutorVerificationQueueTable
  pendingTutors={pendingTutors}
  isLoading={isLoadingTutors}
  onAuditTutor={handleAuditTutor}
  />
  </section>

 {/* 3. Real-Time Sessions Monitoring Feed */}
 <section className="bg-white border border-border-whisper rounded-2xl p-6 shadow-sm space-y-4">
 <div className="flex justify-between items-center pb-3 border-b border-border-whisper">
 <h3 className="font-headline text-base font-bold text-primary flex items-center gap-2">
 <Clock className="w-4 h-4 text-primary-container" />
 <span>Monitoring Sesi Belajar Hari Ini</span>
 </h3>
 <Link
 href="/admin/bookings"
 className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
 >
          <span>Kalender Sesi Bimbingan</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {MOCK_SESSIONS.slice(0, 3).map((ses) => (
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
 Aktif
 </span>
 </div>
 <h4 className="font-headline text-sm font-bold text-primary">
 {ses.studentName} ({ses.level} {ses.grade})
 </h4>
 <p className="text-xs text-text-muted">{ses.subject}</p>
 </div>

 <div className="text-[11px] text-text-muted pt-2 border-t border-border-whisper flex justify-between items-center">
 <span>Tutor: {ses.tutorName}</span>
 <span className="font-mono font-semibold text-text-primary">
 {ses.time}
 </span>
 </div>
 </div>
 ))}
 </div>
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

 <Footer />
 </div>
 );
}
