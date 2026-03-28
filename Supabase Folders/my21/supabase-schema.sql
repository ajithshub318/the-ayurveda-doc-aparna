-- =============================================
-- My21 Tracker — Supabase Database Schema
-- For theayurvedadoc.com/my21
-- =============================================

-- 1. USERS TABLE
-- Stores everyone who signs up for any challenge
CREATE TABLE my21_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  whatsapp TEXT NOT NULL UNIQUE,
  pin TEXT NOT NULL, -- 4-digit PIN, stored hashed
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for login lookup
CREATE INDEX idx_my21_users_whatsapp ON my21_users(whatsapp);
CREATE INDEX idx_my21_users_email ON my21_users(email);

-- 2. CHALLENGES TABLE
-- Dr. Aparna creates challenges from the admin panel
CREATE TABLE my21_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  duration INTEGER NOT NULL DEFAULT 21,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER CHALLENGES (enrollment)
-- Links a user to a challenge with their personal start date
CREATE TABLE my21_enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES my21_users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES my21_challenges(id) ON DELETE CASCADE,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  day1_weight DECIMAL(5,1), -- e.g. 116.0
  day21_weight DECIMAL(5,1),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

CREATE INDEX idx_my21_enrollments_user ON my21_enrollments(user_id);

-- 4. DAILY ENTRIES
-- One row per user per day
CREATE TABLE my21_daily_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID REFERENCES my21_enrollments(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 21),
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,

  -- Checklist (8 items, all boolean)
  woke_up_on_time BOOLEAN DEFAULT FALSE,
  drank_water BOOLEAN DEFAULT FALSE,
  exercised BOOLEAN DEFAULT FALSE,
  ate_home_cooked BOOLEAN DEFAULT FALSE,
  avoided_processed BOOLEAN DEFAULT FALSE,
  no_sugar BOOLEAN DEFAULT FALSE,
  read_or_learned BOOLEAN DEFAULT FALSE,
  slept_before_10 BOOLEAN DEFAULT FALSE,

  -- Self-assessment
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

-- 5. ROW LEVEL SECURITY (RLS)
-- Enable RLS on all tables
ALTER TABLE my21_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE my21_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE my21_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE my21_daily_entries ENABLE ROW LEVEL SECURITY;

-- Challenges are readable by everyone (public)
CREATE POLICY "Challenges are publicly readable"
  ON my21_challenges FOR SELECT
  USING (true);

-- For the rest, we'll use the service role key in API routes
-- so RLS policies for users/enrollments/entries are handled server-side
CREATE POLICY "Service role full access users"
  ON my21_users FOR ALL
  USING (true);

CREATE POLICY "Service role full access enrollments"
  ON my21_enrollments FOR ALL
  USING (true);

CREATE POLICY "Service role full access entries"
  ON my21_daily_entries FOR ALL
  USING (true);
