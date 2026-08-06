'use client';

import { useState } from'react';
import { TimeSlot } from'../types';

export interface UseAvailabilityProps {
 readonly initialSlots?: readonly TimeSlot[];
}

export function useAvailability({ initialSlots = [] }: UseAvailabilityProps = {}) {
 const [selectedDay, setSelectedDay] = useState<string>('Senin');
 const [slots, setSlots] = useState<readonly TimeSlot[]>(initialSlots);
 const [activeLevels, setActiveLevels] = useState<readonly string[]>([
'SD Kelas 3',
'SD Kelas 4',
'SD Kelas 5',
'SD Kelas 6',
'SMP Kelas 7',
'SMP Kelas 8',
 ]);

 const toggleLevel = (level: string) => {
 setActiveLevels((prev) =>
 prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
 );
 };

 const removeSlot = (slotId: string) => {
 setSlots((prev) => prev.filter((s) => s.id !== slotId));
 };

 const addSlot = (day: TimeSlot['day'], startTime: string, endTime: string) => {
 const newSlot: TimeSlot = {
 id:`slot-${Date.now()}`,
 day,
 startTime,
 endTime,
 };
 setSlots((prev) => [...prev, newSlot]);
 };

 return {
 selectedDay,
 setSelectedDay,
 slots,
 activeLevels,
 toggleLevel,
 removeSlot,
 addSlot,
 };
}
