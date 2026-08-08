'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  ArrowRight,
  MapPin,
  Sparkles,
  Phone,
  Award,
  House,
  Trophy,
  Rocket,
  CalendarDays,
  Tag,
  CircleCheckBig,
} from 'lucide-react';
import { BRAND_INFO } from '../../data/mockData';

const PILLAR_ICONS = [
  House,
  Trophy,
  Rocket,
];

const PILLAR_DETAILS = [
  {
    title: 'BELAJAR NYAMAN',
    desc: 'Lingkungan belajar kondusif & privat langsung di rumah Anda',
  },
  {
    title: 'PRESTASI GEMILANG',
    desc: 'Bersama meraih nilai akademik terbaik dan juara kelas',
  },
  {
    title: 'MASA DEPAN TERANG',
    desc: 'Fondasi konsep kuat untuk jenjang sekolah berikutnya',
  },
];

export function HeroSection() {
  return (
    <section id="about" className="w-full relative overflow-hidden bg-gradient-to-b from-surface via-surface-container-lowest to-surface pt-8 pb-16 md:py-20 border-b border-border-whisper">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-red-100/40 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 animate-fade-up">
            {/* Top Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Guru Berkualitas & Terseleksi</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Berpengalaman Sejak {BRAND_INFO.contact.sinceYear}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Makassar & Gowa</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold text-[#DC2626] uppercase tracking-widest block">
                {BRAND_INFO.tagline}
              </span>
              <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-primary leading-[1.18] tracking-tight">
                Bimbingan Belajar Privat Terbaik untuk Siswa{' '}
                <span className="text-[#0B2545] underline decoration-[#DC2626] decoration-4 underline-offset-8">
                  Calistung, SD & SMP
                </span>{' '}
                di Rumah Anda
              </h1>
            </div>

            {/* Description */}
            <p className="text-text-muted text-base md:text-lg leading-relaxed max-w-2xl">
              Guru datang langsung ke rumah dengan pendekatan personal 1-on-1. Jadwal fleksibel,
              materi lengkap terstruktur, dan pendampingan tugas sekolah untuk raihan prestasi yang lebih baik!
            </p>

            {/* Action Buttons & Quick WhatsApp Hotline */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#daftar"
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-8 py-4 rounded-2xl font-bold text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2.5"
              >
                <span>Pilih Paket & Daftar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BRAND_INFO.contact.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-surface-container-low text-primary border border-border-whisper px-6 py-4 rounded-2xl font-semibold text-sm sm:text-base active:scale-95 transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Konsultasi WA: {BRAND_INFO.contact.whatsapp}</span>
              </a>
            </div>

            {/* Social Proof Bar */}
            <div className="pt-3 flex items-center gap-4 text-xs sm:text-sm text-text-muted border-t border-border-whisper">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span>
                <strong className="text-primary font-bold">4.9/5.0</strong> • Kepuasan 1.200+ Orang Tua Murid di Makassar & Gowa
              </span>
            </div>
          </div>

          {/* Right Column: Visual Brochure Card (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Glassmorphism Hero Card */}
            <div className="w-full max-w-md bg-white rounded-3xl border border-border-whisper shadow-2xl p-6 sm:p-7 space-y-6 relative z-10 animate-scale-in">
              {/* Gold Seal Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0B2545] to-[#133E6D] text-white flex items-center justify-between shadow-sm">
                <div>
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block">
                    ★ REKOMENDASI TERBAIK ★
                  </span>
                  <h3 className="font-headline text-base font-extrabold">
                    Home Private Nusantara
                  </h3>
                  <p className="text-xs text-blue-100">
                    Solusi Belajar Tepat untuk Prestasi Hebat!
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-400 text-primary flex flex-col items-center justify-center font-extrabold text-[10px] leading-tight shadow-md shrink-0">
                  <span>SEJAK</span>
                  <span className="text-xs">2018</span>
                </div>
              </div>

              {/* Contextual Feature Highlights */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-border-whisper">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <House className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary">Guru Datang ke Rumah</h4>
                    <p className="text-[11px] text-text-muted">Lebih aman, hemat waktu tanpa macet.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-border-whisper">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <CalendarDays className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary">Jadwal Sangat Fleksibel</h4>
                    <p className="text-[11px] text-text-muted">Pilih 2x atau 3x seminggu sesuai waktu luang.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low border border-border-whisper">
                  <div className="w-9 h-9 rounded-xl bg-red-100 text-[#DC2626] flex items-center justify-center shrink-0">
                    <Tag className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-primary">Mulai Rp 400.000 / Bulan</h4>
                    <p className="text-[11px] text-text-muted">Tersedia untuk Calistung, SD & SMP.</p>
                  </div>
                </div>
              </div>

              {/* CTA link in card */}
              <a
                href="#programs"
                className="w-full py-3.5 px-4 rounded-xl bg-surface-container-high hover:bg-primary hover:text-white text-primary text-xs font-bold text-center block transition-colors"
              >
                Lihat Rincian Biaya & Fasilitas →
              </a>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars Strip from Top of Brochure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          {PILLAR_DETAILS.map((pillar, i) => {
            const Icon = PILLAR_ICONS[i] || House;
            return (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-white border border-border-whisper shadow-xs flex items-center gap-4 hover:border-primary/20 transition-colors"
              >
                <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline text-xs font-extrabold text-primary uppercase tracking-wider">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-text-muted leading-tight mt-0.5">
                    {pillar.desc}
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
