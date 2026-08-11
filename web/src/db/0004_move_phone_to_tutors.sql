-- 1. Tambahkan kolom phone ke tabel tutors
ALTER TABLE tutors ADD COLUMN phone VARCHAR;

-- 2. Pindahkan (Migrasikan) data phone yang ada dari users ke tutors
UPDATE tutors 
SET phone = users.phone 
FROM users 
WHERE tutors.id = users.id;

-- 3. Set nilai default sementara untuk tutor yang mungkin null agar bisa diset NOT NULL
UPDATE tutors SET phone = '-' WHERE phone IS NULL;

-- 4. Tambahkan constraint NOT NULL di tutors
ALTER TABLE tutors ALTER COLUMN phone SET NOT NULL;

-- 5. Hapus kolom phone dari tabel users
ALTER TABLE users DROP COLUMN phone;
