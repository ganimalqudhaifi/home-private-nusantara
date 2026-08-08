'use client';

import React, { useState, useMemo } from 'react';
import { BRAND_INFO, PRICING_PACKAGES } from '../../data/mockData';
import { Button } from '../shared/Button';
import {
  MessageCircle,
  CalendarCheck,
  Users,
  Clock,
  Sparkles,
  MapPin,
  Check,
} from 'lucide-react';

const DAYS_OF_WEEK = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
] as const;

const TIME_OPTIONS = [
  { label: 'Pagi (08.00 - 11.30)', value: 'Pagi (08.00 - 11.30)' },
  { label: 'Siang (13.30 - 15.30)', value: 'Siang (13.30 - 15.30)' },
  { label: 'Sore (16.00 - 18.00)', value: 'Sore (16.00 - 18.00)' },
  { label: 'Malam (19.00 - 21.00)', value: 'Malam (19.00 - 21.00)' },
] as const;

export function QuickBookingFormSection() {
  const [levelId, setLevelId] = useState<'calistung' | 'sd' | 'smp'>('sd');
  const [frequency, setFrequency] = useState<'2x' | '3x'>('2x');
  const [studentCount, setStudentCount] = useState<1 | 2>(1);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Senin', 'Kamis']);
  const [preferredTime, setPreferredTime] = useState<string>(TIME_OPTIONS[2].value);

  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('Kelas 4 SD');
  const [cityArea, setCityArea] = useState<'Makassar' | 'Gowa'>('Makassar');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const requiredDayCount = frequency === '2x' ? 2 : 3;

  // Toggle Day Selection with Limit
  const handleToggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      if (selectedDays.length < requiredDayCount) {
        setSelectedDays([...selectedDays, day]);
      } else {
        // Replace oldest
        setSelectedDays([...selectedDays.slice(1), day]);
      }
    }
  };

  // Adjust days if frequency changes
  const handleFrequencyChange = (newFreq: '2x' | '3x') => {
    setFrequency(newFreq);
    const targetCount = newFreq === '2x' ? 2 : 3;
    if (targetCount === 3 && selectedDays.length < 3) {
      const remaining = DAYS_OF_WEEK.filter((d) => !selectedDays.includes(d));
      setSelectedDays([...selectedDays, remaining[0] || 'Rabu']);
    } else if (targetCount === 2 && selectedDays.length > 2) {
      setSelectedDays(selectedDays.slice(0, 2));
    }
  };

  // Calculate Price
  const estimatedPrice = useMemo(() => {
    const pkg = PRICING_PACKAGES.find((p) => p.levelId === levelId);
    if (!pkg) return 0;
    const rateData = frequency === '2x' ? pkg.rates.twoDays : pkg.rates.threeDays;
    return studentCount === 1 ? rateData.oneStudent : rateData.twoStudents;
  }, [levelId, frequency, studentCount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPkg = PRICING_PACKAGES.find((p) => p.levelId === levelId);
    const daysStr = selectedDays.join(', ') || 'Belum dipilih';

    const message = `Halo Admin Home Private Nusantara, saya ingin mendaftar/konsultasi les privat di rumah dengan formulir berikut:

*Rincian Paket & Jadwal:*
- Program / Jenjang: ${selectedPkg?.levelName || levelId.toUpperCase()}
- Frekuensi: ${frequency} seminggu (${studentCount} Siswa)
- Estimasi Biaya: Rp ${estimatedPrice.toLocaleString('id-ID')} / bulan
- Pilihan Hari Belajar: ${daysStr}
- Pilihan Waktu Belajar: ${preferredTime}

*Data Siswa & Orang Tua:*
- Nama Orang Tua/Wali: ${parentName || '-'}
- No. WhatsApp: ${parentPhone || '-'}
- Nama Siswa & Kelas: ${studentName || '-'} (${grade})
- Wilayah Layanan: Kota/Kab. ${cityArea}
- Alamat Lengkap: ${address || '-'}
- Catatan / Kebutuhan Belajar: ${notes || '-'}

Mohon konfirmasi ketersediaan guru pengajar untuk jadwal tersebut. Terima kasih!`;

    const rawNumber = BRAND_INFO.contact.whatsappRaw;
    const url = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="daftar" className="w-full py-16 md:py-24 bg-surface text-text-primary">
      <div className="max-w-5xl mx-auto px-4 md:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Pendaftaran & Konsultasi Langsung</span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            Formulir Pemesanan Guru Les Privat
          </h2>
          <p className="text-sm text-text-muted">
            Tanpa perlu login. Isi preferensi hari dan data bimbingan, lalu klik untuk terhubung langsung ke WhatsApp Admin ({BRAND_INFO.contact.whatsapp}).
          </p>
        </div>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-border-whisper shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-6 sm:p-8 md:p-10 space-y-8"
        >
          {/* Step 1: Program & Frequency */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border-whisper">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-wider">
                Pilih Program & Paket Belajar
              </h3>
            </div>

            {/* Level Selector */}
            <div className="grid grid-cols-3 gap-3">
              {PRICING_PACKAGES.map((pkg) => (
                <button
                  key={pkg.levelId}
                  type="button"
                  onClick={() => setLevelId(pkg.levelId as 'calistung' | 'sd' | 'smp')}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    levelId === pkg.levelId
                      ? 'border-primary-container bg-primary-container text-white shadow-xs'
                      : 'border-border-whisper bg-surface-container-low hover:bg-surface-container text-text-primary'
                  }`}
                >
                  <span className="font-headline text-xs sm:text-sm font-bold">
                    {pkg.levelName.split(' ')[0]}
                  </span>
                  <span className={`text-[10px] ${levelId === pkg.levelId ? 'text-white/80' : 'text-text-muted'}`}>
                    {pkg.levelBadge}
                  </span>
                </button>
              ))}
            </div>

            {/* Frequency & Student Count Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
                  Frekuensi Belajar Per Minggu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleFrequencyChange('2x')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      frequency === '2x'
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-whisper bg-surface-container-low text-text-primary'
                    }`}
                  >
                    2x Seminggu (8 sesi)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFrequencyChange('3x')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      frequency === '3x'
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-whisper bg-surface-container-low text-text-primary'
                    }`}
                  >
                    3x Seminggu (12 sesi)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
                  Jumlah Siswa Dalam 1 Sesi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStudentCount(1)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      studentCount === 1
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-whisper bg-surface-container-low text-text-primary'
                    }`}
                  >
                    1 Siswa (Privat)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudentCount(2)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      studentCount === 2
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-whisper bg-surface-container-low text-text-primary'
                    }`}
                  >
                    2 Siswa (Grup Hemat)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Preferred Days & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border-whisper">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <div className="flex items-center justify-between w-full">
                <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-wider">
                  Pilih Hari & Waktu Belajar
                </h3>
                <span className="text-[11px] text-[#DC2626] font-semibold">
                  Wajib pilih {requiredDayCount} hari ({selectedDays.length}/{requiredDayCount} dipilih)
                </span>
              </div>
            </div>

            {/* Day Selector Chips */}
            <div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleToggleDay(day)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                        isSelected
                          ? 'border-[#DC2626] bg-red-50 text-[#DC2626] shadow-xs'
                          : 'border-border-whisper bg-surface-container-lowest text-text-muted hover:text-text-primary hover:border-gray-300'
                      }`}
                    >
                      <span>{day}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#DC2626]" />}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-text-muted mt-2">
                *Contoh kombinasi populer: <strong>Senin & Kamis</strong>, <strong>Selasa & Jumat</strong>, atau <strong>Rabu & Sabtu</strong>.
              </p>
            </div>

            {/* Preferred Time */}
            <div>
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider block mb-2">
                Preferensi Jam Belajar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setPreferredTime(t.value)}
                    className={`p-2.5 rounded-xl text-xs font-semibold border text-center transition-all ${
                      preferredTime === t.value
                        ? 'border-primary-container bg-surface-container-high text-primary font-bold'
                        : 'border-border-whisper bg-surface-container-lowest text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3: Student & Parent Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-border-whisper">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-wider">
                Data Murid & Domisili (Makassar / Gowa)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Nama Orang Tua / Wali
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Ibu Hasnah"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  No. WhatsApp Aktif
                </label>
                <input
                  required
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Nama Siswa
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Muhammad Rayhan"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Jenjang / Kelas
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Kelas 5 SD"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Wilayah Layanan
                </label>
                <select
                  value={cityArea}
                  onChange={(e) => setCityArea(e.target.value as 'Makassar' | 'Gowa')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs font-semibold"
                >
                  <option value="Makassar">Kota Makassar</option>
                  <option value="Gowa">Kabupaten Gowa</option>
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Alamat Lengkap / Patokan Rumah
                </label>
                <input
                  required
                  type="text"
                  placeholder="Contoh: Jl. Hertasning No. 25, dekat RS Grestelina"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Catatan / Fokus Materi Yang Diinginkan
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Butuh guru matematika sabar untuk persiapan ulangan harian dan pendampingan PR."
                className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs resize-none"
              />
            </div>
          </div>

          {/* Pricing Summary & Action CTA */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-low border border-border-whisper flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs text-text-muted uppercase tracking-wider block mb-1">
                Estimasi Biaya Paket ({frequency} / Minggu - {studentCount} Siswa):
              </span>
              <div className="flex items-baseline gap-2">
                <p className="font-headline text-2xl sm:text-3xl font-extrabold text-[#DC2626]">
                  Rp {estimatedPrice.toLocaleString('id-ID')}
                </p>
                <span className="text-xs text-text-muted">/ bulan (4 pertemuan)</span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                *Guru berkualitas disiapkan oleh Admin sesuai hari & jam yang Anda pilih.
              </p>
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Daftar & Kirim via WhatsApp</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
