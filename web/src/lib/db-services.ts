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

export async function getUserById(userId: string, email?: string) {
  if (email) {
    const rows = await sql`
      SELECT u.id, u.email, u.full_name, u.phone, u.role, u.avatar_url, u.created_at, t.status
      FROM users u
      LEFT JOIN tutors t ON u.id = t.id
      WHERE u.id = ${userId} OR (LOWER(u.email) = LOWER(${email}) AND u.email IS NOT NULL)
      ORDER BY CASE WHEN u.id = ${userId} THEN 1 ELSE 2 END
      LIMIT 1;
    `;
    return rows[0] || null;
  }

  const rows = await sql`
    SELECT u.id, u.email, u.full_name, u.phone, u.role, u.avatar_url, u.created_at, t.status
    FROM users u
    LEFT JOIN tutors t ON u.id = t.id
    WHERE u.id = ${userId}
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
  status: 'verified' | 'active' | 'on_leave' | 'inactive' | 'suspended' | 'rejected',
  adminId?: string | null,
  rejectionReason?: string
) {
  return await sql`
    UPDATE tutors
    SET 
      status = ${status},
      rejection_reason = ${rejectionReason || null},
      verified_at = CASE WHEN ${status} IN ('verified', 'active') THEN COALESCE(verified_at, NOW()) ELSE verified_at END,
      verified_by = ${adminId || null},
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

export async function syncUserRoleWithAuth(
  userId: string,
  email?: string,
  authRole?: string,
  fullName?: string | null,
  avatarUrl?: string | null
) {
  let user = await getUserById(userId, email);

  // If user is missing from public.users but authenticated via auth, auto-provision
  if (!user && email) {
    try {
      const isInitialAdmin = authRole === 'admin' || authRole === 'ADMIN';
      const initialRole = isInitialAdmin ? 'admin' : 'student';

      const rows = await sql`
        INSERT INTO users (id, email, full_name, phone, role, avatar_url, created_at, updated_at)
        VALUES (
          ${userId},
          ${email},
          ${fullName || 'Pengguna'},
          '-',
          ${initialRole},
          ${avatarUrl || null},
          NOW(),
          NOW()
        )
        ON CONFLICT (email) DO UPDATE SET
          updated_at = NOW()
        RETURNING id, email, full_name, phone, role, avatar_url, created_at;
      `;
      user = rows[0] || null;
    } catch (err) {
      console.warn('Auto-provision user notice:', err);
    }
  }

  if (!user) return null;

  let isAuthAdmin = authRole === 'admin' || authRole === 'ADMIN';

  // Automatically check Neon Auth internal user table (neon_auth.user / neon_auth.users) if not yet identified as admin
  if (!isAuthAdmin && user.role !== 'admin') {
    try {
      const neonAuthRows = await sql`
        SELECT role FROM neon_auth.user WHERE id = ${userId}
        UNION ALL
        SELECT role FROM neon_auth.users WHERE id = ${userId}
        LIMIT 1;
      `;
      if (neonAuthRows[0]?.role && String(neonAuthRows[0].role).toLowerCase() === 'admin') {
        isAuthAdmin = true;
      }
    } catch (err) {
      console.warn('Neon auth role lookup notice:', err);
    }
  }

  // Automatically promote user role to admin in public.users if neon_auth specifies admin
  if (isAuthAdmin && user.role !== 'admin') {
    await sql`
      UPDATE users
      SET role = 'admin', updated_at = NOW()
      WHERE id = ${user.id} OR (LOWER(email) = LOWER(${email}) AND email IS NOT NULL);
    `;
    user.role = 'admin';
  }

  return user;
}

export async function getAllBookingsFromDB() {
  try {
    const rows = await sql`
      SELECT 
        b.id,
        b.booking_code as code,
        b.student_id as "studentId",
        COALESCE(s.student_name, u_st.full_name, 'Siswa Nusantara') as "studentName",
        b.tutor_id as "tutorId",
        COALESCE(u_tu.full_name, 'Pengajar') as "tutorName",
        b.level,
        b.grade,
        b.subject,
        TO_CHAR(b.booking_date, 'YYYY-MM-DD') as date,
        b.day,
        CONCAT(TO_CHAR(b.start_time, 'HH24:MI'), ' - ', TO_CHAR(b.end_time, 'HH24:MI')) as time,
        b.address,
        b.district,
        b.city,
        b.notes,
        b.status,
        b.amount
      FROM bookings b
      LEFT JOIN tutors t ON b.tutor_id = t.id
      LEFT JOIN users u_tu ON t.id = u_tu.id
      LEFT JOIN students s ON b.student_id = s.id
      LEFT JOIN users u_st ON s.id = u_st.id
      ORDER BY b.booking_date DESC, b.start_time ASC;
    `;
    return rows;
  } catch (err) {
    console.error('Error fetching bookings from database:', err);
    return [];
  }
}

export async function deleteBookingById(id: string) {
  const rows = await sql`
    DELETE FROM bookings
    WHERE id = ${id}::uuid
    RETURNING id;
  `;

  return rows[0] || null;
}

export async function getWeeklySessionsFromDB() {
  try {
    const rows = await sql`
      SELECT 
        b.id,
        b.booking_code as code,
        b.student_id as "studentId",
        COALESCE(s.student_name, u_st.full_name, 'Siswa Nusantara') as "studentName",
        b.tutor_id as "tutorId",
        COALESCE(u_tu.full_name, 'Pengajar') as "tutorName",
        b.level,
        b.grade,
        b.subject,
        TO_CHAR(b.booking_date, 'YYYY-MM-DD') as date,
        b.day,
        CONCAT(TO_CHAR(b.start_time, 'HH24:MI'), ' - ', TO_CHAR(b.end_time, 'HH24:MI')) as time,
        b.address,
        b.district,
        b.city,
        b.notes,
        b.status,
        b.amount
      FROM bookings b
      LEFT JOIN tutors t ON b.tutor_id = t.id
      LEFT JOIN users u_tu ON t.id = u_tu.id
      LEFT JOIN students s ON b.student_id = s.id
      LEFT JOIN users u_st ON s.id = u_st.id
      WHERE b.booking_date >= CURRENT_DATE - INTERVAL '1 day'
        AND b.booking_date <= CURRENT_DATE + INTERVAL '14 days'
      ORDER BY b.booking_date ASC, b.start_time ASC
      LIMIT 6;
    `;
    return rows;
  } catch (err) {
    console.error('Error fetching weekly sessions from database:', err);
    return [];
  }
}

export interface CreateBookingInput {
  studentName?: string;
  parentName?: string;
  parentPhone?: string;
  studentId?: string;
  tutorId?: string;
  tutorName?: string;
  subject?: string;
  date?: string;
  time?: string;
  address?: string;
  city?: string;
  amount?: number;
}

export async function createBatchBookings(sessions: CreateBookingInput[]) {
  if (!sessions || sessions.length === 0) return [];

  let defaultTutorId: string | null = null;
  const tutorRows = await sql`SELECT id FROM tutors LIMIT 1;`;
  if (tutorRows[0]?.id) {
    defaultTutorId = tutorRows[0].id;
  }

  // Student resolution
  let studentIdToUse: string | null = null;
  const firstSession = sessions[0];
  if (firstSession?.studentId && firstSession.studentId.length === 36) {
    studentIdToUse = firstSession.studentId;
  } else if (firstSession?.studentName) {
    try {
      const existingStudent = await sql`
        SELECT id FROM students WHERE LOWER(student_name) = LOWER(${firstSession.studentName}) LIMIT 1;
      `;
      if (existingStudent[0]?.id) {
        studentIdToUse = existingStudent[0].id;
      } else {
        const isSMP = (firstSession.subject || '').toLowerCase().includes('smp');
        const level = isSMP ? 'SMP' : 'SD';
        const grade = isSMP ? 7 : 4;
        const studentEmail = `siswa_${Date.now()}_${Math.floor(Math.random() * 1000)}@homeprivatenusantara.com`;

        // Create base user row for student to fulfill Foreign Key constraint
        const userRow = await sql`
          INSERT INTO users (id, email, full_name, phone, role, created_at, updated_at)
          VALUES (
            gen_random_uuid(),
            ${studentEmail},
            ${firstSession.studentName},
            ${firstSession.parentPhone || '08123456789'},
            'student',
            NOW(),
            NOW()
          )
          RETURNING id;
        `;
        const newUserId = userRow[0]?.id;

        if (newUserId) {
          const newStudent = await sql`
            INSERT INTO students (id, parent_name, parent_phone, student_name, level, grade, school_name, address, district, city)
            VALUES (
              ${newUserId},
              ${firstSession.parentName || 'Wali Murid'},
              ${firstSession.parentPhone || '08123456789'},
              ${firstSession.studentName},
              ${level},
              ${grade},
              ${isSMP ? 'SMP Nusantara' : 'SD Nusantara'},
              ${firstSession.address || 'Jl. Hertasning'},
              'Rappocini',
              ${firstSession.city || 'Kota Makassar'}
            )
            RETURNING id;
          `;
          studentIdToUse = newStudent[0]?.id || newUserId;
        }
      }
    } catch (e) {
      console.warn('Student provision notice:', e);
    }
  }

  if (!studentIdToUse) {
    const studentRows = await sql`SELECT id FROM students LIMIT 1;`;
    if (studentRows[0]?.id) {
      studentIdToUse = studentRows[0].id;
    }
  }

  const createdBookings = [];
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  for (const s of sessions) {
    const tutorIdToUse = s.tutorId && s.tutorId.length === 36 ? s.tutorId : defaultTutorId;
    if (!tutorIdToUse || !studentIdToUse) continue;

    const code = `SES-${Math.floor(1000 + Math.random() * 9000)}`;

    const bookingDateStr = s.date && s.date.includes('-') ? s.date : new Date().toISOString().split('T')[0];
    const [y, m, d] = bookingDateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayName = dayNames[dateObj.getDay()] || 'Senin';

    const timeRange = s.time || '16:00 - 17:30';
    const [startTimeRaw, endTimeRaw] = timeRange.split(' - ');
    const startTime = (startTimeRaw || '16:00').trim();
    const endTime = (endTimeRaw || '17:30').trim();

    const isSMP = (s.subject || '').toLowerCase().includes('smp');
    const level = isSMP ? 'SMP' : 'SD';
    const grade = isSMP ? 7 : 4;

    try {
      const inserted = await sql`
        INSERT INTO bookings (
          booking_code,
          student_id,
          tutor_id,
          level,
          grade,
          subject,
          booking_date,
          day,
          start_time,
          end_time,
          address,
          district,
          city,
          amount,
          status,
          created_at,
          updated_at
        ) VALUES (
          ${code},
          ${studentIdToUse},
          ${tutorIdToUse},
          ${level},
          ${grade},
          ${s.subject || 'Matematika SD'},
          ${bookingDateStr}::date,
          ${dayName}::day_of_week,
          ${startTime}::time,
          ${endTime}::time,
          ${s.address || 'Jl. Hertasning No. 25'},
          ${'Rappocini'},
          ${s.city || 'Kota Makassar'},
          ${s.amount || 150000},
          'scheduled',
          NOW(),
          NOW()
        )
        RETURNING *;
      `;
      if (inserted[0]) createdBookings.push(inserted[0]);
    } catch (err) {
      console.warn('Notice creating booking row:', err);
    }
  }

  return createdBookings;
}

export async function getAllStudentsFromDB() {
  try {
    const rows = await sql`
      SELECT 
        s.id,
        COALESCE(s.student_name, u.full_name, 'Siswa Nusantara') as name,
        s.level,
        s.grade,
        COALESCE(s.school_name, 'SD/SMP Nusantara') as school,
        COALESCE(s.parent_name, 'Wali Murid') as "parentName",
        COALESCE(s.parent_phone, u.phone, '-') as "parentPhone",
        CONCAT(
          s.address,
          CASE WHEN s.district IS NOT NULL AND s.district != '' THEN CONCAT(', Kecamatan ', s.district) ELSE '' END,
          CASE WHEN s.city IS NOT NULL AND s.city != '' THEN CONCAT(', ', s.city) ELSE '' END
        ) as address,
        COUNT(b.id) as "totalSessions",
        COUNT(b.id) FILTER (WHERE b.status = 'scheduled' OR b.status = 'in_progress') as "activeBookings",
        TO_CHAR(s.created_at, 'DD Mon YYYY') as "joinDate"
      FROM students s
      LEFT JOIN users u ON s.id = u.id
      LEFT JOIN bookings b ON s.id = b.student_id
      GROUP BY s.id, s.student_name, u.full_name, s.level, s.grade, s.school_name, s.parent_name, s.parent_phone, u.phone, s.address, s.district, s.city, s.created_at
      ORDER BY s.created_at DESC;
    `;
    return rows;
  } catch (err) {
    console.error('Error fetching students from database:', err);
    return [];
  }
}

export interface CreateStudentInput {
  name: string;
  level: 'SD' | 'SMP';
  grade: number;
  school?: string;
  parentName: string;
  parentPhone: string;
  address: string;
  district?: string;
  city?: string;
}

export async function createStudentInDB(input: CreateStudentInput) {
  const studentEmail = `siswa_${Date.now()}_${Math.floor(Math.random() * 1000)}@homeprivatenusantara.com`;

  const userRow = await sql`
    INSERT INTO users (id, email, full_name, phone, role, created_at, updated_at)
    VALUES (
      gen_random_uuid(),
      ${studentEmail},
      ${input.name},
      ${input.parentPhone},
      'student',
      NOW(),
      NOW()
    )
    RETURNING id;
  `;
  const userId = userRow[0]?.id;

  const studentRow = await sql`
    INSERT INTO students (
      id,
      parent_name,
      parent_phone,
      student_name,
      level,
      grade,
      school_name,
      address,
      district,
      city,
      created_at,
      updated_at
    ) VALUES (
      ${userId},
      ${input.parentName},
      ${input.parentPhone},
      ${input.name},
      ${input.level},
      ${input.grade},
      ${input.school || (input.level === 'SD' ? 'SD Nusantara' : 'SMP Nusantara')},
      ${input.address},
      ${input.district || 'Rappocini'},
      ${input.city || 'Kota Makassar'},
      NOW(),
      NOW()
    )
    RETURNING 
      id,
      student_name as name,
      level,
      grade,
      school_name as school,
      parent_name as "parentName",
      parent_phone as "parentPhone",
      address,
      0 as "totalSessions",
      0 as "activeBookings",
      TO_CHAR(created_at, 'DD Mon YYYY') as "joinDate";
  `;

  return studentRow[0];
}
