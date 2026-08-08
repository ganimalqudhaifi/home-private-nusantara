'use client';

import React from 'react';
import { WHY_CHOOSE_US, BRAND_INFO } from '../../data/mockData';
import {
  Award,
  Home,
  Calendar,
  BookOpen,
  Users,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

const ICON_MAP = {
  award: Award,
  home: Home,
  calendar: Calendar,
  bookOpen: BookOpen,
  users: Users,
  shieldCheck: ShieldCheck,
};

export function WhyChooseUsSection() {
  return (
    <section id="keunggulan" className="w-full py-16 md:py-24 bg-surface relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-100/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fokus Belajar • Hasil Nyata • Prestasi Meningkat</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            Kenapa Pilih <span className="text-[#DC2626]">Home Private Nusantara</span>?
          </h2>

          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Solusi bimbingan belajar privat terpercaya di rumah Anda untuk wilayah{' '}
            <strong className="text-primary">{BRAND_INFO.contact.serviceArea}</strong>. Berpengalaman mendampingi ribuan siswa sejak {BRAND_INFO.contact.sinceYear}.
          </p>
        </div>

        {/* 6 Reasons Grid from Brochure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.number}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-border-whisper shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  {/* Number Badge */}
                  <span className="font-headline text-xl font-extrabold text-white bg-[#0B2545] px-3.5 py-1 rounded-xl shadow-xs">
                    {item.number}
                  </span>

                  {/* Icon Indicator */}
                  <div className={`p-2.5 rounded-2xl border ${item.badgeColor}`}>
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="font-headline text-base sm:text-lg font-bold text-primary mb-2.5 group-hover:text-[#DC2626] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-border-whisper flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Terjamin & Sesuai Standar</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#0B2545] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-headline text-lg md:text-xl font-bold">
              Home Private Nusantara, Solusi Belajar Tepat untuk Prestasi Hebat!
            </h4>
            <p className="text-xs md:text-sm text-blue-100">
              Guru siap datang ke rumah Anda di Makassar dan Gowa dengan jadwal yang fleksibel.
            </p>
          </div>

          <a
            href="#daftar"
            className="shrink-0 bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-md active:scale-95 transition-all"
          >
            Pilih Paket & Jadwal Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
