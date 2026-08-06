import React from'react';
import { CheckCircle2, FileSearch, Calendar, ShieldCheck } from'lucide-react';

export interface TutorVerificationStepsProps {
 readonly currentStep?: number;
 readonly className?: string;
}

export function TutorVerificationSteps({
 currentStep = 2,
 className ='',
}: TutorVerificationStepsProps) {
 const steps = [
 {
 stepNumber: 1,
 title:'1. Registrasi Akun & Pengisian Data',
 description:'Data profil dasar, latar pendidikan, dan kontak berhasil disimpan.',
 icon: CheckCircle2,
 status:'completed',
 },
 {
 stepNumber: 2,
 title:'2. Review Berkas Administrasi',
 description:'Admin sedang memeriksa kesesuaian CV, Ijazah, dan Transkrip Nilai.',
 icon: FileSearch,
 status: currentStep === 2 ?'in_progress' : currentStep > 2 ?'completed' :'pending',
 },
 {
 stepNumber: 3,
 title:'3. Wawancara Tatap Muka & Microteaching',
 description:'Validasi kompetensi pedagogik kurikulum SD & SMP via tatap muka/offline.',
 icon: Calendar,
 status: currentStep === 3 ?'in_progress' : currentStep > 3 ?'completed' :'pending',
 },
 {
 stepNumber: 4,
 title:'4. Akun Resmi Aktif & Penerimaan Sesi',
 description:'Sertifikasi tutor diterbitkan dan profil tampil di pencarian orang tua.',
 icon: ShieldCheck,
 status: currentStep === 4 ?'in_progress' : currentStep > 4 ?'completed' :'pending',
 },
 ];

 return (
 <div
 className={`bg-white rounded-2xl p-6 md:p-8 border border-border-whisper shadow-sm ${className}`}
 >
 <h3 className="font-headline text-lg font-bold text-primary mb-6">
 Status Verifikasi Pendaftaran
 </h3>

 <div className="relative">
 {/* Vertical line indicator */}
 <div className="absolute left-5 top-5 bottom-8 w-0.5 bg-border-whisper z-0" />

 <div className="flex flex-col gap-6 relative z-10">
 {steps.map((s) => {
 const isCompleted = s.status ==='completed';
 const isInProgress = s.status ==='in_progress';
 const Icon = s.icon;

 return (
 <div key={s.stepNumber} className="flex gap-4 items-start">
 <div
 className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
 isCompleted
 ?'bg-emerald-50 text-emerald-600 border-emerald-500'
 : isInProgress
 ?'bg-primary-container text-white border-primary-container shadow-xs animate-pulse'
 :'bg-surface-container-low text-text-muted border-border-whisper opacity-50'
 }`}
 >
 <Icon className="w-5 h-5" />
 </div>

 <div className={`flex-1 ${!isCompleted && !isInProgress ?'opacity-50' :''}`}>
 <div className="flex items-center gap-2">
 <h4 className="font-headline text-sm md:text-base font-bold text-primary">
 {s.title}
 </h4>
 {isInProgress && (
 <span className="text-[10px] bg-amber-50 text-status-warning font-bold px-2 py-0.5 rounded-full border border-amber-200">
 Sedang Berjalan
 </span>
 )}
 </div>
 <p className="text-xs md:text-sm text-text-muted mt-1 leading-relaxed">
 {s.description}
 </p>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>
 );
}
