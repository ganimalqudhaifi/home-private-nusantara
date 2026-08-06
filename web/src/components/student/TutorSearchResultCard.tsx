'use client';

import React from'react';
import Image from'next/image';
import { ShieldCheck, Star, Clock, School, CheckCircle2 } from'lucide-react';
import { Tutor, TimeSlot } from'../../types';

export interface TutorSearchResultCardProps {
 readonly tutor: Tutor;
 readonly selectedDate: number;
 readonly onBookSlot: (tutor: Tutor, slot: TimeSlot) => void;
 readonly className?: string;
}

export function TutorSearchResultCard({
 tutor,
 selectedDate,
 onBookSlot,
 className ='',
}: TutorSearchResultCardProps) {
 const availableSlots = tutor.availableSlots.filter((s) => !s.isBooked);

 return (
 <div
 className={`bg-white rounded-2xl border border-border-whisper p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 items-start animate-fade-up ${className}`}
 >
 {/* Avatar & Verification Pillar */}
 <div className="flex flex-col items-center shrink-0">
 <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xs bg-gray-100 mb-2">
 <Image
 src={tutor.avatar}
 alt={tutor.name}
 width={80}
 height={80}
 className="object-cover w-full h-full"
 unoptimized
 />
 </div>
 <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
 <ShieldCheck className="w-3 h-3 text-emerald-600" />
 <span>Terverifikasi</span>
 </div>
 </div>

 {/* Tutor Profile Details */}
 <div className="flex-1 min-w-0">
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
 <div>
 <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-1.5">
 <span>{tutor.name}</span>
 </h3>
 <p className="text-xs text-text-muted font-medium">
 {tutor.title}
 </p>
 </div>

 <div className="flex items-center gap-2">
 <div className="flex items-center text-amber-500 bg-amber-50 px-2 py-1 rounded-lg text-xs font-bold">
 <Star className="w-3.5 h-3.5 fill-current mr-1" />
 <span>{tutor.rating}</span>
 </div>
 <span className="text-xs text-text-muted">({tutor.reviewCount} ulasan)</span>
 </div>
 </div>

 <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
 <School className="w-3.5 h-3.5 text-primary-container shrink-0" />
 <span>{tutor.university}</span>
 <span>•</span>
 <span>{tutor.experienceYears} thn pengalaman</span>
 </div>

 <p className="text-xs text-text-muted leading-relaxed mb-4 line-clamp-2">
 {tutor.bio}
 </p>

 {/* Subjects Tags */}
 <div className="flex flex-wrap gap-1.5 mb-5">
 {tutor.subjects.map((sub) => (
 <span
 key={sub}
 className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-surface-container-low text-primary border border-border-whisper"
 >
 {sub}
 </span>
 ))}
 </div>

 {/* Available Time Slots for Selected Date */}
 <div className="pt-4 border-t border-border-whisper">
 <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
 <Clock className="w-3.5 h-3.5 text-primary-container" />
 <span>Slot Waktu Tersedia ({selectedDate} Agustus 2026):</span>
 </p>

 <div className="flex flex-wrap items-center gap-2.5">
 {availableSlots.length === 0 ? (
 <span className="text-xs text-text-muted italic">
 Semua slot pada tanggal ini telah terisi penuh.
 </span>
 ) : (
 availableSlots.map((slot) => (
 <button
 key={slot.id}
 type="button"
 onClick={() => onBookSlot(tutor, slot)}
 className="px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-[#DC2626] hover:text-white text-primary text-xs font-bold font-mono border border-border-whisper hover:border-[#DC2626] shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
 >
 <span>{slot.startTime} - {slot.endTime} WIB</span>
 <span className="text-[10px] font-normal text-text-muted hover:text-white/80">
 (Pilih)
 </span>
 </button>
 ))
 )}
 </div>
 </div>
 </div>

 {/* Pricing & CTA Summary */}
 <div className="w-full md:w-48 shrink-0 flex flex-col justify-between items-start md:items-end p-4 rounded-xl bg-surface-container-low/50 border border-border-whisper md:self-stretch">
 <div className="md:text-right">
 <p className="text-[11px] text-text-muted font-medium">Biaya per sesi 2 jam</p>
 <p className="font-headline text-lg font-extrabold text-[#DC2626]">
 Rp {tutor.hourlyRate.toLocaleString('id-ID')}
 </p>
 <span className="text-[10px] text-emerald-600 font-semibold flex items-center md:justify-end gap-1 mt-0.5">
 <CheckCircle2 className="w-3 h-3" />
 <span>Garansi Cocok</span>
 </span>
 </div>

 <button
 type="button"
 onClick={() => {
 if (availableSlots[0]) {
 onBookSlot(tutor, availableSlots[0]);
 }
 }}
 className="w-full mt-4 bg-[#DC2626] hover:bg-[#B91C1C] text-white py-2.5 px-4 rounded-xl text-xs font-bold text-center shadow-xs active:scale-95 transition-all"
 >
 Booking Sekarang
 </button>
 </div>
 </div>
 );
}
