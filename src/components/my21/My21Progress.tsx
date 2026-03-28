import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEnrollment, getAllEntries, saveDay21Weight } from '../../lib/my21-actions';
import { getChallengeConfig, type ChallengeConfig } from '../../lib/challenge-config';
import './my21.css';

/* ── helpers (unchanged business logic) ── */

function valueTo4(val: string | null, invert = false): number {
  if (!val) return 0;
  const v = val.toLowerCase();
  const map: Record<string, number> = invert
    ? { none: 4, mild: 3, moderate: 2, strong: 1, intense: 0, gave_in: 0 }
    : { low: 1, okay: 2, fair: 2, good: 3, great: 4, excellent: 4 };
  return map[v] || 0;
}

function calcStreak(entries: any[], totalDays: number): number {
  const completedDays = new Set(entries.map((e: any) => e.day_number));
  let longest = 0, current = 0;
  for (let d = 1; d <= totalDays; d++) {
    if (completedDays.has(d)) { current++; if (current > longest) longest = current; }
    else current = 0;
  }
  return longest;
}

function calcCompletion(entries: any[]): number {
  if (entries.length === 0) return 0;
  let totalChecked = 0, totalItems = 0;
  for (const entry of entries) {
    const cl = entry.checklist_data;
    if (cl && typeof cl === 'object') {
      const vals = Object.values(cl) as boolean[];
      totalItems += vals.length;
      totalChecked += vals.filter(Boolean).length;
    }
  }
  return totalItems === 0 ? 0 : Math.round((totalChecked / totalItems) * 100);
}

/** Map a 0-4 value to a human-readable label */
function valueLabel(val: number, invert: boolean): string {
  if (val === 0) return '--';
  if (invert) {
    return ['', 'Intense', 'Strong', 'Mild', 'None'][val] || '--';
  }
  return ['', 'Low', 'Okay', 'Good', 'Great'][val] || '--';
}

/* ── component ── */

export default function My21Progress() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [config, setConfig] = useState<ChallengeConfig | null>(null);
  const [day21Weight, setDay21Weight] = useState('');
  const [savingWeight, setSavingWeight] = useState(false);
  const [weightSaved, setWeightSaved] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('my21_user_id');
    if (!userId) { navigate('/my21'); return; }
    const challengeId = sessionStorage.getItem('my21_challenge_id') || undefined;
    loadData(userId, challengeId);
  }, [navigate]);

  async function loadData(userId: string, challengeId?: string) {
    try {
      const { enrollment: enr } = await getUserEnrollment(userId, challengeId);
      if (!enr) { navigate('/my21'); return; }
      setEnrollment(enr);
      const cfg = getChallengeConfig(enr.my21_challenges?.type || 'health');
      setConfig(cfg);
      const { entries: ent } = await getAllEntries(enr.id);
      setEntries(ent);
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveDay21Weight() {
    if (!day21Weight || !enrollment) return;
    const w = parseFloat(day21Weight);
    if (isNaN(w) || w <= 0) return;
    setSavingWeight(true);
    const result = await saveDay21Weight(enrollment.id, w);
    setSavingWeight(false);
    if ('success' in result) {
      setWeightSaved(true);
      setEnrollment({ ...enrollment, day21_weight: w, completed: true });
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('my21_user_id');
    sessionStorage.removeItem('my21_user_name');
    sessionStorage.removeItem('my21_challenge_id');
    navigate('/my21');
  }

  /* ── loading state ── */
  if (loading || !config) {
    return (
      <div className="my21-loading">
        <div className="my21-loading-spinner" />
        Loading your progress...
      </div>
    );
  }

  if (!enrollment) return null;

  /* ── derived data ── */
  const theme = config.theme;
  const duration = enrollment.my21_challenges?.duration || 21;
  const startDate = new Date(enrollment.start_date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentDay = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  const completedDays = new Set(entries.map((e) => e.day_number));
  const daysTracked = entries.length;
  const longestStreak = calcStreak(entries, Math.min(currentDay, duration));
  const overallCompletion = calcCompletion(entries);

  // Build stats
  const stats: Array<{ label: string; value: string | number }> = [
    { label: 'Days Tracked', value: daysTracked },
    { label: 'Best Streak', value: `${longestStreak}d` },
    { label: 'Completion', value: `${overallCompletion}%` },
  ];

  // Add special metrics (e.g. sugar-free days)
  if (config.computeSpecialMetrics && config.progress.extraStats) {
    const special = config.computeSpecialMetrics(entries);
    for (const stat of config.progress.extraStats) {
      stats.splice(1, 0, { label: stat.label, value: `${special[stat.key] || 0}d` });
    }
  }

  const day1Weight = enrollment.day1_weight;
  const existingDay21Weight = enrollment.day21_weight;
  const showDay21Prompt = currentDay >= duration && day1Weight && !existingDay21Weight && !weightSaved;

  // Determine which assessment keys to trend
  const trendCategories = config.assessmentCategories.map((cat) => ({
    key: cat.key === 'sleepQuality' ? 'sleep_quality' : cat.key,
    label: cat.label,
    invert: cat.key === 'cravings',
  }));

  // Current week for the calendar header
  const currentWeek = Math.min(Math.ceil(currentDay / 7), Math.ceil(duration / 7));

  // Latest trend values for label display
  const latestEntry = entries.length > 0 ? entries[entries.length - 1] : null;

  return (
    <div className="bg-[#FAF7F2] min-h-screen font-[DM_Sans,sans-serif] text-[#2C2C2C] antialiased">
      {/* ── Fixed Header ── */}
      <header
        className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 shadow-sm"
        style={{ background: theme.gradient }}
      >
        <div className="flex items-center gap-3">
          <span
            className="material-symbols-outlined text-orange-50 cursor-pointer"
            onClick={() => navigate('/my21/today')}
          >
            arrow_back
          </span>
          <h1 className="font-serif text-xl font-semibold tracking-tight text-white">
            My Progress
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors border border-white/30"
        >
          Logout
        </button>
      </header>

      {/* ── Main Content ── */}
      <main className="pt-20 pb-24 px-4 max-w-md mx-auto space-y-6">

        {/* ── Stats 2x2 Grid ── */}
        <section className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white p-4 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col items-center text-center"
            >
              <span
                className="font-serif text-2xl font-bold"
                style={{ color: theme.primary }}
              >
                {stat.value}
              </span>
              <span className="text-[#8A8778] text-xs uppercase tracking-wider font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        {/* ── Calendar Grid ── */}
        <section className="bg-white p-5 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold text-[#2C2C2C]">
              {config.label.includes('Sugar') ? 'Sugar Cut Journey' : `${duration}-Day Journey`}
            </h2>
            <span className="text-[#8A8778] text-xs font-medium">Week {currentWeek}</span>
          </div>

          <div className="grid grid-cols-7 gap-y-4 gap-x-2">
            {Array.from({ length: duration }, (_, i) => i + 1).map((day) => {
              const isCompleted = completedDays.has(day);
              const isToday = day === currentDay;
              const isFuture = day > currentDay;

              if (isCompleted) {
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {day}
                    </div>
                  </div>
                );
              }
              if (isToday) {
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div
                      className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                      style={{ borderColor: theme.primary, color: theme.primary }}
                    >
                      {day}
                    </div>
                  </div>
                );
              }
              // Future or missed
              const isMissed = !isFuture;
              return (
                <div key={day} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs ${
                      isMissed
                        ? 'border border-gray-200 text-[#8A8778]'
                        : 'border border-gray-100 text-[#8A8778]/40'
                    }`}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-[10px] uppercase tracking-widest text-[#8A8778] font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} /> Completed
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-200" /> Missed
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full border" style={{ borderColor: theme.primary }} /> Today
            </div>
          </div>
        </section>

        {/* ── Wellness Trends ── */}
        {entries.length > 0 && (
          <section className="bg-white p-5 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] space-y-5">
            <h2 className="font-serif text-lg font-semibold text-[#2C2C2C]">Wellness Trends</h2>
            <div className="space-y-4">
              {trendCategories.map((cat) => {
                const values = entries.map((e) => valueTo4(e[cat.key], cat.invert));
                const latestVal = latestEntry ? valueTo4(latestEntry[cat.key], cat.invert) : 0;
                const latestLabel = latestEntry ? valueLabel(latestVal, cat.invert) : '--';
                const avgVal = values.length > 0
                  ? values.reduce((a, b) => a + b, 0) / values.length
                  : 0;
                const pct = Math.round((avgVal / 4) * 100);
                const hasData = values.some((v) => v > 0);

                // Color mapping: cravings=gold, energy=green, mood/sleep=secondary
                let barColor = '#7BA787'; // default green
                if (cat.key === 'cravings') barColor = '#D4A843';
                else if (cat.key === 'energy') barColor = '#7BA787';
                else if (cat.key === 'mood' || cat.key === 'sleep_quality') barColor = '#7BA787';

                if (!hasData) {
                  // Dashed border empty state (for mood/sleep when no data)
                  return (
                    <div key={cat.key} className="space-y-1.5">
                      <span className="text-xs font-medium text-[#2C2C2C]">{cat.label}</span>
                      <div className="h-2 w-full bg-gray-50 border border-dashed border-gray-200 rounded-full" />
                    </div>
                  );
                }

                return (
                  <div key={cat.key} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#2C2C2C]">{cat.label}</span>
                      <span style={{ color: barColor }}>{latestLabel}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, backgroundColor: barColor }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-[#8A8778] font-bold uppercase tracking-tighter pt-2">
              <span>Day 1</span>
              <span>Day {duration}</span>
            </div>
          </section>
        )}

        {/* ── Weight Journey Card ── */}
        {(day1Weight || existingDay21Weight) && (
          <section className="bg-white p-6 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-center justify-between overflow-hidden relative">
            {/* Decorative background icon */}
            <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-8xl">monitor_weight</span>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-[#8A8778] uppercase mb-1">Day 1</p>
              <p className="font-serif text-2xl font-bold text-[#2C2C2C]">
                {day1Weight ? <>{day1Weight} <span className="text-sm font-normal">kg</span></> : '--'}
              </p>
            </div>
            <span className="material-symbols-outlined text-[#8A8778]/30">arrow_forward</span>
            <div className="text-center">
              <p className="text-[10px] font-bold text-[#8A8778] uppercase mb-1">Day {duration}</p>
              <p className="font-serif text-2xl font-bold">
                {existingDay21Weight ? (
                  <span style={{ color: '#7BA787' }}>
                    {existingDay21Weight} <span className="text-sm font-normal">kg</span>
                  </span>
                ) : (
                  <span className="text-[#8A8778]/40">--</span>
                )}
              </p>
            </div>
          </section>
        )}

        {/* Weight change summary */}
        {day1Weight && existingDay21Weight && (
          <div className="text-center text-sm font-semibold" style={{ color: '#7BA787' }}>
            {existingDay21Weight < day1Weight
              ? `You lost ${(day1Weight - existingDay21Weight).toFixed(1)} kg!`
              : existingDay21Weight > day1Weight
              ? `You gained ${(existingDay21Weight - day1Weight).toFixed(1)} kg`
              : 'Weight maintained'}
          </div>
        )}

        {/* ── Day 21 Weight Prompt ── */}
        {showDay21Prompt && (
          <div
            className="rounded-xl p-6 border overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #FFF8E7 0%, #FFF3D6 100%)',
              borderColor: 'rgba(212,168,67,0.3)',
              boxShadow: '0 4px 20px rgba(212,168,67,0.1)',
            }}
          >
            <div className="absolute top-[-8px] right-3 text-5xl opacity-10 pointer-events-none">
              🏆
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2C2C2C] mb-2">
              Congratulations! Enter your final weight
            </h3>
            <p className="text-[13px] text-[#4A4A4A] mb-4 leading-relaxed">
              {config.progress.completionMessage} Record your weight to see your journey.
            </p>
            <div className="flex gap-2.5">
              <input
                type="number"
                value={day21Weight}
                onChange={(e) => setDay21Weight(e.target.value)}
                placeholder="Weight in kg"
                className="my21-input flex-1"
              />
              <button
                onClick={handleSaveDay21Weight}
                disabled={savingWeight || !day21Weight}
                className="px-5 py-3 rounded-xl border-none font-semibold text-sm text-white transition-all"
                style={{
                  backgroundColor: '#D4A843',
                  cursor: savingWeight ? 'default' : 'pointer',
                  opacity: savingWeight || !day21Weight ? 0.6 : 1,
                }}
              >
                {savingWeight ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {weightSaved && (
          <div className="bg-[#E8F0EA] rounded-xl px-4 py-3.5 text-sm text-[#6B9575] text-center font-medium">
            Weight saved successfully!
          </div>
        )}

        {/* ── CTA Card ── */}
        <section className="rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(224,122,95,0.2)]">
          <div
            className="p-6 text-white text-center flex flex-col items-center gap-4"
            style={{ background: theme.gradient }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-white/20 overflow-hidden bg-white/10">
              <img
                alt="Dr. Aparna Albert"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-ooKRBtXXA1hRFBq53_LBtorevQm8QymOCvedhJTqnYdLkhOPtKKZ6QzsCZUwBNrrfzNgWqjPm46MAfIgvp4YfVLBOubcbYrKf1JTbLAkRdscla1UstgMxBUf-et2iWH072SkSjh5u174X2LjDqVQhC2T0OcFsJdct73GyNuLBMjKbc8BK-Srjkp6lYXKpXuxuxLw9UO6CNccIV7drwpmBXKGzBQ_2l28uoB85b766IPZ28ukvy-nAXRkKF73_WCW-7Yk9f9vaKI4"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold">Need guidance?</h3>
              <p className="text-orange-50/90 text-sm mt-1 leading-relaxed max-w-[240px]">
                {config.progress.ctaText}
              </p>
            </div>
            <a
              href="https://wa.me/917012399593"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-transform flex items-center gap-2 no-underline"
              style={{ color: theme.primary }}
            >
              <span
                className="material-symbols-outlined text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                chat
              </span>
              Chat on WhatsApp
            </a>
          </div>
        </section>
      </main>

      {/* ── Bottom Nav Bar ── */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-white border-t border-orange-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] rounded-t-2xl">
        <button
          onClick={() => navigate('/my21/today')}
          className="flex flex-col items-center justify-center text-stone-500 pb-1 hover:text-orange-500 transition-opacity active:opacity-70 bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="text-[11px] font-medium tracking-wide">Today</span>
        </button>
        <button
          className="flex flex-col items-center justify-center pb-1 border-b-2 bg-transparent border-x-0 border-t-0 cursor-pointer"
          style={{ color: theme.primary, borderBottomColor: theme.primary }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            analytics
          </span>
          <span className="text-[11px] font-medium tracking-wide">Progress</span>
        </button>
        <button
          onClick={() => navigate('/my21/recipes')}
          className="flex flex-col items-center justify-center text-stone-500 pb-1 hover:text-orange-500 transition-opacity active:opacity-70 bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined">restaurant_menu</span>
          <span className="text-[11px] font-medium tracking-wide">Recipes</span>
        </button>
        <button
          onClick={() => navigate('/my21/profile')}
          className="flex flex-col items-center justify-center text-stone-500 pb-1 hover:text-orange-500 transition-opacity active:opacity-70 bg-transparent border-none cursor-pointer"
        >
          <span className="material-symbols-outlined">person</span>
          <span className="text-[11px] font-medium tracking-wide">Profile</span>
        </button>
      </nav>
    </div>
  );
}
