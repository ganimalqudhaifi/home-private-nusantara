'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, School, Phone, Link as LinkIcon, CheckCircle2, Check, Loader2 } from 'lucide-react';
import { TUTOR_SUBJECT_NAMES } from '../../data/tutorSubjectsData';

export function TutorOnboardingForm() {
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
      const draftData = {
        name,
        university,
        major,
        phone,
        selectedSubjects,
        portfolioUrl,
      };

      const res = await fetch('/api/tutor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draftData),
      });
      
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/tutor/pending');
        }, 1200);
      } else {
        alert(data.error || 'Terjadi kesalahan saat mendaftar.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Gagal terhubung ke server.');
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
          Terima kasih <strong>{name}</strong>. Berkas Anda sedang dalam antrean review oleh admin pusat. Mengalihkan ke halaman status...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Pilihan Bidang & Mata Pelajaran yang Diampu
        </label>
        <div className="flex flex-wrap gap-2">
          {TUTOR_SUBJECT_NAMES.map((subject) => {
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
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Menyimpan...</span>
          </>
        ) : (
          <span>Kirim Data Pendaftaran</span>
        )}
      </button>
    </form>
  );
}
