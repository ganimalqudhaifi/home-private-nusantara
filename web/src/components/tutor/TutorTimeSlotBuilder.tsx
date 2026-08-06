'use client';

import React, { useState } from'react';
import { Clock, Trash2, Lock, Plus, Calendar } from'lucide-react';
import { TimeSlot } from'../../types';

export interface TutorTimeSlotBuilderProps {
 readonly selectedDay: string;
 readonly onSelectDay: (day: string) => void;
 readonly slots: readonly TimeSlot[];
 readonly onRemoveSlot: (slotId: string) => void;
 readonly onAddSlot: (day: TimeSlot['day'], startTime: string, endTime: string) => void;
 readonly className?: string;
}

export function TutorTimeSlotBuilder({
 selectedDay,
 onSelectDay,
 slots,
 onRemoveSlot,
 onAddSlot,
 className ='',
}: TutorTimeSlotBuilderProps) {
 const days = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'] as const;
 const [startTime, setStartTime] = useState('14:00');
 const [endTime, setEndTime] = useState('16:00');
 const [showAddForm, setShowAddForm] = useState(false);

 const filteredSlots = slots.filter((s) => s.day === selectedDay);

 const handleAdd = (e: React.FormEvent) => {
 e.preventDefault();
 onAddSlot(selectedDay as TimeSlot['day'], startTime, endTime);
 setShowAddForm(false);
 };

 return (
 <div
 className={`bg-white rounded-2xl border border-border-whisper overflow-hidden shadow-sm ${className}`}
 >
 <div className="p-6 md:p-8 pb-4 border-b border-border-whisper">
 <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
 <Calendar className="w-5 h-5 text-primary-container" />
 <span>Jadwal Ketersediaan Mingguan</span>
 </h3>
 <p className="text-xs text-text-muted mt-1">
 Tentukan hari dan rentang jam mengajar rutin Anda setiap minggu.
 </p>
 </div>

 {/* Day Selector Tabs */}
 <div className="flex overflow-x-auto border-b border-border-whisper bg-surface-container-low hide-scrollbar">
 {days.map((day) => {
 const isSelected = selectedDay === day;
 const daySlotsCount = slots.filter((s) => s.day === day).length;

 return (
 <button
 key={day}
 type="button"
 onClick={() => onSelectDay(day)}
 className={`px-6 py-4 font-headline text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 border-b-2 ${
 isSelected
 ?'border-primary-container text-primary-container bg-white'
 :'border-transparent text-text-muted hover:text-primary hover:bg-white/50'
 }`}
 >
 <span>{day}</span>
 {daySlotsCount > 0 && (
 <span
 className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
 isSelected
 ?'bg-primary-container text-white'
 :'bg-surface-container-high text-text-muted'
 }`}
 >
 {daySlotsCount}
 </span>
 )}
 </button>
 );
 })}
 </div>

 {/* Slots List Panel */}
 <div className="p-6 md:p-8 space-y-4">
 <div className="flex items-center justify-between">
 <h4 className="font-headline text-sm font-bold text-primary">
 Slot Jam Hari {selectedDay}
 </h4>
 <span className="text-xs text-text-muted">{filteredSlots.length} slot terkonfigurasi</span>
 </div>

 {filteredSlots.length === 0 ? (
 <div className="py-8 text-center border-2 border-dashed border-border-whisper rounded-xl bg-surface-container-low/30">
 <Clock className="w-8 h-8 text-text-muted mx-auto mb-2 opacity-50" />
 <p className="text-xs text-text-muted">Belum ada slot waktu pada hari {selectedDay}.</p>
 </div>
 ) : (
 <div className="space-y-2.5">
 {filteredSlots.map((slot) => {
 const isBooked = slot.isBooked;

 return (
 <div
 key={slot.id}
 className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
 isBooked
 ?'bg-red-50/50 border-red-200'
 :'bg-white border-border-whisper hover:border-primary-container'
 }`}
 >
 <div className="flex items-center gap-3">
 <div
 className={`w-8 h-8 rounded-lg flex items-center justify-center ${
 isBooked
 ?'bg-red-100 text-red-700'
 :'bg-blue-50 text-blue-900'
 }`}
 >
 {isBooked ? <Lock className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
 </div>

 <div>
 <div className="font-mono text-sm font-bold text-primary">
 {slot.startTime} - {slot.endTime} WIB
 </div>
 {isBooked ? (
 <p className="text-xs text-red-600 font-medium">
 Sudah Terisi: {slot.studentName} ({slot.subject})
 </p>
 ) : (
 <p className="text-xs text-emerald-600 font-medium">
 Tersedia untuk Booking
 </p>
 )}
 </div>
 </div>

 {!isBooked ? (
 <button
 type="button"
 onClick={() => onRemoveSlot(slot.id)}
 className="p-1.5 rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors"
 title="Hapus Slot"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 ) : (
 <span className="text-xs text-text-muted italic px-2 py-1 bg-white/60 rounded-md">
 Terkunci
 </span>
 )}
 </div>
 );
 })}
 </div>
 )}

 {/* Add Slot Trigger / Form */}
 {showAddForm ? (
 <form
 onSubmit={handleAdd}
 className="p-4 rounded-xl border border-primary-container/30 bg-blue-50/30 space-y-3"
 >
 <div className="grid grid-cols-2 gap-3">
 <div className="flex flex-col gap-1">
 <label className="text-xs font-bold text-text-muted">Jam Mulai</label>
 <input
 type="time"
 value={startTime}
 onChange={(e) => setStartTime(e.target.value)}
 className="px-3 py-2 rounded-lg border border-border-whisper bg-white text-xs font-mono"
 required
 />
 </div>
 <div className="flex flex-col gap-1">
 <label className="text-xs font-bold text-text-muted">Jam Selesai</label>
 <input
 type="time"
 value={endTime}
 onChange={(e) => setEndTime(e.target.value)}
 className="px-3 py-2 rounded-lg border border-border-whisper bg-white text-xs font-mono"
 required
 />
 </div>
 </div>

 <div className="flex justify-end gap-2 pt-1">
 <button
 type="button"
 onClick={() => setShowAddForm(false)}
 className="px-3 py-1.5 text-xs text-text-muted hover:text-text-primary"
 >
 Batal
 </button>
 <button
 type="submit"
 className="px-4 py-1.5 bg-primary-container text-white text-xs font-semibold rounded-lg hover:bg-primary-hover shadow-xs"
 >
 Simpan Slot
 </button>
 </div>
 </form>
 ) : (
 <button
 type="button"
 onClick={() => setShowAddForm(true)}
 className="w-full py-3 border-2 border-dashed border-border-whisper hover:border-primary-container rounded-xl text-primary font-headline text-xs font-bold transition-all flex items-center justify-center gap-2 hover:bg-surface-container-low"
 >
 <Plus className="w-4 h-4" />
 <span>Tambah Slot Jam di Hari {selectedDay}</span>
 </button>
 )}
 </div>
 </div>
 );
}
