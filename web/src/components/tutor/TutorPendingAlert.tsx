import React from'react';
import { Hourglass, AlertCircle, Phone } from'lucide-react';
import { BRAND_INFO } from'../../data/mockData';

export interface TutorPendingAlertProps {
 readonly className?: string;
}

export function TutorPendingAlert({ className ='' }: TutorPendingAlertProps) {
 return (
 <div
 className={`bg-white rounded-2xl p-6 border-l-4 border-l-status-warning border border-border-whisper shadow-sm relative overflow-hidden ${className}`}
 >
 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
 <Hourglass className="w-28 h-28 text-status-warning" />
 </div>

 <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
 <div className="w-10 h-10 rounded-xl bg-amber-50 text-status-warning flex items-center justify-center shrink-0">
 <AlertCircle className="w-6 h-6" />
 </div>

 <div className="flex-1">
 <h2 className="font-headline text-lg md:text-xl font-bold text-primary mb-1.5">
 Akun Anda Sedang Dalam Proses Verifikasi Admin
 </h2>
 <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
 Terima kasih telah mendaftar. Tim kami sedang melakukan review berkas dan akan segera
 menghubungi Anda via WhatsApp untuk jadwal wawancara tatap muka / offline. Proses kurasi
 ini biasanya memakan waktu 24-48 jam kerja.
 </p>

 <div className="mt-4 flex flex-wrap items-center gap-3">
 <a
 href={`https://wa.me/${BRAND_INFO.contact.whatsappRaw}?text=Halo%20Admin%20Home%20Private%20Nusantara,%20saya%20ingin%20menanyakan%20status%20verifikasi%20tutor%20saya.`}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors"
 >
 <Phone className="w-3.5 h-3.5" />
 <span>Hubungi Admin Koordinator (WhatsApp)</span>
 </a>
 <span className="text-xs text-text-muted">ID Pendaftaran: #TUTOR-2026-088</span>
 </div>
 </div>
 </div>
 </div>
 );
}
