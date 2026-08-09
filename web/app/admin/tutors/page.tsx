'use client';

import React, { useState, useEffect } from 'react';
import { TopNavBar } from '../../../src/components/shared/TopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { TutorDirectoryTable } from '../../../src/components/admin/TutorDirectoryTable';
import { TutorAuditDrawer } from '../../../src/components/admin/TutorAuditDrawer';
import { TutorActionModal } from '../../../src/components/admin/TutorActionModal';
import { useDrawer } from '../../../src/hooks/useDrawer';
import { useModal } from '../../../src/hooks/useModal';
import { MOCK_TUTORS } from '../../../src/data/mockData';
import { Tutor } from '../../../src/types';
import Link from 'next/link';
import { ShieldCheck, Plus, ArrowLeft } from 'lucide-react';

export interface AdminTutorsPageProps {
  readonly initialFilter?: string;
}

export default function AdminTutorsPage({ initialFilter = 'all' }: AdminTutorsPageProps) {
  const [tutors, setTutors] = useState<readonly Tutor[]>(MOCK_TUTORS);

  useEffect(() => {
    fetch('/api/admin/tutors')
      .then((res) => res.json())
      .then((data) => {
        if (data.tutors && data.tutors.length > 0) {
          const dbTutors: Tutor[] = data.tutors.map((t: any) => ({
            id: t.id,
            name: t.name || 'Pengajar',
            degree: t.major || t.degree || 'S1',
            university: t.university || '-',
            gpa: 3.8,
            subjects: Array.isArray(t.subjects) && t.subjects.length > 0 ? t.subjects : ['Matematika SD'],
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
          setTutors(dbTutors);
        }
      })
      .catch((err) => console.error('Failed to fetch tutors list:', err));
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
  } = useModal<{ actionType: 'approve' | 'reject' | 'freeze'; tutor: Tutor }>();

  const handleAuditTutor = (tutor: Tutor) => {
    openAudit(tutor);
  };

  const handleOpenActionModal = (actionType: 'approve' | 'reject' | 'freeze', tutor: Tutor) => {
    openAction({ actionType, tutor });
  };

  const handleConfirmAction = async (
    tutorId: string,
    actionType: 'approve' | 'reject' | 'freeze',
    notes: string
  ) => {
    const targetStatus = actionType === 'approve' ? 'verified' : actionType === 'reject' ? 'rejected' : 'suspended';

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
      console.error('Error updating tutor status in database:', err);
    }

    setTutors((prev) =>
      prev.map((t) => {
        if (t.id === tutorId) {
          return {
            ...t,
            status: actionType === 'approve' ? 'verified' : actionType === 'reject' ? 'pending' : 'suspended',
            isVerified: actionType === 'approve',
          };
        }
        return t;
      })
    );
  };

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col">
 {/* Top Header */}
 <TopNavBar
 activeRoute="/admin/tutors"
 role="admin"
 userName="Administrator Pusat"
 userBadge="Admin Master"
 />

 <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-whisper">
 <div>
 <div className="flex items-center gap-2 text-xs font-semibold text-text-muted mb-1">
 <Link href="/admin/dashboard" className="hover:text-primary flex items-center gap-1">
 <ArrowLeft className="w-3.5 h-3.5" />
 <span>Kembali ke Dashboard</span>
 </Link>
 </div>
 <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 Manajemen & Kurasi Pengajar
 </h1>
 <p className="text-sm text-text-muted mt-0.5">
 Sistem verifikasi dokumen, evaluasi microteaching tatap muka, dan kurasi pengajar se-Indonesia.
 </p>
 </div>

 <div className="flex items-center gap-3">
 <Link
 href="/auth/register-tutor"
 className="bg-primary-container hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
 >
 <Plus className="w-4 h-4" />
 <span>Tambah Tutor Manual</span>
 </Link>
 </div>
 </div>

 {/* Directory Table */}
 <TutorDirectoryTable tutors={tutors} onAuditTutor={handleAuditTutor} />
 </main>

 {/* Audit Drawer */}
 <TutorAuditDrawer
 isOpen={isAuditOpen}
 onClose={closeAudit}
 tutor={auditTutor}
 onOpenActionModal={handleOpenActionModal}
 />

 {/* Action Modal */}
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
