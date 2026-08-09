import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { registerTutorProfile } from '@/src/lib/db-services';

export async function POST(request: Request) {
  try {
    let sessionUser: any = null;
    try {
      const { data } = await auth.getSession();
      if (data?.user) sessionUser = data.user;
    } catch (e) {
      console.warn('Session lookup during tutor register:', e);
    }

    const body = await request.json();
    const { name, phone, university, major, selectedSubjects, cvFileName, draftId } = body;

    const userId = sessionUser?.id || body.userId || draftId || crypto.randomUUID();
    const email =
      sessionUser?.email ||
      body.email ||
      (phone ? `tutor-${phone.replace(/\D/g, '')}@homeprivatenusantara.id` : `tutor-${userId.slice(0, 8)}@homeprivatenusantara.id`);

    const result = await registerTutorProfile({
      userId,
      email,
      fullName: name || sessionUser?.name || 'Calon Pengajar',
      phone: phone || '-',
      university: university || '-',
      major: major || '-',
      selectedSubjects: selectedSubjects || [],
      cvFileName,
      avatarUrl: sessionUser?.image || undefined,
    });

    return NextResponse.json({ success: true, result, userId });
  } catch (error: any) {
    console.error('Error registering tutor profile:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data pendaftaran pengajar ke database.' },
      { status: 500 }
    );
  }
}
