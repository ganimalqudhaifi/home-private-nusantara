'use client';

import React from'react';
import { Phone, BookOpen, GraduationCap } from'lucide-react';
import { Student } from'../../types';

export interface TutorRecentStudentsCardProps {
 readonly students: readonly Student[];
 readonly className?: string;
 readonly isLoading?: boolean;
}

export function TutorRecentStudentsCard({
 students,
 className ='',
 isLoading = false,
}: TutorRecentStudentsCardProps) {
 return (
 <div
 className={`bg-white rounded-2xl border border-border-whisper p-6 shadow-sm flex flex-col ${className}`}
 >
 <div className="flex justify-between items-center mb-6">
 <div>
 <h3 className="font-headline text-lg font-bold text-primary">
 Daftar Murid Bimbingan
 </h3>
 <p className="text-xs text-text-muted mt-0.5">
 Siswa aktif dalam periode bimbingan berjalan
 </p>
 </div>
 </div>

 <div className="space-y-3.5 flex-1">
 {isLoading ? (
 [1, 2, 3].map((i) => (
 <div key={i} className="p-3.5 rounded-xl border border-border-whisper flex items-center justify-between gap-3 bg-gray-50 animate-pulse">
 <div className="flex items-center gap-3">
 <div className="w-9 h-9 rounded-xl bg-gray-200 shrink-0"></div>
 <div className="space-y-2">
 <div className="h-4 bg-gray-200 rounded w-24"></div>
 <div className="h-3 bg-gray-200 rounded w-40"></div>
 </div>
 </div>
 <div className="w-8 h-8 rounded-xl bg-gray-200 shrink-0"></div>
 </div>
 ))
 ) : students.length === 0 ? (
 <div className="py-8 text-center bg-surface-container-lowest rounded-xl border border-dashed border-border-whisper">
 <GraduationCap className="w-8 h-8 text-text-muted mx-auto mb-2" />
 <p className="text-sm font-semibold text-primary">Belum Ada Siswa Bimbingan</p>
 <p className="text-xs text-text-muted">Data siswa akan muncul jika ada sesi yang disetujui.</p>
 </div>
 ) : (
 students.slice(0, 4).map((student) => {
 const isSD = student.level ==='SD';
 return (
 <div
 key={student.id}
 className="p-3.5 rounded-xl border border-border-whisper flex items-center justify-between gap-3 bg-surface-container-low/30"
 >
 <div className="flex items-center gap-3">
 <div
 className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
 isSD
 ?'bg-blue-50 text-blue-900'
 :'bg-indigo-50 text-indigo-900'
 }`}
 >
 {isSD ? <BookOpen className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
 </div>

 <div className="flex flex-col min-w-0">
 <div className="flex items-center gap-2">
 <h4 className="font-headline text-sm font-bold text-primary truncate">
 {student.name}
 </h4>
 <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container-high text-text-muted">
 {student.level} {student.grade}
 </span>
 </div>
 <p className="text-xs text-text-muted truncate">
 {student.school} • Wali: {student.parentName}
 </p>
 </div>
 </div>

 <a
 href={`https://wa.me/${student.parentPhone.replace(/[^0-9]/g,'')}`}
 target="_blank"
 rel="noreferrer"
 className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors shrink-0"
 title="Hubungi Orang Tua via WhatsApp"
 >
 <Phone className="w-4 h-4" />
 </a>
 </div>
 );
 }))
 }
 </div>
 </div>
 );
}
