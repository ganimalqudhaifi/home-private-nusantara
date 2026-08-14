import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { sql } from '@/src/lib/db';

export async function PUT(request: Request) {
  try {
    const { data: sessionData } = await auth.getSession();
    
    if (!sessionData?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tutorId = sessionData.user.id;
    const body = await request.json();
    const { subjects, availabilitySlots } = body;

    if (!Array.isArray(subjects) || !Array.isArray(availabilitySlots)) {
      return NextResponse.json({ error: 'Format data tidak valid' }, { status: 400 });
    }

    await sql`
      UPDATE tutors
      SET 
        subjects = ${subjects},
        availability_slots = ${availabilitySlots}
      WHERE id = ${tutorId}
    `;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API /api/tutor/availability error:', error);
    return NextResponse.json({ error: 'Gagal menyimpan pengaturan ketersediaan' }, { status: 500 });
  }
}
