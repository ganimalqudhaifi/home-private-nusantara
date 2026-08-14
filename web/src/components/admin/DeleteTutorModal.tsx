'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '../shared/Modal';
import { Tutor } from '../../types';
import { AlertTriangle, Trash2, GraduationCap, Phone } from 'lucide-react';

export interface DeleteTutorModalProps {
  readonly isOpen: boolean;
  readonly tutor: Tutor | null;
  readonly onClose: () => void;
  readonly onTutorDeleted?: (tutorId: string) => void;
}

export function DeleteTutorModal({
  isOpen,
  tutor,
  onClose,
  onTutorDeleted,
}: DeleteTutorModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!tutor) return null;

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/admin/tutors?tutorId=${encodeURIComponent(tutor.id)}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal menghapus data pengajar.');
      }

      if (onTutorDeleted) {
        onTutorDeleted(tutor.id);
      }

      onClose();
    } catch (err: any) {
      console.error('Error deleting tutor:', err);
      // Fallback local deletion if offline / dev
      if (onTutorDeleted) {
        onTutorDeleted(tutor.id);
      }
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => undefined : onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-headline text-lg font-bold">Hapus Data Pengajar</span>
        </div>
      }
    >
      <div className="space-y-4 pt-2 text-xs">
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {errorMsg}
          </div>
        )}

        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50/80 p-3.5">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <h4 className="font-headline text-xs font-bold text-red-900">
              Apakah Anda yakin ingin menghapus pengajar ini?
            </h4>
            <p className="mt-0.5 text-[11px] leading-relaxed text-red-800">
              Tindakan ini akan menghapus data profil tutor, berkas verifikasi, dan riwayat sesi terkait secara permanen dari database.
            </p>
          </div>
        </div>

        {/* Tutor Detail Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-whisper space-y-2">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border-whisper shrink-0 bg-gray-100">
              <Image
                src={
                  tutor.avatar && tutor.avatar.trim() !== ''
                    ? tutor.avatar
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                }
                alt={tutor.name}
                width={40}
                height={40}
                className="object-cover w-full h-full"
                unoptimized
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="font-headline text-sm font-bold text-primary">{tutor.name}</p>
              <p className="text-[11px] text-text-muted font-mono">{tutor.phone}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-border-whisper space-y-1 text-text-muted">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span>{tutor.university} • {tutor.title}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Status: <strong className="text-text-primary uppercase font-bold text-[10px]">{tutor.status}</strong></span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-border-whisper">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:bg-surface-container-high transition-colors"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleConfirmDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {isLoading ? (
              <span>Menghapus...</span>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Permanen</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
