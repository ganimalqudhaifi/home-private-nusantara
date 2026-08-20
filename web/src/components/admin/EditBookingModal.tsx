'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Modal } from '../shared/Modal';
import { StudentSession } from '../../types';
import {
  Calendar,
  Clock,
  BookOpen,
  User,
  AlertCircle,
  CheckCircle2,
  FileText,
} from 'lucide-react';


const fetcher = (url: string) => fetch(url).then(res => res.json());


const TIME_OPTIONS = [
  '08:00 - 09:30',
  '09:30 - 11:00',
  '11:00 - 12:30',
  '13:00 - 14:30',
  '14:30 - 16:00',
  '16:00 - 17:30',
  '18:30 - 20:00',
  '20:00 - 21:30',
];

export interface EditBookingModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly booking: StudentSession | null;
  readonly onSaveSuccess: () => void;
}

export function EditBookingModal({
  isOpen,
  onClose,
  booking,
  onSaveSuccess,
}: EditBookingModalProps) {
  const { data: subjectsData } = useSWR('/api/subjects', fetcher);
  const dynamicSubjects = subjectsData?.subjects || [];
  const TUTOR_SUBJECT_NAMES = dynamicSubjects.map((s: any) => s.name);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [tutorId, setTutorId] = useState('');
  const [status, setStatus] = useState<string>('scheduled');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { data: tutorsData, isLoading: isLoadingTutors } = useSWR(isOpen ? '/api/admin/tutors' : null);

  const verifiedTutors = React.useMemo(() => {
    if (tutorsData?.tutors && Array.isArray(tutorsData.tutors)) {
      return tutorsData.tutors.filter((t: any) => t.status === 'verified' || t.status === 'active');
    }
    return [];
  }, [tutorsData]);

  useEffect(() => {
    if (isOpen && booking) {
      setDate(booking.date || '');
      setTime(booking.time || '');
      setSubject(booking.subject || '');
      setTutorId(booking.tutorId || '');
      setStatus(booking.status || 'scheduled');
      setNotes(booking.notes || '');
      setErrorMsg(null);
    }
  }, [isOpen, booking]);

  if (!booking) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: booking.id,
          tutorId,
          date,
          time,
          subject,
          status,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memperbarui jadwal.');
      }

      onSaveSuccess();
      onClose();
    } catch (err: any) {
      console.error('Error updating booking:', err);
      setErrorMsg(err.message || 'Gagal menghubungi server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Jadwal Sesi" maxWidth="lg">
      <form onSubmit={handleSave} className="space-y-4 pt-2 text-xs">
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 animate-fade-in">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <div>
              <h4 className="font-bold text-sm">Gagal Menyimpan</h4>
              <p className="text-xs mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Read-Only Info */}
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-border-whisper space-y-1">
          <p className="font-bold text-primary text-sm">{booking.studentName}</p>
          <p className="text-text-muted">Kode Sesi: <span className="font-mono text-primary font-bold">{booking.code}</span></p>
          <p className="text-text-muted">Lokasi: {booking.address}</p>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">Tanggal</label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-white text-xs font-semibold text-primary outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">Jam</label>
            <div className="relative">
              <Clock className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-white text-xs font-semibold text-primary outline-none focus:border-primary transition-colors appearance-none"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">Mata Pelajaran</label>
            <div className="relative">
              <BookOpen className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-white text-xs font-semibold text-primary outline-none focus:border-primary transition-colors appearance-none"
              >
                {TUTOR_SUBJECT_NAMES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">Pengajar</label>
            <div className="relative">
              <User className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                required
                value={tutorId}
                onChange={(e) => setTutorId(e.target.value)}
                disabled={isLoadingTutors}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-white text-xs font-semibold text-primary outline-none focus:border-primary transition-colors appearance-none disabled:opacity-50"
              >
                {isLoadingTutors ? (
                  <option value="">Memuat...</option>
                ) : (
                  verifiedTutors.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))
                )}
              </select>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Status Sesi</label>
          <div className="relative">
            <CheckCircle2 className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              required
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-white text-xs font-semibold text-primary outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="scheduled">Dijadwalkan (Scheduled)</option>
              <option value="in_progress">Sedang Berlangsung (In Progress)</option>
              <option value="completed">Selesai (Completed)</option>
              <option value="cancelled">Dibatalkan (Cancelled)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Catatan Tambahan (Opsional)</label>
          <div className="relative">
            <FileText className="w-4 h-4 text-text-muted absolute left-3 top-3 pointer-events-none" />
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan khusus untuk sesi ini..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-white text-xs text-primary outline-none focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2.5 pt-4 border-t border-border-whisper">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:bg-surface-container-high transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 bg-primary-container hover:bg-primary-hover text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
