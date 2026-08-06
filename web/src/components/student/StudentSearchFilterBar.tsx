'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { LevelType } from '../../types';

export interface StudentSearchFilterBarProps {
  readonly selectedLevel: LevelType;
  readonly onSelectLevel: (level: LevelType) => void;
  readonly selectedGrade: number;
  readonly onSelectGrade: (grade: number) => void;
  readonly searchQuery: string;
  readonly onSearchChange: (query: string) => void;
  readonly className?: string;
}

export function StudentSearchFilterBar({
  selectedLevel,
  onSelectLevel,
  selectedGrade,
  onSelectGrade,
  searchQuery,
  onSearchChange,
  className = '',
}: StudentSearchFilterBarProps) {
  const sdGrades = [1, 2, 3, 4, 5, 6];
  const smpGrades = [7, 8, 9];
  const activeGrades = selectedLevel === 'SD' ? sdGrades : smpGrades;

  return (
    <div
      className={`bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-6 shadow-sm space-y-5 ${className}`}
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Segmented Control for Level */}
        <div className="flex p-1 bg-surface-container-high dark:bg-surface-container-high rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => {
              onSelectLevel('SD');
              onSelectGrade(1);
            }}
            className={`flex-1 md:flex-initial px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
              selectedLevel === 'SD'
                ? 'bg-white dark:bg-surface-container-lowest text-primary dark:text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Jenjang SD
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectLevel('SMP');
              onSelectGrade(7);
            }}
            className={`flex-1 md:flex-initial px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${
              selectedLevel === 'SMP'
                ? 'bg-white dark:bg-surface-container-lowest text-primary dark:text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            Jenjang SMP
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari mata pelajaran, nama pengajar, kampus..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-whisper dark:border-outline-variant bg-surface-container-low dark:bg-surface-container-lowest text-sm focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
          />
        </div>
      </div>

      {/* Grade Selector Pills */}
      <div>
        <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2.5">
          PILIH KELAS {selectedLevel}
        </p>
        <div className="flex flex-wrap gap-2">
          {activeGrades.map((g) => {
            const isSelected = selectedGrade === g;
            return (
              <button
                key={g}
                type="button"
                onClick={() => onSelectGrade(g)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? selectedLevel === 'SD'
                      ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/60 dark:text-blue-200 ring-2 ring-blue-500 font-bold shadow-xs'
                      : 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200 ring-2 ring-indigo-500 font-bold shadow-xs'
                    : 'bg-surface-container-low dark:bg-surface-container-lowest text-text-muted border border-border-whisper hover:border-primary-container'
                }`}
              >
                Kelas {g}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
