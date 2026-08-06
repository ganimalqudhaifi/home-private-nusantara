import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { TopNavBar } from '../../../../src/components/shared/TopNavBar';
import { Footer } from '../../../../src/components/shared/Footer';
import { MOCK_TUTORS } from '../../../../src/data/mockData';
import { ArrowLeft, ShieldCheck, School, Phone, Calendar, Clock, Star, FileText, CheckCircle2 } from 'lucide-react';

export interface AdminTutorDetailPageProps {
  readonly params: Promise<{ id: string }>;
}

export default async function AdminTutorDetailPage({ params }: AdminTutorDetailPageProps) {
  const { id } = await params;
  const tutor = MOCK_TUTORS.find((t) => t.id === id) || MOCK_TUTORS[0];

  return (
    <div className="bg-surface dark:bg-slate-950 text-text-primary dark:text-gray-100 min-h-screen flex flex-col">
      <TopNavBar
        activeRoute="/admin/tutors"
        role="admin"
        userName="Administrator Pusat"
        userBadge="Admin Master"
      />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-muted">
          <Link href="/admin/tutors" className="hover:text-primary dark:hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Daftar Tutor</span>
          </Link>
        </div>

        {/* Profile Card Header */}
        <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shrink-0 bg-gray-100">
              <Image
                src={tutor.avatar}
                alt={tutor.name}
                width={80}
                height={80}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline text-xl md:text-2xl font-bold text-primary dark:text-white">
                  {tutor.name}
                </h1>
                {tutor.isVerified && <ShieldCheck className="w-5 h-5 text-emerald-600" />}
              </div>
              <p className="text-sm text-text-muted">{tutor.title}</p>
              <p className="text-xs text-primary dark:text-blue-300 font-semibold mt-1">
                {tutor.university}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={`https://wa.me/${tutor.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bio & Subjects */}
          <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-6 shadow-sm space-y-4">
            <h3 className="font-headline text-base font-bold text-primary dark:text-white">
              Profil & Kompetensi Mengajar
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">{tutor.bio}</p>

            <div className="pt-2">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                Mata Pelajaran & Jenjang
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {tutor.subjects.map((sub) => (
                  <span
                    key={sub}
                    className="px-2.5 py-1 rounded-lg bg-surface-container-low dark:bg-surface-container-high text-xs font-semibold text-primary dark:text-white"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Audit Details */}
          <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-6 shadow-sm space-y-4">
            <h3 className="font-headline text-base font-bold text-primary dark:text-white">
              Status Kurasi & Dokumen
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-low dark:bg-surface-container-high">
                <span className="font-medium">Curriculum Vitae</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Terverifikasi</span>
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-low dark:bg-surface-container-high">
                <span className="font-medium">Ijazah & Sertifikat Pendidik</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Terverifikasi</span>
                </span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-low dark:bg-surface-container-high">
                <span className="font-medium">Wawancara & Microteaching Offline</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Lolos Seleksi</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
