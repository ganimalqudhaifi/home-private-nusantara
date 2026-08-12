import React from'react';
import { CheckCircle2, Users, CalendarCheck } from'lucide-react';

export interface TutorMetricsGridProps {
 readonly completedSessions?: number;
 readonly activeStudentsCount?: number;
 readonly sdStudentsCount?: number;
 readonly smpStudentsCount?: number;
 readonly activeDaysCount?: number;
 readonly isLoading?: boolean;
 readonly className?: string;
}

export function TutorMetricsGrid({
 completedSessions = 0,
 activeStudentsCount = 0,
 sdStudentsCount = 0,
 smpStudentsCount = 0,
 activeDaysCount = 0,
 isLoading = false,
 className ='',
}: TutorMetricsGridProps) {
 const metrics = [
 {
 title:'Total Sesi Selesai',
 value: completedSessions.toString(),
 subtext:'Keseluruhan',
 icon: CheckCircle2,
 iconColor:'bg-blue-50 text-blue-900',
 },
 {
 title:'Murid Aktif',
 value:`${activeStudentsCount} Siswa`,
 badges: [
 { label:`${sdStudentsCount} SD`, color:'bg-blue-50 text-blue-900' },
 { label:`${smpStudentsCount} SMP`, color:'bg-indigo-50 text-indigo-900' },
 ],
 icon: Users,
 iconColor:'bg-indigo-50 text-indigo-900',
 },
 {
 title:'Ketersediaan Mengajar',
 value:`${activeDaysCount} Hari Aktif`,
 subtext:'Telah Diatur',
 icon: CalendarCheck,
 iconColor:'bg-emerald-50 text-emerald-800',
 },
 ];

 if (isLoading) {
   return (
     <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ${className}`}>
       {[1, 2, 3].map((i) => (
         <div key={i} className="bg-white rounded-2xl p-6 border border-border-whisper shadow-sm flex flex-col justify-between animate-pulse">
           <div className="flex items-center justify-between mb-3">
             <div className="w-10 h-10 rounded-xl bg-gray-200" />
             <div className="h-3 w-16 bg-gray-200 rounded" />
           </div>
           <div>
             <div className="h-3 w-32 bg-gray-200 rounded mb-2" />
             <div className="h-8 w-24 bg-gray-200 rounded mb-2" />
             <div className="flex gap-2 mt-2">
               <div className="h-5 w-12 bg-gray-200 rounded" />
               <div className="h-5 w-12 bg-gray-200 rounded" />
             </div>
           </div>
         </div>
       ))}
     </div>
   );
 }

 return (
 <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ${className}`}>
 {metrics.map((m, idx) => {
 const Icon = m.icon;
 return (
 <div
 key={idx}
 className="bg-white rounded-2xl p-6 border border-border-whisper shadow-sm flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-fade-up"
 >
 <div className="flex items-center justify-between mb-3">
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.iconColor}`}>
 <Icon className="w-5 h-5" />
 </div>
 <span className="text-xs text-text-muted font-medium">Performa</span>
 </div>

 <div>
 <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
 {m.title}
 </h4>
 <div className="font-headline text-2xl font-bold text-primary">
 {m.value}
 </div>

 {m.badges ? (
 <div className="flex gap-2 mt-2">
 {m.badges.map((b, bIdx) => (
 <span key={bIdx} className={`px-2 py-0.5 rounded text-[11px] font-bold ${b.color}`}>
 {b.label}
 </span>
 ))}
 </div>
 ) : (
 <p className="text-xs text-text-muted mt-1">{m.subtext}</p>
 )}
 </div>
 </div>
 );
 })}
 </div>
 );
}
