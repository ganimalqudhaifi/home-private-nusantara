import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getAllBookingsFromDB, getWeeklySessionsFromDB, createBatchBookings, getUserById } from '@/src/lib/db-services';

export async function GET(request: Request) {
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

    const { searchParams } = new URL(request.url);
    const view = searchParams.get('view');

    const bookings = view === 'weekly' ? await getWeeklySessionsFromDB() : await getAllBookingsFromDB();
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data jadwal dari database.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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
    const sessionsInput = Array.isArray(body) ? body : body.sessions || [];

    if (sessionsInput.length === 0) {
      return NextResponse.json(
        { error: 'Array sessions wajib diisi.' },
        { status: 400 }
      );
    }

    const created = await createBatchBookings(sessionsInput);
    return NextResponse.json({ success: true, count: created.length, bookings: created });
  } catch (error: any) {
    console.error('Error creating batch bookings:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan jadwal sesi ke database.' },
      { status: 500 }
    );
  }
}
