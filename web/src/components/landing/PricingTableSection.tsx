'use client';

import React from 'react';
import { PRICING_PACKAGES, PACKAGE_BENEFITS } from '../../data/mockData';
import { CheckCircle2, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export function PricingTableSection() {
  return (
    <section id="programs" className="w-full py-16 md:py-24 bg-surface-container-lowest border-y border-border-whisper">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-red-50 text-[#DC2626] border border-red-200 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biaya Les Privat Per Bulan (1 Bulan = 4 Pertemuan)</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Paket Belajar Nyaman & Terjangkau di Rumah
          </h2>
          <p className="text-sm md:text-base text-text-muted">
            Melayani area <strong className="text-primary">Kota Makassar & Kabupaten Gowa</strong>. Pilih program sesuai jenjang putra-putri Anda.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PRICING_PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.levelId}
              className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                idx === 1
                  ? 'bg-white border-2 border-primary-container shadow-xl relative scale-[1.02]'
                  : 'bg-surface-container-low border border-border-whisper shadow-xs hover:shadow-md'
              }`}
            >
              {idx === 1 && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-container text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                  Paling Diminati
                </div>
              )}

              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="font-headline text-xl font-bold text-primary">
                    {pkg.levelName}
                  </h3>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    {pkg.levelBadge}
                  </span>
                </div>
                <p className="text-xs text-text-muted mb-6 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Rate Tables */}
                <div className="space-y-4">
                  {/* 2x Seminggu */}
                  <div className="p-3.5 rounded-xl bg-white border border-border-whisper space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-primary border-b border-border-whisper pb-1.5">
                      <span>Program 2x Seminggu</span>
                      <span className="text-[10px] text-text-muted font-normal">8 Sesi/Bulan</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">1 Siswa:</span>
                      <span className="font-extrabold text-sm text-[#DC2626]">
                        Rp {pkg.rates.twoDays.oneStudent.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">2 Siswa (Grup):</span>
                      <span className="font-bold text-text-primary">
                        Rp {pkg.rates.twoDays.twoStudents.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* 3x Seminggu */}
                  <div className="p-3.5 rounded-xl bg-white border border-border-whisper space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-primary border-b border-border-whisper pb-1.5">
                      <span>Program 3x Seminggu</span>
                      <span className="text-[10px] text-text-muted font-normal">12 Sesi/Bulan</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">1 Siswa:</span>
                      <span className="font-extrabold text-sm text-[#DC2626]">
                        Rp {pkg.rates.threeDays.oneStudent.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-muted">2 Siswa (Grup):</span>
                      <span className="font-bold text-text-primary">
                        Rp {pkg.rates.threeDays.twoStudents.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border-whisper">
                <a
                  href="#daftar"
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
                    idx === 1
                      ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white shadow-xs'
                      : 'bg-primary hover:bg-primary-hover text-white'
                  }`}
                >
                  Pilih Paket {pkg.levelName.split(' ')[0]}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Strip from Brochure */}
        <div className="p-6 md:p-8 rounded-2xl bg-surface-container-low border border-border-whisper">
          <h3 className="font-headline text-center text-base md:text-lg font-bold text-primary mb-6">
            Fasilitas Unggulan Yang Anda Dapatkan
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {PACKAGE_BENEFITS.map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center p-3 rounded-xl bg-white border border-border-whisper/60">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
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
