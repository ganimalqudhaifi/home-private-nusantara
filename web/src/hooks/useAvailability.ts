'use client';

import { useState } from 'react';

export interface UseAvailabilityProps {
  readonly initialSubjects?: readonly string[];
  readonly initialTimeSlots?: readonly string[];
}

export function useAvailability({
  initialSubjects = [],
  initialTimeSlots = [],
}: UseAvailabilityProps = {}) {
  const [activeSubjects, setActiveSubjects] = useState<readonly string[]>(initialSubjects);
  const [activeTimeSlots, setActiveTimeSlots] = useState<readonly string[]>(initialTimeSlots);

  const toggleSubject = (subject: string) => {
    setActiveSubjects((prev) =>
      prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]
    );
  };

  const toggleTimeSlot = (slot: string) => {
    setActiveTimeSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  return {
    activeSubjects,
    toggleSubject,
    activeTimeSlots,
    toggleTimeSlot,
  };
}
