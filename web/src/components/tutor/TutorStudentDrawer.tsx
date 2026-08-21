'use client';

import React, { useState } from 'react';
import { mutate } from 'swr';
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
 readonly readOnly?: boolean;
}

export function TutorStudentDrawer({
 isOpen,
 onClose,
 session,
 readOnly = false,
}: TutorStudentDrawerProps) {
  const [isCompleting, setIsCompleting] = useState(false);

  if (!session) return null;

  const isSD = session.level === 'SD';

  // Check if session date is today or in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sessionDate = new Date(session.date);
  sessionDate.setHours(0, 0, 0, 0);
  const canComplete = !readOnly && sessionDate.getTime() <= today.getTime() && (session.status === 'scheduled' || session.status === 'in_progress');

  const handleCompleteSession = async () => {
    try {
      setIsCompleting(true);
      const res = await fetch(`/api/tutor/sessions/${session.id}/complete`, {
        method: 'PUT',
      });
      if (res.ok) {
        // Refresh data
        mutate('/api/tutor/dashboard-data');
        mutate('/api/tutor/schedule');
        onClose();
      } else {
        alert('Gagal menandai sesi sebagai selesai.');
      }
    } catch (e) {
      console.error(e);
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setIsCompleting(false);
    }
  };

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
 <User className="w-4 h-4 text-text-muted shrink-0" />
 <div className="min-w-0">
 <p className="text-sm font-semibold text-text-primary truncate">
 {session.parentName || 'Orang Tua / Wali'}
 </p>
 <p className="text-xs text-text-muted font-mono truncate">{session.parentPhone || 'Nomor tidak tersedia'}</p>
 </div>
 </div>

 {session.parentPhone ? (
 <a
 href={`https://wa.me/${(session.parentPhone || '').replace(/[^0-9]/g,'')}?text=Halo%20${encodeURIComponent(
 session.parentName || 'Bapak/Ibu'
 )},%20saya%20${encodeURIComponent(
 session.tutorName || 'Pengajar'
 )}%20dari%20Home%20Private%20Nusantara%20untuk%20sesi%20${encodeURIComponent(
 session.subject || 'bimbingan'
 )}.`}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center gap-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-colors shrink-0"
 >
 <Phone className="w-3.5 h-3.5" />
 <span>Chat WhatsApp</span>
 </a>
 ) : null}
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
 <div className="pt-2 flex flex-col gap-2">
 {canComplete && (
 <button
 type="button"
 onClick={handleCompleteSession}
 disabled={isCompleting}
 className="w-full bg-emerald-600 text-white py-3 rounded-xl font-headline text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 <CheckCircle2 className="w-4 h-4" />
 <span>{isCompleting ? 'Menyelesaikan...' : 'Tandai Sesi Selesai'}</span>
 </button>
 )}
 <button
 type="button"
 onClick={onClose}
 className={`w-full py-3 rounded-xl font-headline text-xs font-bold transition-colors flex items-center justify-center gap-2 ${canComplete ? 'bg-surface-container-low text-text-muted hover:bg-surface-container-high' : 'bg-primary-container text-white hover:bg-primary-hover shadow-sm'}`}
 >
 {!canComplete && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
 <span>Tutup Rincian Sesi</span>
 </button>
 </div>
 </div>
 </Drawer>
 );
}
