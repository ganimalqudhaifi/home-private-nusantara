import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { getAllSubjects, createSubject } from '@/src/lib/db-services';

export async function GET() {
  try {
    const { data } = await auth.getSession();
    if (data?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subjects = await getAllSubjects(false); // Get all subjects for admin
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error('Error fetching admin subjects:', error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { data } = await auth.getSession();
    if (data?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const newSubject = await createSubject(body);
    return NextResponse.json({ subject: newSubject });
  } catch (error) {
    console.error('Error creating subject:', error);
    return NextResponse.json({ error: 'Failed to create subject' }, { status: 500 });
  }
}
