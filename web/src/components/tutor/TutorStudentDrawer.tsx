'use client';

import React from'react';
import { Drawer } from'../shared/Drawer';
import { StudentSession } from'../../types';
import {
 Calendar,
 Clock,
 MapPin,
 Phone,
 User,
 BookOpen,
 GraduationCap,
 ExternalLink,
 CheckCircle2,
 FileText,
} from'lucide-react';

export interface TutorStudentDrawerProps {
 readonly isOpen: boolean;
 readonly onClose: () => void;
 readonly session: StudentSession | null;
}

export function TutorStudentDrawer({
 isOpen,
 onClose,
 session,
}: TutorStudentDrawerProps) {
 if (!session) return null;

 const isSD = session.level ==='SD';

 return (
 <Drawer
 isOpen={isOpen}
 onClose={onClose}
 width="md"
 title={
 <div className="flex items-center gap-2">
 <h2 className="font-headline text-lg font-bold text-primary">
 Rincian Sesi Belajar
 </h2>
 <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-50 text-blue-900">
 #{session.code}
 </span>
 </div>
 }
 >
 <div className="space-y-6">
 {/* Student Header Card */}
 <div className="p-4 rounded-2xl bg-surface-container-low border border-border-whisper flex items-center gap-4">
 <div
 className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white shrink-0 ${
 isSD ?'bg-blue-600' :'bg-indigo-600'
 }`}
 >
 {isSD ? <BookOpen className="w-6 h-6" /> : <GraduationCap className="w-6 h-6" />}
 </div>
 <div>
 <h3 className="font-headline text-base font-bold text-primary">
 {session.studentName}
 </h3>
 <p className="text-xs text-text-muted">
 {session.level} Kelas {session.grade} • {session.subject}
 </p>
 </div>
 </div>

 {/* Schedule & Time */}
 <div className="p-4 rounded-2xl border border-border-whisper space-y-3">
 <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Waktu & Tanggal
 </h4>
 <div className="grid grid-cols-2 gap-3 text-sm">
 <div className="flex items-center gap-2 text-text-primary">
 <Calendar className="w-4 h-4 text-primary-container" />
 <span>
 {session.day}, {session.date}
 </span>
 </div>
 <div className="flex items-center gap-2 text-text-primary font-mono">
 <Clock className="w-4 h-4 text-primary-container" />
 <span>{session.time}</span>
 </div>
 </div>
 </div>

 {/* Parent & Contact */}
 <div className="p-4 rounded-2xl border border-border-whisper space-y-3">
 <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Kontak Orang Tua / Wali
 </h4>
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2.5">
 <User className="w-4 h-4 text-text-muted" />
 <div>
 <p className="text-sm font-semibold text-text-primary">
 {session.parentName}
 </p>
 <p className="text-xs text-text-muted font-mono">{session.parentPhone}</p>
 </div>
 </div>

 <a
 href={`https://wa.me/${session.parentPhone.replace(/[^0-9]/g,'')}?text=Halo%20${encodeURIComponent(
 session.parentName
 )},%20saya%20${encodeURIComponent(
 session.tutorName
 )}%20dari%20Home%20Private%20Nusantara%20untuk%20sesi%20${encodeURIComponent(
 session.subject
 )}.`}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors"
 >
 <Phone className="w-3.5 h-3.5" />
 <span>Chat WhatsApp</span>
 </a>
 </div>
 </div>

 {/* Residential Location */}
 <div className="p-4 rounded-2xl border border-border-whisper space-y-3">
 <div className="flex items-center justify-between">
 <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Lokasi Bimbingan (Rumah Siswa)
 </h4>
 {session.mapsUrl && (
 <a
 href={session.mapsUrl}
 target="_blank"
 rel="noreferrer"
 className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
 >
 <span>Google Maps</span>
 <ExternalLink className="w-3 h-3" />
 </a>
 )}
 </div>
 <div className="flex items-start gap-2.5 text-sm text-text-primary">
 <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
 <div>
 <p className="font-medium">{session.address}</p>
 <p className="text-xs text-text-muted mt-0.5">
 {session.district}, {session.city}
 </p>
 </div>
 </div>
 </div>

 {/* Notes from Parent */}
 {session.notes && (
 <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
 <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
 <FileText className="w-3.5 h-3.5" />
 <span>Catatan Khusus dari Orang Tua</span>
 </h4>
 <p className="text-xs text-text-primary leading-relaxed italic">
 &ldquo;{session.notes}&rdquo;
 </p>
 </div>
 )}

 {/* Session Status Button */}
 <div className="pt-2">
 <button
 type="button"
 onClick={onClose}
 className="w-full bg-primary-container text-white py-3 rounded-xl font-headline text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm flex items-center justify-center gap-2"
 >
 <CheckCircle2 className="w-4 h-4 text-emerald-400" />
 <span>Tutup Rincian Sesi</span>
 </button>
 </div>
 </div>
 </Drawer>
 );
}
