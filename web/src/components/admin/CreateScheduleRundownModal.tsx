'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Tutor, StudentSession } from '../../types';
import { MOCK_TUTORS } from '../../data/mockData';
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
} from 'lucide-react';

const TIME_OPTIONS = [
  '08:00 - 09:30',
  '10:00 - 11:30',
  '13:00 - 14:30',
  '16:00 - 17:30',
  '18:30 - 20:00',
];

const SUBJECT_OPTIONS = [
  'Matematika',
  'Bahasa Inggris',
  'IPA (Fisika/Biologi)',
  'Calistung (Membaca, Menulis, Berhitung)',
  'Bahasa Indonesia',
  'IPS / PKn',
];

export interface ScheduleItem {
  id: string;
  meetingNumber: number;
  date: string;
  time: string;
  subject: string;
  tutorId: string;
  tutorName: string;
}

export interface CreateScheduleRundownModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSaveRundown?: (sessions: Partial<StudentSession>[]) => void;
  readonly defaultStudentName?: string;
  readonly defaultParentName?: string;
  readonly defaultParentPhone?: string;
}

export function CreateScheduleRundownModal({
  isOpen,
  onClose,
  onSaveRundown,
  defaultStudentName = 'Muhammad Rayhan',
  defaultParentName = 'Ibu Hasnah',
  defaultParentPhone = '081234567890',
}: CreateScheduleRundownModalProps) {
  const [studentName, setStudentName] = useState(defaultStudentName);
  const [parentName, setParentName] = useState(defaultParentName);
  const [parentPhone, setParentPhone] = useState(defaultParentPhone);
  const [packageCount, setPackageCount] = useState<number>(8); // 8 meetings per month default
  const [selectedDays, setSelectedDays] = useState<string[]>(['Senin', 'Kamis']);
  const [defaultTime, setDefaultTime] = useState<string>('16:00 - 17:30');
  const [defaultSubject, setDefaultSubject] = useState<string>('Matematika');

  const [tutorsList, setTutorsList] = useState<readonly Tutor[]>([]);
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [copiedWA, setCopiedWA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch verified tutors from database or fallback to mock data
  useEffect(() => {
    fetch('/api/admin/tutors')
      .then((res) => res.json())
      .then((data) => {
        if (data.tutors && data.tutors.length > 0) {
          const verified = data.tutors
            .filter((t: any) => t.status === 'verified' || t.status === 'active')
            .map((t: any) => ({
              id: t.id,
              name: t.name || 'Pengajar',
              university: t.university || '-',
              title: t.major || t.degree || 'Pengajar',
              subjects: t.subjects || ['Matematika'],
              status: t.status,
            }));
          setTutorsList(verified.length > 0 ? verified : MOCK_TUTORS);
        } else {
          setTutorsList(MOCK_TUTORS.filter((t) => t.isVerified));
        }
      })
      .catch(() => {
        setTutorsList(MOCK_TUTORS.filter((t) => t.isVerified));
      });
  }, []);

  // Filter available verified tutors
  const verifiedTutors = tutorsList.length > 0 ? tutorsList : MOCK_TUTORS.filter((t) => t.isVerified);

  // Generate initial schedule rundown items
  const handleGenerateRundown = () => {
    const items: ScheduleItem[] = [];
    const today = new Date();
    let current = new Date(today);
    // Find next matching day
    current.setDate(current.getDate() + 1);

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
    while (count < packageCount && items.length < packageCount) {
      const dayIdx = current.getDay();
      if (targetDayIndexes.includes(dayIdx) || targetDayIndexes.length === 0) {
        count++;
        const dateStr = current.toLocaleDateString('id-ID', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const assignedTutor = verifiedTutors[(count - 1) % verifiedTutors.length] || defaultTutor;

        items.push({
          id: `item-${count}-${Date.now()}`,
          meetingNumber: count,
          date: dateStr,
          time: defaultTime,
          subject: count % 2 === 0 ? 'Bahasa Inggris' : defaultSubject,
          tutorId: assignedTutor.id,
          tutorName: assignedTutor.name,
        });
      }
      current.setDate(current.getDate() + 1);
    }

    setScheduleItems(items);
  };

  // Auto-generate once when opening modal
  useEffect(() => {
    if (isOpen && scheduleItems.length === 0) {
      handleGenerateRundown();
    }
  }, [isOpen]);

  const handleUpdateItem = (id: string, field: keyof ScheduleItem, value: string) => {
    setScheduleItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (field === 'tutorId') {
            const found = verifiedTutors.find((t) => t.id === value);
            return {
              ...item,
              tutorId: value,
              tutorName: found ? found.name : item.tutorName,
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
    setScheduleItems((prev) => [
      ...prev,
      {
        id: `item-${count}-${Date.now()}`,
        meetingNumber: count,
        date: `Pertemuan Ke-${count}`,
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

  // Format WhatsApp Message for Parent
  const generateWAMessage = () => {
    const lines = scheduleItems.map(
      (item) =>
        `• *Pertemuan ${item.meetingNumber}*: ${item.date} (${item.time})\n  - Mapel: ${item.subject}\n  - Pengajar: ${item.tutorName}`
    );

    return `Halo ${parentName || 'Orang Tua/Wali'}, berikut adalah Rencana Rundown Jadwal Bimbingan Les Privat untuk ananda *${studentName}* (${scheduleItems.length} Sesi Pertemuan):\n\n${lines.join(
      '\n\n'
    )}\n\nMohon konfirmasi jika jadwal di atas sudah sesuai. Terima kasih! - Tim Admin Home Private Nusantara`;
  };

  const handleCopyWA = () => {
    navigator.clipboard.writeText(generateWAMessage());
    setCopiedWA(true);
    setTimeout(() => setCopiedWA(false), 2000);
  };

  const handleSave = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (onSaveRundown) {
        onSaveRundown(
          scheduleItems.map((item) => ({
            studentName,
            tutorId: item.tutorId,
            tutorName: item.tutorName,
            subject: item.subject,
            date: item.date,
            time: item.time,
            status: 'scheduled',
          }))
        );
      }
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title="Generator Rundown & Pembuat Jadwal Sesi"
    >
      <div className="space-y-6 pt-2 text-xs">
        {/* Step 1: Base Configuration */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-border-whisper space-y-4">
          <div className="flex items-center gap-2 font-bold text-primary text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-primary-container" />
            <span>1. Pengaturan Paket & Informasi Wali Murid</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-semibold text-text-muted block mb-1">Nama Siswa</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border-whisper bg-white text-xs"
              />
            </div>

            <div>
              <label className="font-semibold text-text-muted block mb-1">Nama Orang Tua/Wali</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border-whisper bg-white text-xs"
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div>
              <label className="font-semibold text-text-muted block mb-1">Pilihan Hari Belajar Rutin</label>
              <div className="flex flex-wrap gap-1">
                {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day) => {
                  const isSel = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        if (isSel) {
                          setSelectedDays(selectedDays.filter((d) => d !== day));
                        } else {
                          setSelectedDays([...selectedDays, day]);
                        }
                      }}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                        isSel
                          ? 'border-primary bg-primary text-white'
                          : 'border-border-whisper bg-white text-text-muted'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="font-semibold text-text-muted block mb-1">Preferensi Jam Belajar</label>
              <select
                value={defaultTime}
                onChange={(e) => setDefaultTime(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border-whisper bg-white text-xs"
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGenerateRundown}
                className="w-full py-2.5 px-3 rounded-xl bg-primary-container hover:bg-primary-hover text-white font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Otomatiskan Tanggal Sesi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Rundown Table Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-headline text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Matriks Rundown ({scheduleItems.length} Pertemuan)</span>
            </h4>

            <button
              type="button"
              onClick={handleAddMeeting}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Sesi</span>
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto border border-border-whisper rounded-xl hide-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-text-muted font-bold uppercase text-[10px] sticky top-0 z-10 border-b border-border-whisper">
                <tr>
                  <th className="px-3 py-2.5 w-10">No</th>
                  <th className="px-3 py-2.5">Hari & Tanggal</th>
                  <th className="px-3 py-2.5">Jam Sesi</th>
                  <th className="px-3 py-2.5">Mata Pelajaran</th>
                  <th className="px-3 py-2.5">Pengajar (Tutor Terverifikasi)</th>
                  <th className="px-3 py-2.5 w-10 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-whisper bg-white">
                {scheduleItems.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="px-3 py-2 font-bold text-primary">{item.meetingNumber}</td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) => handleUpdateItem(item.id, 'date', e.target.value)}
                        className="w-full p-1.5 rounded-lg border border-border-whisper text-xs bg-surface-container-low/30"
                      />
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={item.time}
                        onChange={(e) => handleUpdateItem(item.id, 'time', e.target.value)}
                        className="p-1.5 rounded-lg border border-border-whisper text-xs bg-white"
                      >
                        {TIME_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={item.subject}
                        onChange={(e) => handleUpdateItem(item.id, 'subject', e.target.value)}
                        className="p-1.5 rounded-lg border border-border-whisper text-xs font-semibold bg-white"
                      >
                        {SUBJECT_OPTIONS.map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2">
                      <select
                        value={item.tutorId}
                        onChange={(e) => handleUpdateItem(item.id, 'tutorId', e.target.value)}
                        className="w-full p-1.5 rounded-lg border border-emerald-300 text-xs font-bold bg-emerald-50/50 text-emerald-900"
                      >
                        {verifiedTutors.map((tut) => (
                          <option key={tut.id} value={tut.id}>
                            {tut.name} ({tut.university || 'Terverifikasi'})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveMeeting(item.id)}
                        className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-border-whisper flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyWA}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            {copiedWA ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Format WA Tersalin!</span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Salin Format Chat WA Ortu</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-end gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              Batal
            </button>
            <Button
              type="button"
              variant="primary"
              size="md"
              isLoading={isSubmitting}
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Terbitkan & Simpan Rundown Sesi</span>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
