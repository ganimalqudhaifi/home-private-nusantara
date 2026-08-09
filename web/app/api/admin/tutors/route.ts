import { NextResponse } from 'next/server';
import { updateTutorVerification } from '@/src/lib/db-services';

export async function PATCH(request: Request) {
  try {
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
      adminId || '00000000-0000-0000-0000-000000000000',
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
