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

export interface RegisterTutorInput {
  userId: string;
  email: string;
  fullName: string;
  phone: string;
  university: string;
  major: string;
  selectedSubjects: string[];
  portfolioUrl?: string;
  cvFileName?: string;
  avatarUrl?: string;
}

export async function registerTutorProfile(input: RegisterTutorInput) {
  await sql`
    INSERT INTO users (id, email, full_name, phone, role, avatar_url, updated_at)
    VALUES (
      ${input.userId},
      ${input.email},
      ${input.fullName},
      ${input.phone},
      'tutor',
      ${input.avatarUrl || null},
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      phone = EXCLUDED.phone,
      role = 'tutor',
      updated_at = NOW();
  `;

  await sql`
    INSERT INTO tutors (id, title, university, degree, portfolio_url, status, updated_at)
    VALUES (
      ${input.userId},
      ${input.major},
      ${input.university},
      ${input.major},
      ${input.portfolioUrl || input.cvFileName || null},
      'pending',
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      university = EXCLUDED.university,
      degree = EXCLUDED.degree,
      portfolio_url = EXCLUDED.portfolio_url,
      updated_at = NOW();
  `;

  if (input.selectedSubjects && input.selectedSubjects.length > 0) {
    for (const subjectName of input.selectedSubjects) {
      await sql`
        INSERT INTO tutor_subjects (tutor_id, subject_name)
        VALUES (${input.userId}, ${subjectName})
        ON CONFLICT (tutor_id, subject_name) DO NOTHING;
      `;
    }
  }

  return { success: true, tutorId: input.userId };
}

export async function getAllTutorsFromDB() {
  const rows = await sql`
    SELECT 
      t.id,
      u.full_name as name,
      u.email,
      u.phone,
      u.avatar_url as avatar,
      t.university,
      t.degree as major,
      t.status,
      t.rating,
      t.review_count as "reviewCount",
      t.hourly_rate as "hourlyRate",
      t.experience_years as "experienceYears",
      t.portfolio_url as "portfolioUrl",
      t.created_at as "createdAt",
      COALESCE(
        ARRAY_AGG(ts.subject_name) FILTER (WHERE ts.subject_name IS NOT NULL),
        '{}'
      ) as subjects
    FROM tutors t
    JOIN users u ON t.id = u.id
    LEFT JOIN tutor_subjects ts ON t.id = ts.tutor_id
    GROUP BY t.id, u.full_name, u.email, u.phone, u.avatar_url;
  `;
  return rows;
}

export async function syncUserRoleWithAuth(userId: string, authRole?: string) {
  const user = await getUserById(userId);
  if (!user) return null;

  const isAuthAdmin = authRole === 'admin' || authRole === 'ADMIN';

  if (isAuthAdmin && user.role !== 'admin') {
    await sql`
      UPDATE users
      SET role = 'admin', updated_at = NOW()
      WHERE id = ${userId};
    `;
    user.role = 'admin';
  } else if (!isAuthAdmin && user.role === 'admin') {
    const isTutor = await sql`
      SELECT id FROM tutors WHERE id = ${userId} LIMIT 1;
    `;
    const targetRole = isTutor.length > 0 ? 'tutor' : 'student';

    await sql`
      UPDATE users
      SET role = ${targetRole}, updated_at = NOW()
      WHERE id = ${userId};
    `;
    user.role = targetRole;
  }

  return user;
}
