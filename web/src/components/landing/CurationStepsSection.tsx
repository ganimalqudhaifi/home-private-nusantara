import React from'react';
import { ClipboardCheck, Presentation, UserCheck, ShieldCheck } from'lucide-react';
import { CURATION_STEPS } from'../../data/mockData';

export interface CurationStepsSectionProps {
 readonly className?: string;
}

export function CurationStepsSection({ className ='' }: CurationStepsSectionProps) {
 const iconMap: Record<string, React.ElementType> = {
'clipboard-check': ClipboardCheck,
 presentation: Presentation,
'user-check': UserCheck,
'shield-check': ShieldCheck,
 };

 return (
 <section
 id="curation"
 className={`w-full bg-surface-container-low py-16 md:py-24 border-y border-border-whisper ${className}`}
 >
 <div className="px-4 md:px-8 max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border border-emerald-200">
 <ShieldCheck className="w-3.5 h-3.5" />
 <span>Garansi Kualitas 100%</span>
 </div>
 <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
 4 Langkah Ketat Kurasi Pengajar
 </h2>
 <p className="text-text-muted text-sm md:text-base mt-2 max-w-2xl mx-auto">
 Hanya 15% dari total pendaftar yang berhasil lolos seluruh tahapan dan mendapatkan status
 Tutor Terverifikasi Resmi.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
 {CURATION_STEPS.map((step) => {
 const Icon = iconMap[step.icon] || ShieldCheck;
 return (
 <div
 key={step.step}
 className="bg-white p-6 rounded-2xl border border-border-whisper shadow-xs flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 animate-fade-up"
 >
 <div>
 <div className="flex items-center justify-between mb-4">
 <span className="font-mono text-2xl font-bold text-primary-container">
 {step.step}
 </span>
 <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-container flex items-center justify-center">
 <Icon className="w-5 h-5" />
 </div>
 </div>
 <h3 className="font-headline text-base font-bold text-primary mb-2">
 {step.title}
 </h3>
 <p className="text-xs text-text-muted leading-relaxed">
 {step.description}
 </p>
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </section>
 );
}
