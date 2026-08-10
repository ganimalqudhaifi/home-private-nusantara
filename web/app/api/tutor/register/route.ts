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
      console.warn('Session lookup during tutor register notice:', e);
    }

    const body = await request.json();
    const { name, phone, university, major, selectedSubjects, portfolioUrl, cvFileName } = body;

    const userId = sessionUser?.id || body.userId;
    if (!userId) {
      return NextResponse.json(
        { error: 'Pengguna harus login terlebih dahulu dengan akun Google.' },
        { status: 401 }
      );
    }

    const email = sessionUser?.email || body.email || null;
    const avatarUrl =
      sessionUser?.image || (sessionUser as any)?.avatarUrl || (sessionUser as any)?.picture || null;

    const result = await registerTutorProfile({
      userId,
      email,
      fullName: name || sessionUser?.name || 'Calon Pengajar',
      phone: phone || '-',
      university: university || '-',
      major: major || '-',
      selectedSubjects: selectedSubjects || [],
      portfolioUrl: portfolioUrl || cvFileName,
      avatarUrl,
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
