'use client';

import React from 'react';
import { Phone, BookOpen, GraduationCap } from 'lucide-react';
import { Student } from '../../types';

export interface TutorRecentStudentsCardProps {
  readonly students: readonly Student[];
  readonly className?: string;
}

export function TutorRecentStudentsCard({
  students,
  className = '',
}: TutorRecentStudentsCardProps) {
  return (
    <div
      className={`bg-white dark:bg-surface-container-low rounded-2xl border border-border-whisper dark:border-outline-variant p-6 shadow-sm flex flex-col ${className}`}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-headline text-lg font-bold text-primary dark:text-white">
            Daftar Murid Bimbingan
          </h3>
          <p className="text-xs text-text-muted dark:text-gray-400 mt-0.5">
            Siswa aktif dalam periode bimbingan berjalan
          </p>
        </div>
      </div>

      <div className="space-y-3.5 flex-1">
        {students.slice(0, 4).map((student) => {
          const isSD = student.level === 'SD';
          return (
            <div
              key={student.id}
              className="p-3.5 rounded-xl border border-border-whisper dark:border-outline-variant flex items-center justify-between gap-3 bg-surface-container-low/30 dark:bg-surface-container-high/30"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSD
                      ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/50 dark:text-blue-300'
                      : 'bg-indigo-50 text-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-300'
                  }`}
                >
                  {isSD ? <BookOpen className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline text-sm font-bold text-primary dark:text-white truncate">
                      {student.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-surface-container-high text-text-muted">
                      {student.level} {student.grade}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted dark:text-gray-400 truncate">
                    {student.school} • Wali: {student.parentName}
                  </p>
                </div>
              </div>

              <a
                href={`https://wa.me/${student.parentPhone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300 transition-colors shrink-0"
                title="Hubungi Orang Tua via WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
