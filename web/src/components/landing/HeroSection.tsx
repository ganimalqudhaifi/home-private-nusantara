'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { InteractiveTutorPreviewCard } from './InteractiveTutorPreviewCard';
import { MiniDatePicker } from './MiniDatePicker';
import { Tutor } from '../../types';

export interface HeroSectionProps {
  readonly featuredTutor: Tutor;
}

export function HeroSection({ featuredTutor }: HeroSectionProps) {
  return (
    <section className="w-full px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left: Asymmetrical Copy */}
      <div className="flex flex-col items-start gap-6">
        {/* Verification Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 px-3.5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800 shadow-xs">
          <ShieldCheck className="text-[#16A34A] w-4 h-4" />
          <span className="text-xs font-semibold text-[#16A34A] dark:text-emerald-300">
            100% Pengajar Lolos Seleksi & Wawancara Offline
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary dark:text-white leading-[1.15] tracking-tight">
          Bimbingan Belajar Privat Terbaik untuk Siswa{' '}
          <span className="text-[#0B2545] dark:text-blue-300 underline decoration-[#DC2626] decoration-4 underline-offset-8">
            SD & SMP
          </span>{' '}
          di Rumah Anda
        </h1>

        <p className="text-text-muted dark:text-gray-300 text-base md:text-lg leading-relaxed max-w-xl">
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
          <span className="text-sm text-text-muted dark:text-gray-400">
            <strong className="text-primary dark:text-white font-bold">4.9/5.0</strong> dari 1.200+
            sesi belajar
          </span>
        </div>

        {/* Actions CTA */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
          <Link
            href="/auth?tab=student"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-7 py-3.5 rounded-xl font-semibold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <span>Daftar Sebagai Siswa</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/auth?tab=tutor"
            className="bg-transparent hover:bg-surface-container-low dark:hover:bg-surface-container-high text-primary dark:text-white border border-border-whisper dark:border-outline-variant px-7 py-3.5 rounded-xl font-semibold active:scale-95 transition-all flex items-center justify-center text-sm md:text-base"
          >
            Gabung Sebagai Pengajar
          </Link>
        </div>
      </div>

      {/* Right: Interactive Preview */}
      <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl bg-surface-container-low dark:bg-surface-container-high border border-border-whisper dark:border-outline-variant p-6 md:p-8 flex items-center justify-center overflow-hidden shadow-sm">
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/50 dark:bg-blue-900/30 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-100/40 dark:bg-red-950/20 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

        {/* Glassmorphism Card Container */}
        <div className="relative z-10 w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/60 dark:border-slate-700/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-5 flex flex-col gap-4">
          <InteractiveTutorPreviewCard tutor={featuredTutor} />
          <MiniDatePicker selectedDate={10} />
        </div>
      </div>
    </section>
  );
}
