'use client';

import React, { useState, useEffect } from 'react';
import { AdminTopNavBar } from '../../../src/components/admin/AdminTopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { TutorDirectoryTable } from '../../../src/components/admin/TutorDirectoryTable';
import { TutorAuditDrawer } from '../../../src/components/admin/TutorAuditDrawer';
import { TutorActionModal, ActionType } from '../../../src/components/admin/TutorActionModal';
import { useDrawer } from '../../../src/hooks/useDrawer';
import { useModal } from '../../../src/hooks/useModal';
import { Tutor, TutorStatus } from '../../../src/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export interface AdminTutorsPageProps {
  readonly initialFilter?: string;
}

export default function AdminTutorsPage({ initialFilter = 'all' }: AdminTutorsPageProps) {
  const [tutors, setTutors] = useState<readonly Tutor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/admin/tutors')
      .then((res) => res.json())
      .then((data) => {
        if (data.tutors && data.tutors.length > 0) {
            const dbTutors: Tutor[] = data.tutors.map((t: any) => ({
              id: t.id,
              name: t.name || 'Pengajar',
              phone: t.phone || '-',
              title: t.major || t.title || 'S1',
              portfolioUrl: t.portfolioUrl,
              avatar: t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
              university: t.university || '-',
              subjects: Array.isArray(t.subjects) && t.subjects.length > 0 ? t.subjects : ['Matematika SD'],
              isVerified: t.status === 'verified' || t.status === 'active',
              status: t.status || 'pending',
              availability_slots: t.availability_slots || [],
            }));
          setTutors(dbTutors);
        }
      })
      .catch((err) => console.error('Failed to fetch tutors list:', err))
      .finally(() => setIsLoading(false));
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

  const handleTutorUpdated = (updatedTutor: Tutor) => {
    setTutors((prev) =>
      prev.map((t) => (t.id === updatedTutor.id ? updatedTutor : t))
    );
  };

  const handleTutorDeleted = (tutorId: string) => {
    setTutors((prev) => prev.filter((t) => t.id !== tutorId));
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
      console.error('Error updating tutor status in database:', err);
    }

    setTutors((prev) =>
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
      {/* Top Header */}
      <AdminTopNavBar activeRoute="/admin/tutors" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
        <div className="pb-2 border-b border-border-whisper">
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

        {/* Directory Table */}
        <TutorDirectoryTable
          tutors={tutors}
          isLoading={isLoading}
          onAuditTutor={handleAuditTutor}
          onTutorUpdated={handleTutorUpdated}
          onTutorDeleted={handleTutorDeleted}
        />
      </main>

      {/* Audit Drawer */}
      <TutorAuditDrawer
        isOpen={isAuditOpen}
        onClose={closeAudit}
        tutor={auditTutor}
        onOpenActionModal={handleOpenActionModal}
        onTutorUpdated={handleTutorUpdated}
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
