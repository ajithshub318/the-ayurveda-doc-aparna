import { supabase } from './supabase';

// Hash PIN using Web Crypto API
async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// ==================== AUTH ====================

export async function signUp({
  name,
  email,
  whatsapp,
  pin,
  challengeId,
  day1Weight,
}: {
  name: string;
  email?: string;
  whatsapp: string;
  pin: string;
  challengeId: string;
  day1Weight?: number | null;
}) {
  const { data: existing } = await supabase
    .from('my21_users')
    .select('id, pin_hash')
    .eq('whatsapp', whatsapp)
    .single();

  if (existing) {
    // Check if already enrolled in this challenge
    const { data: enrollment } = await supabase
      .from('my21_enrollments')
      .select('id')
      .eq('user_id', existing.id)
      .eq('challenge_id', challengeId)
      .single();

    if (enrollment) {
      return { error: 'You are already enrolled in this challenge. Please log in.' };
    }

    // Verify PIN before enrolling existing user
    const pinHash = await hashPin(pin);
    if (existing.pin_hash !== pinHash) {
      return { error: 'This WhatsApp number is registered. Use your existing PIN to join.' };
    }

    // Enroll existing user in the new challenge
    const { error: enrollError } = await supabase
      .from('my21_enrollments')
      .insert({
        user_id: existing.id,
        challenge_id: challengeId,
        start_date: new Date().toISOString().split('T')[0],
        day1_weight: day1Weight || null,
      });

    if (enrollError) return { error: enrollError.message };
    return { success: true, userId: existing.id };
  }

  // New user
  const pinHash = await hashPin(pin);
  const insertData: Record<string, string> = { name, whatsapp, pin_hash: pinHash };
  if (email) insertData.email = email;

  const { data: user, error: userError } = await supabase
    .from('my21_users')
    .insert(insertData)
    .select()
    .single();

  if (userError) return { error: userError.message };

  const { error: enrollError } = await supabase
    .from('my21_enrollments')
    .insert({
      user_id: user.id,
      challenge_id: challengeId,
      start_date: new Date().toISOString().split('T')[0],
      day1_weight: day1Weight || null,
    });

  if (enrollError) return { error: enrollError.message };
  return { success: true, userId: user.id };
}

export async function login({
  whatsapp,
  pin,
  challengeId,
}: {
  whatsapp: string;
  pin: string;
  challengeId: string;
}) {
  const { data: user } = await supabase
    .from('my21_users')
    .select('id, name, pin_hash')
    .eq('whatsapp', whatsapp)
    .single();

  if (!user) return { error: 'No account found with this WhatsApp number.' };

  const pinHash = await hashPin(pin);
  if (user.pin_hash !== pinHash) return { error: 'Incorrect PIN.' };

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('my21_enrollments')
    .select('id')
    .eq('user_id', user.id)
    .eq('challenge_id', challengeId)
    .single();

  if (!enrollment) {
    return { error: 'You are not enrolled in this challenge. Please sign up first.' };
  }

  return { success: true, userId: user.id, name: user.name };
}

// ==================== CHALLENGES ====================

export async function getActiveChallenges() {
  const { data, error } = await supabase
    .from('my21_challenges')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) return [];
  return data || [];
}

export async function getAllChallenges() {
  const { data } = await supabase
    .from('my21_challenges')
    .select('*')
    .order('created_at', { ascending: false });

  return { challenges: data || [] };
}

export async function createChallenge({
  name,
  description,
  duration,
  type = 'health',
}: {
  name: string;
  description: string;
  duration: number;
  type?: string;
}) {
  // Deactivate existing active challenges of the same type
  await supabase
    .from('my21_challenges')
    .update({ is_active: false })
    .eq('is_active', true)
    .eq('type', type);

  const { data, error } = await supabase
    .from('my21_challenges')
    .insert({ name, description, duration: duration || 21, is_active: true, type })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, challenge: data };
}

export async function toggleChallenge(challengeId: string, isActive: boolean) {
  if (isActive) {
    const { data: challenge } = await supabase
      .from('my21_challenges')
      .select('type')
      .eq('id', challengeId)
      .single();

    await supabase
      .from('my21_challenges')
      .update({ is_active: false })
      .eq('is_active', true)
      .eq('type', challenge?.type || 'health');
  }

  const { error } = await supabase
    .from('my21_challenges')
    .update({ is_active: isActive })
    .eq('id', challengeId);

  if (error) return { error: error.message };
  return { success: true };
}

// ==================== ENROLLMENT ====================

export async function getUserEnrollment(userId: string, challengeId?: string) {
  let query = supabase
    .from('my21_enrollments')
    .select('*, my21_challenges(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (challengeId) {
    query = query.eq('challenge_id', challengeId);
  }

  const { data, error } = await query.limit(1).single();
  if (error) return { enrollment: null };
  return { enrollment: data };
}

// ==================== DAILY ENTRIES ====================

export async function saveDailyEntry({
  enrollmentId,
  dayNumber,
  checklistData,
  assessment,
  notes,
}: {
  enrollmentId: string;
  dayNumber: number;
  checklistData: Record<string, boolean>;
  assessment: Record<string, string | null>;
  notes: string;
}) {
  const entryData = {
    enrollment_id: enrollmentId,
    day_number: dayNumber,
    entry_date: new Date().toISOString().split('T')[0],
    checklist_data: checklistData,
    energy: assessment.energy?.toLowerCase() || null,
    mood: assessment.mood?.toLowerCase() || null,
    sleep_quality: assessment.sleepQuality?.toLowerCase() || null,
    cravings: assessment.cravings?.toLowerCase() || null,
    notes: notes || '',
    // Legacy boolean columns — set to false
    woke_up_on_time: false,
    drank_water: false,
    exercised: false,
    ate_home_cooked: false,
    avoided_processed: false,
    no_sugar: false,
    read_or_learned: false,
    slept_before_10: false,
  };

  const { data, error } = await supabase
    .from('my21_daily_entries')
    .upsert(entryData, { onConflict: 'enrollment_id,day_number' })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, entry: data };
}

export async function getDailyEntry(enrollmentId: string, dayNumber: number) {
  const { data } = await supabase
    .from('my21_daily_entries')
    .select('*')
    .eq('enrollment_id', enrollmentId)
    .eq('day_number', dayNumber)
    .single();

  return { entry: data || null };
}

export async function getAllEntries(enrollmentId: string) {
  const { data } = await supabase
    .from('my21_daily_entries')
    .select('*')
    .eq('enrollment_id', enrollmentId)
    .order('day_number', { ascending: true });

  return { entries: data || [] };
}

// ==================== WEIGHT ====================

export async function saveDay21Weight(enrollmentId: string, weight: number) {
  const { error } = await supabase
    .from('my21_enrollments')
    .update({ day21_weight: weight, completed: true })
    .eq('id', enrollmentId);

  if (error) return { error: error.message };
  return { success: true };
}

// ==================== ADMIN ====================

export function adminLogin(password: string) {
  if (password === import.meta.env.VITE_MY21_ADMIN_PASSWORD) {
    return { success: true };
  }
  return { error: 'Incorrect password.' };
}

export async function getAdminUsers(challengeId?: string) {
  let query = supabase
    .from('my21_enrollments')
    .select('*, my21_users(*), my21_challenges(type, duration)')
    .order('created_at', { ascending: false });

  if (challengeId) {
    query = query.eq('challenge_id', challengeId);
  }

  const { data } = await query;

  const enriched = await Promise.all(
    (data || []).map(async (enrollment) => {
      const { data: entries } = await supabase
        .from('my21_daily_entries')
        .select('day_number, checklist_data')
        .eq('enrollment_id', enrollment.id);

      // Calculate sugar-free days for sugar_cut challenges
      let sugarFreeDays = 0;
      const challengeType = enrollment.my21_challenges?.type || 'health';
      if (challengeType === 'sugar_cut' && entries) {
        for (const entry of entries) {
          const cl = entry.checklist_data;
          if (cl && cl.noSugarInDrinks && cl.noSugaryDrinks && cl.noSweets && cl.noPackagedSnacks) {
            sugarFreeDays++;
          }
        }
      }

      return {
        ...enrollment,
        days_completed: entries ? entries.length : 0,
        sugar_free_days: sugarFreeDays,
        challenge_type: challengeType,
      };
    })
  );

  return { users: enriched };
}
