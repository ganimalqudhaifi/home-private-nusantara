'use client';

import React, { useState } from'react';
import Link from'next/link';
import { StudentSession } from'../../types';
import { StudentSessionCard } from'./StudentSessionCard';
import { Calendar, History, Plus } from'lucide-react';

export interface StudentSessionsTabsProps {
 readonly sessions: readonly StudentSession[];
 readonly initialTab?:'upcoming' |'history';
 readonly className?: string;
}

export function StudentSessionsTabs({
 sessions,
 initialTab ='upcoming',
 className ='',
}: StudentSessionsTabsProps) {
 const [activeTab, setActiveTab] = useState<'upcoming' |'history'>(initialTab);

 const upcomingSessions = sessions.filter((s) => s.status ==='scheduled');
 const historySessions = sessions.filter((s) => s.status ==='completed');

 return (
 <div className={`space-y-6 ${className}`}>
 {/* Tab Switcher */}
 <div className="flex border-b border-border-whisper gap-8">
 <button
 type="button"
 onClick={() => setActiveTab('upcoming')}
 className={`pb-3 font-headline text-base font-bold transition-all border-b-2 flex items-center gap-2 ${
 activeTab ==='upcoming'
 ?'border-primary-container text-primary-container'
 :'border-transparent text-text-muted hover:text-text-primary'
 }`}
 >
 <Calendar className="w-4 h-4" />
 <span>Sesi Mendatang ({upcomingSessions.length})</span>
 </button>

 <button
 type="button"
 onClick={() => setActiveTab('history')}
 className={`pb-3 font-headline text-base font-bold transition-all border-b-2 flex items-center gap-2 ${
 activeTab ==='history'
 ?'border-primary-container text-primary-container'
 :'border-transparent text-text-muted hover:text-text-primary'
 }`}
 >
 <History className="w-4 h-4" />
 <span>Riwayat Selesai ({historySessions.length})</span>
 </button>
 </div>

 {/* Content List */}
 <div className="space-y-4">
 {activeTab ==='upcoming' ? (
 upcomingSessions.length === 0 ? (
 <div className="p-12 text-center bg-white rounded-2xl border border-border-whisper space-y-3">
 <Calendar className="w-10 h-10 text-text-muted mx-auto opacity-40" />
 <h4 className="font-headline text-base font-bold text-primary">
 Belum Ada Sesi Mendatang
 </h4>
 <p className="text-xs text-text-muted max-w-sm mx-auto">
 Pilih guru privat favorit Anda dan jadwalkan sesi belajar di rumah sekarang.
 </p>
 <Link
 href="/student/search"
 className="inline-flex items-center gap-2 bg-[#DC2626] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:bg-[#B91C1C] transition-colors"
 >
 <Plus className="w-4 h-4" />
 <span>Cari & Booking Guru</span>
 </Link>
 </div>
 ) : (
 upcomingSessions.map((s) => (
 <StudentSessionCard key={s.id} session={s} isHistory={false} />
 ))
 )
 ) : historySessions.length === 0 ? (
 <div className="p-12 text-center bg-white rounded-2xl border border-border-whisper">
 <p className="text-xs text-text-muted">Belum ada riwayat sesi yang telah selesai.</p>
 </div>
 ) : (
 historySessions.map((s) => (
 <StudentSessionCard key={s.id} session={s} isHistory={true} />
 ))
 )}
 </div>
 </div>
 );
}
