import React, { Suspense } from 'react';
import { TutorAvailabilityClient } from './TutorAvailabilityClient';
import { auth } from '@/src/lib/auth-server';
import { sql } from '@/src/lib/db';
import { redirect } from 'next/navigation';

export default async function TutorAvailabilityPage() {
  const { data: sessionData } = await auth.getSession();

  if (!sessionData?.user?.id) {
    redirect('/login');
  }

  const tutorId = sessionData.user.id;
  let initialSubjects: string[] = [];
  let initialTimeSlots: string[] = [];

  try {
    const rows = await sql`
      SELECT subjects, availability_slots 
      FROM tutors 
      WHERE id = ${tutorId}
    `;

    if (rows.length > 0) {
      initialSubjects = rows[0].subjects || [];
      initialTimeSlots = rows[0].availability_slots || [];
    }
  } catch (err) {
    console.error('Failed to fetch tutor availability:', err);
  }

  return (
    <Suspense fallback={<div className="p-8 text-center text-text-muted font-medium text-sm">Memuat pengaturan...</div>}>
      <TutorAvailabilityClient 
        initialSubjects={initialSubjects} 
        initialTimeSlots={initialTimeSlots} 
      />
    </Suspense>
  );
}
