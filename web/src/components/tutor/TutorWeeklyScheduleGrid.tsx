'use client';

import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin, CheckCircle2 } from 'lucide-react';
import { StudentSession } from '../../types';

export interface TutorWeeklyScheduleGridProps {
  readonly sessions: readonly StudentSession[];
  readonly onSelectSession: (session: StudentSession) => void;
  readonly className?: string;
  readonly isLoading?: boolean;
}

const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const DAYS_SHORT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const DAYS_FULL = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

export function TutorWeeklyScheduleGrid({
  sessions,
  onSelectSession,
  className = '',
  isLoading = false,
}: TutorWeeklyScheduleGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weekDays = useMemo(() => {
    const d = new Date(currentDate);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    
    const monday = new Date(d.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      days.push({
        dateObj: date,
        day: DAYS_SHORT[date.getDay()],
        date: date.getDate(),
        full: DAYS_FULL[date.getDay()],
        dayIndex: date.getDay() === 0 ? 6 : date.getDay() - 1 // 0 for Monday, 6 for Sunday
      });
    }
    return days;
  }, [currentDate]);

  const headerTitle = useMemo(() => {
    if (weekDays.length === 0) return '';
    const start = weekDays[0].dateObj;
    const end = weekDays[6].dateObj;
    
    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${MONTHS[start.getMonth()]} ${start.getFullYear()}`;
    } else {
      return `${start.getDate()} ${MONTHS[start.getMonth()]} - ${end.getDate()} ${MONTHS[end.getMonth()]} ${end.getFullYear()}`;
    }
  }, [weekDays]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const prevWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const nextWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const setThisWeek = () => {
    setCurrentDate(new Date());
  };

  const currentWeekSessions = useMemo(() => {
    if (!weekDays.length) return [];
    const start = weekDays[0].dateObj.getTime();
    const end = weekDays[6].dateObj.getTime() + 24 * 60 * 60 * 1000 - 1;
    
    return sessions.filter(s => {
      if (s.status !== 'scheduled' && s.status !== 'in_progress') return false;
      const sd = new Date(s.date).getTime();
      return sd >= start && sd <= end;
    });
  }, [sessions, weekDays]);

  const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00',
  ];

  const getPositionStyle = (timeStr: string, colIndex: number) => {
    // timeStr format: "16:00 - 18:00"
    const [start, end] = timeStr.split(' - ');
    if (!start || !end) return { topOffset: 0, height: 100 };

    const parseTime = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h + m / 60;
    };

    const startH = parseTime(start);
    const endH = parseTime(end);
    
    // Grid starts at 08:00
    const startOffset = Math.max(0, startH - 8); 
    const duration = Math.max(0.5, endH - startH);

    const rowHeight = 52;
    const topOffset = startOffset * rowHeight + 2;
    const height = duration * rowHeight - 4;

    return { topOffset, height };
  };

  return (
    <div className={`bg-white rounded-2xl border border-border-whisper overflow-hidden shadow-sm flex flex-col ${className}`}>
      {/* Calendar Header Controls */}
      <div className="p-4 md:p-6 border-b border-border-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-lowest">
        <div className="flex items-center gap-3">
          <h2 className="font-headline text-lg md:text-xl font-bold text-primary">
            {headerTitle}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800">
            {currentWeekSessions.length} Sesi Aktif Minggu Ini
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={setThisWeek}
            type="button" 
            className="text-xs font-bold px-4 py-2.5 border border-border-whisper bg-white text-text-primary hover:bg-surface-container-low hover:text-primary transition-colors rounded-xl shadow-sm"
          >
            Hari Ini
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevWeek}
              type="button"
              className="p-2.5 rounded-xl border border-border-whisper bg-white text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextWeek}
              type="button"
              className="p-2.5 rounded-xl border border-border-whisper bg-white text-text-muted hover:text-primary hover:bg-surface-container-low transition-colors shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Days of Week Header Row */}
      <div className="grid grid-cols-8 border-b border-border-whisper bg-surface-container-low font-headline text-xs font-semibold sticky top-0 z-20">
        <div className="p-3 text-right text-text-muted border-r border-border-whisper font-mono">
          WIB
        </div>
        {weekDays.map((d, i) => {
          const isToday = d.dateObj.getTime() === today.getTime();
          return (
            <div
              key={i}
              className={`p-3 text-center border-r border-border-whisper last:border-r-0 ${
                isToday ? 'bg-primary-container/5' : ''
              }`}
            >
              <div className="text-text-muted text-[11px] mb-0.5">{d.day}</div>
              <div
                className={`text-base font-bold ${
                  isToday
                    ? 'text-primary-container'
                    : 'text-text-primary'
                }`}
              >
                {d.date}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Grid Body */}
      <div className="relative overflow-x-auto overflow-y-auto max-h-[640px] bg-white">
        {/* Background Grid Rows */}
        <div className="min-w-[760px]">
          {hours.map((h, hIdx) => (
            <div
              key={h}
              className="grid grid-cols-8 border-b border-border-whisper min-h-[52px]"
            >
              <div className="p-2 text-right text-xs text-text-muted font-mono border-r border-border-whisper shrink-0">
                {h}
              </div>
              {weekDays.map((d, dIdx) => (
                <div
                  key={dIdx}
                  className="border-r border-border-whisper/60 last:border-r-0"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Floating Session Cards Overlay */}
        <div className="absolute inset-0 min-w-[760px] pointer-events-none">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-30 pointer-events-auto">
              <div className="flex flex-col items-center gap-2">
                <div className="w-6 h-6 border-2 border-primary-container border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xs font-semibold text-primary">Memuat jadwal...</span>
              </div>
            </div>
          ) : currentWeekSessions.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-30 pointer-events-auto">
              <div className="bg-white p-6 rounded-2xl border border-border-whisper shadow-sm text-center">
                <h3 className="text-sm font-bold text-primary mb-1">Belum Ada Sesi</h3>
                <p className="text-xs text-text-muted">Tidak ada jadwal bimbingan pada rentang tanggal ini.</p>
              </div>
            </div>
          ) : (
            currentWeekSessions.map((session) => {
              const sessionDate = new Date(session.date);
              const dayIndex = sessionDate.getDay() === 0 ? 6 : sessionDate.getDay() - 1;
              const { topOffset, height } = getPositionStyle(session.time, dayIndex);

              const isSD = session.level === 'SD';

              return (
                <div
                  key={session.id}
                  onClick={() => onSelectSession(session)}
                  style={{
                    top: `${topOffset}px`,
                    left: `calc(12.5% + (87.5% / 7) * ${dayIndex} + 4px)`,
                    width: `calc((87.5% / 7) - 8px)`,
                    height: `${height}px`,
                  }}
                  className={`absolute rounded-xl border shadow-sm p-2.5 flex flex-col justify-between cursor-pointer pointer-events-auto hover:-translate-y-0.5 transition-all overflow-hidden z-10 ${
                    isSD
                      ? 'bg-blue-50/95 border-blue-300 text-blue-950 hover:border-blue-500'
                      : 'bg-indigo-50/95 border-indigo-300 text-indigo-950 hover:border-indigo-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wider ${
                          isSD
                            ? 'bg-blue-200/50 text-blue-800'
                            : 'bg-indigo-200/50 text-indigo-800'
                        }`}
                      >
                        {session.subject}
                      </span>
                    </div>
                    <div className="font-bold text-xs leading-tight mb-0.5 line-clamp-1">
                      {session.studentName}
                    </div>
                    <div className="text-[10px] opacity-80 flex items-center gap-1 line-clamp-1">
                      <MapPin className="w-2.5 h-2.5" />
                      {session.district}
                    </div>
                  </div>
                  
                  {session.status === 'in_progress' && (
                    <div className="mt-2 flex items-center justify-center gap-1 py-1 px-1.5 bg-emerald-100/80 rounded-lg text-emerald-800 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      SEDANG BERJALAN
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
