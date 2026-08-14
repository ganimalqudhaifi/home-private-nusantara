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
      SELECT u.id, u.email, u.full_name, t.phone, u.role, u.avatar_url, u.created_at, t.status
      FROM users u
      LEFT JOIN tutors t ON u.id = t.id
      WHERE u.id = ${userId} OR (LOWER(u.email) = LOWER(${email}) AND u.email IS NOT NULL)
      ORDER BY CASE WHEN u.id = ${userId} THEN 1 ELSE 2 END
      LIMIT 1;
    `;
    return rows[0] || null;
  }

  const rows = await sql`
    SELECT u.id, u.email, u.full_name, t.phone, u.role, u.avatar_url, u.created_at, t.status
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
  email?: string;
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
    INSERT INTO users (id, email, full_name, role, avatar_url, updated_at)
    VALUES (
      ${input.userId},
      ${input.email || null},
      ${input.fullName},
      'tutor',
      ${input.avatarUrl || null},
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      full_name = EXCLUDED.full_name,
      role = (CASE WHEN users.role = 'admin' THEN 'admin' ELSE 'tutor' END)::user_role,
      avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
      updated_at = NOW();
  `;

  await sql`
    INSERT INTO tutors (id, title, university, degree, subjects, portfolio_url, status, updated_at, phone)
    VALUES (
      ${input.userId},
      ${input.major},
      ${input.university},
      ${input.major},
      ${input.selectedSubjects || []},
      ${input.portfolioUrl || input.cvFileName || null},
      'pending',
      NOW(),
      ${input.phone}
    )
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      university = EXCLUDED.university,
      degree = EXCLUDED.degree,
      subjects = EXCLUDED.subjects,
      portfolio_url = EXCLUDED.portfolio_url,
      phone = EXCLUDED.phone,
      updated_at = NOW();
  `;

  return { success: true, tutorId: input.userId };
}

export async function getAllTutorsFromDB() {
  const rows = await sql`
    SELECT 
      t.id,
      u.full_name as name,
      u.email,
      t.phone,
      u.avatar_url as avatar,
      t.university,
      t.degree as major,
      t.status,
      t.subjects,
      t.portfolio_url as "portfolioUrl",
      t.availability_slots,
      t.created_at as "createdAt"
    FROM tutors t
    JOIN users u ON t.id = u.id;
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

  // Auto-provision missing user
  if (!user) {
    try {
      const isInitialAdmin = authRole === 'admin' || authRole === 'ADMIN';
      const initialRole = isInitialAdmin ? 'admin' : 'student';

      const rows = await sql`
        INSERT INTO users (id, email, full_name, role, avatar_url, created_at, updated_at)
        VALUES (
          ${userId},
          ${email || null},
          ${fullName || 'Pengguna'},
          ${initialRole},
          ${avatarUrl || null},
          NOW(),
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          avatar_url = COALESCE(${avatarUrl || null}, users.avatar_url),
          updated_at = NOW()
        RETURNING id, email, full_name, role, avatar_url, created_at;
      `;
      user = rows[0] || null;
    } catch (err) {
      console.warn('Auto-provision user notice:', err);
    }
  }

  if (!user) return null;

  // Fix avatar_url when missing or changed from OAuth login
  if (avatarUrl && avatarUrl.trim() !== '' && user.avatar_url !== avatarUrl) {
    try {
      await sql`
        UPDATE users
        SET avatar_url = ${avatarUrl}, updated_at = NOW()
        WHERE id = ${user.id};
      `;
      user.avatar_url = avatarUrl;
    } catch (err) {
      console.warn('Avatar update notice:', err);
    }
  }

  let isAuthAdmin = authRole === 'admin' || authRole === 'ADMIN';

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

export interface UpdateBookingInput {
  tutorId?: string;
  date?: string;
  time?: string;
  subject?: string;
  status?: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
}

export async function updateBookingInDB(bookingId: string, input: UpdateBookingInput) {
  const currentRows = await sql`SELECT * FROM bookings WHERE id = ${bookingId}::uuid LIMIT 1`;
  if (currentRows.length === 0) return { success: false, error: 'Sesi tidak ditemukan' };
  const current = currentRows[0];

  const tutorIdToUse = input.tutorId || current.tutor_id;
  const bookingDateStr = input.date || current.booking_date.toISOString().split('T')[0];
  const timeRange = input.time || `${current.start_time.substring(0, 5)} - ${current.end_time.substring(0, 5)}`;
  const [startTimeRaw, endTimeRaw] = timeRange.split(' - ');
  const startTime = (startTimeRaw || '16:00').trim();
  const endTime = (endTimeRaw || '17:30').trim();
  const statusToUse = input.status || current.status;
  const studentIdToUse = current.student_id;

  if (statusToUse !== 'cancelled') {
    const tutorCollision = await sql`
      SELECT id FROM bookings
      WHERE tutor_id = ${tutorIdToUse}
        AND booking_date = ${bookingDateStr}::date
        AND start_time < ${endTime}::time
        AND end_time > ${startTime}::time
        AND status <> 'cancelled'
        AND id != ${bookingId}::uuid
      LIMIT 1;
    `;
    if (tutorCollision.length > 0) {
      return { success: false, error: 'Pengajar sudah memiliki jadwal aktif pada tanggal dan jam tersebut.' };
    }

    const studentCollision = await sql`
      SELECT id FROM bookings
      WHERE student_id = ${studentIdToUse}
        AND booking_date = ${bookingDateStr}::date
        AND start_time < ${endTime}::time
        AND end_time > ${startTime}::time
        AND status <> 'cancelled'
        AND id != ${bookingId}::uuid
      LIMIT 1;
    `;
    if (studentCollision.length > 0) {
      return { success: false, error: 'Siswa sudah memiliki jadwal aktif pada tanggal dan jam tersebut.' };
    }
  }

  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const [y, m, d] = bookingDateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const dayName = dayNames[dateObj.getDay()];

  const updatedRows = await sql`
    UPDATE bookings
    SET
      tutor_id = ${tutorIdToUse},
      booking_date = ${bookingDateStr}::date,
      day = ${dayName}::day_of_week,
      start_time = ${startTime}::time,
      end_time = ${endTime}::time,
      subject = ${input.subject || current.subject},
      status = ${statusToUse},
      notes = COALESCE(${input.notes || null}, notes),
      updated_at = NOW()
    WHERE id = ${bookingId}::uuid
    RETURNING *;
  `;

  return { success: true, booking: updatedRows[0] };
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
  localId?: string;
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
  if (!sessions || sessions.length === 0) return { success: true, bookings: [] };

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

        const newStudent = await sql`
          INSERT INTO students (id, parent_name, parent_phone, student_name, level, grade, school_name, address, district, city)
          VALUES (
            gen_random_uuid(),
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
        studentIdToUse = newStudent[0]?.id || null;
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

  // Pre-flight check for collisions
  const collisions: Array<{ localId: string, reason: string }> = [];
  const seenTutorSlots = new Set<string>();
  const seenStudentSlots = new Set<string>();

  for (const s of sessions) {
    const tutorIdToUse = s.tutorId && s.tutorId.length === 36 ? s.tutorId : defaultTutorId;
    if (!tutorIdToUse || !studentIdToUse) continue;

    const bookingDateStr = s.date && s.date.includes('-') ? s.date : new Date().toISOString().split('T')[0];
    const timeRange = s.time || '16:00 - 17:30';
    const [startTimeRaw, endTimeRaw] = timeRange.split(' - ');
    const startTime = (startTimeRaw || '16:00').trim();
    const endTime = (endTimeRaw || '17:30').trim();

    // Check internal batch collision (Tutor)
    const tutorKey = `${tutorIdToUse}-${bookingDateStr}-${startTime}`;
    if (seenTutorSlots.has(tutorKey)) {
      collisions.push({ localId: s.localId || '', reason: 'Pengajar dipilih lebih dari 1 kali di jam yang sama pada form ini' });
      continue;
    }
    seenTutorSlots.add(tutorKey);

    // Check internal batch collision (Student)
    const studentKey = `${studentIdToUse}-${bookingDateStr}-${startTime}`;
    if (seenStudentSlots.has(studentKey)) {
      collisions.push({ localId: s.localId || '', reason: 'Siswa dijadwalkan lebih dari 1 kali di jam yang sama pada form ini' });
      continue;
    }
    seenStudentSlots.add(studentKey);

    // DB Collision Check: Tutor
    const tutorCollision = await sql`
      SELECT id FROM bookings
      WHERE tutor_id = ${tutorIdToUse}
        AND booking_date = ${bookingDateStr}::date
        AND start_time < ${endTime}::time
        AND end_time > ${startTime}::time
        AND status <> 'cancelled'
      LIMIT 1;
    `;
    if (tutorCollision.length > 0) {
      collisions.push({ localId: s.localId || '', reason: 'Pengajar sudah memiliki jadwal pada tanggal & jam ini' });
      continue;
    }

    // DB Collision Check: Student
    const studentCollision = await sql`
      SELECT id FROM bookings
      WHERE student_id = ${studentIdToUse}
        AND booking_date = ${bookingDateStr}::date
        AND start_time < ${endTime}::time
        AND end_time > ${startTime}::time
        AND status <> 'cancelled'
      LIMIT 1;
    `;
    if (studentCollision.length > 0) {
      collisions.push({ localId: s.localId || '', reason: 'Siswa sudah memiliki jadwal pada tanggal & jam ini' });
    }
  }

  // If any collisions detected, abort transaction
  if (collisions.length > 0) {
    return { success: false, collisions };
  }

  // Execution Phase (No collisions)
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

  return { success: true, bookings: createdBookings };
}

export async function getAllStudentsFromDB() {
  try {
    const rows = await sql`
      SELECT 
        s.id,
        COALESCE(s.student_name, 'Siswa Nusantara') as name,
        s.level,
        s.grade,
        COALESCE(s.school_name, 'SD/SMP Nusantara') as school,
        COALESCE(s.parent_name, 'Wali Murid') as "parentName",
        COALESCE(s.parent_phone, '-') as "parentPhone",
        CONCAT(
          s.address,
          CASE WHEN s.district IS NOT NULL AND s.district != '' THEN CONCAT(', Kecamatan ', s.district) ELSE '' END,
          CASE WHEN s.city IS NOT NULL AND s.city != '' THEN CONCAT(', ', s.city) ELSE '' END
        ) as address,
        COUNT(b.id) as "totalSessions",
        COUNT(b.id) FILTER (WHERE b.status = 'scheduled' OR b.status = 'in_progress') as "activeBookings",
        TO_CHAR(s.created_at, 'DD Mon YYYY') as "joinDate"
      FROM students s
      LEFT JOIN bookings b ON s.id = b.student_id
      GROUP BY s.id, s.student_name, s.level, s.grade, s.school_name, s.parent_name, s.parent_phone, s.address, s.district, s.city, s.created_at
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
      gen_random_uuid(),
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

export interface UpdateStudentInput {
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

export async function updateStudentInDB(id: string, input: UpdateStudentInput) {
  const updatedRows = await sql`
    UPDATE students
    SET
      student_name = ${input.name},
      level = ${input.level},
      grade = ${input.grade},
      school_name = ${input.school || (input.level === 'SD' ? 'SD Nusantara' : 'SMP Nusantara')},
      parent_name = ${input.parentName},
      parent_phone = ${input.parentPhone},
      address = ${input.address},
      district = ${input.district || 'Rappocini'},
      city = ${input.city || 'Kota Makassar'},
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING
      id,
      student_name as name,
      level,
      grade,
      school_name as school,
      parent_name as "parentName",
      parent_phone as "parentPhone",
      CONCAT(
        address,
        CASE WHEN district IS NOT NULL AND district != '' THEN CONCAT(', Kecamatan ', district) ELSE '' END,
        CASE WHEN city IS NOT NULL AND city != '' THEN CONCAT(', ', city) ELSE '' END
      ) as address,
      0 as "totalSessions",
      0 as "activeBookings",
      TO_CHAR(created_at, 'DD Mon YYYY') as "joinDate";
  `;

  return updatedRows[0] || null;
}

export async function deleteStudentFromDB(id: string) {
  await sql`
    DELETE FROM bookings
    WHERE student_id = ${id};
  `;

  const deletedStudent = await sql`
    DELETE FROM students
    WHERE id = ${id}
    RETURNING id;
  `;

  return deletedStudent[0] || { id };
}

export interface UpdateTutorInput {
  name: string;
  phone: string;
  university: string;
  degree: string;
  subjects?: string[];
  status?: string;
  avatarUrl?: string;
}

export async function updateTutorProfileInDB(tutorId: string, input: UpdateTutorInput) {
  await sql`
    UPDATE users
    SET
      full_name = ${input.name},
      avatar_url = COALESCE(${input.avatarUrl || null}, avatar_url),
      updated_at = NOW()
    WHERE id = ${tutorId};
  `;

  const updatedTutor = await sql`
    UPDATE tutors
    SET
      university = ${input.university},
      degree = ${input.degree},
      phone = ${input.phone},
      subjects = COALESCE(${input.subjects ? input.subjects : null}, subjects),
      status = COALESCE(${input.status || null}, status),
      updated_at = NOW()
    WHERE id = ${tutorId}
    RETURNING *;
  `;

  return updatedTutor[0] || null;
}

export async function deleteTutorFromDB(tutorId: string) {
  await sql`
    DELETE FROM bookings
    WHERE tutor_id = ${tutorId};
  `;

  await sql`
    DELETE FROM tutors
    WHERE id = ${tutorId};
  `;

  const deletedUser = await sql`
    DELETE FROM users
    WHERE id = ${tutorId}
    RETURNING id;
  `;

  return deletedUser[0] || { id: tutorId };
}

export async function getTutorDashboardData(tutorId: string) {
  try {
    // Get upcoming sessions for this tutor
    const sessions = await sql`
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
        b.status
      FROM bookings b
      LEFT JOIN students s ON b.student_id = s.id
      LEFT JOIN users u_st ON b.student_id = u_st.id
      LEFT JOIN users u_tu ON b.tutor_id = u_tu.id
      WHERE b.tutor_id = ${tutorId} AND b.status IN ('scheduled', 'in_progress')
      ORDER BY b.booking_date ASC, b.start_time ASC
      LIMIT 10;
    `;

    // Get unique students for this tutor
    const studentsRows = await sql`
      SELECT DISTINCT 
        s.id,
        COALESCE(s.student_name, u_st.full_name, 'Siswa Nusantara') as name,
        s.level,
        s.grade,
        s.school_name as school,
        s.parent_name as "parentName",
        s.parent_phone as "parentPhone",
        b.address,
        b.district,
        b.city,
        b.status as "sessionStatus"
      FROM bookings b
      LEFT JOIN students s ON b.student_id = s.id
      LEFT JOIN users u_st ON b.student_id = u_st.id
      WHERE b.tutor_id = ${tutorId} AND s.id IS NOT NULL
      ORDER BY s.id
      LIMIT 10;
    `;
    
    // Fallback if distinct query has issues with undefined s.id
    const students = studentsRows.map(row => ({
      id: row.id,
      name: row.name,
      level: row.level || 'SD',
      grade: row.grade || 1,
      school: row.school || '-',
      parentName: row.parentName || 'Wali Murid',
      parentPhone: row.parentPhone || '',
      address: row.address || '-',
      district: row.district || '-',
      status: 'active'
    }));

    // Stats
    const statsResult = await sql`
      SELECT
        COUNT(CASE WHEN b.status = 'completed' THEN 1 END) as completed_sessions,
        COUNT(DISTINCT s.id) as total_students,
        COUNT(DISTINCT CASE WHEN s.level = 'SD' THEN s.id END) as sd_students,
        COUNT(DISTINCT CASE WHEN s.level = 'SMP' THEN s.id END) as smp_students
      FROM bookings b
      LEFT JOIN students s ON b.student_id = s.id
      WHERE b.tutor_id = ${tutorId}
    `;
    
    // Active days (from tutor schedules)
    let activeDays = 0;
    try {
      const scheduleResult = await sql`SELECT COUNT(DISTINCT day) as active_days FROM tutor_schedules WHERE tutor_id = ${tutorId} AND is_available = true`;
      activeDays = Number(scheduleResult[0]?.active_days || 0);
    } catch(e) {
      // Ignore if tutor_schedules doesn't exist
    }

    const stats = {
      completedSessions: Number(statsResult[0]?.completed_sessions || 0),
      activeStudentsCount: Number(statsResult[0]?.total_students || 0),
      sdStudentsCount: Number(statsResult[0]?.sd_students || 0),
      smpStudentsCount: Number(statsResult[0]?.smp_students || 0),
      activeDaysCount: activeDays
    };

    return { success: true, sessions, students, stats };
  } catch (error) {
    console.error('Error fetching tutor dashboard data:', error);
    return { success: false, error: 'Failed to fetch tutor data' };
  }
}

export async function getTutorSchedule(tutorId: string) {
  try {
    const sessionsRows = await sql`
      SELECT 
        b.id,
        b.booking_code as code,
        b.student_id as "studentId",
        COALESCE(s.student_name, u_st.full_name, 'Siswa Nusantara') as "studentName",
        s.parent_name as "parentName",
        s.parent_phone as "parentPhone",
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
        b.status,
        b.amount,
        b.notes
      FROM bookings b
      LEFT JOIN students s ON b.student_id = s.id
      LEFT JOIN users u_st ON b.student_id = u_st.id
      LEFT JOIN users u_tu ON b.tutor_id = u_tu.id
      WHERE b.tutor_id = ${tutorId}
      ORDER BY b.booking_date ASC, b.start_time ASC;
    `;

    return {
      success: true,
      sessions: sessionsRows.map(row => ({
        ...row,
        parentName: row.parentName || 'Wali Murid',
        parentPhone: row.parentPhone || '',
        amount: Number(row.amount) || 0
      }))
    };
  } catch (error) {
    console.error('Error fetching tutor schedule:', error);
    return { success: false, error: 'Failed to fetch tutor schedule' };
  }
}
