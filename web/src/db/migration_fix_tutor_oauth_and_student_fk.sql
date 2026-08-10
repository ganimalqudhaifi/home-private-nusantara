-- Migration Script: Decouple Students from Users & Fix Tutor OAuth Registration
-- Home Private Nusantara (Neon PostgreSQL)

-- 1. Remove Foreign Key constraint from students table referencing users(id)
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_student_id_fkey;
ALTER TABLE students DROP CONSTRAINT IF EXISTS students_id_fkey;
ALTER TABLE students ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- 2. Re-add Foreign Key constraint from bookings.student_id to students.id
ALTER TABLE bookings 
  ADD CONSTRAINT bookings_student_id_fkey 
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE RESTRICT;

-- 3. Clean up legacy dummy student rows and unlinked dummy tutor rows from users
DELETE FROM users 
WHERE role = 'student' 
   OR email LIKE 'tutor-%@homeprivatenusantara.id' 
   OR email LIKE 'siswa_%@homeprivatenusantara.com';
