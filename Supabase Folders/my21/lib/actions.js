'use server';

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// Hash PIN with a simple SHA-256 (sufficient for a 4-digit PIN)
function hashPin(pin) {
  return crypto.createHash('sha256').update(pin).digest('hex');
}

// ==================== AUTH ====================

export async function signUp({ name, email, whatsapp, pin, challengeId, day1Weight }) {
  const supabase = getSupabaseAdmin();

  // Check if user already exists
  const { data: existing } = await supabase
    .from('my21_users')
    .select('id')
    .eq('whatsapp', whatsapp)
    .single();

  if (existing) {
    return { error: 'This WhatsApp number is already registered. Please log in.' };
  }

  // Check email uniqueness
  const { data: existingEmail } = await supabase
    .from('my21_users')
    .select('id')
    .eq('email', email)
    .single();

  if (existingEmail) {
    return { error: 'This email is already registered. Please log in.' };
  }

  // Create user
  const { data: user, error: userError } = await supabase
    .from('my21_users')
    .insert({
      name,
      email,
      whatsapp,
      pin: hashPin(pin),
    })
    .select()
    .single();

  if (userError) return { error: userError.message };

  // Enroll in the active challenge
  if (challengeId) {
    const { error: enrollError } = await supabase
      .from('my21_enrollments')
      .insert({
        user_id: user.id,
        challenge_id: challengeId,
        start_date: new Date().toISOString().split('T')[0],
        day1_weight: day1Weight || null,
      });

    if (enrollError) return { error: enrollError.message };
  }

  return { success: true, userId: user.id };
}

export async function login({ whatsapp, pin }) {
  const supabase = getSupabaseAdmin();

  const { data: user, error } = await supabase
    .from('my21_users')
    .select('id, name, pin')
    .eq('whatsapp', whatsapp)
    .single();

  if (!user) return { error: 'No account found with this WhatsApp number.' };
  if (user.pin !== hashPin(pin)) return { error: 'Incorrect PIN. Please try again.' };

  return { success: true, userId: user.id, name: user.name };
}

// ==================== CHALLENGES ====================

export async function getActiveChallenge() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('my21_challenges')
    .select('*')
    .eq('is_active', true)
    .single();

  if (error) return { error: 'No active challenge found.' };
  return { challenge: data };
}

export async function getUserEnrollment(userId) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('my21_enrollments')
    .select('*, my21_challenges(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) return { enrollment: null };
  return { enrollment: data };
}

// ==================== DAILY ENTRIES ====================

export async function saveDailyEntry({ enrollmentId, dayNumber, checklist, assessment }) {
  const supabase = getSupabaseAdmin();

  const entryData = {
    enrollment_id: enrollmentId,
    day_number: dayNumber,
    entry_date: new Date().toISOString().split('T')[0],
    // Checklist
    woke_up_on_time: checklist.wokeUpOnTime || false,
    drank_water: checklist.drankWater || false,
    exercised: checklist.exercised || false,
    ate_home_cooked: checklist.ateHomeCooked || false,
    avoided_processed: checklist.avoidedProcessed || false,
    no_sugar: checklist.noSugar || false,
    read_or_learned: checklist.readOrLearned || false,
    slept_before_10: checklist.sleptBefore10 || false,
    // Assessment
    energy: assessment.energy || null,
    mood: assessment.mood || null,
    sleep_quality: assessment.sleepQuality || null,
    cravings: assessment.cravings || null,
    notes: assessment.notes || '',
  };

  // Upsert — update if entry for this day already exists
  const { data, error } = await supabase
    .from('my21_daily_entries')
    .upsert(entryData, { onConflict: 'enrollment_id,day_number' })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, entry: data };
}

export async function getDailyEntry(enrollmentId, dayNumber) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('my21_daily_entries')
    .select('*')
    .eq('enrollment_id', enrollmentId)
    .eq('day_number', dayNumber)
    .single();

  if (error) return { entry: null };
  return { entry: data };
}

export async function getAllEntries(enrollmentId) {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('my21_daily_entries')
    .select('*')
    .eq('enrollment_id', enrollmentId)
    .order('day_number', { ascending: true });

  if (error) return { entries: [] };
  return { entries: data || [] };
}

// ==================== WEIGHT ====================

export async function saveDay21Weight(enrollmentId, weight) {
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from('my21_enrollments')
    .update({ day21_weight: weight, completed: true })
    .eq('id', enrollmentId);

  if (error) return { error: error.message };
  return { success: true };
}

// ==================== ADMIN ====================

export async function adminLogin(password) {
  // Simple password check — set this in your .env
  if (password === process.env.MY21_ADMIN_PASSWORD) {
    return { success: true };
  }
  return { error: 'Incorrect password.' };
}

export async function createChallenge({ name, description, duration }) {
  const supabase = getSupabaseAdmin();

  // Deactivate all existing challenges first
  await supabase
    .from('my21_challenges')
    .update({ is_active: false })
    .eq('is_active', true);

  const { data, error } = await supabase
    .from('my21_challenges')
    .insert({ name, description, duration: duration || 21, is_active: true })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, challenge: data };
}

export async function toggleChallenge(challengeId, isActive) {
  const supabase = getSupabaseAdmin();

  if (isActive) {
    // Deactivate others first
    await supabase
      .from('my21_challenges')
      .update({ is_active: false })
      .eq('is_active', true);
  }

  const { error } = await supabase
    .from('my21_challenges')
    .update({ is_active: isActive })
    .eq('id', challengeId);

  if (error) return { error: error.message };
  return { success: true };
}

export async function getAllChallenges() {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('my21_challenges')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return { challenges: [] };
  return { challenges: data || [] };
}

export async function getAdminUsers(challengeId) {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('my21_enrollments')
    .select('*, my21_users(*), my21_daily_entries(count)')
    .order('created_at', { ascending: false });

  if (challengeId) {
    query = query.eq('challenge_id', challengeId);
  }

  const { data, error } = await query;

  if (error) return { users: [] };

  // Get actual entry counts per enrollment
  const enriched = await Promise.all(
    (data || []).map(async (enrollment) => {
      const { data: entries } = await supabase
        .from('my21_daily_entries')
        .select('day_number')
        .eq('enrollment_id', enrollment.id);

      return {
        ...enrollment,
        days_completed: entries ? entries.length : 0,
      };
    })
  );

  return { users: enriched };
}
