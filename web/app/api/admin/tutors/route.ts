import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { updateTutorVerification, getAllTutorsFromDB, getUserById } from '@/src/lib/db-services';

export async function GET() {
  try {
    const { data: sessionData } = await auth.getSession();
    if (sessionData?.user?.id) {
      const dbUser = await getUserById(sessionData.user.id);
      if (dbUser && dbUser.role !== 'admin') {
        return NextResponse.json(
          { error: 'Akses ditolak. Anda tidak memiliki hak akses Admin.' },
          { status: 403 }
        );
      }
    }

    const tutors = await getAllTutorsFromDB();
    return NextResponse.json({ success: true, tutors });
  } catch (error: any) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data tutor dari database.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { data: sessionData } = await auth.getSession();
    if (sessionData?.user?.id) {
      const dbUser = await getUserById(sessionData.user.id);
      if (dbUser && dbUser.role !== 'admin') {
        return NextResponse.json(
          { error: 'Akses ditolak. Anda tidak memiliki hak akses Admin.' },
          { status: 403 }
        );
      }
    }

    const body = await request.json();
    const { tutorId, status, rejectionReason, adminId } = body;

    if (!tutorId || !status || !['verified', 'rejected', 'suspended'].includes(status)) {
      return NextResponse.json(
        { error: 'Parameter tutorId dan status (verified/rejected/suspended) wajib diisi.' },
        { status: 400 }
      );
    }

    const updated = await updateTutorVerification(
      tutorId,
      status,
      adminId || sessionData?.user?.id || '00000000-0000-0000-0000-000000000000',
      rejectionReason
    );

    return NextResponse.json({ success: true, tutor: updated[0] });
  } catch (error: any) {
    console.error('Error updating tutor status:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate status tutor.' },
      { status: 500 }
    );
  }
}
