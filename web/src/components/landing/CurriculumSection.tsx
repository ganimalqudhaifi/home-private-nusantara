import React from'react';
import Link from'next/link';
import { BookOpen, GraduationCap, CheckCircle2, ArrowRight } from'lucide-react';
import { CURRICULUM_PROGRAMS } from'../../data/mockData';

export interface CurriculumSectionProps {
 readonly className?: string;
}

export function CurriculumSection({ className = '' }: CurriculumSectionProps) {
  return (
    <section id="curriculum" className={`w-full py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>
 <div className="text-center mb-12">
 <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary">
 Program Belajar Berjenjang SD & SMP
 </h2>
 <p className="text-text-muted text-sm md:text-base mt-2 max-w-2xl mx-auto">
 Materi dirancang sesuai kurikulum nasional dengan pendekatan personalisasi yang menyesuaikan
 kecepatan belajar masing-masing anak.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {CURRICULUM_PROGRAMS.map((prog, idx) => {
 const isSD = idx === 0;
 return (
 <div
 key={prog.level}
 className="bg-white border border-border-whisper rounded-2xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
 >
 <div>
 <div className="flex items-center justify-between mb-4">
 <span className={`px-3 py-1 rounded-full text-xs font-bold ${prog.badgeColor}`}>
 {prog.badge}
 </span>
 <div className="p-2.5 rounded-xl bg-surface-container-low text-primary-container">
 {isSD ? <BookOpen className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
 </div>
 </div>

 <h3 className="font-headline text-xl font-bold text-primary mb-2">
 {prog.title}
 </h3>

 <p className="text-text-muted text-sm mb-6 leading-relaxed">
 {prog.description}
 </p>

 <div className="space-y-2.5 mb-8">
 {prog.features.map((feat, fIdx) => (
 <div key={fIdx} className="flex items-center gap-2.5 text-sm text-text-primary">
 <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
 <span>{feat}</span>
 </div>
 ))}
 </div>
 </div>

          <a
            href="#daftar"
            className="w-full bg-surface-container-low hover:bg-primary-container hover:text-white text-primary font-semibold py-3 px-4 rounded-xl text-center text-sm transition-all flex items-center justify-center gap-2"
          >
            <span>Daftar Bimbingan {isSD ? 'SD' : 'SMP'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
 </div>
 );
 })}
 </div>
 </section>
 );
}
