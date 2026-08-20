import { NextResponse } from 'next/server';
import { auth } from '@/src/lib/auth-server';
import { updateSubject, deleteSubject } from '@/src/lib/db-services';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await auth.getSession();
    if (data?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const updatedSubject = await updateSubject(id, body);
    
    return NextResponse.json({ subject: updatedSubject });
  } catch (error) {
    console.error('Error updating subject:', error);
    return NextResponse.json({ error: 'Failed to update subject' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data } = await auth.getSession();
    if (data?.user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await deleteSubject(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting subject:', error);
    return NextResponse.json({ error: 'Failed to delete subject' }, { status: 500 });
  }
}
