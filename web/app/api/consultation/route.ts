import { NextResponse } from 'next/server';
import { saveQuickConsultation } from '@/src/lib/db-services';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.parentName || !body.parentPhone || !body.studentGrade) {
      return NextResponse.json(
        { error: 'Nama Wali, Nomor WA, dan Jenjang/Kelas wajib diisi.' },
        { status: 400 }
      );
    }

    const consultation = await saveQuickConsultation({
      parentName: body.parentName,
      parentPhone: body.parentPhone,
      studentGrade: body.studentGrade,
      preferredSchedule: body.preferredSchedule,
    });

    return NextResponse.json({ success: true, consultation });
  } catch (error: any) {
    console.error('Error saving consultation:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data konsultasi.' },
      { status: 500 }
    );
  }
}
