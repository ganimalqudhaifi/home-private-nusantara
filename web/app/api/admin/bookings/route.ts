import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getAllBookingsFromDB, getWeeklySessionsFromDB, createBatchBookings, deleteBookingById, getUserById, updateBookingInDB } from '@/src/lib/db-services';

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

export async function DELETE(request: Request) {
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

    const id = new URL(request.url).searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID sesi wajib diisi.' }, { status: 400 });
    }

    const deleted = await deleteBookingById(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Sesi tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id: deleted.id });
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus sesi dari database.' },
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
    const { id, tutorId, date, time, subject, status, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID sesi wajib diisi.' }, { status: 400 });
    }

    const result = await updateBookingInDB(id, {
      tutorId,
      date,
      time,
      subject,
      status,
      notes
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Gagal memperbarui jadwal sesi.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, booking: result.booking });
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server saat memperbarui sesi.' },
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

    const result = await createBatchBookings(sessionsInput);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Terdapat jadwal yang bentrok. Silakan periksa kembali.', 
          collisions: result.collisions 
        },
        { status: 409 }
      );
    }

    const created = result.bookings || [];
    return NextResponse.json({ success: true, count: created.length, bookings: created });
  } catch (error: any) {
    console.error('Error creating batch bookings:', error);
    return NextResponse.json(
      { error: 'Gagal menyimpan jadwal sesi ke database.' },
      { status: 500 }
    );
  }
}
