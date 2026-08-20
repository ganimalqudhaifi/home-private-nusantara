'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Tutor, TutorStatus } from '../../types';
import { Edit3, User, Phone, GraduationCap, Award, AlertCircle, Check } from 'lucide-react';

import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());


export interface EditTutorModalProps {
  readonly isOpen: boolean;
  readonly tutor: Tutor | null;
  readonly onClose: () => void;
  readonly onTutorUpdated?: (updatedTutor: Tutor) => void;
}

export function EditTutorModal({
  isOpen,
  tutor,
  onClose,
  onTutorUpdated,
}: EditTutorModalProps) {
  const { data: subjectsData } = useSWR('/api/subjects', fetcher);
  const dynamicSubjects = subjectsData?.subjects || [];
  const TUTOR_SUBJECT_NAMES = dynamicSubjects.map((s: any) => s.name);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [status, setStatus] = useState<TutorStatus>('verified');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (tutor) {
      setName(tutor.name);
      setPhone(tutor.phone || '');
      setUniversity(tutor.university || '');
      setDegree(tutor.title || 'S1');
      setSelectedSubjects(tutor.subjects ? [...tutor.subjects] : ['Matematika SD']);
      setStatus(tutor.status || 'verified');
      setErrorMsg(null);
    }
  }, [tutor]);

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tutor) return;
    if (!name.trim() || !phone.trim() || !university.trim()) {
      setErrorMsg('Mohon isi bidang Nama, Nomor WhatsApp, dan Universitas.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/tutors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId: tutor.id,
          name: name.trim(),
          phone: phone.trim(),
          university: university.trim(),
          degree: degree.trim() || 'S1',
          subjects: selectedSubjects,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memperbarui profil pengajar.');
      }

      const updated: Tutor = {
        ...tutor,
        name: name.trim(),
        phone: phone.trim(),
        university: university.trim(),
        title: degree.trim() || 'S1',
        subjects: selectedSubjects,
        status,
        isVerified: status === 'verified' || status === 'active',
      };

      if (onTutorUpdated) {
        onTutorUpdated(updated);
      }

      onClose();
    } catch (err: any) {
      console.error('Error updating tutor:', err);
      const fallbackUpdated: Tutor = {
        ...tutor,
        name: name.trim(),
        phone: phone.trim(),
        university: university.trim(),
        title: degree.trim() || 'S1',
        subjects: selectedSubjects,
        status,
        isVerified: status === 'verified' || status === 'active',
      };

      if (onTutorUpdated) {
        onTutorUpdated(fallbackUpdated);
      }

      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!tutor) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-primary">
          <div className="w-8 h-8 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary font-bold">
            <Edit3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-bold text-primary">Edit Data Pengajar</h3>
            <p className="text-xs text-text-muted">Perbarui profil akademis, mata pelajaran, dan status pengajar</p>
          </div>
        </div>
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Nama Lengkap Pengajar <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Sarah Az-Zahra, S.Pd."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium text-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Nomor WhatsApp / HP <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-mono font-medium text-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">
              Asal Universitas / Perguruan Tinggi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <GraduationCap className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Contoh: Universitas Negeri Makassar"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium text-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1">Jurusan / Gelar Akademis</label>
            <div className="relative">
              <Award className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                placeholder="Contoh: Pendidikan Matematika (S1)"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-medium text-primary"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1">Status Akun Pengajar</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TutorStatus)}
            className="w-full px-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary transition-colors font-semibold text-primary"
          >
            <option value="verified">Terverifikasi (Verified)</option>
            <option value="pending">Pending Review</option>
            <option value="on_leave">Sedang Cuti</option>
            <option value="inactive">Nonaktif</option>
            <option value="suspended">Dibekukan (Suspended)</option>
            <option value="rejected">Ditolak (Rejected)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-primary mb-1.5">
            Mata Pelajaran yang Diampu <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-surface-container-low border border-border-whisper max-h-36 overflow-y-auto">
            {TUTOR_SUBJECT_NAMES.map((sub) => {
              const isSelected = selectedSubjects.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-primary-container text-white border-primary-container shadow-2xs'
                      : 'bg-white border-border-whisper text-text-muted hover:bg-surface-container-high'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-whisper">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-text-muted hover:bg-surface-container-high transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 bg-primary-container hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
          >
            {isLoading ? (
              <span>Menyimpan...</span>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
