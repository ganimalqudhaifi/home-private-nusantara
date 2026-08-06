'use client';

import React, { useState } from'react';
import Image from'next/image';
import { Modal } from'../shared/Modal';
import { Button } from'../shared/Button';
import { Tutor, TimeSlot, LevelType } from'../../types';
import { Calendar, Clock, MapPin, ShieldCheck, User, BookOpen } from'lucide-react';

export interface StudentBookingModalProps {
 readonly isOpen: boolean;
 readonly onClose: () => void;
 readonly tutor: Tutor | null;
 readonly slot: TimeSlot | null;
 readonly selectedDate: number;
 readonly selectedLevel: LevelType;
 readonly selectedGrade: number;
 readonly onConfirmBooking: (bookingDetails: {
 studentName: string;
 parentName: string;
 parentPhone: string;
 address: string;
 notes: string;
 subject: string;
 }) => void;
}

export function StudentBookingModal({
 isOpen,
 onClose,
 tutor,
 slot,
 selectedDate,
 selectedLevel,
 selectedGrade,
 onConfirmBooking,
}: StudentBookingModalProps) {
 const [studentName, setStudentName] = useState('Fajar Pratama');
 const [parentName, setParentName] = useState('Ibu Ratna Dewi');
 const [parentPhone, setParentPhone] = useState('0812-3456-7890');
 const [address, setAddress] = useState('Jl. Tebet Barat Dalam VII No. 14, Jakarta Selatan');
 const [notes, setNotes] = useState('Mohon fokus pada materi Pecahan Campuran dan Desimal.');
 const [selectedSubject, setSelectedSubject] = useState(
 tutor?.subjects[0] ||'Matematika Dasar'
 );
 const [isSubmitting, setIsSubmitting] = useState(false);

 if (!tutor || !slot) return null;

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);

 setTimeout(() => {
 setIsSubmitting(false);
 onConfirmBooking({
 studentName,
 parentName,
 parentPhone,
 address,
 notes,
 subject: selectedSubject,
 });
 }, 600);
 };

 return (
 <Modal
 isOpen={isOpen}
 onClose={onClose}
 maxWidth="xl"
 title="Konfirmasi Rincian Pemesanan Sesi"
 >
 <form onSubmit={handleSubmit} className="space-y-5">
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
 Nama Siswa
 </label>
 <input
 required
 type="text"
 value={studentName}
 onChange={(e) => setStudentName(e.target.value)}
 className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
 />
 </div>

 <div className="flex flex-col gap-1">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 WhatsApp Orang Tua / Wali
 </label>
 <input
 required
 type="tel"
 value={parentPhone}
 onChange={(e) => setParentPhone(e.target.value)}
 className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
 />
 </div>
 </div>

 {/* Residential Address */}
 <div className="flex flex-col gap-1">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Alamat Rumah Siswa (Tempat Bimbingan Tatap Muka)
 </label>
 <textarea
 required
 rows={2}
 value={address}
 onChange={(e) => setAddress(e.target.value)}
 className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs resize-none"
 />
 </div>

 {/* Notes */}
 <div className="flex flex-col gap-1">
 <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Catatan Materi / Target Belajar
 </label>
 <input
 type="text"
 value={notes}
 onChange={(e) => setNotes(e.target.value)}
 placeholder="Misal: Persiapan UTS Bab 3 atau pendampingan PR"
 className="px-3.5 py-2 rounded-xl border border-border-whisper bg-surface-container-lowest text-xs"
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
 isLoading={isSubmitting}
 className="font-bold px-6"
 >
 Konfirmasi Booking Sesi Ini
 </Button>
 </div>
 </form>
 </Modal>
 );
}
