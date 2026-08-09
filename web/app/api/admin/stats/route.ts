import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getAdminStats, getUserById } from '@/src/lib/db-services';

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

    const stats = await getAdminStats();
    return NextResponse.json({ success: true, stats });
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Gagal memuat statistik admin.' },
      { status: 500 }
    );
  }
}
