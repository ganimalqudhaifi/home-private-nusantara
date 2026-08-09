import { NextResponse } from 'next/server';
import { getAdminStats } from '@/src/lib/db-services';

export async function GET() {
  try {
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
