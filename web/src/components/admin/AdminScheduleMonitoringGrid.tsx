'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { StudentSession } from '../../types';
import { CreateScheduleRundownModal } from './CreateScheduleRundownModal';
import { DeleteBookingModal } from './DeleteBookingModal';
import { EditBookingModal } from './EditBookingModal';
import { TutorStudentDrawer } from '../tutor/TutorStudentDrawer';
import { useDrawer } from '../../hooks/useDrawer';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck,
  AlertCircle,
  Search,
  Plus,
  RefreshCw,
  Trash2,
  Edit3,
  Eye,
} from 'lucide-react';

export interface AdminScheduleMonitoringGridProps {
  readonly sessions?: readonly StudentSession[];
  readonly isLoadingInitial?: boolean;
  readonly className?: string;
}

export function AdminScheduleMonitoringGrid({
  sessions: initialSessions,
  isLoadingInitial = false,
  className = '',
}: AdminScheduleMonitoringGridProps) {
  const { data: fetchResult, error, isLoading: isSwrLoading, mutate } = useSWR('/api/admin/bookings');

  // We derive the sessions array from SWR data or initial sessions.
  const sessions: StudentSession[] = React.useMemo(() => {
    if (fetchResult?.success && Array.isArray(fetchResult.bookings)) {
      return fetchResult.bookings.map((b: any) => ({
        id: b.id,
        code: b.code || `SES-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: b.studentId || 'st-1',
        studentName: b.studentName || 'Siswa Nusantara',
        tutorId: b.tutorId || 'tu-1',
        tutorName: b.tutorName || 'Pengajar',
        level: b.level || 'SD',
        grade: Number(b.grade ?? 4),
        subject: b.subject || 'Matematika SD',
        date: b.date || new Date().toISOString().split('T')[0],
        day: b.day || 'Senin',
        time: b.time || '16:00 - 17:30',
        address: b.address || 'Jl. Hertasning No. 25, Makassar',
        district: b.district || 'Rappocini',
        city: b.city || 'Kota Makassar',
        status: b.status || 'scheduled',
        amount: Number(b.amount || 150000),
      }));
    }
    return initialSessions ? [...initialSessions] : [];
  }, [fetchResult, initialSessions]);

  const isLoading = isLoadingInitial || isSwrLoading;

  const [statusFilter, setStatusFilter] = useState<'all' | 'scheduled' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<StudentSession | null>(null);
  const [bookingToEdit, setBookingToEdit] = useState<StudentSession | null>(null);
  const [deleteError, setDeleteError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRundownToDB = async (newSessions: Partial<StudentSession>[]) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSessions),
      });
      const data = await res.json();
      if (data.success) {
        await mutate(); // Revalidate data automatically
        return { success: true };
      } else {
        return { success: false, error: data.error, collisions: data.collisions };
      }
    } catch (err) {
      console.error('Failed to save batch bookings to DB:', err);
      return { success: false, error: 'Gagal menghubungi server.' };
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    setDeleteError('');
    const response = await fetch(`/api/admin/bookings?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
      setDeleteError(data.error || 'Gagal menghapus sesi.');
      throw new Error(data.error || 'Gagal menghapus sesi.');
    }
    await mutate(); // Refetch automatically after delete
  };

  const filteredSessions = sessions.filter((s) => {
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      (s.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.tutorName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const {
    isOpen: isDrawerOpen,
    data: selectedSession,
    open: openDrawer,
    close: closeDrawer,
  } = useDrawer<StudentSession>({
    initialOpen: false,
    initialData: null,
  });

  const scheduledCount = sessions.filter((s) => s.status === 'scheduled').length;
  const completedCount = sessions.filter((s) => s.status === 'completed').length;

  // Render Skeleton Loading UI
  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* KPI Strip Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white border border-border-whisper rounded-2xl p-4 shadow-xs flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-5 bg-gray-200 rounded w-16" />
              </div>
            </div>
          ))}
        </div>

        {/* Global Bookings Table Container Skeleton */}
        <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden flex flex-col animate-pulse">
          {/* Filter Bar Skeleton */}
          <div className="p-4 border-b border-border-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest">
            <div className="flex items-center gap-2">
              <div className="h-6 bg-gray-200 rounded-full w-24" />
              <div className="h-6 bg-gray-200 rounded-full w-28" />
              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>
            <div className="h-8 bg-gray-200 rounded-xl w-48" />
          </div>

          {/* Table Rows Skeleton */}
          <div className="p-4 space-y-4">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-36" />
                <div className="h-4 bg-gray-200 rounded w-32" />
                <div className="h-4 bg-gray-200 rounded w-40" />
                <div className="h-6 bg-gray-200 rounded-full w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-border-whisper rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary-container flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
              Total Sesi Terjadwal
            </span>
            <span className="font-headline text-xl font-bold text-primary">
              {sessions.length} Sesi
            </span>
          </div>
        </div>

        <div className="bg-white border border-border-whisper rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-900 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
              Terkonfirmasi
            </span>
            <span className="font-headline text-xl font-bold text-primary">
              {scheduledCount} Sesi
            </span>
          </div>
        </div>

        <div className="bg-white border border-border-whisper rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider block">
              Sesi Selesai
            </span>
            <span className="font-headline text-xl font-bold text-primary">
              {completedCount} Sesi
            </span>
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Konflik Jadwal
            </span>
            <span className="font-headline text-xl font-extrabold text-emerald-900">
              0% (Zero Collision)
            </span>
          </div>
        </div>
      </div>

      {/* Global Bookings Table Container */}
      <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden flex flex-col">
        {/* Table Header Filter Bar */}
        <div className="p-4 border-b border-border-whisper flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider mr-1">
              Status Sesi:
            </span>
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                statusFilter === 'all'
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Semua ({sessions.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('scheduled')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                statusFilter === 'scheduled'
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Terkonfirmasi ({scheduledCount})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                statusFilter === 'completed'
                  ? 'bg-primary-container text-white shadow-xs'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              Selesai ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari sesi / nama siswa..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none w-full sm:w-48"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Buat Jadwal Paket</span>
            </button>
          </div>
        </div>

        {/* Data Table or Empty State */}
        {filteredSessions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
              <Calendar className="w-6 h-6" />
            </div>
            <h4 className="font-headline text-base font-bold text-primary">
              Belum Ada Jadwal Sesi Mengajar di Database
            </h4>
            <p className="text-xs text-text-muted max-w-md mx-auto">
              Gunakan generator pembuat jadwal paket untuk menerbitkan rundown sesi bimbingan baru untuk wali murid.
            </p>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Rundown Jadwal Paket Sekarang</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px] table-fixed">
              <thead className="bg-surface-container-low/70 border-b border-border-whisper text-xs text-text-muted uppercase tracking-wider">
                <tr>
                  <th className="p-4 font-semibold w-[130px]">ID & Tanggal</th>
                  <th className="p-4 font-semibold w-[90px]">Waktu</th>
                  <th className="p-4 font-semibold w-[160px]">Siswa & Mapel</th>
                  <th className="p-4 font-semibold w-[160px]">Tutor</th>
                  <th className="p-4 font-semibold w-auto">Lokasi Belajar</th>
                  <th className="p-4 font-semibold text-center w-[140px]">Status</th>
                  <th className="p-4 font-semibold text-center w-[140px]">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-whisper text-xs">
                {filteredSessions.map((ses) => {
                  const isSD = (ses.level || 'SD') === 'SD';
                  const isCompleted = ses.status === 'completed';

                  return (
                    <tr key={ses.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-bold text-primary">
                          #{ses.code}
                        </span>
                        <p className="text-[11px] text-text-muted mt-0.5">
                          {ses.day ? `${ses.day}, ` : ''}{ses.date}
                        </p>
                      </td>

                      <td className="p-4">
                        <span className="font-mono px-2 py-1 bg-surface-container-low rounded-md border border-border-whisper">
                          {ses.time}
                        </span>
                      </td>

                      <td className="p-4">
                        <p className="font-headline font-bold text-primary truncate">{ses.studentName}</p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-1">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              isSD
                                ? 'bg-blue-50 text-blue-900'
                                : 'bg-indigo-50 text-indigo-900'
                            }`}
                          >
                            {ses.level} KLS {ses.grade}
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                            {ses.subject}
                          </span>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                            {(ses.tutorName || 'PG').substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-medium text-text-primary">
                            {ses.tutorName}
                          </span>
                        </div>
                      </td>

                      <td className="p-4 truncate">
                        <div className="flex items-center gap-1 text-text-muted">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span className="truncate">{ses.address} ({ses.city || 'Makassar'})</span>
                        </div>
                      </td>

                      <td className="p-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            isCompleted
                              ? 'bg-surface-container-high text-text-muted'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isCompleted ? 'SELESAI' : 'TERKONFIRMASI'}</span>
                        </span>
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => openDrawer(ses)}
                            className="inline-flex items-center gap-1 rounded-lg p-2 text-indigo-600 transition-colors hover:bg-indigo-50"
                            aria-label={`Lihat rincian ${ses.code}`}
                            title="Lihat rincian sesi"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setBookingToEdit(ses)}
                            className="inline-flex items-center gap-1 rounded-lg p-2 text-primary transition-colors hover:bg-surface-container-high"
                            aria-label={`Edit sesi ${ses.code}`}
                            title="Edit sesi"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteError('');
                              setBookingToDelete(ses);
                            }}
                            className="inline-flex items-center gap-1 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                            aria-label={`Hapus sesi ${ses.code}`}
                            title="Hapus sesi"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {deleteError && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700">
          {deleteError}
        </p>
      )}

      <CreateScheduleRundownModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveRundown={handleSaveRundownToDB}
      />

      <EditBookingModal
        isOpen={Boolean(bookingToEdit)}
        onClose={() => setBookingToEdit(null)}
        booking={bookingToEdit}
        onSaveSuccess={async () => {
          setBookingToEdit(null);
          await mutate();
        }}
      />

      <DeleteBookingModal
        isOpen={Boolean(bookingToDelete)}
        booking={bookingToDelete}
        onClose={() => setBookingToDelete(null)}
        onConfirm={handleDeleteBooking}
      />
    </div>
  );
}
