import { sql } from './db';

export interface CreateConsultationInput {
  parentName: string;
  parentPhone: string;
  studentGrade: string;
  preferredSchedule?: string;
}

export async function saveQuickConsultation(input: CreateConsultationInput) {
  return await sql`
    INSERT INTO quick_consultations (parent_name, parent_phone, student_grade, preferred_schedule)
    VALUES (${input.parentName}, ${input.parentPhone}, ${input.studentGrade}, ${input.preferredSchedule || null})
    RETURNING *;
  `;
}

export async function getUserById(userId: string) {
  const rows = await sql`
    SELECT id, email, full_name, phone, role, avatar_url, created_at
    FROM users
    WHERE id = ${userId}
    LIMIT 1;
  `;
  return rows[0] || null;
}

export async function getAdminStats() {
  const tutorsCount = await sql`
    SELECT 
      COUNT(*) FILTER (WHERE status = 'verified') as active_tutors,
      COUNT(*) FILTER (WHERE status = 'pending') as pending_tutors
    FROM tutors;
  `;

  const studentsCount = await sql`
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE level = 'SD') as sd,
      COUNT(*) FILTER (WHERE level = 'SMP') as smp
    FROM students;
  `;

  const bookingsCount = await sql`
    SELECT COUNT(*) as total_bookings FROM bookings;
  `;

  return {
    activeTutors: Number(tutorsCount[0]?.active_tutors || 0),
    pendingTutors: Number(tutorsCount[0]?.pending_tutors || 0),
    registeredStudents: {
      total: Number(studentsCount[0]?.total || 0),
      sd: Number(studentsCount[0]?.sd || 0),
      smp: Number(studentsCount[0]?.smp || 0),
    },
    totalBookings: Number(bookingsCount[0]?.total_bookings || 0),
    doubleBookingRate: '0%',
  };
}

export async function updateTutorVerification(
  tutorId: string,
  status: 'verified' | 'rejected' | 'suspended',
  adminId: string,
  rejectionReason?: string
) {
  return await sql`
    UPDATE tutors
    SET 
      status = ${status},
      rejection_reason = ${rejectionReason || null},
      verified_at = CASE WHEN ${status} = 'verified' THEN NOW() ELSE verified_at END,
      verified_by = ${adminId},
      updated_at = NOW()
    WHERE id = ${tutorId}
    RETURNING *;
  `;
}
