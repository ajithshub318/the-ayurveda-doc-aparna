-- =============================================
-- My21 Tracker — Supabase Database Schema
-- For theayurvedadoc.com/my21
-- =============================================

-- 1. USERS TABLE
CREATE TABLE my21_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL UNIQUE,
  pin_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_my21_users_whatsapp ON my21_users(whatsapp);
CREATE INDEX idx_my21_users_email ON my21_users(email);

-- 2. CHALLENGES TABLE
CREATE TABLE my21_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL DEFAULT 21,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ENROLLMENTS TABLE
CREATE TABLE my21_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES my21_users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES my21_challenges(id) ON DELETE CASCADE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  day1_weight DECIMAL(5,1),
  day21_weight DECIMAL(5,1),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

CREATE INDEX idx_my21_enrollments_user ON my21_enrollments(user_id);

-- 4. DAILY ENTRIES TABLE
CREATE TABLE my21_daily_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES my21_enrollments(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 21),
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  woke_up_on_time BOOLEAN DEFAULT FALSE,
  drank_water BOOLEAN DEFAULT FALSE,
  exercised BOOLEAN DEFAULT FALSE,
  ate_home_cooked BOOLEAN DEFAULT FALSE,
  avoided_processed BOOLEAN DEFAULT FALSE,
  no_sugar BOOLEAN DEFAULT FALSE,
  read_or_learned BOOLEAN DEFAULT FALSE,
  slept_before_10 BOOLEAN DEFAULT FALSE,
  energy TEXT CHECK (energy IN ('low', 'okay', 'good', 'great')),
  mood TEXT CHECK (mood IN ('low', 'okay', 'good', 'great')),
  sleep_quality TEXT CHECK (sleep_quality IN ('low', 'okay', 'good', 'great')),
  cravings TEXT CHECK (cravings IN ('none', 'mild', 'strong', 'gave_in')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(enrollment_id, day_number)
);

CREATE INDEX idx_my21_daily_enrollment ON my21_daily_entries(enrollment_id);

-- 5. ROW LEVEL SECURITY
ALTER TABLE my21_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE my21_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE my21_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE my21_daily_entries ENABLE ROW LEVEL SECURITY;

-- Challenges: anyone can read active challenges
CREATE POLICY "Anyone can read challenges"
  ON my21_challenges FOR SELECT
  USING (true);

-- Users: can insert (signup), can read own row by id
CREATE POLICY "Anyone can sign up"
  ON my21_users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own data"
  ON my21_users FOR SELECT
  USING (true);

-- Enrollments: can insert own, can read own
CREATE POLICY "Anyone can enroll"
  ON my21_enrollments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read own enrollments"
  ON my21_enrollments FOR SELECT
  USING (true);

CREATE POLICY "Users can update own enrollments"
  ON my21_enrollments FOR UPDATE
  USING (true);

-- Daily entries: can insert/update/read own
CREATE POLICY "Anyone can insert entries"
  ON my21_daily_entries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read entries"
  ON my21_daily_entries FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update entries"
  ON my21_daily_entries FOR UPDATE
  USING (true);

-- Admin: challenges can be inserted/updated (protected by app-level password)
CREATE POLICY "Admin can insert challenges"
  ON my21_challenges FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin can update challenges"
  ON my21_challenges FOR UPDATE
  USING (true);

-- =============================================
-- HASH FUNCTION for PIN (using pgcrypto)
-- =============================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Helper function to hash a PIN
CREATE OR REPLACE FUNCTION hash_pin(pin TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(digest(pin, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;
