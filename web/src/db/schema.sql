-- Database Schema for Home Private Nusantara (Neon PostgreSQL)

-- Enums
CREATE TYPE user_role AS ENUM ('admin', 'tutor', 'student');
CREATE TYPE tutor_status AS ENUM ('pending', 'verified', 'rejected', 'suspended');
CREATE TYPE school_level AS ENUM ('SD', 'SMP');
CREATE TYPE booking_status AS ENUM ('scheduled', 'in_progress', 'completed', 'cancelled');
CREATE TYPE day_of_week AS ENUM ('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu');

-- 1. Users Table (Core User Profiles, linked to Neon Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    email VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email) WHERE email IS NOT NULL;

-- 2. Tutors Table (Tutor Profiles & Admin Verification Status)
CREATE TABLE IF NOT EXISTS tutors (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    university VARCHAR(255) NOT NULL,
    degree VARCHAR(100),
    subjects TEXT[] NOT NULL DEFAULT '{}',
    status tutor_status NOT NULL DEFAULT 'pending',
    rejection_reason TEXT,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES users(id),
    portfolio_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Students Table (Student & Parent Details)
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    student_name VARCHAR(255) NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(50) NOT NULL,
    level school_level NOT NULL,
    grade INT NOT NULL CHECK (grade BETWEEN 1 AND 9),
    school_name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Kota Makassar',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Bookings / Sessions Table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_code VARCHAR(20) NOT NULL UNIQUE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    tutor_id UUID NOT NULL REFERENCES tutors(id) ON DELETE RESTRICT,
    level school_level NOT NULL,
    grade INT NOT NULL,
    subject VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    day day_of_week NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    address TEXT NOT NULL,
    district VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    amount INT NOT NULL,
    notes TEXT,
    status booking_status NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Prevent Double Booking Index
CREATE UNIQUE INDEX IF NOT EXISTS idx_prevent_double_booking 
ON bookings (tutor_id, booking_date, start_time) 
WHERE status != 'cancelled';

-- 5. Quick Consultations Table
CREATE TABLE IF NOT EXISTS quick_consultations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_name VARCHAR(255) NOT NULL,
    parent_phone VARCHAR(50) NOT NULL,
    student_grade VARCHAR(100) NOT NULL,
    preferred_schedule VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'new',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
