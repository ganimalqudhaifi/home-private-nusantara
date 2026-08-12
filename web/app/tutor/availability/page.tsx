'use client';

import React, { useState } from'react';
import { TopNavBar } from'../../../src/components/shared/TopNavBar';
import { Footer } from'../../../src/components/shared/Footer';
import { TutorAvailabilityMatrix } from'../../../src/components/tutor/TutorAvailabilityMatrix';
import { TutorTimeSlotBuilder } from'../../../src/components/tutor/TutorTimeSlotBuilder';
import { useAvailability } from'../../../src/hooks/useAvailability';
import { Info, CheckCircle2 } from'lucide-react';
import { Button } from'../../../src/components/shared/Button';

export interface TutorAvailabilityPageProps {
 readonly initialDay?: string;
}

export default function TutorAvailabilityPage({
 initialDay ='Senin',
}: TutorAvailabilityPageProps) {
 const initialSlots: any[] = [];
 const {
 selectedDay,
 setSelectedDay,
 slots,
 activeLevels,
 toggleLevel,
 removeSlot,
 addSlot,
 } = useAvailability({ initialSlots });

 const [isSaved, setIsSaved] = useState(false);

 const handleSave = () => {
 setIsSaved(true);
 setTimeout(() => {
 setIsSaved(false);
 }, 3000);
 };

 const activeDaysCount = Array.from(new Set(slots.map((s) => s.day))).length;

 return (
 <div className="bg-surface text-text-primary min-h-screen flex flex-col pb-24">
 {/* Top Header */}
 <TopNavBar
 activeRoute="/tutor/availability"
 role="tutor"
 userName="Sarah Amanda, S.Pd."
 userBadge="Pengajar Terverifikasi"
 />

 <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
 <div>
 <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-primary">
 Konfigurasi Jenjang & Ketersediaan Mengajar
 </h1>
 <p className="text-sm text-text-muted mt-1">
 Atur jenjang kelas yang Anda ampu dan buka slot jam rutin agar siswa dapat memesan sesi belajar.
 </p>
 </div>

 {/* Section 1: Grade Level Matrix */}
 <TutorAvailabilityMatrix
 activeGrades={activeLevels}
 onToggleGrade={toggleLevel}
 />

 {/* Section 2 & 3: Weekly Availability Scheduler */}
 <TutorTimeSlotBuilder
 selectedDay={selectedDay}
 onSelectDay={setSelectedDay}
 slots={slots}
 onRemoveSlot={removeSlot}
 onAddSlot={addSlot}
 />
 </main>

 {/* Sticky Bottom Bar */}
 <div className="fixed bottom-0 left-0 w-full bg-white border-t border-border-whisper shadow-[0_-4px_12px_rgba(0,0,0,0.06)] z-40">
 <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
 <div className="text-sm text-text-muted flex items-center gap-2">
 <Info className="w-4 h-4 text-primary-container shrink-0" />
 <span>
 <strong>{activeLevels.length} Kelas Terpilih</strong> •{''}
 <strong>{activeDaysCount} Hari Aktif</strong> •{''}
 <strong>{slots.length} Slot Jam</strong>
 </span>
 </div>

 <div className="flex items-center gap-3 w-full sm:w-auto">
 {isSaved && (
 <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
 <CheckCircle2 className="w-4 h-4" />
 <span>Pengaturan Berhasil Disimpan!</span>
 </span>
 )}
 <Button
 onClick={handleSave}
 variant="primary"
 size="lg"
 className="w-full sm:w-auto font-bold"
 >
 Simpan Pengaturan Ketersediaan
 </Button>
 </div>
 </div>
 </div>

 <Footer />
 </div>
 );
}
