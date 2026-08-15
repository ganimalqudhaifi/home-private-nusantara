'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TutorTopNavBar } from '@/src/components/tutor/TutorTopNavBar';
import { Footer } from '@/src/components/shared/Footer';
import { TutorPendingAlert } from '@/src/components/tutor/TutorPendingAlert';
import { TutorPendingSync } from '@/src/components/tutor/TutorPendingSync';
import { TutorVerificationSteps } from '@/src/components/tutor/TutorVerificationSteps';
import { Lock, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '@/src/data/mockData';
import { useUser } from '@/src/hooks/useUser';

export interface TutorPendingPageProps {
  readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function TutorPendingPage({ searchParams }: TutorPendingPageProps) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const userName = user?.full_name || user?.name || 'Calon Pengajar';
  const userAvatar = user?.avatar_url || user?.image || undefined;
  const userId = user?.id || undefined;
  const userRole = (user?.role as 'guest' | 'student' | 'tutor' | 'admin') || 'tutor';

  useEffect(() => {
    if (!isLoading && user?.status === 'verified') {
      router.push('/tutor/dashboard');
    }
  }, [user, isLoading, router]);

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
      <TutorTopNavBar activeRoute="/tutor/pending" />

 <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Alerts & Steps */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <TutorPendingSync />
          <TutorPendingAlert userId={userId} />
          <TutorVerificationSteps currentStep={2} />
        </div>

 {/* Right Column: Locked Settings Preview & Quick Help */}
 <div className="lg:col-span-4 flex flex-col gap-6">
 {/* Locked Settings Notice */}
 <div className="bg-white rounded-2xl p-6 border border-border-whisper shadow-sm relative overflow-hidden">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center">
 <Lock className="w-5 h-5" />
 </div>
 <div>
 <h4 className="font-headline text-base font-bold text-primary">
 Pengaturan Jadwal Terkunci
 </h4>
 <p className="text-xs text-text-muted">Fitur aktif setelah verifikasi</p>
 </div>
 </div>

 <p className="text-xs text-text-muted leading-relaxed mb-6">
 Setelah akun disetujui dan diverifikasi oleh admin, Anda dapat mengatur matriks jenjang
 mengajar (SD/SMP), membuka slot hari & jam mengajar, serta menerima permintaan bimbingan
 dari orang tua siswa.
 </p>

 <div className="pt-4 border-t border-border-whisper">
 <Link
 href="/tutor/dashboard"
 className="w-full bg-surface-container-low hover:bg-primary-container hover:text-white text-primary text-xs font-semibold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
 >
 <span>Preview Tampilan Dashboard</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </div>

 {/* Help Card */}
 <div className="bg-surface-container-low rounded-2xl p-6 border border-border-whisper">
 <h4 className="font-headline text-sm font-bold text-primary mb-2">
 Butuh Bantuan Pendaftaran?
 </h4>
 <p className="text-xs text-text-muted leading-relaxed mb-4">
 Jika ada kendala unggah dokumen atau perubahan nomor WhatsApp, hubungi tim helpdesk kami.
 </p>
 <a
 href={`https://wa.me/${BRAND_INFO.contact.whatsappRaw}`}
 target="_blank"
 rel="noreferrer"
 className="text-xs font-bold text-emerald-600 hover:underline"
 >
 Chat WhatsApp Tim Helpdesk →
 </a>
 </div>
 </div>
 </div>
 </main>

 <Footer />
 </div>
 );
}
