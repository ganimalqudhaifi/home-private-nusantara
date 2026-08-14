'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Tutor, TutorStatus } from '../../types';
import { ShieldCheck, Hourglass, XCircle, AlertTriangle, Eye, Search, Coffee, UserX, Trash2 } from 'lucide-react';
import { DeleteTutorModal } from './DeleteTutorModal';

export interface TutorDirectoryTableProps {
  readonly tutors: readonly Tutor[];
  readonly isLoading?: boolean;
  readonly onAuditTutor: (tutor: Tutor) => void;
  readonly onTutorUpdated?: (tutor: Tutor) => void;
  readonly onTutorDeleted?: (tutorId: string) => void;
  readonly className?: string;
}

export function TutorDirectoryTable({
  tutors,
  isLoading = false,
  onAuditTutor,
  onTutorUpdated,
  onTutorDeleted,
  className = '',
}: TutorDirectoryTableProps) {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedTutorForDelete, setSelectedTutorForDelete] = useState<Tutor | null>(null);

  const filteredTutors = tutors.filter((tutor) => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'pending' && tutor.status === 'pending') ||
      (filterStatus === 'verified' && (tutor.status === 'verified' || tutor.status === 'active')) ||
      (filterStatus === 'on_leave' && tutor.status === 'on_leave') ||
      (filterStatus === 'inactive' && tutor.status === 'inactive') ||
      (filterStatus === 'suspended' && tutor.status === 'suspended');

    const matchesLevel =
      filterLevel === 'all' ||
      (tutor.grades || []).some((g) => g.includes(filterLevel));

    const matchesSearch =
      searchQuery.trim() === '' ||
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tutor.subjects || []).some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesLevel && matchesSearch;
  });

  const getStatusBadge = (status: TutorStatus) => {
    switch (status) {
      case 'verified':
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Terverifikasi</span>
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-status-warning text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
            <Hourglass className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </span>
        );
      case 'on_leave':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-300">
            <Coffee className="w-3.5 h-3.5" />
            <span>Sedang Cuti</span>
          </span>
        );
      case 'inactive':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-slate-300">
            <UserX className="w-3.5 h-3.5" />
            <span>Nonaktif</span>
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-red-200">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Dibekukan</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 text-[11px] font-bold px-2.5 py-1 rounded-full border border-red-300">
            <XCircle className="w-3.5 h-3.5" />
            <span>Ditolak</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border-whisper shadow-xs">
        {/* Status Pills */}
        <div className="flex overflow-x-auto gap-1.5 hide-scrollbar">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'all'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            Semua ({tutors.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('pending')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'pending'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            Pending Verifikasi ({tutors.filter((t) => t.status === 'pending').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('verified')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'verified'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            Terverifikasi ({tutors.filter((t) => t.status === 'verified' || t.status === 'active').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('on_leave')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'on_leave'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            Cuti ({tutors.filter((t) => t.status === 'on_leave').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('inactive')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'inactive'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            Nonaktif ({tutors.filter((t) => t.status === 'inactive').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('suspended')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === 'suspended'
                ? 'bg-primary-container text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary hover:bg-surface-container-high'
            }`}
          >
            Dibekukan ({tutors.filter((t) => t.status === 'suspended').length})
          </button>
        </div>

        {/* Level Select & Search */}
        <div className="flex items-center gap-3">
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="px-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs font-semibold outline-none"
          >
            <option value="all">Semua Jenjang</option>
            <option value="SD">Jenjang SD</option>
            <option value="SMP">Jenjang SMP</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari tutor / kampus..."
              className="pl-8 pr-3 py-2 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none w-48 focus:w-56 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-2xl border border-border-whisper shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead className="bg-surface-container-low/70 border-b border-border-whisper text-xs text-text-muted uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Pengajar & Kontak</th>
                <th className="px-6 py-4 font-semibold">Pendidikan & Kampus</th>
                <th className="px-6 py-4 font-semibold">Mata Pelajaran yang Diampu</th>
                <th className="px-6 py-4 font-semibold">Status Akun</th>
                <th className="px-6 py-4 font-semibold text-right font-medium">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-whisper text-xs">
              {isLoading ? (
                [1, 2, 3].map((idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-200 shrink-0" />
                        <div className="space-y-1.5 flex-1">
                          <div className="h-3.5 bg-gray-200 rounded w-28" />
                          <div className="h-2.5 bg-gray-100 rounded w-20" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <div className="h-3.5 bg-gray-200 rounded w-32" />
                        <div className="h-2.5 bg-gray-100 rounded w-24" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-5 bg-gray-200 rounded-full w-24" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="h-7 bg-gray-200 rounded-xl w-24 ml-auto" />
                    </td>
                  </tr>
                ))
              ) : filteredTutors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    Belum ada pendaftaran pengajar di database.
                  </td>
                </tr>
              ) : (
                filteredTutors.map((tutor) => (
                  <tr
                    key={tutor.id}
                    className="hover:bg-surface-container-low/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-border-whisper shrink-0 bg-gray-100">
                          <Image
                            src={
                              tutor.avatar && tutor.avatar.trim() !== ''
                                ? tutor.avatar
                                : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
                            }
                            alt={tutor.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                            unoptimized
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="font-headline text-sm font-bold text-primary">
                            {tutor.name}
                          </p>
                          <p className="font-mono text-[11px] text-text-muted">{tutor.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-primary">
                      <p className="font-medium">{tutor.university}</p>
                      <p className="text-[11px] text-text-muted">{tutor.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {(tutor.subjects || []).slice(0, 2).map((sub) => (
                          <span
                            key={sub}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-900"
                          >
                            {sub}
                          </span>
                        ))}
                        {(tutor.subjects || []).length > 2 && (
                          <span className="text-[10px] text-text-muted">
                            +{(tutor.subjects || []).length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(tutor.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onAuditTutor(tutor)}
                          className="bg-surface-container-low hover:bg-primary-container hover:text-white text-primary text-xs font-bold px-3 py-1.5 rounded-xl border border-border-whisper transition-all inline-flex items-center gap-1.5"
                          title="Audit Berkas & Verifikasi Dokumen"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Audit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedTutorForDelete(tutor)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title="Hapus Data Pengajar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteTutorModal
        isOpen={!!selectedTutorForDelete}
        tutor={selectedTutorForDelete}
        onClose={() => setSelectedTutorForDelete(null)}
        onTutorDeleted={onTutorDeleted}
      />
    </div>
  );
}
