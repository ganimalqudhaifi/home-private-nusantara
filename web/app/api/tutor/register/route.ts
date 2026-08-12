import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getUserById, registerTutorProfile, syncUserRoleWithAuth } from '@/src/lib/db-services';

interface SessionUser {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  role?: string;
  avatarUrl?: string;
  picture?: string;
}

export async function POST(request: Request) {
  try {
    let sessionUser: SessionUser | null = null;
    try {
      const { data } = await auth.getSession();
      if (data?.user) sessionUser = data.user as SessionUser;
    } catch (e) {
      console.warn('Session lookup during tutor register notice:', e);
    }

    if (sessionUser) {
      const authRole = sessionUser.role;
      const dbUser =
        (await syncUserRoleWithAuth(sessionUser.id, sessionUser.email, authRole)) ||
        (await getUserById(sessionUser.id, sessionUser.email));
      const userRole = dbUser?.role || authRole;

      if (userRole === 'admin') {
        return NextResponse.json(
          { error: 'Sesi Admin sedang aktif. Silakan keluar (Log Out) terlebih dahulu untuk mendaftar sebagai pengajar.' },
          { status: 403 }
        );
      }
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

    const email = sessionUser?.email || body.email || undefined;
    const avatarUrl =
      sessionUser?.image || sessionUser?.avatarUrl || sessionUser?.picture || undefined;

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
  } catch (error: unknown) {
    console.error('Error registering tutor profile:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan data pendaftaran pengajar ke database.' },
      { status: 500 }
    );
  }
}
