'use client';

import React from'react';
import { Phone, AlertCircle, ArrowRight } from'lucide-react';
import { Tutor } from'../../types';

export interface UrgentTutorVerificationQueueTableProps {
  readonly pendingTutors: readonly Tutor[];
  readonly isLoading?: boolean;
  readonly onAuditTutor: (tutor: Tutor) => void;
  readonly className?: string;
}

export function UrgentTutorVerificationQueueTable({
  pendingTutors,
  isLoading = false,
  onAuditTutor,
  className = '',
}: UrgentTutorVerificationQueueTableProps) {
 return (
 <div
 className={`bg-white border border-border-whisper rounded-2xl p-6 shadow-sm space-y-4 ${className}`}
 >
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-whisper">
 <div className="flex items-center gap-2">
 <AlertCircle className="w-5 h-5 text-status-warning shrink-0" />
 <h3 className="font-headline text-base md:text-lg font-bold text-primary">
 Antrean Verifikasi Dokumen & Wawancara Pengajar
 </h3>
 </div>
 <span className="bg-amber-50 text-status-warning text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200 w-fit">
 {pendingTutors.length} Pendaftar Menunggu
 </span>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[600px]">
 <thead>
 <tr className="border-b border-border-whisper text-xs text-text-muted uppercase tracking-wider">
 <th className="pb-3 font-semibold">Nama Pengajar</th>
 <th className="pb-3 font-semibold">Asal Universitas</th>
 <th className="pb-3 font-semibold">Waktu Pendaftaran</th>
 <th className="pb-3 font-semibold text-center">Kontak WA</th>
 <th className="pb-3 font-semibold text-right">Tindakan</th>
 </tr>
 </thead>
  <tbody className="divide-y divide-border-whisper text-xs">
    {isLoading ? (
      [1, 2].map((idx) => (
        <tr key={idx} className="animate-pulse">
          <td className="py-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
            <div className="space-y-1 flex-1">
              <div className="h-3.5 bg-gray-200 rounded w-24" />
              <div className="h-2.5 bg-gray-100 rounded w-16" />
            </div>
          </td>
          <td className="py-4">
            <div className="h-3.5 bg-gray-200 rounded w-28" />
          </td>
          <td className="py-4">
            <div className="h-3.5 bg-gray-200 rounded w-20" />
          </td>
          <td className="py-4 text-center">
            <div className="w-8 h-8 bg-gray-200 rounded-xl mx-auto" />
          </td>
          <td className="py-4 text-right">
            <div className="h-7 bg-gray-200 rounded-xl w-28 ml-auto" />
          </td>
        </tr>
      ))
    ) : pendingTutors.length === 0 ? (
      <tr>
        <td colSpan={5} className="py-8 text-center text-text-muted font-medium">
          Tidak ada antrean pendaftar baru yang memerlukan verifikasi saat ini.
        </td>
      </tr>
    ) : (
      pendingTutors.map((tutor) => (
        <tr key={tutor.id} className="hover:bg-surface-container-low/40 transition-colors">
          <td className="py-4 font-semibold text-primary flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              {tutor.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold">{tutor.name}</p>
              <p className="text-[11px] text-text-muted font-normal">{tutor.title}</p>
              <p className="text-[10px] text-text-muted font-mono mt-0.5">
                #TUTOR-{new Date(tutor.registerDate || new Date()).getFullYear()}-{tutor.id.substring(0, 8).toUpperCase()}
              </p>
            </div>
          </td>
          <td className="py-4 text-text-primary">{tutor.university}</td>
          <td className="py-4 text-text-muted font-mono">{tutor.registerDate}</td>
          <td className="py-4 text-center">
            <a
              href={`https://wa.me/${(tutor.phone || '').replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(
                tutor.name
              )},%20kami%20dari%20Admin%20Home%20Private%20Nusantara%20terkait%20proses%20verifikasi%20berkas%20tutor.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
              title="Hubungi via WhatsApp"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </td>
          <td className="py-4 text-right">
            <button
              type="button"
              onClick={() => onAuditTutor(tutor)}
              className="bg-primary-container hover:bg-primary-hover text-white text-xs font-bold px-3.5 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all"
            >
              Audit & Verifikasi
            </button>
          </td>
        </tr>
      ))
    )}
  </tbody>
 </table>
 </div>
 </div>
 );
}
