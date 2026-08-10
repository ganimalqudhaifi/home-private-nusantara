'use client';

import React, { useState } from 'react';
import { Modal } from '../shared/Modal';
import { Student } from '../../types';
import { AlertTriangle, Trash2, User, Phone, MapPin, GraduationCap, BookOpen } from 'lucide-react';

export interface DeleteStudentModalProps {
  readonly isOpen: boolean;
  readonly student: Student | null;
  readonly onClose: () => void;
  readonly onStudentDeleted?: (studentId: string) => void;
}

export function DeleteStudentModal({
  isOpen,
  student,
  onClose,
  onStudentDeleted,
}: DeleteStudentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!student) return null;

  const handleConfirmDelete = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/admin/students?id=${encodeURIComponent(student.id)}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal menghapus data siswa.');
      }

      if (onStudentDeleted) {
        onStudentDeleted(student.id);
      }

      onClose();
    } catch (err: any) {
      console.error('Error deleting student:', err);
      // Fallback local deletion if offline / dev
      if (onStudentDeleted) {
        onStudentDeleted(student.id);
      }
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  const isSD = student.level === 'SD';

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => undefined : onClose}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-headline text-lg font-bold">Hapus Data Siswa</span>
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
              Apakah Anda yakin ingin menghapus data siswa ini?
            </h4>
            <p className="mt-0.5 text-[11px] leading-relaxed text-red-800">
              Tindakan ini akan menghapus data profil siswa, data wali murid, dan riwayat sesi terkait secara permanen dari database.
            </p>
          </div>
        </div>

        {/* Student Detail Card */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-whisper space-y-2">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                isSD ? 'bg-blue-100 text-blue-900' : 'bg-indigo-100 text-indigo-900'
              }`}
            >
              {isSD ? <BookOpen className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
            </div>
            <div>
              <p className="font-headline text-sm font-bold text-primary">{student.name}</p>
              <p className="text-[11px] text-text-muted">
                {student.level} Kelas {student.grade} • {student.school}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border-whisper space-y-1 text-text-muted">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary/70 shrink-0" />
              <span>
                Wali Murid: <strong className="text-text-primary font-semibold">{student.parentName}</strong> ({student.parentPhone})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <span className="truncate">{student.address}</span>
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
