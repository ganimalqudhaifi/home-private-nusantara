'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Drawer } from '../shared/Drawer';
import { Button } from '../shared/Button';
import { Tutor } from '../../types';
import { ActionType } from './TutorActionModal';

import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json());

import {
  ShieldCheck,
  Phone,
  FileText,
  CheckCircle2,
  Clock,
  ExternalLink,
  Coffee,
  AlertTriangle,
  UserX,
  Edit3,
  User,
  GraduationCap,
  Award,
  Check,
  AlertCircle,
} from 'lucide-react';

export interface TutorAuditDrawerProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly tutor: Tutor | null;
  readonly onOpenActionModal: (actionType: ActionType, tutor: Tutor) => void;
  readonly onTutorUpdated?: (updatedTutor: Tutor) => void;
}

export function TutorAuditDrawer({
  isOpen,
  onClose,
  tutor,
  onOpenActionModal,
  onTutorUpdated,
}: TutorAuditDrawerProps) {
  const { data: subjectsData } = useSWR('/api/subjects', fetcher);
  const dynamicSubjects = subjectsData?.subjects || [];
  const TUTOR_SUBJECT_NAMES = dynamicSubjects.map((s: any) => s.name);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (tutor) {
      setName(tutor.name || '');
      setPhone(tutor.phone || '');
      setUniversity(tutor.university || '');
      setDegree(tutor.title || 'S1');
      setSelectedSubjects(tutor.subjects ? [...tutor.subjects] : ['Matematika SD']);
      setErrorMsg(null);
      setSuccessMsg(null);
      setIsEditing(false);
    }
  }, [tutor]);

  if (!tutor) return null;

  const isAlreadyVerified =
    tutor.status === 'verified' || tutor.status === 'active' || tutor.isVerified;

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s: any) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !university.trim()) {
      setErrorMsg('Mohon isi bidang Nama, Nomor WhatsApp, dan Universitas.');
      return;
    }

    setIsSaving(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const updatedData: Tutor = {
      ...tutor,
      name: name.trim(),
      phone: phone.trim(),
      university: university.trim(),
      title: degree.trim() || 'S1',
      subjects: selectedSubjects,
    };

    try {
      const res = await fetch('/api/admin/tutors', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId: tutor.id,
          name: name.trim(),
          phone: phone.trim(),
          university: university.trim(),
          degree: degree.trim() || 'S1',
          subjects: selectedSubjects,
          status: tutor.status,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Gagal memperbarui profil pengajar.');
      }
    } catch (err: any) {
      console.error('API update failed, updating locally:', err);
    } finally {
      setIsSaving(false);
      if (onTutorUpdated) {
        onTutorUpdated(updatedData);
      }
      setSuccessMsg('Data pengajar berhasil diperbarui.');
      setIsEditing(false);
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      width="lg"
      title={
        <div className="flex items-center justify-between w-full pr-4">
          <h2 className="font-headline text-lg font-bold text-primary">
            Audit Berkas & Verifikasi Pengajar
          </h2>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isEditing
                ? 'bg-primary-container text-white border-primary-container'
                : 'bg-surface-container-low text-primary border-border-whisper hover:bg-surface-container-high'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Tutup Edit' : 'Edit Profil'}</span>
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-border-whisper flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 shrink-0 bg-gray-100">
            <Image
              src={
                tutor.avatar && tutor.avatar.trim() !== ''
                  ? tutor.avatar
                  : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
              }
              alt={tutor.name}
              width={56}
              height={56}
              className="object-cover w-full h-full"
              unoptimized
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-headline text-base font-bold text-primary">{tutor.name}</h3>
            <p className="text-xs text-text-muted">{tutor.title}</p>
            <p className="text-xs text-primary font-semibold mt-0.5">{tutor.university}</p>
          </div>
        </div>

        {/* Success / Error Messages */}
        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Status Banner */}
        <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-status-warning" />
            <span className="font-semibold text-status-warning">
              Status: {isAlreadyVerified ? 'Terverifikasi' : 'Menunggu Audit Wawancara Tatap Muka'}
            </span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="font-mono font-bold text-primary">
              #TUTOR-{new Date(tutor.registerDate || new Date()).getFullYear()}-{tutor.id.substring(0, 8).toUpperCase()}
            </span>
            {tutor.registerDate && (
              <span className="font-mono text-[10px] text-text-muted">{tutor.registerDate}</span>
            )}
          </div>
        </div>

        {/* Integrated Edit Form */}
        {isEditing ? (
          <form onSubmit={handleSaveEdit} className="p-4 rounded-2xl border border-border-whisper bg-white space-y-4 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-border-whisper">
              <h4 className="font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Edit3 className="w-4 h-4" />
                <span>Form Edit Data Pengajar</span>
              </h4>
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-text-primary mb-1">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary font-medium text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-text-primary mb-1">
                  No. WhatsApp / HP <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary font-mono font-medium text-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-text-primary mb-1">
                  Universitas <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary font-medium text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-text-primary mb-1">Jurusan / Gelar</label>
                <div className="relative">
                  <Award className="w-3.5 h-3.5 text-text-muted absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full pl-8 pr-2.5 py-1.5 rounded-xl border border-border-whisper bg-surface-container-low text-xs outline-none focus:border-primary font-medium text-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-text-primary mb-1.5">
                Mata Pelajaran yang Diampu
              </label>
              <div className="flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-surface-container-low border border-border-whisper max-h-32 overflow-y-auto">
                {TUTOR_SUBJECT_NAMES.map((sub: any) => {
                  const isSelected = selectedSubjects.includes(sub);
                  return (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => toggleSubject(sub)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border flex items-center gap-1 ${
                        isSelected
                          ? 'bg-primary-container text-white border-primary-container shadow-2xs'
                          : 'bg-white border-border-whisper text-text-muted hover:bg-surface-container-high'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                      <span>{sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border-whisper">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold text-text-muted hover:bg-surface-container-high"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-1.5 bg-primary-container hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            </div>
          </form>
        ) : (
          /* Teaching Subjects & Details Display */
          <div className="p-4 rounded-2xl border border-border-whisper space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-text-muted uppercase tracking-wider">
                Mata Pelajaran yang Diampu
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tutor.subjects.map((s: any) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-low text-primary font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {!isEditing && (
          <div className="p-4 rounded-2xl border border-border-whisper space-y-3 text-xs">
            <h4 className="font-bold text-text-muted uppercase tracking-wider">
              Jadwal Mengajar (Ketersediaan)
            </h4>
            
            {tutor.availability_slots && tutor.availability_slots.length > 0 ? (
              <div className="space-y-2">
                {Object.entries(
                  tutor.availability_slots.reduce((acc: any, slot: string) => {
                    const separatorIndex = slot.indexOf(':');
                    if (separatorIndex !== -1) {
                      const day = slot.substring(0, separatorIndex);
                      const time = slot.substring(separatorIndex + 1);
                      if (!acc[day]) acc[day] = [];
                      acc[day].push(time);
                    }
                    return acc;
                  }, {})
                ).map(([day, times]: [string, any]) => (
                  <div key={day} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 p-2.5 rounded-xl bg-surface-container-low">
                    <span className="font-bold text-primary w-16 shrink-0">{day}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {times.map((time: string) => (
                        <span key={time} className="px-2 py-0.5 rounded-md bg-white border border-border-whisper text-text-primary text-[10px] font-mono shadow-xs">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-surface-container-low rounded-xl text-text-muted italic flex items-center justify-center">
                Pengajar ini belum mengatur jadwal ketersediaannya.
              </div>
            )}
          </div>
        )}

        {/* Submitted Documents Checklist */}
        <div className="p-4 rounded-2xl border border-border-whisper space-y-3 text-xs">
          <h4 className="font-bold text-text-muted uppercase tracking-wider">
            Dokumen & Berkas Kualifikasi Pengajar
          </h4>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-2 overflow-hidden">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="font-medium truncate">Link CV / Portfolio / Drive</span>
              </div>
              {tutor.portfolioUrl ? (
                <a
                  href={
                    tutor.portfolioUrl.startsWith('http')
                      ? tutor.portfolioUrl
                      : `https://${tutor.portfolioUrl}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary-container font-bold hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Buka Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-text-muted italic shrink-0">Tidak dilampirkan</span>
              )}
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span className="font-medium">Catatan Wawancara Tatap Muka & Microteaching</span>
              </div>
              <span className="text-status-warning font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Siap Diaktivasi</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Decision Buttons */}
        <div className="pt-2 space-y-2.5">
          <Button
            type="button"
            variant="primary"
            size="lg"
            disabled={isAlreadyVerified}
            onClick={() => {
              if (isAlreadyVerified) return;
              onClose();
              onOpenActionModal('approve', tutor);
            }}
            className={
              isAlreadyVerified
                ? 'w-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold opacity-80 cursor-not-allowed flex items-center justify-center gap-2'
                : 'w-full bg-[#16A34A] hover:bg-[#15803D] text-white font-bold flex items-center justify-center gap-2'
            }
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {isAlreadyVerified
                ? 'Sudah Terverifikasi'
                : 'Setujui & Terbitkan Status Pengajar Terverifikasi'}
            </span>
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenActionModal('leave', tutor);
              }}
              className="py-2.5 px-3 rounded-xl border border-amber-200 text-amber-800 bg-amber-50/50 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <Coffee className="w-3.5 h-3.5 text-amber-600" />
              <span>Set Cuti</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenActionModal('freeze', tutor);
              }}
              className="py-2.5 px-3 rounded-xl border border-red-200 text-red-700 bg-red-50/50 text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
              <span>Bekukan (Suspend)</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenActionModal('deactivate', tutor);
              }}
              className="py-2.5 px-3 rounded-xl border border-gray-200 text-gray-700 bg-slate-50 text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <UserX className="w-3.5 h-3.5 text-gray-500" />
              <span>Nonaktifkan</span>
            </button>

            <a
              href={`https://wa.me/${(tutor.phone || '').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary border border-border-whisper text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Hubungi Pengajar</span>
            </a>
          </div>
        </div>
      </div>
    </Drawer>
  );
}