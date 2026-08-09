'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, School, Phone, Link as LinkIcon, CheckCircle2, Check } from 'lucide-react';
import { Button } from '../shared/Button';
import { authClient } from '@/src/lib/auth-client';

export interface TutorRegisterFormProps {
  readonly onSuccess?: () => void;
  readonly className?: string;
}

const SUBJECT_OPTIONS = [
  'Matematika SD',
  'Bahasa Inggris SD',
  'Matematika SMP',
  'Bahasa Inggris SMP',
  'Calistung',
] as const;

export function TutorRegisterForm({
  onSuccess,
  className = '',
}: TutorRegisterFormProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['Matematika SD']);
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleSubject = (key: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const draftId = crypto.randomUUID();
      const draftData = {
        draftId,
        name,
        university,
        major,
        phone,
        selectedSubjects,
        portfolioUrl,
      };

      if (typeof window !== 'undefined') {
        localStorage.setItem('tutor_registration_draft', JSON.stringify(draftData));
      }

      // Pre-register to database immediately so profile exists
      try {
        await fetch('/api/tutor/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(draftData),
        });
      } catch (apiErr) {
        console.warn('Pre-registration save notice:', apiErr);
      }

      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/tutor/pending',
      });
    } catch (err) {
      console.error('Google Auth registration error:', err);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        router.push('/tutor/pending');
      }, 1200);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-headline text-xl font-bold text-primary">
          Pendaftaran Pengajar Terkirim!
        </h3>
        <p className="text-sm text-text-muted max-w-sm mx-auto">
          Terima kasih <strong>{name}</strong>. Berkas Anda sedang dalam antrean review oleh admin
          pusat. Mengalihkan ke status verifikasi akun...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name & Degree */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Nama Lengkap & Gelar
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Sarah Amanda, S.Pd."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
            />
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Nomor WhatsApp Aktif
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812-xxxx-xxxx"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* University */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Asal Universitas / Kampus
          </label>
          <div className="relative">
            <School className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              required
              type="text"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="Contoh: UNJ / UI / UGM / ITB"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
            />
          </div>
        </div>

        {/* Major */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Jurusan & Jenjang
          </label>
          <input
            required
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="Contoh: S1 Pendidikan Matematika"
            className="w-full px-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
          />
        </div>
      </div>

      {/* Teaching Subjects */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Pilihan Bidang & Mata Pelajaran yang Diampu (Bisa pilih lebih dari satu)
        </label>
        <div className="flex flex-wrap gap-2">
          {SUBJECT_OPTIONS.map((subject) => {
            const isSelected = selectedSubjects.includes(subject);
            return (
              <button
                key={subject}
                type="button"
                onClick={() => toggleSubject(subject)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'border-primary-container bg-primary-container/10 text-primary-container shadow-xs'
                    : 'border-border-whisper bg-surface-container-lowest text-text-primary hover:border-primary-container/50'
                }`}
              >
                <span>{subject}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary-container" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Portfolio / CV Link Input Box */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Link CV / Ijazah / Google Drive / LinkedIn (Opsional)
        </label>
        <div className="relative">
          <LinkIcon className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="url"
            value={portfolioUrl}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            placeholder="https://drive.google.com/... atau linkedin.com/in/..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-text-primary text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
          />
        </div>
        <span className="text-[11px] text-text-muted">
          Pastikan akses file di Google Drive diatur ke publik agar dapat ditinjau oleh Admin.
        </span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-white text-sm font-bold transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
      >
        <svg className="w-5 h-5 bg-white p-0.5 rounded-full" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>{isLoading ? 'Menghubungkan ke Google...' : 'Daftar & Hubungkan Akun Google'}</span>
      </button>
    </form>
  );
}
