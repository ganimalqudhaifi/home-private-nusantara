'use client';

import React from'react';
import { ChevronLeft, ChevronRight, MapPin, CheckCircle2 } from'lucide-react';
import { StudentSession } from'../../types';

export interface TutorWeeklyScheduleGridProps {
 readonly sessions: readonly StudentSession[];
 readonly onSelectSession: (session: StudentSession) => void;
 readonly className?: string;
 readonly isLoading?: boolean;
}

export function TutorWeeklyScheduleGrid({
 sessions,
 onSelectSession,
 className ='',
 isLoading = false,
}: TutorWeeklyScheduleGridProps) {
 const days = [
 { day:'Sen', date: 10, full:'Senin' },
 { day:'Sel', date: 11, full:'Selasa' },
 { day:'Rab', date: 12, full:'Rabu' },
 { day:'Kam', date: 13, full:'Kamis' },
 { day:'Jum', date: 14, full:'Jumat' },
 { day:'Sab', date: 15, full:'Sabtu' },
 { day:'Min', date: 16, full:'Minggu' },
 ];

 const hours = [
'08:00',
'09:00',
'10:00',
'11:00',
'12:00',
'13:00',
'14:00',
'15:00',
'16:00',
'17:00',
'18:00',
'19:00',
'20:00',
'21:00',
 ];

 return (
 <div
 className={`bg-white rounded-2xl border border-border-whisper overflow-hidden shadow-sm flex flex-col ${className}`}
 >
 {/* Calendar Header Controls */}
 <div className="p-4 md:p-6 border-b border-border-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest">
 <div className="flex items-center gap-3">
 <h2 className="font-headline text-lg md:text-xl font-bold text-primary">
 10 - 16 Agustus 2026
 </h2>
 <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">
 3 Sesi Aktif Minggu Ini
 </span>
 </div>

 <div className="flex items-center gap-2">
 <button
 type="button"
 className="p-2 rounded-xl border border-border-whisper text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors"
 >
 <ChevronLeft className="w-4 h-4" />
 </button>
 <span className="text-xs font-bold px-3 py-2 bg-surface-container-high rounded-xl">
 Minggu Ini
 </span>
 <button
 type="button"
 className="p-2 rounded-xl border border-border-whisper text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors"
 >
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 </div>

 {/* Days of Week Header Row */}
 <div className="grid grid-cols-8 border-b border-border-whisper bg-surface-container-low font-headline text-xs font-semibold sticky top-0 z-20">
 <div className="p-3 text-right text-text-muted border-r border-border-whisper font-mono">
 WIB
 </div>
 {days.map((d, i) => (
 <div
 key={i}
 className={`p-3 text-center border-r border-border-whisper last:border-r-0 ${
 d.date === 10 ?'bg-primary-container/5' :''
 }`}
 >
 <div className="text-text-muted text-[11px] mb-0.5">{d.day}</div>
 <div
 className={`text-base font-bold ${
 d.date === 10
 ?'text-primary-container'
 :'text-text-primary'
 }`}
 >
 {d.date}
 </div>
 </div>
 ))}
 </div>

 {/* Calendar Grid Body */}
 <div className="relative overflow-x-auto overflow-y-auto max-h-[640px] bg-white">
 {/* Background Grid Rows */}
 <div className="min-w-[760px]">
 {hours.map((h, hIdx) => (
 <div
 key={h}
 className="grid grid-cols-8 border-b border-border-whisper min-h-[52px]"
 >
 <div className="p-2 text-right text-xs text-text-muted font-mono border-r border-border-whisper shrink-0">
 {h}
 </div>
 {days.map((d, dIdx) => (
 <div
 key={dIdx}
 className={`border-r border-border-whisper/60 last:border-r-0 ${
 d.date === 10 && (h ==='16:00' || h ==='17:00')
 ?'bg-blue-50/20'
 : d.date === 13 && (h ==='16:00' || h ==='17:00')
 ?'bg-indigo-50/20'
 : d.date === 15 && (h ==='09:00' || h ==='10:00')
 ?'bg-blue-50/20'
 :''
 }`}
 />
 ))}
 </div>
 ))}
 </div>

 {/* Floating Session Cards Overlay */}
 <div className="absolute inset-0 min-w-[760px] pointer-events-none">
 {isLoading ? (
 <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-30 pointer-events-auto">
 <div className="flex flex-col items-center gap-2">
 <div className="w-6 h-6 border-2 border-primary-container border-t-transparent rounded-full animate-spin"></div>
 <span className="text-xs font-semibold text-primary">Memuat jadwal...</span>
 </div>
 </div>
 ) : sessions.length === 0 ? (
 <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-30 pointer-events-auto">
 <div className="bg-white p-6 rounded-2xl border border-border-whisper shadow-sm text-center">
 <h3 className="text-sm font-bold text-primary mb-1">Belum Ada Sesi</h3>
 <p className="text-xs text-text-muted">Tidak ada jadwal bimbingan pada rentang tanggal ini.</p>
 </div>
 </div>
 ) : (
 sessions
 .filter((s) => s.status ==='scheduled')
 .map((session) => {
 // Map session to grid coordinates
 let colIndex = 0;
 let topOffset = 0;
 let height = 100;

 if (session.id ==='ses-1') {
 // Monday (Senin - 10) 16:00-18:00 (index 0 of days, row 8 of 14 hours)
 colIndex = 0;
 topOffset = 8 * 52 + 2;
 height = 2 * 52 - 4;
 } else if (session.id ==='ses-2') {
 // Thursday (Kamis - 13) 16:00-18:00 (index 3 of days)
 colIndex = 3;
 topOffset = 8 * 52 + 2;
 height = 2 * 52 - 4;
 } else if (session.id ==='ses-3') {
 // Saturday (Sabtu - 15) 09:00-11:00 (index 5 of days, row 1 of 14 hours)
 colIndex = 5;
 topOffset = 1 * 52 + 2;
 height = 2 * 52 - 4;
 }

 const isSD = session.level ==='SD';

 return (
 <div
 key={session.id}
 onClick={() => onSelectSession(session)}
 style={{
 top:`${topOffset}px`,
 left:`calc(12.5% + (87.5% / 7) * ${colIndex} + 4px)`,
 width:`calc((87.5% / 7) - 8px)`,
 height:`${height}px`,
 }}
 className={`absolute rounded-xl border shadow-sm p-2.5 flex flex-col justify-between cursor-pointer pointer-events-auto hover:-translate-y-0.5 transition-all overflow-hidden z-10 ${
 isSD
 ?'bg-blue-50/95 border-blue-300 text-blue-950 hover:border-blue-500'
 :'bg-indigo-50/95 border-indigo-300 text-indigo-950 hover:border-indigo-500'
 }`}
 >
 <div>
 <div className="flex items-center justify-between mb-1">
 <span
 className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wider ${
 isSD
 ?'bg-blue-200 text-blue-900'
 :'bg-indigo-200 text-indigo-900'
 }`}
 >
 {session.level} KELAS {session.grade}
 </span>
 <CheckCircle2 className="w-3 h-3 text-emerald-600" />
 </div>
 <p className="font-headline text-xs font-bold truncate">
 {session.studentName}
 </p>
 <p className="text-[11px] text-text-muted truncate">
 {session.subject}
 </p>
 </div>

 <div className="flex items-center gap-1 text-[10px] text-text-muted truncate">
 <MapPin className="w-2.5 h-2.5 text-red-500 shrink-0" />
 <span className="truncate">{session.district}</span>
 </div>
 </div>
 );
 })
 )}
 </div>
 </div>
 </div>
 );
}
