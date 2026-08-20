'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Modal } from '../shared/Modal';
import { Tutor, StudentSession, Student } from '../../types';
import { CreateStudentModal } from './CreateStudentModal';


const fetcher = (url: string) => fetch(url).then(res => res.json());

import {
  Calendar,
  Clock,
  UserCheck,
  BookOpen,
  Plus,
  Trash2,
  Copy,
  Check,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  MapPin,
  UserPlus,
  User,
  Phone,
  GraduationCap,
  School,
  AlertCircle,
} from 'lucide-react';

const DAYS_OF_WEEK = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const TIME_OPTIONS = [
  '08:00 - 09:30',
  '10:00 - 11:30',
  '13:00 - 14:30',
  '16:00 - 17:30',
  '18:30 - 20:00',
];

export interface ScheduleItem {
  id: string;
  meetingNumber: number;
  date: string; // YYYY-MM-DD
  time: string;
  subject: string;
  tutorId: string;
  tutorName: string;
}

export interface CreateScheduleRundownModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSaveRundown?: (sessions: any[]) => Promise<any> | void;
  readonly defaultStudentName?: string;
  readonly defaultParentName?: string;
  readonly defaultParentPhone?: string;
  readonly defaultAddress?: string;
}

export function CreateScheduleRundownModal({
  isOpen,
  onClose,
  onSaveRundown,
  defaultStudentName = 'Muhammad Rayhan',
  defaultParentName = 'Ibu Hasnah',
  defaultParentPhone = '081234567890',
  defaultAddress = 'Jl. Hertasning No. 25, Makassar',
}: CreateScheduleRundownModalProps) {
  const { data: subjectsData } = useSWR('/api/subjects', fetcher);
  const dynamicSubjects = subjectsData?.subjects || [];
  const TUTOR_SUBJECT_NAMES = dynamicSubjects.map((s: any) => s.name);

  const getTodayISO = () => new Date().toISOString().split('T')[0];

  const { data: studentsData, isLoading: isLoadingStudents, mutate: mutateStudents } = useSWR('/api/admin/students');
  const { data: tutorsData } = useSWR('/api/admin/tutors');

  const studentsList: Student[] = React.useMemo(() => {
    if (studentsData?.students && Array.isArray(studentsData.students)) {
      return studentsData.students.map((s: any) => ({
        id: s.id,
        name: s.name || 'Siswa',
        level: s.level || 'SD',
        grade: Number(s.grade ?? 4),
        school: s.school || 'SD/SMP Nusantara',
        parentName: s.parentName || 'Wali Murid',
        parentPhone: s.parentPhone || '-',
        address: s.address || 'Makassar',
        totalSessions: Number(s.totalSessions || 0),
        activeBookings: Number(s.activeBookings || 0),
        joinDate: s.joinDate || '2025',
      }));
    }
    return [];
  }, [studentsData]);

  const verifiedTutors: Tutor[] = React.useMemo(() => {
    if (tutorsData?.tutors && Array.isArray(tutorsData.tutors)) {
      return tutorsData.tutors
        .filter((t: any) => t.status === 'verified' || t.status === 'active')
        .map((t: any) => ({
          id: t.id,
          name: t.name || 'Pengajar',
          university: t.university || '-',
          title: t.major || t.degree || 'Pengajar',
          subjects: t.subjects || ['Matematika SD'],
          status: t.status,
        }));
    }
    return [];
  }, [tutorsData]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState<boolean>(false);

  const [studentName, setStudentName] = useState(defaultStudentName);
  const [parentName, setParentName] = useState(defaultParentName);
  const [parentPhone, setParentPhone] = useState(defaultParentPhone);
  const [startDate, setStartDate] = useState<string>(getTodayISO());
  const [locationArea, setLocationArea] = useState<'Makassar' | 'Gowa'>('Makassar');
  const [address, setAddress] = useState<string>(defaultAddress);

  const [packageCount, setPackageCount] = useState<number>(8); // 8 meetings per month default
  const [selectedDays, setSelectedDays] = useState<string[]>(['Senin', 'Kamis']);
  const [defaultTime, setDefaultTime] = useState<string>('16:00 - 17:30');
  const [defaultSubject, setDefaultSubject] = useState<string>('Matematika SD');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [copiedWA, setCopiedWA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [topError, setTopError] = useState<string | null>(null);
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

  // Auto-select first student when data loads
  useEffect(() => {
    if (!selectedStudentId && studentsList.length > 0) {
      const first = studentsList[0];
      setSelectedStudentId(first.id);
      setStudentName(first.name);
      setParentName(first.parentName);
      setParentPhone(first.parentPhone);
      setAddress(first.address);
      setLocationArea(first.address.toLowerCase().includes('gowa') ? 'Gowa' : 'Makassar');
    }
  }, [studentsList, selectedStudentId]);

  const handleSelectStudent = (id: string) => {
    setSelectedStudentId(id);
    const chosen = studentsList.find((s) => s.id === id);
    if (chosen) {
      setStudentName(chosen.name);
      setParentName(chosen.parentName);
      setParentPhone(chosen.parentPhone);
      setAddress(chosen.address);
      setLocationArea(chosen.address.toLowerCase().includes('gowa') ? 'Gowa' : 'Makassar');
    }
  };

  const handleStudentCreated = async (newStudent: Student) => {
    await mutateStudents(); // Refresh student list using SWR
    setSelectedStudentId(newStudent.id);
    setStudentName(newStudent.name);
    setParentName(newStudent.parentName);
    setParentPhone(newStudent.parentPhone);
    setAddress(newStudent.address);
    setLocationArea(newStudent.address.toLowerCase().includes('gowa') ? 'Gowa' : 'Makassar');
  };

  const formatIndonesianDate = (isoDate: string) => {
    if (!isoDate) return '-';
    const [year, month, day] = isoDate.split('-').map(Number);
    if (!year || !month || !day) return isoDate;
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleGenerateRundown = () => {
    const items: ScheduleItem[] = [];
    const baseDate = startDate ? new Date(startDate) : new Date();
    let current = new Date(baseDate);

    const defaultTutor = verifiedTutors[0] || { id: 'tutor-1', name: 'Kak Sarah - S1 Math UNM' };

    const dayMap: Record<string, number> = {
      Minggu: 0,
      Senin: 1,
      Selasa: 2,
      Rabu: 3,
      Kamis: 4,
      Jumat: 5,
      Sabtu: 6,
    };

    const targetDayIndexes = selectedDays
      .map((d) => dayMap[d])
      .filter((n) => n !== undefined)
      .sort((a, b) => a - b);

    let count = 0;
    let safetyCounter = 0;

    while (count < packageCount && safetyCounter < 120) {
      safetyCounter++;
      const dayIdx = current.getDay();

      if (targetDayIndexes.includes(dayIdx) || targetDayIndexes.length === 0) {
        count++;
        const isoString = current.toISOString().split('T')[0];
        const assignedTutor = verifiedTutors[(count - 1) % verifiedTutors.length] || defaultTutor;

        items.push({
          id: `item-${count}-${Date.now()}`,
          meetingNumber: count,
          date: isoString,
          time: defaultTime,
          subject: defaultSubject,
          tutorId: assignedTutor.id,
          tutorName: assignedTutor.name,
        });
      }
      current.setDate(current.getDate() + 1);
    }

    setScheduleItems(items);
  };

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter((d) => d !== day));
      }
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleItemChange = (id: string, field: keyof ScheduleItem, value: any) => {
    // Clear error for this row when user edits it
    if (rowErrors[id]) {
      setRowErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[id];
        return newErrs;
      });
    }

    setScheduleItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (field === 'tutorId') {
            const tutor = verifiedTutors.find((t) => t.id === value);
            return {
              ...item,
              tutorId: value,
              tutorName: tutor ? tutor.name : 'Pengajar',
            };
          }
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleAddMeeting = () => {
    const count = scheduleItems.length + 1;
    const defaultTutor = verifiedTutors[0] || { id: 'tutor-1', name: 'Pengajar' };
    const lastDateIso = scheduleItems[scheduleItems.length - 1]?.date || getTodayISO();

    setScheduleItems((prev) => [
      ...prev,
      {
        id: `item-${count}-${Date.now()}`,
        meetingNumber: count,
        date: lastDateIso,
        time: defaultTime,
        subject: defaultSubject,
        tutorId: defaultTutor.id,
        tutorName: defaultTutor.name,
      },
    ]);
  };

  const handleRemoveMeeting = (id: string) => {
    setScheduleItems((prev) =>
      prev.filter((i) => i.id !== id).map((item, idx) => ({ ...item, meetingNumber: idx + 1 }))
    );
  };

  const generateWAMessage = () => {
    const lines = scheduleItems.map(
      (item) =>
        `• *Pertemuan ${item.meetingNumber}*: ${formatIndonesianDate(item.date)} (${item.time})\n  - Mapel: ${item.subject}\n  - Pengajar: ${item.tutorName}`
    );

    return `Halo ${parentName || 'Orang Tua/Wali'}, berikut adalah Rencana Rundown Jadwal Bimbingan Les Privat untuk ananda *${studentName}* (${scheduleItems.length} Sesi Pertemuan):\n\n*Lokasi Mengajar:* ${address} (${locationArea})\n\n${lines.join(
      '\n\n'
    )}\n\nMohon konfirmasi jika jadwal & lokasi di atas sudah sesuai. Terima kasih! - Tim Admin Home Private Nusantara`;
  };

  const handleCopyWA = () => {
    navigator.clipboard.writeText(generateWAMessage());
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2000);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setTopError(null);
    setRowErrors({});
    
    if (onSaveRundown) {
      const payload = scheduleItems.map((item) => ({
        localId: item.id,
        studentName,
        parentName,
        parentPhone,
        tutorId: item.tutorId,
        tutorName: item.tutorName,
        subject: item.subject,
        date: item.date,
        time: item.time,
        address,
        city: locationArea,
        status: 'scheduled',
      }));

      const res = await onSaveRundown(payload);
      setIsSubmitting(false);

      if (res && res.success === false) {
        setTopError(res.error || 'Terjadi kesalahan saat menyimpan jadwal.');
        if (res.collisions && Array.isArray(res.collisions)) {
          const errorsMap: Record<string, string> = {};
          res.collisions.forEach((c: any) => {
            if (c.localId) {
              errorsMap[c.localId] = c.reason || 'Jadwal bentrok';
            }
          });
          setRowErrors(errorsMap);
        }
        return; // Abort close
      }
    }
    
    setIsSubmitting(false);
    onClose();
  };

  const selectedStudentObj = studentsList.find((s) => s.id === selectedStudentId);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        maxWidth="4xl"
        title="Generator Rundown & Pembuat Jadwal Sesi"
      >
        <div className="space-y-6 pt-2 text-xs">
          {topError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-red-700 animate-fade-in">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <div>
                <h4 className="font-bold text-sm">Gagal Menyimpan Jadwal</h4>
                <p className="text-xs mt-0.5">{topError}</p>
              </div>
            </div>
          )}

          {/* Step 1: Base Configuration */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-border-whisper space-y-4">
            <div className="flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-primary-container" />
              <span>1. Pilih Siswa, Wilayah & Pengaturan Jadwal Belajar</span>
            </div>

            {/* Student Selector & Add Student Button */}
            <div>
              <label className="font-semibold text-text-primary block mb-1.5">
                Pilih Siswa Terdaftar <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleSelectStudent(e.target.value)}
                  disabled={isLoadingStudents}
                  className="w-full sm:flex-1 min-w-0 p-2.5 rounded-xl border border-border-whisper bg-white text-xs font-medium outline-none focus:border-primary transition-colors disabled:opacity-50"
                >
                  {isLoadingStudents ? (
                    <option value="">Memuat data siswa dari database...</option>
                  ) : studentsList.length === 0 ? (
                    <option value="">Belum ada siswa terdaftar. Klik + Tambah Siswa Baru.</option>
                  ) : (
                    studentsList.map((s: any) => (
                      <option key={s.id} value={s.id}>
                        {s.name} — {s.level} Kelas {s.grade} (Orang Tua: {s.parentName})
                      </option>
                    ))
                  )}
                </select>

                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(true)}
                  className="px-3.5 py-2.5 bg-primary-container hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 w-full sm:w-auto"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ Tambah Siswa Baru</span>
                </button>
              </div>
            </div>

            {/* Selected Student Card Summary */}
            {selectedStudentObj && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/60 via-white to-surface-container-low border border-blue-100/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs min-w-0">
                {/* Left: Avatar & Student Details */}
                <div className="flex items-start gap-3.5 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shrink-0 shadow-xs ${
                      selectedStudentObj.level === 'SD'
                        ? 'bg-blue-600'
                        : 'bg-indigo-600'
                    }`}
                  >
                    {selectedStudentObj.level === 'SD' ? (
                      <BookOpen className="w-5 h-5" />
                    ) : (
                      <GraduationCap className="w-5 h-5" />
                    )}
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="font-headline text-base font-extrabold text-primary">
                        {selectedStudentObj.name}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-bold border shadow-2xs ${
                          selectedStudentObj.level === 'SD'
                            ? 'bg-blue-100 border-blue-200 text-blue-950'
                            : 'bg-indigo-100 border-indigo-200 text-indigo-950'
                        }`}
                      >
                        {selectedStudentObj.level} Kelas {selectedStudentObj.grade}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-text-muted text-xs flex-wrap">
                      <span className="flex items-center gap-1.5 font-medium">
                        <School className="w-4 h-4 text-primary/70 shrink-0" />
                        <span className="truncate max-w-[200px] sm:max-w-xs">{selectedStudentObj.school}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          Wali: <strong className="text-text-primary font-semibold">{selectedStudentObj.parentName}</strong> ({selectedStudentObj.parentPhone})
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Address Mini Card */}
                <div className="p-2.5 px-3 rounded-xl bg-white border border-border-whisper shadow-2xs shrink-0 min-w-0 md:max-w-xs">
                  <div className="flex items-center gap-1 text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-0.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>Alamat Domisili Siswa</span>
                  </div>
                  <p className="text-xs text-text-primary font-medium truncate" title={selectedStudentObj.address}>
                    {selectedStudentObj.address}
                  </p>
                </div>
              </div>
            )}

            {/* Location Area & Address Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
              <div className="sm:col-span-4">
                <label className="font-semibold text-text-muted block mb-1">Wilayah Layanan</label>
                <select
                  value={locationArea}
                  onChange={(e) => setLocationArea(e.target.value as 'Makassar' | 'Gowa')}
                  className="w-full p-2.5 rounded-xl border border-border-whisper bg-white font-semibold text-xs"
                >
                  <option value="Makassar">Kota Makassar</option>
                  <option value="Gowa">Kabupaten Gowa</option>
                </select>
              </div>

              <div className="sm:col-span-8">
                <label className="font-semibold text-text-muted flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Alamat Lengkap / Lokasi Mengajar</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Contoh: Jl. Hertasning No. 25, dekat RS Grestelina"
                  className="w-full p-2.5 rounded-xl border border-border-whisper bg-white text-xs"
                />
              </div>
            </div>

            {/* Start Date, Package Count & Day Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="font-semibold text-text-muted block mb-1">Tanggal Mulai Pertemuan Ke-1</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border-whisper bg-white font-semibold text-xs text-primary"
                />
              </div>

              <div>
                <label className="font-semibold text-text-muted block mb-1">Jumlah Pertemuan Paket</label>
                <select
                  value={packageCount}
                  onChange={(e) => setPackageCount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-border-whisper bg-white font-semibold text-xs"
                >
                  <option value={4}>Paket 4x Pertemuan (1x / minggu)</option>
                  <option value={8}>Paket 8x Pertemuan (2x / minggu)</option>
                  <option value={12}>Paket 12x Pertemuan (3x / minggu)</option>
                  <option value={16}>Paket 16x Pertemuan (4x / minggu)</option>
                </select>
              </div>
            </div>

            {/* Days Selection Chips */}
            <div>
              <label className="font-semibold text-text-primary block mb-1.5">
                Pilih Hari Belajar Rutin Per Minggu <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDaySelection(day)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-primary-container text-white border-primary-container shadow-xs'
                          : 'bg-white border-border-whisper text-text-muted hover:bg-surface-container-high'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerateRundown}
                className="w-full p-3 rounded-xl bg-primary-container hover:bg-primary-hover text-white font-bold text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Rundown Pertemuan ({packageCount} Sesi)</span>
              </button>
            </div>
          </div>

          {/* Step 2: Schedule Table */}
          {scheduleItems.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-primary-container" />
                  <span>2. Rencana Pertemuan ({scheduleItems.length} Sesi Paket)</span>
                </div>

                <button
                  type="button"
                  onClick={handleAddMeeting}
                  className="inline-flex items-center gap-1 bg-surface-container-high hover:bg-border-whisper text-text-primary px-3 py-1.5 rounded-xl font-bold transition-all text-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Pertemuan</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-border-whisper overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead className="bg-surface-container-low/70 border-b border-border-whisper text-[11px] text-text-muted uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="px-4 py-3 text-center">Sesi</th>
                        <th className="px-4 py-3">Tanggal Pertemuan</th>
                        <th className="px-4 py-3">Jam Belajar</th>
                        <th className="px-4 py-3">Mata Pelajaran</th>
                        <th className="px-4 py-3">Tentor / Pengajar Target</th>
                        <th className="px-4 py-3 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-whisper text-xs">
                      {scheduleItems.map((item) => (
                        <React.Fragment key={item.id}>
                          <tr className={`transition-colors ${rowErrors[item.id] ? 'bg-red-50/50 border-t border-b border-red-200' : 'hover:bg-surface-container-low/30'}`}>
                            <td className="px-4 py-3 text-center font-bold text-primary font-mono">
                              #{item.meetingNumber}
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="date"
                                value={item.date}
                                onChange={(e) => handleItemChange(item.id, 'date', e.target.value)}
                                className={`p-1.5 rounded-lg border text-xs font-semibold outline-none ${rowErrors[item.id] ? 'border-red-300 text-red-700 bg-white' : 'border-border-whisper text-primary'}`}
                              />
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={item.time}
                                onChange={(e) => handleItemChange(item.id, 'time', e.target.value)}
                                className={`p-1.5 rounded-lg border text-xs outline-none bg-white ${rowErrors[item.id] ? 'border-red-300 text-red-700' : 'border-border-whisper'}`}
                              >
                                {TIME_OPTIONS.map((t) => (
                                  <option key={t} value={t}>
                                    {t}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={item.subject}
                                onChange={(e) => handleItemChange(item.id, 'subject', e.target.value)}
                                className={`p-1.5 rounded-lg border text-xs font-semibold outline-none bg-white ${rowErrors[item.id] ? 'border-red-300 text-red-700' : 'border-border-whisper text-primary'}`}
                              >
                                {TUTOR_SUBJECT_NAMES.map((s: any) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={item.tutorId}
                                onChange={(e) => handleItemChange(item.id, 'tutorId', e.target.value)}
                                className={`p-1.5 rounded-lg border text-xs outline-none bg-white w-full max-w-[200px] ${rowErrors[item.id] ? 'border-red-300 text-red-700' : 'border-border-whisper'}`}
                              >
                                {verifiedTutors.map((t) => (
                                  <option key={t.id} value={t.id}>
                                    {t.name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                type="button"
                                onClick={() => handleRemoveMeeting(item.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Hapus Pertemuan Ini"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                          {rowErrors[item.id] && (
                            <tr className="bg-red-50/50 border-b border-red-200">
                              <td colSpan={6} className="px-4 pb-2 pt-0 text-red-600 text-[11px] font-medium text-center">
                                ⚠️ {rowErrors[item.id]}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border-whisper">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleCopyWA}
                disabled={scheduleItems.length === 0}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-600/30 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold transition-all text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {copiedWA ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Format Terdisalin!</span>
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    <span>Salin Format WA Wali</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-text-muted hover:bg-surface-container-high transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isSubmitting || scheduleItems.length === 0}
                onClick={handleSave}
                className="px-5 py-2.5 bg-primary-container hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Menyimpan Sesi...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Simpan & Terbitkan Sesi ({scheduleItems.length})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Modal Tambah Siswa Baru */}
      <CreateStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onStudentCreated={handleStudentCreated}
      />
    </>
  );
}
