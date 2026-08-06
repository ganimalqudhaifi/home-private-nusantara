import React from'react';
import { Users, Hourglass, GraduationCap, CalendarCheck, ShieldCheck, AlertCircle } from'lucide-react';
import { AdminKPI } from'../../types';

export interface AdminKPICardsProps {
 readonly stats: AdminKPI;
 readonly className?: string;
}

export function AdminKPICards({ stats, className ='' }: AdminKPICardsProps) {
 return (
 <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ${className}`}>
 {/* Stat 1: Active Tutors */}
 <div className="bg-white border border-border-whisper rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between animate-fade-up">
 <div className="flex justify-between items-start mb-4">
 <div>
 <p className="text-xs text-text-muted font-medium mb-1">Pengajar Aktif</p>
 <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 {stats.activeTutors}
 </h3>
 </div>
 <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
 <Users className="w-5 h-5" />
 </div>
 </div>
 <div className="pt-3 border-t border-border-whisper">
 <span className="bg-emerald-50 text-emerald-800 text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center w-fit gap-1">
 <ShieldCheck className="w-3.5 h-3.5" />
 <span>100% Terverifikasi</span>
 </span>
 </div>
 </div>

 {/* Stat 2: Pending Tutors */}
 <div className="bg-white border border-border-whisper rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between animate-fade-up">
 <div className="flex justify-between items-start mb-4">
 <div>
 <p className="text-xs text-text-muted font-medium mb-1">Pengajar Pending</p>
 <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 {stats.pendingTutors}
 </h3>
 </div>
 <div className="w-10 h-10 rounded-xl bg-amber-50 text-status-warning flex items-center justify-center">
 <Hourglass className="w-5 h-5" />
 </div>
 </div>
 <div className="pt-3 border-t border-border-whisper">
 <span className="bg-amber-50 text-status-warning text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center w-fit gap-1 border border-amber-200">
 <AlertCircle className="w-3.5 h-3.5" />
 <span>Menunggu Verifikasi</span>
 </span>
 </div>
 </div>

 {/* Stat 3: Registered Students */}
 <div className="bg-white border border-border-whisper rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between animate-fade-up">
 <div className="flex justify-between items-start mb-4">
 <div>
 <p className="text-xs text-text-muted font-medium mb-1">Siswa Terdaftar</p>
 <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 {stats.registeredStudents.total}
 </h3>
 </div>
 <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
 <GraduationCap className="w-5 h-5" />
 </div>
 </div>
 <div className="pt-3 border-t border-border-whisper flex gap-2">
 <span className="bg-blue-50 text-blue-900 px-2 py-0.5 rounded text-[11px] font-bold">
 {stats.registeredStudents.sd} SD
 </span>
 <span className="bg-indigo-50 text-indigo-900 px-2 py-0.5 rounded text-[11px] font-bold">
 {stats.registeredStudents.smp} SMP
 </span>
 </div>
 </div>

 {/* Stat 4: Total Bookings */}
 <div className="bg-white border border-border-whisper rounded-2xl p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between animate-fade-up">
 <div className="flex justify-between items-start mb-4">
 <div>
 <p className="text-xs text-text-muted font-medium mb-1">Total Booking Sesi</p>
 <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 {stats.totalBookings}
 </h3>
 </div>
 <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-900 flex items-center justify-center">
 <CalendarCheck className="w-5 h-5" />
 </div>
 </div>
 <div className="pt-3 border-t border-border-whisper flex items-center justify-between text-xs text-text-muted">
 <span>Bulan Ini</span>
 <span className="text-emerald-600 font-bold">
 {stats.doubleBookingRate} double-booking
 </span>
 </div>
 </div>
 </div>
 );
}
