import React from'react';
import Link from'next/link';
import { TopNavBar } from'../../../src/components/shared/TopNavBar';
import { Footer } from'../../../src/components/shared/Footer';
import { AdminScheduleMonitoringGrid } from'../../../src/components/admin/AdminScheduleMonitoringGrid';
import { MOCK_SESSIONS } from'../../../src/data/mockData';
import { ArrowLeft, CalendarDays, Users } from'lucide-react';

export interface AdminBookingsPageProps {
 readonly searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminBookingsPage({ searchParams }: AdminBookingsPageProps) {
 if (searchParams) await searchParams;

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col">
 {/* Top Header */}
 <TopNavBar
 activeRoute="/admin/dashboard"
 role="admin"
 userName="Administrator Pusat"
 userBadge="Admin Master"
 />

 <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-whisper">
 <div>
 <div className="flex items-center gap-2 text-xs font-semibold text-text-muted mb-1">
 <Link href="/admin/dashboard" className="hover:text-primary flex items-center gap-1">
 <ArrowLeft className="w-3.5 h-3.5" />
 <span>Kembali ke Dashboard</span>
 </Link>
 </div>
 <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 Monitoring Jadwal Sesi Belajar Nasional
 </h1>
 <p className="text-sm text-text-muted mt-0.5">
 Pemantauan real-time pelaksanaan sesi mengajar seluruh tutor dan siswa se-Indonesia.
 </p>
 </div>

 <div className="flex items-center gap-3">
 <Link
 href="/admin/students"
 className="bg-surface-container-low hover:bg-surface-container-highest text-primary text-xs font-bold px-4 py-2.5 rounded-xl border border-border-whisper transition-colors"
 >
 Direktori Siswa
 </Link>
 </div>
 </div>

 {/* Global Schedule Grid */}
 <AdminScheduleMonitoringGrid sessions={MOCK_SESSIONS} />
 </main>

 <Footer />
 </div>
 );
}
