'use client';

import React from'react';
import Image from'next/image';
import { Calendar, Clock, MapPin, Phone, ShieldCheck, CheckCircle2 } from'lucide-react';
import { StudentSession } from'../../types';
import { Badge } from'../shared/Badge';

export interface StudentSessionCardProps {
 readonly session: StudentSession;
 readonly isHistory?: boolean;
 readonly className?: string;
}

export function StudentSessionCard({
 session,
 isHistory = false,
 className ='',
}: StudentSessionCardProps) {
 const isSD = session.level ==='SD';
 const whatsappUrl =`https://wa.me/6281234567890?text=${encodeURIComponent(
`Halo Tutor ${session.tutorName}, saya orang tua dari ${session.studentName} untuk sesi #${session.code} pada ${session.date}.`
 )}`;

 return (
 <div
 className={`bg-white rounded-2xl border border-border-whisper p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${className}`}
 >
 <div className="flex flex-col gap-3 flex-1 min-w-0">
 {/* Top Badges */}
 <div className="flex flex-wrap items-center gap-2.5">
 <span className="font-mono text-xs font-bold text-text-muted">
 #{session.code}
 </span>
 <Badge variant={isHistory ?'outline' :'emerald'} size="sm">
 <CheckCircle2 className="w-3 h-3" />
 <span>{isHistory ?'Selesai Terlaksana' :'Sesi Terkonfirmasi'}</span>
 </Badge>
 <span
 className={`text-[10px] font-bold px-2 py-0.5 rounded ${
 isSD
 ?'bg-blue-50 text-blue-900'
 :'bg-indigo-50 text-indigo-900'
 }`}
 >
 {session.level} Kelas {session.grade}
 </span>
 </div>

 {/* Subject & Target */}
 <div>
 <h3 className="font-headline text-base md:text-lg font-bold text-primary">
 {session.subject}
 </h3>
 {session.notes && (
 <p className="text-xs text-text-muted mt-0.5 line-clamp-1 italic">
 Target: &ldquo;{session.notes}&rdquo;
 </p>
 )}
 </div>

 {/* Date & Time */}
 <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted">
 <div className="flex items-center gap-1.5 font-medium text-text-primary">
 <Calendar className="w-3.5 h-3.5 text-primary-container" />
 <span>{session.day}, {session.date}</span>
 </div>
 <div className="flex items-center gap-1 font-mono">
 <Clock className="w-3.5 h-3.5 text-primary-container" />
 <span>{session.time}</span>
 </div>
 </div>

 {/* Tutor Mini Info */}
 <div className="flex items-center gap-3 pt-2">
 <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-500 shrink-0 bg-gray-100">
 <Image
 src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxKTMHQudEAsfQn5uQSiyMaXK8bR-DcxFXN9ZgZdgyKBCXE0vmznwK3vJDs9JqbTfUGFtZcLHxrDunpNsoNRw_q218xEFsSjXmu0Ra0iWWFP1V7H_QgJff8eOOhCKo6hMZASzw0mWpPNaYlXSyAWUriD3sYYisbodDCyKO-zZaMMWJ-bM8-0YP_ElOenL5iV_WGQK_jjHM1nmixSxR_3FRVExumwEjqMoWfw5GTXkdiVlp1OF3_rSJS7QPe5gpoM63pbCwhwJe2CtW"
 alt={session.tutorName}
 width={32}
 height={32}
 className="object-cover w-full h-full"
 unoptimized
 />
 </div>
 <div className="flex items-center gap-1.5 text-xs">
 <span className="font-semibold text-primary">
 Tutor: {session.tutorName}
 </span>
 <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
 </div>
 </div>
 </div>

 {/* Right Column: Actions */}
 <div className="flex flex-col sm:flex-row md:flex-col items-stretch md:items-end gap-3 w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-border-whisper">
 {!isHistory ? (
 <>
 <a
 href={whatsappUrl}
 target="_blank"
 rel="noreferrer"
 className="inline-flex items-center justify-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors"
 >
 <Phone className="w-3.5 h-3.5" />
 <span>Hubungi Pengajar (WA)</span>
 </a>
 <div className="text-right">
 <span className="text-[11px] text-text-muted">Biaya Sesi</span>
 <p className="font-headline text-sm font-bold text-primary">
 Rp {session.amount.toLocaleString('id-ID')}
 </p>
 </div>
 </>
 ) : (
 <div className="text-right">
 <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
 <CheckCircle2 className="w-4 h-4" />
 <span>Selesai Dibimbing</span>
 </span>
 <p className="text-[11px] text-text-muted mt-0.5">Rp {session.amount.toLocaleString('id-ID')}</p>
 </div>
 )}
 </div>
 </div>
 );
}
