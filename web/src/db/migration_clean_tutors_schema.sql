-- Migration Script: Clean Tutors Schema & Fix Users Email/Avatar
-- Home Private Nusantara (Neon PostgreSQL)

-- 1. Add subjects TEXT[] column to tutors & migrate data from tutor_subjects
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS subjects TEXT[] NOT NULL DEFAULT '{}';

UPDATE tutors t
SET subjects = COALESCE(
  (
    SELECT ARRAY_AGG(ts.subject_name)
    FROM tutor_subjects ts
    WHERE ts.tutor_id = t.id
  ),
  '{}'
)
WHERE EXISTS (
  SELECT 1 FROM tutor_subjects ts WHERE ts.tutor_id = t.id
);

-- 2. Drop table tutor_subjects
DROP TABLE IF EXISTS tutor_subjects;

-- 3. Drop unused columns from tutors
ALTER TABLE tutors
  DROP COLUMN IF EXISTS bio,
  DROP COLUMN IF EXISTS hourly_rate,
  DROP COLUMN IF EXISTS experience_years,
  DROP COLUMN IF EXISTS rating,
  DROP COLUMN IF EXISTS review_count;

-- 4. Remove foreign key & slot_id column from bookings, then drop unused tables
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_slot_id_fkey;
ALTER TABLE bookings DROP COLUMN IF EXISTS slot_id;

DROP TABLE IF EXISTS tutor_grades;
DROP TABLE IF EXISTS tutor_availability_slots;

-- 5. Make users.email nullable & replace unique constraint with partial unique index
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_email_key;
DROP INDEX IF EXISTS idx_users_email_unique;
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email) WHERE email IS NOT NULL;
