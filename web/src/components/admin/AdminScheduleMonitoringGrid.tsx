'use client';

import React, { useState } from'react';
import { StudentSession } from'../../types';
import {
 Calendar,
 Clock,
 MapPin,
 CheckCircle2,
 ShieldCheck,
 CalendarCheck,
 AlertCircle,
 Search,
} from'lucide-react';

export interface AdminScheduleMonitoringGridProps {
 readonly sessions: readonly StudentSession[];
 readonly className?: string;
}

export function AdminScheduleMonitoringGrid({
 sessions,
 className ='',
}: AdminScheduleMonitoringGridProps) {
 const [statusFilter, setStatusFilter] = useState<'all' |'scheduled' |'completed'>('all');
 const [searchQuery, setSearchQuery] = useState<string>('');

 const filteredSessions = sessions.filter((s) => {
 const matchesStatus = statusFilter ==='all' || s.status === statusFilter;
 const matchesSearch =
 searchQuery.trim() ==='' ||
 s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
 s.tutorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
 s.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
 s.code.toLowerCase().includes(searchQuery.toLowerCase());

 return matchesStatus && matchesSearch;
 });

 return (
 <div className={`space-y-6 ${className}`}>
 {/* KPI Strip */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 <div className="bg-white border border-border-whisper rounded-2xl p-4 shadow-xs flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-container flex items-center justify-center shrink-0">
 <Calendar className="w-5 h-5" />
 </div>
 <div>
 <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
 Sesi Hari Ini
 </span>
 <span className="font-headline text-xl font-bold text-primary">
 42 Sesi
 </span>
 </div>
 </div>

 <div className="bg-white border border-border-whisper rounded-2xl p-4 shadow-xs flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0">
 <CalendarCheck className="w-5 h-5" />
 </div>
 <div>
 <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
 Sesi Mendatang
 </span>
 <span className="font-headline text-xl font-bold text-primary">
 186 Sesi
 </span>
 </div>
 </div>

 <div className="bg-white border border-border-whisper rounded-2xl p-4 shadow-xs flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
 <CheckCircle2 className="w-5 h-5" />
 </div>
 <div>
 <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
 Sesi Selesai
 </span>
 <span className="font-headline text-xl font-bold text-primary">
 96 Sesi
 </span>
 </div>
 </div>

 <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
 <ShieldCheck className="w-5 h-5" />
 </div>
 <div>
 <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
 Konflik Jadwal
 </span>
 <span className="font-headline text-xl font-extrabold text-emerald-900">
 0% (Zero Collision)
 </span>
 </div>
 </div>
 </div>

 {/* Global Bookings Table Container */}
 <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden flex flex-col">
 {/* Table Header Filter Bar */}
 <div className="p-4 border-b border-border-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest">
 <div className="flex items-center gap-2">
 <span className="text-xs font-bold text-text-muted uppercase tracking-wider mr-1">
 Status Sesi:
 </span>
 <button
 type="button"
 onClick={() => setStatusFilter('all')}
 className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
 statusFilter ==='all'
 ?'bg-primary-container text-white shadow-xs'
 :'text-text-muted hover:text-text-primary'
 }`}
 >
 Semua ({sessions.length})
 </button>
 <button
 type="button"
 onClick={() => setStatusFilter('scheduled')}
 className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
 statusFilter ==='scheduled'
 ?'bg-primary-container text-white shadow-xs'
 :'text-text-muted hover:text-text-primary'
 }`}
 >
 Terkonfirmasi ({sessions.filter((s) => s.status ==='scheduled').length})
 </button>
 <button
 type="button"
 onClick={() => setStatusFilter('completed')}
 className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
 statusFilter ==='completed'
 ?'bg-primary-container text-white shadow-xs'
 :'text-text-muted hover:text-text-primary'
 }`}
 >
 Selesai ({sessions.filter((s) => s.status ==='completed').length})
 </button>
 </div>

 <div className="relative">
 <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Cari sesi / nama siswa..."
 className="pl-8 pr-3 py-1.5 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none w-full sm:w-56"
 />
 </div>
 </div>

 {/* Data Table */}
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[800px]">
 <thead className="bg-surface-container-low/70 border-b border-border-whisper text-xs text-text-muted uppercase tracking-wider">
 <tr>
 <th className="p-4 font-semibold">ID & Tanggal</th>
 <th className="p-4 font-semibold">Waktu (WIB)</th>
 <th className="p-4 font-semibold">Siswa & Jenjang</th>
 <th className="p-4 font-semibold">Tutor Pengajar</th>
 <th className="p-4 font-semibold">Lokasi Belajar</th>
 <th className="p-4 font-semibold text-center">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border-whisper text-xs">
 {filteredSessions.map((ses) => {
 const isSD = ses.level ==='SD';
 const isCompleted = ses.status ==='completed';

 return (
 <tr
 key={ses.id}
 className="hover:bg-surface-container-low/40 transition-colors"
 >
 <td className="p-4">
 <span className="font-mono font-bold text-primary">
 #{ses.code}
 </span>
 <p className="text-[11px] text-text-muted mt-0.5">
 {ses.day}, {ses.date}
 </p>
 </td>

 <td className="p-4">
 <span className="font-mono px-2 py-1 bg-surface-container-low rounded-md border border-border-whisper">
 {ses.time}
 </span>
 </td>

 <td className="p-4">
 <p className="font-headline font-bold text-primary">
 {ses.studentName}
 </p>
 <span
 className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold ${
 isSD
 ?'bg-blue-50 text-blue-900'
 :'bg-indigo-50 text-indigo-900'
 }`}
 >
 {ses.level} KELAS {ses.grade}
 </span>
 </td>

 <td className="p-4">
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-[10px] shrink-0">
 {ses.tutorName.substring(0, 2).toUpperCase()}
 </div>
 <span className="font-medium text-text-primary">
 {ses.tutorName}
 </span>
 </div>
 </td>

 <td className="p-4 max-w-xs truncate">
 <div className="flex items-center gap-1 text-text-muted">
 <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
 <span className="truncate">{ses.address}</span>
 </div>
 </td>

 <td className="p-4 text-center">
 <span
 className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
 isCompleted
 ?'bg-surface-container-high text-text-muted'
 :'bg-emerald-50 text-emerald-800 border border-emerald-200'
 }`}
 >
 <CheckCircle2 className="w-3 h-3" />
 <span>{isCompleted ?'SELESAI' :'TERKONFIRMASI'}</span>
 </span>
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
