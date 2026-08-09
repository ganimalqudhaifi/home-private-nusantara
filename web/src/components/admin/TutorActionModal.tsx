'use client';

import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Tutor } from '../../types';
import { CheckCircle2, XCircle, AlertTriangle, Coffee, UserX } from 'lucide-react';

export type ActionType = 'approve' | 'reject' | 'freeze' | 'leave' | 'deactivate';

export interface TutorActionModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly actionType: ActionType;
  readonly tutor: Tutor | null;
  readonly onConfirm: (tutorId: string, actionType: ActionType, notes: string) => void;
}

export function TutorActionModal({
  isOpen,
  onClose,
  actionType,
  tutor,
  onConfirm,
}: TutorActionModalProps) {
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!tutor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onConfirm(tutor.id, actionType, notes);
      onClose();
    }, 600);
  };

  const getTitle = () => {
    switch (actionType) {
      case 'approve':
        return 'Verifikasi & Aktifkan Profil Pengajar';
      case 'reject':
        return 'Tolak Pendaftaran Pengajar';
      case 'freeze':
        return 'Bekukan Akun Pengajar (Suspend)';
      case 'leave':
        return 'Setujui Cuti Pengajar';
      case 'deactivate':
        return 'Nonaktifkan Akun Pengajar';
    }
  };

  const getIcon = () => {
    switch (actionType) {
      case 'approve':
        return <CheckCircle2 className="w-10 h-10 text-emerald-600" />;
      case 'reject':
        return <XCircle className="w-10 h-10 text-red-600" />;
      case 'freeze':
        return <AlertTriangle className="w-10 h-10 text-status-warning" />;
      case 'leave':
        return <Coffee className="w-10 h-10 text-amber-600" />;
      case 'deactivate':
        return <UserX className="w-10 h-10 text-gray-500" />;
    }
  };

  const getPlaceholder = () => {
    switch (actionType) {
      case 'approve':
        return 'Hasil wawancara offline dan tes microteaching memuaskan. Ijazah terverifikasi resmi.';
      case 'leave':
        return 'Tutor mengambil izin cuti sementara (misal: Ujian Semester s.d. 30 September).';
      case 'deactivate':
        return 'Alasan pengunduran diri atau penonaktifan profil.';
      case 'freeze':
        return 'Alasan pembekuan sementara akun tutor (misal: evaluasi kedisiplinan/komplain).';
      case 'reject':
      default:
        return 'Alasan penolakan atau catatan berkas yang belum lengkap.';
    }
  };

  const getButtonText = () => {
    switch (actionType) {
      case 'approve':
        return 'Aktivasi Profil';
      case 'reject':
        return 'Penolakan Berkas';
      case 'freeze':
        return 'Pembekuan Akun';
      case 'leave':
        return 'Proses Cuti';
      case 'deactivate':
        return 'Nonaktifkan Akun';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title={getTitle()}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-low border border-border-whisper">
          <div className="shrink-0">{getIcon()}</div>
          <div>
            <h4 className="font-headline text-sm font-bold text-primary">
              {tutor.name}
            </h4>
            <p className="text-xs text-text-muted">{tutor.title} • {tutor.university}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Catatan Keputusan Admin / Alasan Perubahan Status
          </label>
          <textarea
            required
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={getPlaceholder()}
            className="w-full p-3 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs focus:border-primary-container outline-none resize-none"
          />
        </div>

        <div className="pt-3 border-t border-border-whisper flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-primary"
          >
            Batal
          </button>
          <Button
            type="submit"
            variant={actionType === 'approve' ? 'primary' : 'cta'}
            size="md"
            isLoading={isLoading}
            className={actionType === 'approve' ? 'bg-[#16A34A] hover:bg-[#15803D]' : ''}
          >
            Konfirmasi {getButtonText()}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
