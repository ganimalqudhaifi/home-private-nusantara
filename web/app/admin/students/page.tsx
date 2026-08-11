'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminTopNavBar } from '../../../src/components/admin/AdminTopNavBar';
import { Footer } from '../../../src/components/shared/Footer';
import { StudentDirectoryTable } from '../../../src/components/admin/StudentDirectoryTable';
import { MOCK_STUDENTS } from '../../../src/data/mockData';
import { Student } from '../../../src/types';
import { ArrowLeft } from 'lucide-react';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<readonly Student[]>(MOCK_STUDENTS);

  useEffect(() => {
    fetch('/api/admin/students')
      .then((res) => res.json())
      .then((data) => {
        if (data.students && data.students.length > 0) {
          const dbStudents: Student[] = data.students.map((s: any) => ({
            id: s.id,
            name: s.name || 'Siswa',
            level: s.level || 'SD',
            grade: Number(s.grade || 4),
            school: s.school || 'SD/SMP Nusantara',
            parentName: s.parentName || 'Wali Murid',
            parentPhone: s.parentPhone || '-',
            address: s.address || 'Makassar',
            totalSessions: Number(s.totalSessions || 0),
            activeBookings: Number(s.activeBookings || 0),
            joinDate: s.joinDate || '2025',
          }));
          setStudents(dbStudents);
        }
      })
      .catch((err) => console.error('Failed to fetch students list:', err));
  }, []);

  return (
    <div className="bg-surface text-text-primary min-h-screen flex flex-col">
      {/* Header */}
      <AdminTopNavBar activeRoute="/admin/students" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border-whisper">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-text-muted mb-1">
              <Link href="/admin/dashboard" className="hover:text-primary flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Dashboard</span>
              </Link>
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
              Direktori Siswa & Data Orang Tua
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              Kelola data profil siswa SD & SMP, kontak wali murid aktif, dan riwayat bimbingan privat.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/bookings"
              className="bg-primary-container hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors"
            >
              Monitoring Jadwal Belajar
            </Link>
          </div>
        </div>

        {/* Students Table */}
        <StudentDirectoryTable students={students} />
      </main>

      <Footer />
    </div>
  );
}
