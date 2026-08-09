'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { BRAND_INFO, PRICING_PACKAGES } from '../../data/mockData';
import { Button } from '../shared/Button';
import {
  MessageCircle,
  CalendarCheck,
  Check,
  BookOpen,
  GraduationCap,
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
  { label: '08:00 - 09:30', value: '08:00 - 09:30' },
  { label: '10:00 - 11:30', value: '10:00 - 11:30' },
  { label: '13:00 - 14:30', value: '13:00 - 14:30' },
  { label: '16:00 - 17:30', value: '16:00 - 17:30' },
  { label: '18:30 - 20:00', value: '18:30 - 20:00' },
] as const;

interface Subject {
  readonly name: string;
  readonly desc: string;
}

interface LevelOptionConfig {
  readonly grades: readonly string[];
  readonly subjects: readonly Subject[];
  readonly placeholderNote: string;
}

const LEVEL_CONFIGS: Record<'calistung' | 'sd' | 'smp', LevelOptionConfig> = {
  calistung: {
    grades: [
      'TK A (4-5 Tahun)',
      'TK B (5-6 Tahun)',
      'Pra-SD / Persiapan Masuk SD',
      'Kelas 1 SD (Remedial Membaca)',
    ],
    subjects: [
      {
        name: 'Calistung',
        desc: 'Membaca, menulis dan menghitung dengan menyenangkan',
      },
    ],
    placeholderNote:
      'Contoh: Anak belum lancar mengeja 2 suku kata, butuh metode belajar visual yang menyenangkan.',
  },
  sd: {
    grades: [
      'Kelas 1 SD',
      'Kelas 2 SD',
      'Kelas 3 SD',
      'Kelas 4 SD',
      'Kelas 5 SD',
      'Kelas 6 SD (Persiapan Ujian)',
    ],
    subjects: [
      {
        name: 'Matematika',
        desc: 'Memahami konsep, logika, dan pemecahan masalah',
      },
      {
        name: 'Bahasa Inggris',
        desc: 'Meningkatkan kemampuan berbicara, membaca, menulis dan memahami',
      },
    ],
    placeholderNote:
      'Contoh: Butuh bimbingan intensif materi pecahan campuran dan persiapan ulangan harian matematika.',
  },
  smp: {
    grades: [
      'Kelas 7 SMP (Fase D)',
      'Kelas 8 SMP',
      'Kelas 9 SMP (Persiapan Masuk SMA)',
    ],
    subjects: [
      {
        name: 'Matematika',
        desc: 'Memahami konsep, logika, dan pemecahan masalah',
      },
      {
        name: 'Bahasa Inggris',
        desc: 'Meningkatkan kemampuan berbicara, membaca, menulis dan memahami',
      },
    ],
    placeholderNote:
      'Contoh: Fokus pendalaman rumus fisika gerak dan aljabar matematika untuk persiapan PTS.',
  },
};

export function QuickBookingFormSection() {
  const [levelId, setLevelId] = useState<'calistung' | 'sd' | 'smp'>('sd');
  const [frequency, setFrequency] = useState<'2x' | '3x'>('2x');
  const [studentCount, setStudentCount] = useState<1 | 2>(1);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Senin', 'Kamis']);
  const [preferredTime, setPreferredTime] = useState<string>(TIME_OPTIONS[2].value);

  // Dynamic Class, Subjects & Name state for Student 1 and Student 2
  const [selectedGrade1, setSelectedGrade1] = useState<string>(LEVEL_CONFIGS.sd.grades[3]);
  const [selectedSubjects1, setSelectedSubjects1] = useState<string[]>([LEVEL_CONFIGS.sd.subjects[0].name]);
  const [studentName1, setStudentName1] = useState('');

  const [selectedGrade2, setSelectedGrade2] = useState<string>(LEVEL_CONFIGS.sd.grades[1]);
  const [selectedSubjects2, setSelectedSubjects2] = useState<string[]>([LEVEL_CONFIGS.sd.subjects[0].name]);
  const [studentName2, setStudentName2] = useState('');

  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [cityArea, setCityArea] = useState<'Makassar' | 'Gowa'>('Makassar');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const requiredDayCount = frequency === '2x' ? 2 : 3;
  const currentConfig = LEVEL_CONFIGS[levelId];

  // When user changes program level, synchronize grade and subjects defaults
  const handleLevelChange = (newLevel: 'calistung' | 'sd' | 'smp') => {
    setLevelId(newLevel);
    const config = LEVEL_CONFIGS[newLevel];
    setSelectedGrade1(config.grades[0]);
    setSelectedSubjects1([config.subjects[0].name]);
    setSelectedGrade2(config.grades[1] || config.grades[0]);
    setSelectedSubjects2([config.subjects[0].name]);
  };

  // Toggle Subject selection for Student 1
  const handleToggleSubject1 = (subject: string) => {
    if (selectedSubjects1.includes(subject)) {
      if (selectedSubjects1.length > 1) {
        setSelectedSubjects1(selectedSubjects1.filter((s) => s !== subject));
      }
    } else {
      setSelectedSubjects1([...selectedSubjects1, subject]);
    }
  };

  // Toggle Subject selection for Student 2
  const handleToggleSubject2 = (subject: string) => {
    if (selectedSubjects2.includes(subject)) {
      if (selectedSubjects2.length > 1) {
        setSelectedSubjects2(selectedSubjects2.filter((s) => s !== subject));
      }
    } else {
      setSelectedSubjects2([...selectedSubjects2, subject]);
    }
  };

  // Toggle Day Selection with Limit
  const handleToggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      if (selectedDays.length < requiredDayCount) {
        setSelectedDays([...selectedDays, day]);
      } else {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedPkg = PRICING_PACKAGES.find((p) => p.levelId === levelId);
    const daysStr = selectedDays.join(', ') || 'Belum dipilih';

    const gradeSummary =
      studentCount === 1
        ? `${selectedGrade1} (${selectedPkg?.levelName || levelId.toUpperCase()})`
        : `Siswa 1: ${selectedGrade1}, Siswa 2: ${selectedGrade2} (${selectedPkg?.levelName || levelId.toUpperCase()})`;

    try {
      await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: parentName || 'Calon Orang Tua',
          parentPhone: parentPhone || '-',
          studentGrade: gradeSummary,
          preferredSchedule: `${daysStr} | ${preferredTime}`,
        }),
      });
    } catch (err) {
      console.error('Failed to record consultation:', err);
    }

    const studentDetailsMsg =
      studentCount === 1
        ? `- Tingkatan / Kelas: ${selectedGrade1}
- Mata Pelajaran / Fokus: ${selectedSubjects1.join(', ') || 'Semua Materi'}
- Nama Siswa: ${studentName1 || '-'}`
        : `- Rincian Siswa 1: ${studentName1 || 'Siswa 1'} (${selectedGrade1} - ${selectedSubjects1.join(', ') || 'Semua Materi'})
- Rincian Siswa 2: ${studentName2 || 'Siswa 2'} (${selectedGrade2} - ${selectedSubjects2.join(', ') || 'Semua Materi'})`;

    const message = `Halo Admin Home Private Nusantara, saya ingin mendaftar/konsultasi les privat di rumah dengan formulir berikut:

*Rincian Paket & Jadwal:*
- Program: ${selectedPkg?.levelName || levelId.toUpperCase()}
${studentDetailsMsg}
- Frekuensi: ${frequency} seminggu (${studentCount} Siswa)
- Estimasi Biaya: Rp ${estimatedPrice.toLocaleString('id-ID')} / bulan
- Pilihan Hari Belajar: ${daysStr}
- Pilihan Waktu Belajar: ${preferredTime}

*Data Siswa & Orang Tua:*
- Nama Orang Tua/Wali: ${parentName || '-'}
- No. WhatsApp: ${parentPhone || '-'}
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
            Tanpa perlu login. Pilih paket dan preferensi hari, lalu klik untuk konsultasi via WhatsApp Admin ({BRAND_INFO.contact.whatsapp}).
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
              {PRICING_PACKAGES.map((pkg) => {
                const isCurrent = levelId === pkg.levelId;
                return (
                  <button
                    key={pkg.levelId}
                    type="button"
                    onClick={() => handleLevelChange(pkg.levelId as 'calistung' | 'sd' | 'smp')}
                    className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isCurrent
                        ? 'border-primary-container bg-primary-container text-white shadow-xs'
                        : 'border-border-whisper bg-surface-container-low hover:bg-surface-container text-text-primary'
                    }`}
                  >
                    <span className="font-headline text-xs sm:text-sm font-bold">
                      {pkg.levelName.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] ${isCurrent ? 'text-white/80' : 'text-text-muted'}`}>
                      {pkg.levelBadge}
                    </span>
                  </button>
                );
              })}
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

          {/* Step 3: Dynamic Class, Subject & Student Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-2 border-b border-border-whisper">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-headline text-sm font-bold text-primary uppercase tracking-wider">
                Data Orang Tua & Murid
              </h3>
            </div>

            {/* Parent Form Fields */}
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

            {/* Student Info Section */}
            {studentCount === 1 ? (
              /* Single Student Form */
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-border-whisper space-y-4">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4 text-primary-container" />
                  <span>Data Murid</span>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                    Nama Siswa
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Contoh: Muhammad Rayhan"
                    value={studentName1}
                    onChange={(e) => setStudentName1(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-white text-xs"
                  />
                </div>

                {/* Class Chips for Student 1 */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <span>Pilih Tingkatan Kelas ({levelId.toUpperCase()}):</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentConfig.grades.map((gr) => {
                      const isSelected = selectedGrade1 === gr;
                      return (
                        <button
                          key={gr}
                          type="button"
                          onClick={() => setSelectedGrade1(gr)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                            isSelected
                              ? 'border-primary-container bg-primary-container text-white shadow-xs'
                              : 'border-border-whisper bg-surface-container-low hover:bg-surface-container text-text-primary'
                          }`}
                        >
                          {gr}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subject Tags for Student 1 */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary-container" />
                    <span>Mata Pelajaran / Fokus Bimbingan:</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentConfig.subjects.map((sub) => {
                      const isSelected = selectedSubjects1.includes(sub.name);
                      return (
                        <button
                          key={sub.name}
                          type="button"
                          onClick={() => handleToggleSubject1(sub.name)}
                          className={`px-3.5 py-2.5 rounded-xl text-left border transition-all flex flex-col gap-0.5 ${
                            isSelected
                              ? 'border-[#DC2626] bg-red-50 shadow-xs'
                              : 'border-border-whisper bg-white hover:border-gray-300'
                          }`}
                        >
                          <span className={`text-xs font-bold flex items-center gap-1.5 ${isSelected ? 'text-[#DC2626]' : 'text-text-primary'}`}>
                            {sub.name}
                            {isSelected && <Check className="w-3 h-3 text-[#DC2626]" />}
                          </span>
                          <span className={`text-[10px] leading-tight ${isSelected ? 'text-[#DC2626]/70' : 'text-text-muted'}`}>
                            {sub.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Two Students Form (Grup Hemat) */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <label className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-primary-container" />
                    <span>Data Murid 1 & Murid 2 (2 Siswa dalam 1 Sesi)</span>
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    Bisa Beda Kelas & Beda Mapel
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Student 1 Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-border-whisper space-y-4 relative">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                        1
                      </span>
                      <h4 className="font-bold text-xs text-primary uppercase">Siswa Pertama</h4>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Nama Siswa 1
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Muhammad Rayhan"
                        value={studentName1}
                        onChange={(e) => setStudentName1(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-white text-xs"
                      />
                    </div>

                    {/* Class Chips for Student 1 */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                        Tingkatan Kelas Siswa 1:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {currentConfig.grades.map((gr) => {
                          const isSelected = selectedGrade1 === gr;
                          return (
                            <button
                              key={gr}
                              type="button"
                              onClick={() => setSelectedGrade1(gr)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                isSelected
                                  ? 'border-primary-container bg-primary-container text-white shadow-xs'
                                  : 'border-border-whisper bg-surface-container-low hover:bg-surface-container text-text-primary'
                              }`}
                            >
                              {gr}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subject Tags for Student 1 */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                        Mata Pelajaran Siswa 1:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {currentConfig.subjects.map((sub) => {
                          const isSelected = selectedSubjects1.includes(sub.name);
                          return (
                            <button
                              key={sub.name}
                              type="button"
                              onClick={() => handleToggleSubject1(sub.name)}
                              className={`px-3 py-2 rounded-xl text-left border transition-all flex flex-col gap-0.5 ${
                                isSelected
                                  ? 'border-[#DC2626] bg-red-50 shadow-xs'
                                  : 'border-border-whisper bg-white hover:border-gray-300'
                              }`}
                            >
                              <span className={`text-xs font-bold flex items-center gap-1.5 ${isSelected ? 'text-[#DC2626]' : 'text-text-primary'}`}>
                                {sub.name}
                                {isSelected && <Check className="w-3 h-3 text-[#DC2626]" />}
                              </span>
                              <span className={`text-[9px] leading-tight ${isSelected ? 'text-[#DC2626]/70' : 'text-text-muted'}`}>
                                {sub.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Student 2 Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-border-whisper space-y-4 relative">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                        2
                      </span>
                      <h4 className="font-bold text-xs text-emerald-800 uppercase">Siswa Kedua</h4>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Nama Siswa 2
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Aisha Azahra"
                        value={studentName2}
                        onChange={(e) => setStudentName2(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border-whisper bg-white text-xs"
                      />
                    </div>

                    {/* Class Chips for Student 2 */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                        Tingkatan Kelas Siswa 2:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {currentConfig.grades.map((gr) => {
                          const isSelected = selectedGrade2 === gr;
                          return (
                            <button
                              key={gr}
                              type="button"
                              onClick={() => setSelectedGrade2(gr)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                                isSelected
                                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                                  : 'border-border-whisper bg-surface-container-low hover:bg-surface-container text-text-primary'
                              }`}
                            >
                              {gr}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Subject Tags for Student 2 */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                        Mata Pelajaran Siswa 2:
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {currentConfig.subjects.map((sub) => {
                          const isSelected = selectedSubjects2.includes(sub.name);
                          return (
                            <button
                              key={sub.name}
                              type="button"
                              onClick={() => handleToggleSubject2(sub.name)}
                              className={`px-3 py-2 rounded-xl text-left border transition-all flex flex-col gap-0.5 ${
                                isSelected
                                  ? 'border-emerald-600 bg-emerald-50 shadow-xs'
                                  : 'border-border-whisper bg-white hover:border-gray-300'
                              }`}
                            >
                              <span className={`text-xs font-bold flex items-center gap-1.5 ${isSelected ? 'text-emerald-700' : 'text-text-primary'}`}>
                                {sub.name}
                                {isSelected && <Check className="w-3 h-3 text-emerald-700" />}
                              </span>
                              <span className={`text-[9px] leading-tight ${isSelected ? 'text-emerald-700/70' : 'text-text-muted'}`}>
                                {sub.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Location & Address */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Catatan / Kebutuhan Belajar Siswa
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={currentConfig.placeholderNote}
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
                <span className="text-xs text-text-muted">
                  / bulan ({frequency === '2x' ? '8' : '12'} pertemuan)
                </span>
              </div>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                {studentCount === 1
                  ? `*Program: ${selectedGrade1} • ${selectedSubjects1.join(', ')}`
                  : `*Siswa 1: ${selectedGrade1} (${selectedSubjects1.join(', ')}) • Siswa 2: ${selectedGrade2} (${selectedSubjects2.join(', ')})`}
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
