'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { StudentSession } from '../../types';

export interface TutorUpcomingSessionsCardProps {
  readonly sessions: readonly StudentSession[];
  readonly onSelectSession?: (session: StudentSession) => void;
  readonly className?: string;
}

export function TutorUpcomingSessionsCard({
  sessions,
  onSelectSession,
  className = '',
}: TutorUpcomingSessionsCardProps) {
  const upcomingSessions = sessions.filter((s) => s.status === 'scheduled');

  return (
    <div
      className={`bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-6 shadow-sm flex flex-col ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline text-lg font-bold text-primary dark:text-white">
            Jadwal Mengajar Terdekat
          </h3>
          <p className="text-xs text-text-muted dark:text-gray-400 mt-0.5">
            Sesi les privat aktif yang telah terkonfirmasi
          </p>
        </div>
        <Link
          href="/tutor/schedule"
          className="text-xs font-bold text-primary dark:text-blue-400 hover:underline flex items-center gap-1"
        >
          <span>Lihat Kalender</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-4 flex-1">
        {upcomingSessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession && onSelectSession(session)}
            className="p-4 rounded-xl border border-border-whisper dark:border-outline-variant hover:border-primary-container dark:hover:border-blue-400 transition-all bg-surface-container-low/40 dark:bg-surface-container-high/40 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-primary-container text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                {session.level} {session.grade}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-headline text-sm font-bold text-primary dark:text-white truncate">
                    {session.studentName}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
                    {session.code}
                  </span>
                </div>
                <p className="text-xs text-text-muted dark:text-gray-300 font-medium">
                  {session.subject}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-text-muted dark:text-gray-400 mt-1">
                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                  <span className="truncate">{session.address}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col sm:items-end justify-between items-center gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-whisper">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-primary dark:text-blue-300">
                <Calendar className="w-3.5 h-3.5" />
                <span>{session.day}, {session.date}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-text-muted font-mono">
                <Clock className="w-3 h-3" />
                <span>{session.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
