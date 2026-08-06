'use client';

import { useState } from'react';

export interface UseCalendarProps {
 readonly initialMonth?: string;
 readonly initialYear?: number;
}

export function useCalendar({
 initialMonth ='Agustus',
 initialYear = 2026,
}: UseCalendarProps = {}) {
 const [currentMonth, setCurrentMonth] = useState<string>(initialMonth);
 const [currentYear, setCurrentYear] = useState<number>(initialYear);
 const [selectedDay, setSelectedDay] = useState<number>(10);

 const prevMonth = () => {
 // Basic calendar navigation toggle
 if (currentMonth ==='Agustus') {
 setCurrentMonth('Juli');
 } else {
 setCurrentMonth('Agustus');
 }
 };

 const nextMonth = () => {
 if (currentMonth ==='Agustus') {
 setCurrentMonth('September');
 } else {
 setCurrentMonth('Agustus');
 }
 };

 return {
 currentMonth,
 currentYear,
 selectedDay,
 setSelectedDay,
 prevMonth,
 nextMonth,
 };
}
