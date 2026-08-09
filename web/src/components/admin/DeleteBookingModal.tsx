'use client';

import React, { useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import { StudentSession } from '../../types';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';

interface DeleteBookingModalProps {
  readonly isOpen: boolean;
  readonly booking: StudentSession | null;
  readonly onClose: () => void;
  readonly onConfirm: (id: string) => Promise<void>;
}

export function DeleteBookingModal({ isOpen, booking, onClose, onConfirm }: DeleteBookingModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (!booking) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm(booking.id);
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => undefined : onClose} maxWidth="md" title="Hapus Sesi">
      <div className="space-y-5 pt-2">
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-600" />
          <div>
            <h4 className="font-headline text-sm font-bold text-red-900">Hapus sesi secara permanen?</h4>
            <p className="mt-1 text-xs leading-relaxed text-red-800">
              Data sesi ini akan dihapus dari database dan tidak dapat dipulihkan.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-border-whisper bg-surface-container-low p-4 text-xs">
          <p className="font-mono font-bold text-primary">#{booking.code}</p>
          <p className="mt-2 font-bold text-text-primary">{booking.studentName}</p>
          <p className="mt-1 text-text-muted">{booking.subject} • {booking.tutorName}</p>
          <p className="mt-1 text-text-muted">{booking.day}, {booking.date} • {booking.time}</p>
        </div>

        <div className="flex justify-end gap-2.5 border-t border-border-whisper pt-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-xs font-semibold text-text-muted hover:text-text-primary disabled:opacity-50"
          >
            Batal
          </button>
          <Button type="button" variant="cta" size="md" isLoading={isLoading} onClick={handleConfirm} className="bg-red-600 hover:bg-red-700">
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Hapus Permanen
          </Button>
        </div>
      </div>
    </Modal>
  );
}
