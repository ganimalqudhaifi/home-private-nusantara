'use client';

import React, { useState } from'react';
import { ChevronLeft, ChevronRight } from'lucide-react';

export interface MiniDatePickerProps {
 readonly selectedDate?: number;
 readonly onSelectDate?: (date: number) => void;
 readonly className?: string;
}

export function MiniDatePicker({
 selectedDate = 10,
 onSelectDate,
 className ='',
}: MiniDatePickerProps) {
 const [internalSelected, setInternalSelected] = useState<number>(selectedDate);

 const handleSelect = (day: number) => {
 setInternalSelected(day);
 if (onSelectDate) onSelectDate(day);
 };

 const daysOfWeek = ['S','S','R','K','J','S','M'];
 const prevMonthDays = [28, 29, 30];
 const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
 const availableDays = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

 return (
 <div
 className={`bg-white rounded-xl border border-border-whisper p-4 shadow-sm ${className}`}
 >
 <div className="flex justify-between items-center mb-3">
 <span className="font-headline text-sm font-semibold text-text-primary">
 Pilih Jadwal Belajar
 </span>
 <div className="flex gap-1">
 <button
 type="button"
 className="p-1 rounded-md text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors"
 >
 <ChevronLeft className="w-4 h-4" />
 </button>
 <button
 type="button"
 className="p-1 rounded-md text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors"
 >
 <ChevronRight className="w-4 h-4" />
 </button>
 </div>
 </div>

 <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs mb-2 text-text-muted">
 {daysOfWeek.map((d, i) => (
 <div key={i} className="font-semibold py-1">
 {d}
 </div>
 ))}
 </div>

 <div className="grid grid-cols-7 gap-1 text-center text-xs">
 {prevMonthDays.map((d) => (
 <div key={`prev-${d}`} className="p-1.5 text-gray-300">
 {d}
 </div>
 ))}
 {currentMonthDays.slice(0, 18).map((d) => {
 const isSelected = internalSelected === d;
 const isAvailable = availableDays.includes(d);

 return (
 <button
 key={`day-${d}`}
 type="button"
 onClick={() => handleSelect(d)}
 className={`p-1.5 rounded-lg font-medium transition-all ${
 isSelected
 ?'bg-primary-container text-white font-bold shadow-xs'
 : isAvailable
 ?'bg-emerald-50 text-emerald-800 font-semibold ring-1 ring-emerald-300/40 hover:bg-emerald-100'
 :'text-text-primary hover:bg-surface-container-high'
 }`}
 >
 {d}
 </button>
 );
 })}
 </div>
 </div>
 );
}
