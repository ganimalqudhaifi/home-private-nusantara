import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import {
  updateTutorVerification,
  getAllTutorsFromDB,
  getUserById,
  updateTutorProfileInDB,
  deleteTutorFromDB,
} from '@/src/lib/db-services';

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

    const tutors = await getAllTutorsFromDB();
    return NextResponse.json({ success: true, tutors });
  } catch (error: any) {
    console.error('Error fetching tutors:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data tutor dari database.' },
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
    const { tutorId, status, rejectionReason, adminId } = body;

    const validStatuses = ['verified', 'active', 'on_leave', 'inactive', 'suspended', 'rejected'];
    if (!tutorId || !status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Parameter tutorId dan status (${validStatuses.join('/')}) wajib diisi.` },
        { status: 400 }
      );
    }

    const updated = await updateTutorVerification(
      tutorId,
      status,
      adminId || sessionData?.user?.id || null,
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

export async function PUT(request: Request) {
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
    const { tutorId, name, phone, university, degree, subjects, status, avatarUrl } = body;

    if (!tutorId || !name || !phone || !university) {
      return NextResponse.json(
        { error: 'Parameter tutorId, Nama, No HP, dan Universitas wajib diisi.' },
        { status: 400 }
      );
    }

    const updatedTutor = await updateTutorProfileInDB(String(tutorId), {
      name: String(name).trim(),
      phone: String(phone).trim(),
      university: String(university).trim(),
      degree: degree ? String(degree).trim() : 'S1',
      subjects: Array.isArray(subjects) ? subjects : undefined,
      status: status ? String(status) : undefined,
      avatarUrl: avatarUrl ? String(avatarUrl) : undefined,
    });

    return NextResponse.json({ success: true, tutor: updatedTutor });
  } catch (error: any) {
    console.error('Error updating tutor profile:', error);
    return NextResponse.json(
      { error: 'Gagal memperbarui profil tutor di database.' },
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

    const { searchParams } = new URL(request.url);
    let tutorId = searchParams.get('tutorId') || searchParams.get('id');

    if (!tutorId) {
      const body = await request.json().catch(() => ({}));
      tutorId = body.tutorId || body.id;
    }

    if (!tutorId) {
      return NextResponse.json(
        { error: 'Parameter tutorId wajib diisi.' },
        { status: 400 }
      );
    }

    await deleteTutorFromDB(String(tutorId));

    return NextResponse.json({ success: true, message: 'Data tutor berhasil dihapus.' });
  } catch (error: any) {
    console.error('Error deleting tutor:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus data tutor dari database.' },
      { status: 500 }
    );
  }
}
