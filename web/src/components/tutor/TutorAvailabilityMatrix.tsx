'use client';

import React from 'react';
import { BookOpen, GraduationCap, Check } from 'lucide-react';

export interface TutorAvailabilityMatrixProps {
  readonly activeGrades: readonly string[];
  readonly onToggleGrade: (grade: string) => void;
  readonly className?: string;
}

export function TutorAvailabilityMatrix({
  activeGrades,
  onToggleGrade,
  className = '',
}: TutorAvailabilityMatrixProps) {
  const sdGrades = [
    'SD Kelas 1',
    'SD Kelas 2',
    'SD Kelas 3',
    'SD Kelas 4',
    'SD Kelas 5',
    'SD Kelas 6',
  ];

  const smpGrades = ['SMP Kelas 7', 'SMP Kelas 8', 'SMP Kelas 9'];

  return (
    <div
      className={`bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-6 md:p-8 shadow-sm space-y-6 ${className}`}
    >
      <div>
        <h3 className="font-headline text-lg font-bold text-primary dark:text-white">
          Matriks Jenjang & Kelas Bimbingan
        </h3>
        <p className="text-xs text-text-muted dark:text-gray-400 mt-1">
          Pilih kelas yang bersedia Anda ajar. Profil Anda akan muncul pada pencarian jenjang ini.
        </p>
      </div>

      {/* SD Category */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Tingkat Sekolah Dasar (SD)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {sdGrades.map((g) => {
            const isSelected = activeGrades.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => onToggleGrade(g)}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 border-blue-400 shadow-xs'
                    : 'bg-surface-container-low dark:bg-surface-container-high text-text-muted border-border-whisper hover:border-gray-400'
                }`}
              >
                <span>{g.replace('SD ', '')}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* SMP Category */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          <GraduationCap className="w-4 h-4" />
          <span>Tingkat Sekolah Menengah Pertama (SMP)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {smpGrades.map((g) => {
            const isSelected = activeGrades.includes(g);
            return (
              <button
                key={g}
                type="button"
                onClick={() => onToggleGrade(g)}
                className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 border-indigo-400 shadow-xs'
                    : 'bg-surface-container-low dark:bg-surface-container-high text-text-muted border-border-whisper hover:border-gray-400'
                }`}
              >
                <span>{g.replace('SMP ', '')}</span>
                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-300" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
