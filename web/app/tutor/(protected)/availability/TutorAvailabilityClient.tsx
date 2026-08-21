'use client';

import React, { useState } from 'react';
import { TutorAvailabilityMatrix } from '@/src/components/tutor/TutorAvailabilityMatrix';
import { useAvailability } from '@/src/hooks/useAvailability';
import { Info, CheckCircle2, Loader2, ChevronLeft } from 'lucide-react';
import { Button } from '@/src/components/shared/Button';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export interface TutorAvailabilityClientProps {
  readonly initialSubjects: string[];
  readonly initialTimeSlots: string[];
}

export function TutorAvailabilityClient({
  initialSubjects,
  initialTimeSlots,
}: TutorAvailabilityClientProps) {
  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  
  const backUrl = from === 'schedule' ? '/tutor/schedule' : '/tutor/dashboard';
  const backText = from === 'schedule' ? 'Kembali ke Jadwal' : 'Kembali ke Dashboard';

  const {
    activeSubjects,
    toggleSubject,
    activeTimeSlots,
    toggleTimeSlot,
  } = useAvailability({
    initialSubjects,
    initialTimeSlots,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      
      const response = await fetch('/api/tutor/availability', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects: activeSubjects,
          availabilitySlots: activeTimeSlots,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal menyimpan pengaturan');
      }

      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setIsSaving(false);
    }
  };

  // Hitung jumlah hari aktif dari time slots yang dipilih ("Senin:08:00 - 09:30" => Set ["Senin"])
  const activeDaysCount = Array.from(new Set(activeTimeSlots.map(s => s.split(':')[0]))).length;

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col pb-24">
      {/* Top Header */}
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        <div>
          <Link 
            href={backUrl} 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary transition-colors mb-3"
          >
            <ChevronLeft className="w-4 h-4" />
            {backText}
          </Link>
          <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
            Konfigurasi Mata Pelajaran & Ketersediaan Mengajar
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Atur mata pelajaran yang Anda ampu dan buka slot jam rutin agar siswa dapat memesan sesi belajar.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Unified Matrix for Subjects & Time Slots */}
        <TutorAvailabilityMatrix
          activeSubjects={activeSubjects}
          onToggleSubject={toggleSubject}
          activeTimeSlots={activeTimeSlots}
          onToggleTimeSlot={toggleTimeSlot}
        />
      </main>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-border-whisper shadow-[0_-4px_12px_rgba(0,0,0,0.06)] z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-text-muted flex items-center gap-2">
            <Info className="w-4 h-4 text-primary-container shrink-0" />
            <span>
              <strong>{activeSubjects.length} Mata Pelajaran</strong> •{' '}
              <strong>{activeDaysCount} Hari Aktif</strong> •{' '}
              <strong>{activeTimeSlots.length} Slot Jam</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isSaved && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pengaturan Berhasil Disimpan!</span>
              </span>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto font-bold"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                'Simpan Pengaturan Ketersediaan'
              )}
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}
