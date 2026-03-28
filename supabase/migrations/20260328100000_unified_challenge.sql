-- =============================================
-- Unified Challenge System — Schema Updates
-- Makes the system flexible for any challenge type
-- =============================================

-- Add type column to challenges for different challenge types
ALTER TABLE my21_challenges ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'health';

-- Add JSONB column for flexible checklist data (per challenge type)
ALTER TABLE my21_daily_entries ADD COLUMN IF NOT EXISTS checklist_data JSONB DEFAULT '{}';

-- Make email optional (sugar cut signup doesn't require it)
ALTER TABLE my21_users ALTER COLUMN email DROP NOT NULL;

-- Remove restrictive assessment constraints (values vary by challenge type)
ALTER TABLE my21_daily_entries DROP CONSTRAINT IF EXISTS my21_daily_entries_energy_check;
ALTER TABLE my21_daily_entries DROP CONSTRAINT IF EXISTS my21_daily_entries_mood_check;
ALTER TABLE my21_daily_entries DROP CONSTRAINT IF EXISTS my21_daily_entries_sleep_quality_check;
ALTER TABLE my21_daily_entries DROP CONSTRAINT IF EXISTS my21_daily_entries_cravings_check;

-- Backfill checklist_data JSONB for existing health entries
UPDATE my21_daily_entries
SET checklist_data = jsonb_build_object(
  'wokeUpOnTime', woke_up_on_time,
  'drankWater', drank_water,
  'exercised', exercised,
  'ateHomeCooked', ate_home_cooked,
  'avoidedProcessed', avoided_processed,
  'noSugar', no_sugar,
  'readOrLearned', read_or_learned,
  'sleptBefore10', slept_before_10
)
WHERE checklist_data IS NULL OR checklist_data = '{}';

-- Insert the Sugar Cut 21 challenge (admin can also create via dashboard)
INSERT INTO my21_challenges (name, description, duration, is_active, type)
VALUES (
  '21-Day Sugar Cut Challenge',
  'Break free from sugar dependency the Ayurvedic way. Track your daily sugar-free habits, monitor cravings, and watch your energy transform over 21 days.',
  21,
  true,
  'sugar_cut'
) ON CONFLICT DO NOTHING;
