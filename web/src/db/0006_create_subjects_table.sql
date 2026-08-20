-- Migration Script: Create Subjects Table and Seed Data
-- Home Private Nusantara (Neon PostgreSQL)

CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'PAUD/TK', 'SD', 'SMP', 'Semua Jenjang'
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subjects_category ON subjects(category);
CREATE INDEX IF NOT EXISTS idx_subjects_active ON subjects(is_active);

-- Seed Data from previous hardcoded configurations
INSERT INTO subjects (code, name, category, description, display_order) VALUES
('calistung', 'Calistung', 'PAUD/TK', 'Membaca, menulis dan menghitung dengan menyenangkan', 1),
('mengaji', 'Mengaji', 'Semua Jenjang', 'Bimbingan mengaji / Iqra, Al-Qur''an, dan tajwid', 2),
('matematika-sd', 'Matematika SD', 'SD', 'Memahami konsep, logika, dan pemecahan masalah', 3),
('bahasa-inggris-sd', 'Bahasa Inggris SD', 'SD', 'Meningkatkan kemampuan berbicara, membaca, menulis dan memahami', 4),
('matematika-smp', 'Matematika SMP', 'SMP', 'Memahami konsep, logika, dan pemecahan masalah', 5),
('bahasa-inggris-smp', 'Bahasa Inggris SMP', 'SMP', 'Meningkatkan kemampuan berbicara, membaca, menulis dan memahami', 6)
ON CONFLICT (code) DO NOTHING;
