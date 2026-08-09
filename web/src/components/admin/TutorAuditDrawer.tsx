'use client';

import React from'react';
import Image from'next/image';
import { Drawer } from'../shared/Drawer';
import { Button } from'../shared/Button';
import { Tutor } from'../../types';
import {
 ShieldCheck,
 School,
 Calendar,
 Phone,
 FileText,
 CheckCircle2,
 XCircle,
 Clock,
 Eye,
 ExternalLink,
} from'lucide-react';

export interface TutorAuditDrawerProps {
 readonly isOpen: boolean;
 readonly onClose: () => void;
 readonly tutor: Tutor | null;
 readonly onOpenActionModal: (actionType:'approve' |'reject' |'freeze', tutor: Tutor) => void;
}

export function TutorAuditDrawer({
 isOpen,
 onClose,
 tutor,
 onOpenActionModal,
}: TutorAuditDrawerProps) {
 if (!tutor) return null;

 return (
 <Drawer
 isOpen={isOpen}
 onClose={onClose}
 width="lg"
 title={
 <div className="flex items-center gap-2">
 <h2 className="font-headline text-lg font-bold text-primary">
 Audit Berkas & Verifikasi Pengajar
 </h2>
 </div>
 }
 >
 <div className="space-y-6">
 {/* Profile Card */}
 <div className="p-4 rounded-2xl bg-surface-container-low border border-border-whisper flex items-center gap-4">
 <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 shrink-0 bg-gray-100">
 <Image
 src={tutor.avatar}
 alt={tutor.name}
 width={56}
 height={56}
 className="object-cover w-full h-full"
 unoptimized
 />
 </div>
 <div>
 <h3 className="font-headline text-base font-bold text-primary">
 {tutor.name}
 </h3>
 <p className="text-xs text-text-muted">{tutor.title}</p>
 <p className="text-xs text-primary font-semibold mt-0.5">
 {tutor.university}
 </p>
 </div>
 </div>

 {/* Status Banner */}
 <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between text-xs">
 <div className="flex items-center gap-2">
 <Clock className="w-4 h-4 text-status-warning" />
 <span className="font-semibold text-status-warning">
 Status: Menunggu Audit Wawancara Tatap Muka
 </span>
 </div>
 <span className="font-mono text-text-muted">{tutor.registerDate}</span>
 </div>

 {/* Teaching Subjects & Grades */}
 <div className="p-4 rounded-2xl border border-border-whisper space-y-2.5 text-xs">
 <h4 className="font-bold text-text-muted uppercase tracking-wider">
 Mata Pelajaran & Jenjang yang Diajukan
 </h4>
 <div className="flex flex-wrap gap-1.5">
 {tutor.subjects.map((s) => (
 <span
 key={s}
 className="px-2.5 py-1 rounded-lg bg-surface-container-low text-primary font-semibold"
 >
 {s}
 </span>
 ))}
 </div>
 </div>

  {/* Submitted Documents Checklist */}
  <div className="p-4 rounded-2xl border border-border-whisper space-y-3 text-xs">
  <h4 className="font-bold text-text-muted uppercase tracking-wider">
  Dokumen & Berkas Kualifikasi Pengajar
  </h4>

  <div className="space-y-2">
  <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
  <div className="flex items-center gap-2 overflow-hidden">
  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
  <span className="font-medium truncate">Link CV / Portfolio / Drive</span>
  </div>
  {tutor.portfolioUrl ? (
  <a
  href={tutor.portfolioUrl.startsWith('http') ? tutor.portfolioUrl : `https://${tutor.portfolioUrl}`}
  target="_blank"
  rel="noreferrer"
  className="text-primary-container font-bold hover:underline flex items-center gap-1 shrink-0 ml-2"
  >
  <span>Buka Link</span>
  <ExternalLink className="w-3.5 h-3.5" />
  </a>
  ) : (
  <span className="text-text-muted italic shrink-0">Tidak dilampirkan</span>
  )}
  </div>

  <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
  <div className="flex items-center gap-2">
  <FileText className="w-4 h-4 text-amber-600" />
  <span className="font-medium">Catatan Wawancara Tatap Muka & Microteaching</span>
  </div>
  <span className="text-status-warning font-bold flex items-center gap-1">
  <Clock className="w-3.5 h-3.5" />
  <span>Siap Diaktivasi</span>
  </span>
  </div>
  </div>
  </div>

 {/* Action Decision Buttons */}
 <div className="pt-2 space-y-2.5">
 <Button
 type="button"
 variant="primary"
 size="lg"
 onClick={() => {
 onClose();
 onOpenActionModal('approve', tutor);
 }}
 className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold"
 >
 <CheckCircle2 className="w-4 h-4" />
 <span>Setujui & Terbitkan Status Pengajar Terverifikasi</span>
 </Button>

 <div className="grid grid-cols-2 gap-2">
 <button
 type="button"
 onClick={() => {
 onClose();
 onOpenActionModal('reject', tutor);
 }}
 className="py-2.5 px-3 rounded-xl border border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
 >
 <XCircle className="w-3.5 h-3.5" />
 <span>Tolak Berkas</span>
 </button>

 <a
 href={`https://wa.me/${(tutor.phone || '').replace(/[^0-9]/g,'')}`}
 target="_blank"
 rel="noreferrer"
 className="py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary border border-border-whisper text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
 >
 <Phone className="w-3.5 h-3.5" />
 <span>Hubungi Pengajar</span>
 </a>
 </div>
 </div>
 </div>
 </Drawer>
 );
}
