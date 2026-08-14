-- Migration Script: Add availability_slots to Tutors
-- Home Private Nusantara (Neon PostgreSQL)

-- 1. Add availability_slots TEXT[] column to tutors
ALTER TABLE tutors ADD COLUMN IF NOT EXISTS availability_slots TEXT[] NOT NULL DEFAULT '{}';
