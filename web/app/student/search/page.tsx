'use client';

import React, { useState } from'react';
import { TopNavBar } from'../../../src/components/shared/TopNavBar';
import { Footer } from'../../../src/components/shared/Footer';
import { StudentSearchFilterBar } from'../../../src/components/student/StudentSearchFilterBar';
import { StudentDatePickerSidebar } from'../../../src/components/student/StudentDatePickerSidebar';
import { TutorSearchResultCard } from'../../../src/components/student/TutorSearchResultCard';
import { StudentBookingModal } from'../../../src/components/student/StudentBookingModal';
import { BookingTicketSuccessModal } from'../../../src/components/student/BookingTicketSuccessModal';
import { useFilter } from'../../../src/hooks/useFilter';
import { useModal } from'../../../src/hooks/useModal';
import { MOCK_TUTORS } from'../../../src/data/mockData';
import { Tutor, TimeSlot, LevelType } from'../../../src/types';
import { Search, Sparkles } from'lucide-react';

export interface StudentSearchPageProps {
 readonly initialLevel?: LevelType;
 readonly initialGrade?: number;
}

export default function StudentSearchPage({
 initialLevel ='SD',
 initialGrade = 5,
}: StudentSearchPageProps) {
 const {
 selectedLevel,
 setSelectedLevel,
 selectedGrade,
 setSelectedGrade,
 searchQuery,
 setSearchQuery,
 selectedDate,
 setSelectedDate,
 filteredTutors,
 } = useFilter({
 initialTutors: MOCK_TUTORS,
 defaultLevel: initialLevel,
 defaultGrade: initialGrade,
 });

 const [bookingState, setBookingState] = useState<{
 tutor: Tutor | null;
 slot: TimeSlot | null;
 }>({
 tutor: null,
 slot: null,
 });

 const [confirmedBooking, setConfirmedBooking] = useState<{
 bookingCode: string;
 studentName: string;
 tutorName: string;
 subject: string;
 date: string;
 time: string;
 address: string;
 } | null>(null);

 const {
 isOpen: isBookingModalOpen,
 open: openBookingModal,
 close: closeBookingModal,
 } = useModal();

 const {
 isOpen: isSuccessModalOpen,
 open: openSuccessModal,
 close: closeSuccessModal,
 } = useModal();

 const handleBookSlot = (tutor: Tutor, slot: TimeSlot) => {
 setBookingState({ tutor, slot });
 openBookingModal();
 };

 const handleConfirmBooking = (details: {
 studentName: string;
 parentName: string;
 parentPhone: string;
 address: string;
 notes: string;
 subject: string;
 }) => {
 closeBookingModal();
 const code =`HPN-${Math.floor(1000 + Math.random() * 9000)}`;

 setConfirmedBooking({
 bookingCode: code,
 studentName: details.studentName,
 tutorName: bookingState.tutor?.name ||'',
 subject: details.subject,
 date:`${bookingState.slot?.day}, ${selectedDate} Agustus 2026`,
 time:`${bookingState.slot?.startTime} - ${bookingState.slot?.endTime} WIB`,
 address: details.address,
 });

 openSuccessModal();
 };

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col">
 {/* Top Header */}
 <TopNavBar
 activeRoute="/student/search"
 role="student"
 userName="Ibu Ratna (Fajar - SD 5)"
 userBadge="Siswa Terdaftar"
 />

 <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
 <div>
 <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 Cari Guru Les Privat SD & SMP
 </h1>
 <p className="text-sm text-text-muted mt-1">
 Pilih jenjang, kelas, dan tanggal untuk menemukan pengajar terverifikasi yang siap datang ke rumah Anda.
 </p>
 </div>

 {/* 1. Top Filter Bar */}
 <StudentSearchFilterBar
 selectedLevel={selectedLevel}
 onSelectLevel={setSelectedLevel}
 selectedGrade={selectedGrade}
 onSelectGrade={setSelectedGrade}
 searchQuery={searchQuery}
 onSearchChange={setSearchQuery}
 />

 {/* 2. Content Area: Sidebar Calendar + Results List */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 {/* Left Column: Sticky Calendar Picker */}
 <div className="lg:col-span-4 xl:col-span-4 lg:sticky lg:top-28">
 <StudentDatePickerSidebar
 selectedDate={selectedDate}
 onSelectDate={setSelectedDate}
 currentMonth="Agustus"
 currentYear={2026}
 />
 </div>

 {/* Right Column: Tutor Results List */}
 <div className="lg:col-span-8 xl:col-span-8 space-y-4">
 <div className="flex justify-between items-center px-1">
 <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
 Menampilkan {filteredTutors.length} Pengajar Terverifikasi
 </span>
 <span className="text-xs text-text-muted">
 Tanggal Dipilih: <strong>{selectedDate} Agustus 2026</strong>
 </span>
 </div>

 {filteredTutors.length === 0 ? (
 <div className="bg-white rounded-2xl p-12 text-center border border-border-whisper space-y-3">
 <Search className="w-10 h-10 text-text-muted mx-auto opacity-50" />
 <h3 className="font-headline text-lg font-bold text-primary">
 Tidak Ada Pengajar yang Sesuai
 </h3>
 <p className="text-xs text-text-muted max-w-sm mx-auto">
 Coba ubah kata kunci pencarian atau pilih tanggal lain pada kalender ketersediaan di samping.
 </p>
 </div>
 ) : (
 filteredTutors.map((tutor) => (
 <TutorSearchResultCard
 key={tutor.id}
 tutor={tutor}
 selectedDate={selectedDate}
 onBookSlot={handleBookSlot}
 />
 ))
 )}
 </div>
 </div>
 </main>

 {/* Booking Review Modal */}
 <StudentBookingModal
 isOpen={isBookingModalOpen}
 onClose={closeBookingModal}
 tutor={bookingState.tutor}
 slot={bookingState.slot}
 selectedDate={selectedDate}
 selectedLevel={selectedLevel}
 selectedGrade={selectedGrade}
 onConfirmBooking={handleConfirmBooking}
 />

 {/* Booking Success Ticket Modal */}
 {confirmedBooking && (
 <BookingTicketSuccessModal
 isOpen={isSuccessModalOpen}
 onClose={closeSuccessModal}
 bookingCode={confirmedBooking.bookingCode}
 studentName={confirmedBooking.studentName}
 tutorName={confirmedBooking.tutorName}
 subject={confirmedBooking.subject}
 date={confirmedBooking.date}
 time={confirmedBooking.time}
 address={confirmedBooking.address}
 />
 )}

 <Footer />
 </div>
 );
}
