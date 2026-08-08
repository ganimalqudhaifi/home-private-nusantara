'use client';

import React, { useState } from 'react';
import { PRICING_PACKAGES, PACKAGE_BENEFITS, BRAND_INFO } from '../../data/mockData';
import {
  Sparkles,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Users,
  ShieldCheck,
  MapPin,
  Clock,
  ClipboardList,
  TrendingUp,
} from 'lucide-react';

const BENEFIT_ICONS = {
  'user-check': CheckCircle2,
  'book-open': BookOpen,
  'clipboard-list': ClipboardList,
  'trending-up': TrendingUp,
  'clock': Clock,
};

export function PricingTableSection() {
  const [activeTab, setActiveTab] = useState<'sd' | 'smp' | 'calistung'>('sd');

  return (
    <section id="programs" className="w-full py-16 md:py-24 bg-surface-container-low/60 border-y border-border-whisper">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#DC2626] border border-red-200 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daftar Tarif Resmi • 1 Bulan = 4 Pertemuan</span>
          </div>

          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            Biaya Les Privat <span className="text-[#DC2626]">Per Bulan</span>
          </h2>

          <p className="text-sm md:text-base text-text-muted">
            Belajar Nyaman di Rumah • Guru Berkualitas • Jadwal Fleksibel • Melayani{' '}
            <strong className="text-primary">{BRAND_INFO.contact.serviceArea}</strong>
          </p>

          {/* Quick Segmented Switcher on Mobile/Tablet */}
          <div className="flex sm:hidden p-1 bg-white rounded-xl border border-border-whisper max-w-sm mx-auto">
            {PRICING_PACKAGES.map((pkg) => (
              <button
                key={pkg.levelId}
                type="button"
                onClick={() => setActiveTab(pkg.levelId as 'sd' | 'smp' | 'calistung')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === pkg.levelId
                    ? 'bg-primary-container text-white shadow-xs'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {pkg.levelName}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Matrix Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg) => {
            const isFeatured = pkg.levelId === 'sd';
            const Icon =
              pkg.levelId === 'sd'
                ? BookOpen
                : pkg.levelId === 'smp'
                ? GraduationCap
                : Sparkles;

            return (
              <div
                key={pkg.levelId}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-white border-2 border-primary-container shadow-xl relative scale-[1.02]'
                    : 'bg-white border border-border-whisper shadow-sm hover:shadow-md'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#DC2626] text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                    Program Terfavorit
                  </div>
                )}

                <div>
                  {/* Top Level Info */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-headline text-2xl font-extrabold text-primary">
                          {pkg.levelName}
                        </h3>
                        <p className="text-xs text-text-muted font-medium">
                          {pkg.subTitle}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-surface-container-high text-primary border border-border-whisper">
                      {pkg.levelBadge}
                    </span>
                  </div>

                  <p className="text-xs text-text-muted mb-6 leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Program 2x Seminggu Table */}
                  <div className="space-y-3.5">
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-border-whisper">
                      <div className="flex justify-between items-center pb-2 border-b border-border-whisper">
                        <span className="font-headline text-xs font-bold text-primary uppercase tracking-wider">
                          2x Seminggu (8 Sesi)
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Rekomendasi
                        </span>
                      </div>

                      <div className="pt-2.5 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-muted font-medium">1 Siswa (Privat):</span>
                          <span className="font-headline text-base font-extrabold text-[#DC2626]">
                            Rp {pkg.rates.twoDays.oneStudent.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-muted font-medium">2 Siswa (Grup):</span>
                          <span className="font-bold text-text-primary">
                            Rp {pkg.rates.twoDays.twoStudents.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Program 3x Seminggu Table */}
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-border-whisper">
                      <div className="flex justify-between items-center pb-2 border-b border-border-whisper">
                        <span className="font-headline text-xs font-bold text-primary uppercase tracking-wider">
                          3x Seminggu (12 Sesi)
                        </span>
                        <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                          Intensif
                        </span>
                      </div>

                      <div className="pt-2.5 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-muted font-medium">1 Siswa (Privat):</span>
                          <span className="font-headline text-base font-extrabold text-[#DC2626]">
                            Rp {pkg.rates.threeDays.oneStudent.toLocaleString('id-ID')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-text-muted font-medium">2 Siswa (Grup):</span>
                          <span className="font-bold text-text-primary">
                            Rp {pkg.rates.threeDays.twoStudents.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border-whisper">
                  <a
                    href="#daftar"
                    className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-center block shadow-sm active:scale-95 transition-all ${
                      isFeatured
                        ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-md'
                        : 'bg-primary hover:bg-primary-hover text-white'
                    }`}
                  >
                    Daftar Paket {pkg.levelName}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Facilities Included Strip from Brochure */}
        <div className="p-6 md:p-8 rounded-3xl bg-white border border-border-whisper shadow-sm space-y-6">
          <div className="text-center">
            <h3 className="font-headline text-lg sm:text-xl font-bold text-primary">
              Fasilitas Lengkap Yang Didapatkan Siswa
            </h3>
            <p className="text-xs text-text-muted mt-1">
              Seluruh paket sudah mencakup fasilitas bimbingan prima tanpa biaya tersembunyi.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PACKAGE_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-surface-container-low border border-border-whisper/60"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2.5 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-headline text-xs font-bold text-primary mb-1">
                  {b.title}
                </h4>
                <p className="text-[11px] text-text-muted leading-tight">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
