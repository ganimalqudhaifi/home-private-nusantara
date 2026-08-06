'use client';

import React, { useState } from'react';
import Image from'next/image';
import { Tutor, TutorStatus } from'../../types';
import { ShieldCheck, Hourglass, XCircle, AlertTriangle, Phone, Eye, Search } from'lucide-react';
import { Badge } from'../shared/Badge';

export interface TutorDirectoryTableProps {
 readonly tutors: readonly Tutor[];
 readonly onAuditTutor: (tutor: Tutor) => void;
 readonly className?: string;
}

export function TutorDirectoryTable({
 tutors,
 onAuditTutor,
 className ='',
}: TutorDirectoryTableProps) {
 const [filterStatus, setFilterStatus] = useState<string>('all');
 const [filterLevel, setFilterLevel] = useState<string>('all');
 const [searchQuery, setSearchQuery] = useState<string>('');

 const filteredTutors = tutors.filter((tutor) => {
 const matchesStatus =
 filterStatus ==='all' ||
 (filterStatus ==='pending' && tutor.status ==='pending') ||
 (filterStatus ==='verified' && tutor.status ==='verified') ||
 (filterStatus ==='suspended' && tutor.status ==='suspended');

 const matchesLevel =
 filterLevel ==='all' ||
 tutor.grades.some((g) => g.includes(filterLevel));

 const matchesSearch =
 searchQuery.trim() ==='' ||
 tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 tutor.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
 tutor.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

 return matchesStatus && matchesLevel && matchesSearch;
 });

 const getStatusBadge = (status: TutorStatus) => {
 switch (status) {
 case'verified':
 case'active':
 return (
 <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
 <ShieldCheck className="w-3.5 h-3.5" />
 <span>Terverifikasi</span>
 </span>
 );
 case'pending':
 return (
 <span className="inline-flex items-center gap-1 bg-amber-50 text-status-warning text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
 <Hourglass className="w-3.5 h-3.5" />
 <span>Pending Review</span>
 </span>
 );
 case'suspended':
 return (
 <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-gray-300">
 <AlertTriangle className="w-3.5 h-3.5" />
 <span>Dibekukan</span>
 </span>
 );
 default:
 return null;
 }
 };

 return (
 <div className={`space-y-4 ${className}`}>
 {/* Filter and Search Bar */}
 <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border-whisper shadow-xs">
 {/* Status Pills */}
 <div className="flex overflow-x-auto gap-1.5 hide-scrollbar">
 <button
 type="button"
 onClick={() => setFilterStatus('all')}
 className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
 filterStatus ==='all'
 ?'bg-primary-container text-white shadow-xs'
 :'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
 }`}
 >
 Semua ({tutors.length})
 </button>
 <button
 type="button"
 onClick={() => setFilterStatus('pending')}
 className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
 filterStatus ==='pending'
 ?'bg-primary-container text-white shadow-xs'
 :'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
 }`}
 >
 Pending Verifikasi ({tutors.filter((t) => t.status ==='pending').length})
 </button>
 <button
 type="button"
 onClick={() => setFilterStatus('verified')}
 className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
 filterStatus ==='verified'
 ?'bg-primary-container text-white shadow-xs'
 :'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
 }`}
 >
 Terverifikasi ({tutors.filter((t) => t.status ==='verified').length})
 </button>
 </div>

 {/* Level Select & Search */}
 <div className="flex items-center gap-3">
 <select
 value={filterLevel}
 onChange={(e) => setFilterLevel(e.target.value)}
 className="px-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs font-semibold outline-none"
 >
 <option value="all">Semua Jenjang</option>
 <option value="SD">Jenjang SD</option>
 <option value="SMP">Jenjang SMP</option>
 </select>

 <div className="relative">
 <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
 <input
 type="text"
 value={searchQuery}
 onChange={(e) => setSearchQuery(e.target.value)}
 placeholder="Cari tutor / kampus..."
 className="pl-8 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none w-48 focus:w-56 transition-all"
 />
 </div>
 </div>
 </div>

 {/* Directory Table */}
 <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-[760px]">
 <thead className="bg-surface-container-low/70 border-b border-border-whisper text-xs text-text-muted uppercase tracking-wider">
 <tr>
 <th className="px-6 py-4 font-semibold">Pengajar & Kontak</th>
 <th className="px-6 py-4 font-semibold">Pendidikan & Kampus</th>
 <th className="px-6 py-4 font-semibold">Jenjang Diampu</th>
 <th className="px-6 py-4 font-semibold">Waktu Daftar</th>
 <th className="px-6 py-4 font-semibold">Status Akun</th>
 <th className="px-6 py-4 font-semibold text-right">Tindakan</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border-whisper text-xs">
 {filteredTutors.map((tutor) => (
 <tr
 key={tutor.id}
 className="hover:bg-surface-container-low/40 transition-colors"
 >
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border-whisper shrink-0 bg-gray-100">
 <Image
 src={tutor.avatar}
 alt={tutor.name}
 width={40}
 height={40}
 className="object-cover w-full h-full"
 unoptimized
 />
 </div>
 <div>
 <p className="font-headline text-sm font-bold text-primary">
 {tutor.name}
 </p>
 <p className="font-mono text-[11px] text-text-muted">{tutor.phone}</p>
 </div>
 </div>
 </td>
 <td className="px-6 py-4 text-text-primary">
 <p className="font-medium">{tutor.university}</p>
 <p className="text-[11px] text-text-muted">{tutor.title}</p>
 </td>
 <td className="px-6 py-4">
 <div className="flex flex-wrap gap-1">
 {tutor.grades.slice(0, 2).map((g) => (
 <span
 key={g}
 className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-900"
 >
 {g}
 </span>
 ))}
 {tutor.grades.length > 2 && (
 <span className="text-[10px] text-text-muted">
 +{tutor.grades.length - 2}
 </span>
 )}
 </div>
 </td>
 <td className="px-6 py-4 text-text-muted font-mono">{tutor.registerDate}</td>
 <td className="px-6 py-4">{getStatusBadge(tutor.status)}</td>
 <td className="px-6 py-4 text-right">
 <button
 type="button"
 onClick={() => onAuditTutor(tutor)}
 className="bg-surface-container-low hover:bg-primary-container hover:text-white text-primary text-xs font-bold px-3.5 py-1.5 rounded-xl border border-border-whisper transition-all inline-flex items-center gap-1.5"
 >
 <Eye className="w-3.5 h-3.5" />
 <span>Audit Berkas</span>
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
