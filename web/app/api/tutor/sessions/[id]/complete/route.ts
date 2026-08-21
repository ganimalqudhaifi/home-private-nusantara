import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { sql } from '@/src/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { data: sessionData } = await auth.getSession();
    
    if (!sessionData?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const tutorId = sessionData.user.id;

    // Verify session belongs to tutor
    const result = await sql`
      UPDATE bookings
      SET status = 'completed', updated_at = now()
      WHERE id = ${id} AND tutor_id = ${tutorId} AND status IN ('scheduled', 'in_progress')
      RETURNING id;
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Sesi tidak ditemukan atau tidak dapat diselesaikan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Sesi berhasil diselesaikan' });
  } catch (error: any) {
    console.error('API /api/tutor/sessions/[id]/complete error:', error);
    return NextResponse.json({ error: 'Gagal menandai sesi selesai' }, { status: 500 });
  }
}
