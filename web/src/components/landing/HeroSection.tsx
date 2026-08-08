'use client';

import React from'react';
import Link from'next/link';
import { ShieldCheck, Star, ArrowRight } from'lucide-react';
import { InteractiveTutorPreviewCard } from'./InteractiveTutorPreviewCard';
import { MiniDatePicker } from'./MiniDatePicker';
import { Tutor } from'../../types';

export interface HeroSectionProps {
 readonly featuredTutor: Tutor;
}

export function HeroSection({ featuredTutor }: HeroSectionProps) {
 return (
 <section className="w-full px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 {/* Left: Asymmetrical Copy */}
 <div className="flex flex-col items-start gap-6 animate-fade-up">
 {/* Verification Badge */}
 <div className="inline-flex items-center gap-2 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-xs">
 <ShieldCheck className="text-[#16A34A] w-4 h-4" />
 <span className="text-xs font-semibold text-[#16A34A]">
 100% Pengajar Lolos Seleksi & Wawancara Offline
 </span>
 </div>

 {/* Headline */}
 <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary leading-[1.15] tracking-tight">
 Bimbingan Belajar Privat Terbaik untuk Siswa{''}
 <span className="text-[#0B2545] underline decoration-[#DC2626] decoration-4 underline-offset-8">
 SD & SMP
 </span>{''}
 di Rumah Anda
 </h1>

 <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-xl">
 Pendampingan belajar intensif 1-on-1 dengan pengajar terverifikasi langsung oleh admin
 pusat. Jadwal fleksibel, kurikulum terstruktur, dan pemantauan berkala.
 </p>

 {/* Rating Pill */}
 <div className="flex items-center gap-3">
 <div className="flex text-amber-500">
 {[...Array(5)].map((_, i) => (
 <Star key={i} className="w-4 h-4 fill-current" />
 ))}
 </div>
 <span className="text-sm text-text-muted">
 <strong className="text-primary font-bold">4.9/5.0</strong> dari 1.200+
 sesi belajar
 </span>
 </div>

        {/* Actions CTA */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
          <Link
            href="/student/search"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-3.5 rounded-xl font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <span>Cari Guru & Konsultasi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth?tab=tutor"
            className="bg-transparent hover:bg-surface-container-low text-primary border border-border-whisper px-7 py-3.5 rounded-xl font-semibold active:scale-95 transition-all flex items-center justify-center text-sm md:text-base"
          >
            Gabung Sebagai Pengajar
          </Link>
        </div>
 </div>

 {/* Right: Interactive Preview */}
 <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl bg-surface-container-low border border-border-whisper p-6 md:p-8 flex items-center justify-center overflow-hidden shadow-sm">
 {/* Decorative Gradients */}
 <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none animate-float" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-100/40 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

 {/* Glassmorphism Card Container */}
 <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 flex flex-col gap-4 animate-scale-in">
 <InteractiveTutorPreviewCard tutor={featuredTutor} />
 <MiniDatePicker selectedDate={10} />
 </div>
 </div>
 </section>
 );
}
