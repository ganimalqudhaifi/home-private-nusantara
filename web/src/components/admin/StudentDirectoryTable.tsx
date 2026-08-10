'use client';

import React, { useState, useEffect } from 'react';
import { Student } from '../../types';
import { Search, GraduationCap, BookOpen, Phone, MapPin, Plus, UserPlus, Edit3, Trash2 } from 'lucide-react';
import { CreateScheduleRundownModal } from './CreateScheduleRundownModal';
import { CreateStudentModal } from './CreateStudentModal';
import { EditStudentModal } from './EditStudentModal';
import { DeleteStudentModal } from './DeleteStudentModal';

export interface StudentDirectoryTableProps {
  readonly students: readonly Student[];
  readonly className?: string;
  readonly onStudentAdded?: (newStudent: Student) => void;
}

export function StudentDirectoryTable({
  students,
  className = '',
  onStudentAdded,
}: StudentDirectoryTableProps) {
  const [studentList, setStudentList] = useState<Student[]>([...students]);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedStudentForRundown, setSelectedStudentForRundown] = useState<Student | null>(null);
  const [selectedStudentForEdit, setSelectedStudentForEdit] = useState<Student | null>(null);
  const [selectedStudentForDelete, setSelectedStudentForDelete] = useState<Student | null>(null);
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setStudentList([...students]);
  }, [students]);

  const sdCount = studentList.filter((s) => s.level === 'SD').length;
  const smpCount = studentList.filter((s) => s.level === 'SMP').length;

  const filteredStudents = studentList.filter((s) => {
    const matchesLevel = filterLevel === 'all' || s.level === filterLevel;
    const matchesSearch =
      searchQuery.trim() === '' ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesLevel && matchesSearch;
  });

  const handleStudentCreated = (newStudent: Student) => {
    setStudentList((prev) => [newStudent, ...prev]);
    if (onStudentAdded) {
      onStudentAdded(newStudent);
    }
  };

  const handleStudentUpdated = (updatedStudent: Student) => {
    setStudentList((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const handleStudentDeleted = (studentId: string) => {
    setStudentList((prev) => prev.filter((s) => s.id !== studentId));
  };

  const handleSaveRundownFromStudentsTable = async (sessionsPayload: any[]) => {
    try {
      await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionsPayload),
      });
    } catch (err) {
      console.error('Error saving rundown from students directory:', err);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filters Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border-whisper shadow-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setFilterLevel('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterLevel === 'all'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            Semua Siswa ({studentList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('SD')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterLevel === 'SD'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            SD ({sdCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterLevel('SMP')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterLevel === 'SMP'
                ? 'bg-indigo-900 text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            SMP ({smpCount})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari siswa, wali, sekolah..."
              className="pl-8 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none w-full"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsAddStudentModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-primary-container hover:bg-primary-hover text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-colors shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Tambah Siswa</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead className="bg-surface-container-low/70 border-b border-border-whisper text-xs text-text-muted uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Nama Siswa & Sekolah</th>
                <th className="px-6 py-4 font-semibold">Jenjang / Kelas</th>
                <th className="px-6 py-4 font-semibold">Orang Tua / Wali</th>
                <th className="px-6 py-4 font-semibold">Alamat Domisili</th>
                <th className="px-6 py-4 font-semibold text-center">Total Sesi</th>
                <th className="px-6 py-4 font-semibold text-right">Kontak & Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-whisper text-xs">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-text-muted">
                    Tidak ditemukan data siswa.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => {
                  const isSD = student.level === 'SD';
                  return (
                    <tr
                      key={student.id}
                      className="hover:bg-surface-container-low/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSD
                                ? 'bg-blue-50 text-blue-900'
                                : 'bg-indigo-50 text-indigo-900'
                            }`}
                          >
                            {isSD ? <BookOpen className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                          </div>
                          <div>
                            <p className="font-headline text-sm font-bold text-primary">
                              {student.name}
                            </p>
                            <p className="text-[11px] text-text-muted">{student.school}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isSD
                              ? 'bg-blue-50 text-blue-900'
                              : 'bg-indigo-50 text-indigo-900'
                          }`}
                        >
                          {student.level} Kelas {student.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-primary">
                        <p className="font-medium">{student.parentName}</p>
                        <p className="text-[11px] text-text-muted font-mono">{student.parentPhone}</p>
                      </td>
                      <td className="px-6 py-4 text-text-muted max-w-xs truncate">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="truncate">{student.address}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono font-bold text-primary">
                        {student.totalSessions} Sesi
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedStudentForRundown(student)}
                            className="inline-flex items-center gap-1 bg-primary-container hover:bg-primary-hover text-white px-2.5 py-1.5 rounded-xl font-bold transition-all text-[11px]"
                            title="Buat Rundown"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Rundown</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedStudentForEdit(student)}
                            className="p-1.5 text-primary hover:bg-surface-container-high rounded-xl transition-colors"
                            title="Edit Data Siswa"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedStudentForDelete(student)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            title="Hapus Data Siswa"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={`https://wa.me/${student.parentPhone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-2.5 py-1.5 rounded-xl font-semibold transition-colors text-[11px]"
                            title="Chat WA Orang Tua"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>WA</span>
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudentForRundown && (
        <CreateScheduleRundownModal
          isOpen={!!selectedStudentForRundown}
          onClose={() => setSelectedStudentForRundown(null)}
          defaultStudentName={selectedStudentForRundown.name}
          defaultParentName={selectedStudentForRundown.parentName}
          defaultParentPhone={selectedStudentForRundown.parentPhone}
          defaultAddress={selectedStudentForRundown.address}
          onSaveRundown={handleSaveRundownFromStudentsTable}
        />
      )}

      <CreateStudentModal
        isOpen={isAddStudentModalOpen}
        onClose={() => setIsAddStudentModalOpen(false)}
        onStudentCreated={handleStudentCreated}
      />

      <EditStudentModal
        isOpen={!!selectedStudentForEdit}
        student={selectedStudentForEdit}
        onClose={() => setSelectedStudentForEdit(null)}
        onStudentUpdated={handleStudentUpdated}
      />

      <DeleteStudentModal
        isOpen={!!selectedStudentForDelete}
        student={selectedStudentForDelete}
        onClose={() => setSelectedStudentForDelete(null)}
        onStudentDeleted={handleStudentDeleted}
      />
    </div>
  );
}
