import { NextResponse } from 'next/server';
import { getAllSubjects } from '@/src/lib/db-services';

export const dynamic = 'force-dynamic'; // Prevent static generation to always fetch fresh data

export async function GET() {
  try {
    const subjects = await getAllSubjects(true); // Get only active subjects
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}
