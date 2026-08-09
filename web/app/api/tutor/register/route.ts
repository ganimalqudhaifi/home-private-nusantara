import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { registerTutorProfile } from '@/src/lib/db-services';

export async function POST(request: Request) {
  try {
    const { data: sessionData } = await auth.getSession();
    const body = await request.json();
    const { name, phone, university, major, selectedSubjects, cvFileName } = body;

    const userId = sessionData?.user?.id || body.userId;
    const email = sessionData?.user?.email || body.email;

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Pengguna belum terautentikasi dengan Google.' },
        { status: 401 }
      );
    }

    const result = await registerTutorProfile({
      userId,
      email,
      fullName: name || sessionData?.user?.name || 'Calon Pengajar',
      phone: phone || '-',
      university: university || '-',
      major: major || '-',
      selectedSubjects: selectedSubjects || [],
      cvFileName,
      avatarUrl: sessionData?.user?.image || undefined,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Error registering tutor profile:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data pendaftaran pengajar ke database.' },
      { status: 500 }
    );
  }
}
