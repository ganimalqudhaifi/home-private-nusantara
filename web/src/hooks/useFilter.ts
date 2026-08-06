'use client';

import { useState, useMemo } from'react';
import { Tutor, LevelType } from'../types';

export interface UseFilterProps {
 readonly initialTutors: readonly Tutor[];
 readonly defaultLevel?: LevelType;
 readonly defaultGrade?: number;
}

export function useFilter({
 initialTutors,
 defaultLevel ='SD',
 defaultGrade = 5,
}: UseFilterProps) {
 const [selectedLevel, setSelectedLevel] = useState<LevelType>(defaultLevel);
 const [selectedGrade, setSelectedGrade] = useState<number>(defaultGrade);
 const [searchQuery, setSearchQuery] = useState<string>('');
 const [selectedDate, setSelectedDate] = useState<number>(10); // 10 August default

 const filteredTutors = useMemo(() => {
 return initialTutors.filter((tutor) => {
 const gradeLabel =`${selectedLevel} Kelas ${selectedGrade}`;
 const matchesGrade = tutor.grades.some((g) => g.includes(gradeLabel) || g.includes(selectedLevel));
 const matchesSearch =
 searchQuery.trim() ==='' ||
 tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
 tutor.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
 tutor.university.toLowerCase().includes(searchQuery.toLowerCase());

 return matchesGrade && matchesSearch;
 });
 }, [initialTutors, selectedLevel, selectedGrade, searchQuery]);

 return {
 selectedLevel,
 setSelectedLevel,
 selectedGrade,
 setSelectedGrade,
 searchQuery,
 setSearchQuery,
 selectedDate,
 setSelectedDate,
 filteredTutors,
 };
}
