import React from 'react';
import { CheckCircle2, Users, CalendarCheck, Star } from 'lucide-react';

export interface TutorMetricsGridProps {
  readonly completedSessions?: number;
  readonly activeStudentsCount?: number;
  readonly sdStudentsCount?: number;
  readonly smpStudentsCount?: number;
  readonly activeDaysCount?: number;
  readonly rating?: number;
  readonly className?: string;
}

export function TutorMetricsGrid({
  completedSessions = 18,
  activeStudentsCount = 4,
  sdStudentsCount = 2,
  smpStudentsCount = 2,
  activeDaysCount = 4,
  rating = 4.9,
  className = '',
}: TutorMetricsGridProps) {
  const metrics = [
    {
      title: 'Total Sesi Selesai',
      value: completedSessions.toString(),
      subtext: 'Bulan Ini',
      icon: CheckCircle2,
      iconColor: 'bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-300',
    },
    {
      title: 'Murid Aktif',
      value: `${activeStudentsCount} Siswa`,
      badges: [
        { label: `${sdStudentsCount} SD`, color: 'bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-300' },
        { label: `${smpStudentsCount} SMP`, color: 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300' },
      ],
      icon: Users,
      iconColor: 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300',
    },
    {
      title: 'Slot Ketersediaan',
      value: `${activeDaysCount} Hari Aktif`,
      subtext: '9 Slot Jam Tersedia',
      icon: CalendarCheck,
      iconColor: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
    },
    {
      title: 'Rating Kepuasan',
      value: `${rating} / 5.0`,
      subtext: 'Berdasarkan 48 ulasan',
      icon: Star,
      iconColor: 'bg-amber-50 text-status-warning dark:bg-amber-950/40 dark:text-amber-300',
    },
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 ${className}`}>
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-surface-container-low rounded-2xl p-6 border border-border-whisper dark:border-outline-variant shadow-sm flex flex-col justify-between hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-text-muted dark:text-gray-400 font-medium">Performa</span>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-text-muted dark:text-gray-400 uppercase tracking-wider mb-1">
                {m.title}
              </h4>
              <div className="font-headline text-2xl font-bold text-primary dark:text-white">
                {m.value}
              </div>

              {m.badges ? (
                <div className="flex gap-2 mt-2">
                  {m.badges.map((b, bIdx) => (
                    <span key={bIdx} className={`px-2 py-0.5 rounded text-[11px] font-bold ${b.color}`}>
                      {b.label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-text-muted dark:text-gray-400 mt-1">{m.subtext}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
