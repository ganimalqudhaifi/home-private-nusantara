'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from 'lucide-react';

export interface StudentDatePickerSidebarProps {
  readonly selectedDate: number;
  readonly onSelectDate: (date: number) => void;
  readonly currentMonth?: string;
  readonly currentYear?: number;
  readonly className?: string;
}

export function StudentDatePickerSidebar({
  selectedDate,
  onSelectDate,
  currentMonth = 'Agustus',
  currentYear = 2026,
  className = '',
}: StudentDatePickerSidebarProps) {
  const daysOfWeek = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
  const prevMonthDays = [26, 27, 28, 29, 30, 31];
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const availableDays = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24];

  return (
    <aside
      className={`bg-white dark:bg-surface-container-low border border-border-whisper dark:border-outline-variant rounded-2xl p-6 shadow-sm ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary-container dark:text-blue-300" />
          <h3 className="font-headline text-base font-bold text-primary dark:text-white">
            {currentMonth} {currentYear}
          </h3>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="p-1 rounded-md text-text-muted hover:text-primary dark:hover:text-white hover:bg-surface-container-low transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1 rounded-md text-text-muted hover:text-primary dark:hover:text-white hover:bg-surface-container-low transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs mb-3 text-text-muted">
        {daysOfWeek.map((d, i) => (
          <div key={i} className="font-bold py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-xs mb-6">
        {prevMonthDays.map((d) => (
          <div key={`prev-${d}`} className="p-2 text-gray-300 dark:text-gray-600">
            {d}
          </div>
        ))}
        {currentMonthDays.slice(0, 24).map((d) => {
          const isSelected = selectedDate === d;
          const isAvailable = availableDays.includes(d);

          return (
            <button
              key={`curr-${d}`}
              type="button"
              onClick={() => onSelectDate(d)}
              className={`p-2 rounded-xl font-medium transition-all ${
                isSelected
                  ? 'bg-primary-container text-white font-bold shadow-xs'
                  : isAvailable
                  ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 ring-1 ring-emerald-300/40 font-semibold hover:bg-emerald-100'
                  : 'text-text-primary dark:text-gray-300 hover:bg-surface-container-high'
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t border-border-whisper dark:border-outline-variant space-y-2">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
          <span>Tersedia slot bimbingan</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-container shrink-0" />
          <span>Tanggal yang dipilih ({selectedDate} {currentMonth})</span>
        </div>
      </div>
    </aside>
  );
}
