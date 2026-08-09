import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getUserById, syncUserRoleWithAuth } from '@/src/lib/db-services';

export async function GET() {
  try {
    const { data, error } = await auth.getSession();
    if (error || !data || !data.user) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
    }

    const authRole = (data.user as any).role;
    const userEmail = data.user.email;
    const syncedUser = await syncUserRoleWithAuth(data.user.id, userEmail, authRole);
    const dbUser = syncedUser || (await getUserById(data.user.id, userEmail));

    return NextResponse.json({
      authenticated: true,
      user: dbUser || data.user,
    });
  } catch (error: any) {
    console.error('Error in /api/user/me:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data user.' },
      { status: 500 }
    );
  }
}
