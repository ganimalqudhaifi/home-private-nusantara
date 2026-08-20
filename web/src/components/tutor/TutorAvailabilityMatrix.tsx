'use client';

import React from 'react';
import { BookOpen, GraduationCap, Check, Clock, CalendarHeart } from 'lucide-react';

import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());


export interface TutorAvailabilityMatrixProps {
  readonly activeSubjects: readonly string[];
  readonly onToggleSubject: (subject: string) => void;
  readonly activeTimeSlots: readonly string[];
  readonly onToggleTimeSlot: (slot: string) => void;
  readonly className?: string;
}

const DAYS_OF_WEEK = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const TIME_OPTIONS = [
  '08:00 - 09:30',
  '10:00 - 11:30',
  '13:00 - 14:30',
  '16:00 - 17:30',
  '18:30 - 20:00',
];

export function TutorAvailabilityMatrix({
  activeSubjects,
  onToggleSubject,
  activeTimeSlots,
  onToggleTimeSlot,
  className = '',
}: TutorAvailabilityMatrixProps) {
  const { data: subjectsData } = useSWR('/api/subjects', fetcher);
  const dynamicSubjects = subjectsData?.subjects || [];
  const TUTOR_SUBJECT_OPTIONS = dynamicSubjects;

  const paudSubjects = TUTOR_SUBJECT_OPTIONS.filter((s: any) => s.category === 'PAUD/TK');
  const sdSubjects = TUTOR_SUBJECT_OPTIONS.filter((s: any) => s.category === 'SD');
  const smpSubjects = TUTOR_SUBJECT_OPTIONS.filter((s: any) => s.category === 'SMP');
  const umumSubjects = TUTOR_SUBJECT_OPTIONS.filter((s: any) => s.category === 'Semua Jenjang');

  return (
    <div
      className={`bg-white rounded-2xl border border-border-whisper p-6 md:p-8 shadow-sm space-y-8 ${className}`}
    >
      <div>
        <h3 className="font-headline text-lg font-bold text-primary">
          Mata Pelajaran & Slot Jam Ketersediaan
        </h3>
        <p className="text-xs text-text-muted mt-1">
          Pilih mata pelajaran yang Anda ampu dan jadwal slot jam ketersediaan rutin Anda.
        </p>
      </div>

      <div className="space-y-6">
        <h4 className="font-semibold text-sm text-text-primary border-b border-border-whisper pb-2">
          1. Mata Pelajaran yang Diampu
        </h4>

        {/* PAUD/TK Category */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-teal-900 uppercase tracking-wider">
            <CalendarHeart className="w-4 h-4" />
            <span>Tingkat PAUD/TK</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {paudSubjects.map((s: any) => {
              const isSelected = activeSubjects.includes(s.name);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onToggleSubject(s.name)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-teal-50 text-teal-900 border-teal-400 shadow-xs'
                      : 'bg-surface-container-low text-text-muted border-border-whisper hover:border-gray-400'
                  }`}
                >
                  <span>{s.name}</span>
                  {isSelected ? <Check className="w-3.5 h-3.5 text-teal-600" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* SD Category */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Tingkat Sekolah Dasar (SD)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {sdSubjects.map((s: any) => {
              const isSelected = activeSubjects.includes(s.name);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onToggleSubject(s.name)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-blue-50 text-blue-900 border-blue-400 shadow-xs'
                      : 'bg-surface-container-low text-text-muted border-border-whisper hover:border-gray-400'
                  }`}
                >
                  <span>{s.name}</span>
                  {isSelected ? <Check className="w-3.5 h-3.5 text-blue-600" /> : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* SMP Category */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>Tingkat Sekolah Menengah Pertama (SMP)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {smpSubjects.map((s: any) => {
              const isSelected = activeSubjects.includes(s.name);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onToggleSubject(s.name)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-indigo-50 text-indigo-900 border-indigo-400 shadow-xs'
                      : 'bg-surface-container-low text-text-muted border-border-whisper hover:border-gray-400'
                  }`}
                >
                  <span>{s.name}</span>
                  {isSelected ? <Check className="w-3.5 h-3.5 text-indigo-600" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-6">
        <h4 className="font-semibold text-sm text-text-primary border-b border-border-whisper pb-2 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>2. Jadwal Ketersediaan Mengajar</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="space-y-3">
              <div className="font-bold text-xs text-text-primary uppercase tracking-wider bg-surface-container-low p-2 rounded-lg text-center border border-border-whisper">
                {day}
              </div>
              <div className="flex flex-col gap-2">
                {TIME_OPTIONS.map((time) => {
                  const slotKey = `${day}:${time}`;
                  const isSelected = activeTimeSlots.includes(slotKey);
                  return (
                    <button
                      key={slotKey}
                      type="button"
                      onClick={() => onToggleTimeSlot(slotKey)}
                      className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-xs'
                          : 'bg-white text-text-muted border-border-whisper hover:border-gray-400'
                      }`}
                    >
                      <span>{time}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
