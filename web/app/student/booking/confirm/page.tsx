import React from 'react';
import Link from 'next/link';
import { TopNavBar } from '../../../../src/components/shared/TopNavBar';
import { Footer } from '../../../../src/components/shared/Footer';
import { CheckCircle2, Phone, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../../../../src/data/mockData';

export interface StudentBookingConfirmPageProps {
  readonly searchParams?: Promise<{ code?: string }>;
}

export default async function StudentBookingConfirmPage({
  searchParams,
}: StudentBookingConfirmPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const bookingCode = resolvedParams.code || 'HPN-0810';

  const whatsappUrl = `https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${encodeURIComponent(
    `Halo Admin Home Private Nusantara, saya ingin konfirmasi booking #${bookingCode}.`
  )}`;

  return (
    <div className="bg-surface dark:bg-slate-950 text-text-primary dark:text-gray-100 min-h-screen flex flex-col">
      <TopNavBar
        activeRoute="/student/search"
        role="student"
        userName="Ibu Ratna (Fajar - SD 5)"
        userBadge="Siswa Terdaftar"
      />

      <main className="flex-1 flex items-center justify-center py-12 px-4 md:px-8 max-w-xl mx-auto w-full">
        <div className="bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-8 shadow-sm text-center space-y-6 w-full">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h1 className="font-headline text-2xl font-bold text-primary dark:text-white">
              Pemesanan Sesi Terkonfirmasi!
            </h1>
            <p className="text-xs text-text-muted dark:text-gray-400 mt-1">
              Kode booking resmi: <strong className="font-mono text-sm text-primary-container dark:text-blue-300">#{bookingCode}</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container-high border border-border-whisper text-left text-xs space-y-2">
            <p><strong className="text-text-muted">Status:</strong> Menunggu Pelaksanaan Sesi</p>
            <p><strong className="text-text-muted">Tutor:</strong> Sarah Amanda, S.Pd.</p>
            <p><strong className="text-text-muted">Jadwal:</strong> Senin, 10 Agustus 2026 (16:00 - 18:00 WIB)</p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Hubungi Admin Koordinator via WhatsApp</span>
            </a>

            <Link
              href="/student/dashboard"
              className="w-full bg-surface-container-low hover:bg-surface-container-high text-primary dark:text-white py-2.5 px-4 rounded-xl text-xs font-semibold border border-border-whisper transition-colors flex items-center justify-center gap-2"
            >
              <span>Kembali ke Dashboard Siswa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
