import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getAllStudentsFromDB, createStudentInDB, getUserById } from '@/src/lib/db-services';

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

    const students = await getAllStudentsFromDB();
    return NextResponse.json({ success: true, students });
  } catch (error: any) {
    console.error('Error fetching students:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data siswa dari database.' },
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
    const { name, level, grade, school, parentName, parentPhone, address, district, city } = body;

    if (!name || !level || !grade || !parentName || !parentPhone || !address) {
      return NextResponse.json(
        { error: 'Mohon lengkapi semua bidang wajib (Nama Siswa, Jenjang, Kelas, Orang Tua, Nomor HP, dan Alamat).' },
        { status: 400 }
      );
    }

    const newStudent = await createStudentInDB({
      name: String(name).trim(),
      level: level === 'SMP' ? 'SMP' : 'SD',
      grade: Number(grade),
      school: school ? String(school).trim() : undefined,
      parentName: String(parentName).trim(),
      parentPhone: String(parentPhone).trim(),
      address: String(address).trim(),
      district: district ? String(district).trim() : undefined,
      city: city ? String(city).trim() : undefined,
    });

    return NextResponse.json({ success: true, student: newStudent }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating student:', error);
    return NextResponse.json(
      { error: 'Gagal menambahkan data siswa ke database.' },
      { status: 500 }
    );
  }
}
