'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Modal } from '../shared/Modal';
import { Button } from '../shared/Button';
import { Tutor, TimeSlot, LevelType } from '../../types';
import { Calendar, Clock, ShieldCheck, MessageCircle, Info } from 'lucide-react';
import { BRAND_INFO } from '../../data/mockData';

export interface StudentBookingModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly tutor: Tutor | null;
  readonly slot: TimeSlot | null;
  readonly selectedDate: number;
  readonly selectedLevel: LevelType;
  readonly selectedGrade: number;
}

export function StudentBookingModal({
  isOpen,
  onClose,
  tutor,
  slot,
  selectedDate,
  selectedLevel,
  selectedGrade,
}: StudentBookingModalProps) {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedSubject, setSelectedSubject] = useState(
    tutor?.subjects[0] || 'Matematika Dasar'
  );

  if (!tutor || !slot) return null;

  const handleWhatsAppConsultation = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = `${slot.day}, ${selectedDate} Agustus 2026`;
    const formattedTime = `${slot.startTime} - ${slot.endTime} WIB`;

    const message = `Halo Admin Home Private Nusantara, saya ingin konsultasi dan memesan guru les privat dengan rincian berikut:

*Rincian Pengajar:*
- Nama Guru: ${tutor.name} (${tutor.title})
- Pilihan Jadwal: ${formattedDate} (${formattedTime})
- Estimasi Biaya: Rp ${tutor.hourlyRate.toLocaleString('id-ID')} / sesi (2 Jam)

*Rincian Siswa & Kebutuhan:*
- Jenjang & Kelas: ${selectedLevel} Kelas ${selectedGrade}
- Mata Pelajaran: ${selectedSubject}
- Nama Siswa: ${studentName || '-'}
- Nama Orang Tua/Wali: ${parentName || '-'}
- No. WhatsApp: ${parentPhone || '-'}
- Alamat Bimbingan: ${address || '-'}
- Catatan / Target Belajar: ${notes || '-'}

Mohon bantuan untuk konfirmasi ketersediaan guru dan proses konsultasinya. Terima kasih!`;

    const waNumber = BRAND_INFO.contact.whatsapp.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="xl"
      title="Formulir Konsultasi & Pemesanan Guru"
    >
      <form onSubmit={handleWhatsAppConsultation} className="space-y-5">
        {/* Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p>
            Tidak perlu login. Isi data di bawah ini dan Anda akan langsung terhubung dengan Admin via <strong>WhatsApp</strong> untuk konsultasi kebutuhan belajar anak.
          </p>
        </div>

        {/* Tutor Summary Mini Card */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-border-whisper flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-500 shrink-0">
              <Image
                src={tutor.avatar}
                alt={tutor.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div>
              <h4 className="font-headline text-sm font-bold text-primary">
                {tutor.name}
              </h4>
              <p className="text-xs text-text-muted">{tutor.title}</p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>100% Lolos Seleksi Offline</span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-text-muted">Biaya Sesi (2 Jam)</span>
            <p className="font-headline text-base font-extrabold text-[#DC2626]">
              Rp {tutor.hourlyRate.toLocaleString('id-ID')}
            </p>
          </div>
        </div>

        {/* Selected Slot Information */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl border border-border-whisper bg-white text-xs">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-container" />
            <div>
              <p className="text-text-muted text-[10px]">Hari & Tanggal</p>
              <p className="font-bold text-text-primary">
                {slot.day}, {selectedDate} Agustus 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <Clock className="w-4 h-4 text-primary-container" />
            <div>
              <p className="text-text-muted text-[10px] font-sans">Waktu Bimbingan</p>
              <p className="font-bold text-text-primary">
                {slot.startTime} - {slot.endTime} WIB
              </p>
            </div>
          </div>
        </div>

        {/* Subject Picker */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Pilih Mata Pelajaran ({selectedLevel} Kelas {selectedGrade})
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-border-whisper bg-surface-container-low text-xs font-semibold focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 outline-none"
          >
            {tutor.subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Student & Parent Info Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Nama Orang Tua / Wali
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: Ibu Ratna Dewi"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
              No. WhatsApp Orang Tua
            </label>
            <input
              required
              type="tel"
              placeholder="Contoh: 08123456789"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Nama Siswa
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: Fajar Pratama"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
              Domisili / Wilayah Belajar
            </label>
            <input
              required
              type="text"
              placeholder="Contoh: Tebet, Jakarta Selatan"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Catatan Tambahan / Kebutuhan Khusus Siswa
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Contoh: Perlu bimbingan persiapan ujian matematika bab pecahan, lebih suka gaya belajar visual."
            className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs resize-none"
          />
        </div>

        {/* CTA Buttons */}
        <div className="pt-3 border-t border-border-whisper flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
          >
            Batal
          </button>
          <Button
            type="submit"
            variant="cta"
            size="md"
            className="font-bold px-6 bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Kirim & Konsultasi via WhatsApp</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

