'use client';

import React from 'react';
import Link from 'next/link';
import { Modal } from '../shared/Modal';
import { CheckCircle2, Phone, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { BRAND_INFO } from '../../data/mockData';

export interface BookingTicketSuccessModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly bookingCode: string;
  readonly studentName: string;
  readonly tutorName: string;
  readonly subject: string;
  readonly date: string;
  readonly time: string;
  readonly address: string;
}

export function BookingTicketSuccessModal({
  isOpen,
  onClose,
  bookingCode,
  studentName,
  tutorName,
  subject,
  date,
  time,
  address,
}: BookingTicketSuccessModalProps) {
  const whatsappUrl = `https://wa.me/${BRAND_INFO.contact.whatsapp}?text=${encodeURIComponent(
    `Halo Admin Home Private Nusantara, saya sudah memesan sesi belajar dengan kode booking #${bookingCode} untuk siswa ${studentName} bersama tutor ${tutorName}. Mohon konfirmasi jadwalnya.`
  )}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      showCloseButton={true}
    >
      <div className="text-center space-y-6 pt-2">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-sm animate-in zoom-in-75">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            Booking Sesi Terkirim
          </span>
          <h3 className="font-headline text-xl md:text-2xl font-bold text-primary dark:text-white mt-2">
            Pemesanan Berhasil Dibuat!
          </h3>
          <p className="text-xs text-text-muted dark:text-gray-400 mt-1 max-w-sm mx-auto">
            Sesi les privat Anda telah terdaftar dalam sistem. Kode booking resmi Anda:
          </p>
        </div>

        {/* Ticket Box */}
        <div className="p-4 rounded-2xl bg-surface-container-low dark:bg-surface-container-high border border-border-whisper dark:border-outline-variant text-left space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-border-whisper dark:border-outline-variant">
            <span className="text-[11px] text-text-muted font-bold uppercase tracking-wider">
              Tiket Sesi
            </span>
            <span className="font-mono text-sm font-extrabold text-primary-container dark:text-blue-300">
              #{bookingCode}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-text-primary dark:text-gray-200">
            <p>
              <strong className="text-text-muted font-normal">Siswa:</strong> {studentName}
            </p>
            <p>
              <strong className="text-text-muted font-normal">Tutor:</strong> {tutorName}
            </p>
            <p>
              <strong className="text-text-muted font-normal">Mata Pelajaran:</strong> {subject}
            </p>
            <div className="flex items-center gap-1.5 text-text-muted pt-1">
              <Calendar className="w-3.5 h-3.5 text-primary-container dark:text-blue-300" />
              <span className="text-text-primary dark:text-white font-medium">{date}</span>
              <span>•</span>
              <Clock className="w-3.5 h-3.5 text-primary-container dark:text-blue-300" />
              <span className="text-text-primary dark:text-white font-medium">{time}</span>
            </div>
            <div className="flex items-start gap-1.5 text-text-muted pt-1">
              <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
              <span className="text-[11px] truncate">{address}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Konfirmasi ke Admin Koordinator (WhatsApp)</span>
          </a>

          <Link
            href="/student/dashboard"
            onClick={onClose}
            className="w-full bg-surface-container-low dark:bg-surface-container-lowest hover:bg-surface-container-high text-primary dark:text-white py-2.5 px-4 rounded-xl text-xs font-semibold border border-border-whisper transition-colors flex items-center justify-center gap-2"
          >
            <span>Lihat Sesi di Dashboard Siswa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
