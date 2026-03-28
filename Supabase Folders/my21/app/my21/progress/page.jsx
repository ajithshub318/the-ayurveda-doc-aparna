'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserEnrollment, getAllEntries, saveDay21Weight } from '../../../lib/actions';

// ==================== DESIGN TOKENS ====================
const colors = {
  cream: '#FAF7F2',
  creamDark: '#F0EBE3',
  sage: '#7BA787',
  sageDark: '#6B9575',
  sageLight: '#E8F0EA',
  tan: '#C4B59A',
  charcoal: '#2C2C2C',
  charcoalLight: '#4A4A4A',
  warmGray: '#8A8778',
  white: '#FFFFFF',
  gold: '#D4A843',
  goldLight: '#FFF8E7',
};

const fonts = {
  heading: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', -apple-system, sans-serif",
};

// ==================== STYLES ====================
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: colors.cream,
    fontFamily: fonts.body,
    color: colors.charcoal,
  },
  container: {
    maxWidth: '480px',
    margin: '0 auto',
    padding: '24px 24px 60px',
  },
  navBar: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  navLink: {
    fontFamily: fonts.body,
    fontSize: '13px',
    color: colors.warmGray,
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: colors.white,
    border: `1px solid ${colors.creamDark}`,
    cursor: 'pointer',
  },
  navLinkActive: {
    color: colors.sage,
    borderColor: colors.sage,
    backgroundColor: colors.sageLight,
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: '28px',
    fontWeight: '400',
    color: colors.charcoal,
  },
  titleAccent: {
    color: colors.sage,
    fontStyle: 'italic',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.warmGray,
    marginTop: '8px',
  },
  statsRow: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: '14px',
    padding: '18px 14px',
    textAlign: 'center',
    border: `1px solid ${colors.creamDark}`,
  },
  statNumber: {
    fontFamily: fonts.heading,
    fontSize: '28px',
    fontWeight: '400',
    color: colors.charcoal,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: '11px',
    fontWeight: '500',
    color: colors.warmGray,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '4px',
  },
  section: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: '18px',
    fontWeight: '400',
    color: colors.charcoal,
    marginBottom: '16px',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: '16px',
    padding: '20px',
    border: `1px solid ${colors.creamDark}`,
  },
  // Calendar grid
  calendarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '6px',
  },
  calendarDay: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    fontSize: '13px',
    fontFamily: fonts.body,
    fontWeight: '500',
    position: 'relative',
  },
  calendarDayCompleted: {
    backgroundColor: colors.sageLight,
    color: colors.sageDark,
  },
  calendarDayMissed: {
    backgroundColor: colors.cream,
    color: colors.warmGray,
  },
  calendarDayFuture: {
    backgroundColor: 'transparent',
    color: colors.creamDark,
  },
  calendarDayToday: {
    border: `2px solid ${colors.sage}`,
  },
  calendarScore: {
    fontSize: '8px',
    color: colors.warmGray,
    marginTop: '1px',
  },
  // Trend chart
  trendContainer: {
    marginTop: '8px',
  },
  trendRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  trendLabel: {
    fontFamily: fonts.body,
    fontSize: '13px',
    fontWeight: '500',
    color: colors.charcoalLight,
    width: '80px',
    flexShrink: 0,
  },
  trendBars: {
    flex: 1,
    display: 'flex',
    gap: '3px',
    alignItems: 'end',
    height: '32px',
  },
  trendBar: {
    flex: 1,
    borderRadius: '3px 3px 0 0',
    minHeight: '4px',
    transition: 'height 0.3s ease',
  },
  // Weight comparison
  weightRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
  },
  weightLabel: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.warmGray,
  },
  weightValue: {
    fontFamily: fonts.heading,
    fontSize: '24px',
    color: colors.charcoal,
  },
  weightChange: {
    textAlign: 'center',
    padding: '16px',
    backgroundColor: colors.sageLight,
    borderRadius: '12px',
    marginTop: '12px',
  },
  weightChangeNumber: {
    fontFamily: fonts.heading,
    fontSize: '28px',
    color: colors.sage,
  },
  weightChangeLabel: {
    fontFamily: fonts.body,
    fontSize: '13px',
    color: colors.warmGray,
    marginTop: '4px',
  },
  // CTA
  ctaCard: {
    backgroundColor: colors.charcoal,
    borderRadius: '16px',
    padding: '28px',
    textAlign: 'center',
  },
  ctaTitle: {
    fontFamily: fonts.heading,
    fontSize: '20px',
    fontWeight: '400',
    color: colors.white,
    marginBottom: '8px',
  },
  ctaText: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: '#ABABAB',
    lineHeight: '1.6',
    marginBottom: '20px',
  },
  ctaButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 28px',
    fontFamily: fonts.body,
    fontSize: '14px',
    fontWeight: '500',
    color: colors.charcoal,
    backgroundColor: colors.white,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  day21WeightCard: {
    backgroundColor: colors.goldLight,
    borderRadius: '16px',
    padding: '24px',
    textAlign: 'center',
    border: `1px solid ${colors.gold}30`,
    marginBottom: '24px',
  },
  day21Input: {
    width: '120px',
    padding: '14px 16px',
    fontFamily: fonts.heading,
    fontSize: '20px',
    color: colors.charcoal,
    backgroundColor: colors.white,
    border: `1px solid ${colors.creamDark}`,
    borderRadius: '10px',
    textAlign: 'center',
    outline: 'none',
    margin: '12px 0',
  },
  day21Button: {
    padding: '12px 24px',
    fontFamily: fonts.body,
    fontSize: '14px',
    fontWeight: '500',
    color: colors.white,
    backgroundColor: colors.gold,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  logoutButton: {
    fontFamily: fonts.body,
    fontSize: '13px',
    color: colors.warmGray,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    textDecoration: 'underline',
  },
};

// ==================== VALUE MAPS ====================
const valueToNumber = {
  low: 1, okay: 2, good: 3, great: 4,
  none: 4, mild: 3, strong: 2, gave_in: 1,
};

const levelColors = {
  1: '#E8A598',
  2: colors.tan,
  3: '#B5C9A8',
  4: colors.sage,
};

// ==================== MAIN PAGE ====================
export default function ProgressPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [enrollment, setEnrollment] = useState(null);
  const [entries, setEntries] = useState([]);
  const [dayNumber, setDayNumber] = useState(1);
  const [day21Weight, setDay21WeightInput] = useState('');
  const [weightSaved, setWeightSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const userId = sessionStorage.getItem('my21_user_id');
      if (!userId) {
        router.push('/my21');
        return;
      }

      const { enrollment: enr } = await getUserEnrollment(userId);
      if (!enr) {
        router.push('/my21');
        return;
      }

      setEnrollment(enr);

      const startDate = new Date(enr.start_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
      setDayNumber(Math.min(diffDays, enr.my21_challenges?.duration || 21));

      const { entries: allEntries } = await getAllEntries(enr.id);
      setEntries(allEntries);
      setLoading(false);
    }
    load();
  }, [router]);

  const handleSaveDay21Weight = async () => {
    if (!day21Weight) return;
    const result = await saveDay21Weight(enrollment.id, parseFloat(day21Weight));
    if (!result.error) {
      setWeightSaved(true);
      setEnrollment((prev) => ({ ...prev, day21_weight: parseFloat(day21Weight) }));
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('my21_user_id');
    sessionStorage.removeItem('my21_user_name');
    router.push('/my21');
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, textAlign: 'center', paddingTop: '120px' }}>
          <div style={{ fontFamily: fonts.heading, fontSize: '24px', color: colors.sage }}>My21</div>
          <div style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.warmGray, marginTop: '12px' }}>
            Loading your progress...
          </div>
        </div>
      </div>
    );
  }

  const duration = enrollment?.my21_challenges?.duration || 21;
  const completedDays = entries.length;
  const totalChecks = entries.reduce((acc, entry) => {
    const checks = [
      entry.woke_up_on_time, entry.drank_water, entry.exercised,
      entry.ate_home_cooked, entry.avoided_processed, entry.no_sugar,
      entry.read_or_learned, entry.slept_before_10,
    ].filter(Boolean).length;
    return acc + checks;
  }, 0);
  const totalPossibleChecks = completedDays * 8;
  const overallScore = totalPossibleChecks > 0 ? Math.round((totalChecks / totalPossibleChecks) * 100) : 0;

  // Longest streak
  let currentStreak = 0;
  let longestStreak = 0;
  const entryDays = new Set(entries.map((e) => e.day_number));
  for (let d = 1; d <= dayNumber; d++) {
    if (entryDays.has(d)) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }

  const isDay21 = dayNumber >= duration;
  const showDay21Weight = isDay21 && enrollment?.day1_weight && !enrollment?.day21_weight && !weightSaved;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={styles.navBar}>
            <button style={styles.navLink} onClick={() => router.push('/my21/today')}>Today</button>
            <button style={{ ...styles.navLink, ...styles.navLinkActive }}>Progress</button>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>Log out</button>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            Your <span style={styles.titleAccent}>Progress</span>
          </h1>
          <p style={styles.subtitle}>
            {enrollment?.my21_challenges?.name || 'My21 Challenge'} — Day {dayNumber} of {duration}
          </p>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{completedDays}</div>
            <div style={styles.statLabel}>Days Tracked</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>{longestStreak}</div>
            <div style={styles.statLabel}>Best Streak</div>
          </div>
          <div style={styles.statCard}>
            <div style={{ ...styles.statNumber, color: colors.sage }}>{overallScore}%</div>
            <div style={styles.statLabel}>Completion</div>
          </div>
        </div>

        {/* Day 21 Weight Entry */}
        {showDay21Weight && (
          <div style={styles.day21WeightCard}>
            <div style={{ fontFamily: fonts.heading, fontSize: '18px', color: colors.charcoal, marginBottom: '4px' }}>
              Congratulations! Day 21!
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.warmGray }}>
              Enter your final weight to see your journey
            </div>
            <div>
              <input
                type="number"
                value={day21Weight}
                onChange={(e) => setDay21WeightInput(e.target.value)}
                placeholder="70"
                style={styles.day21Input}
              />
              <span style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.warmGray }}> kg</span>
            </div>
            <button onClick={handleSaveDay21Weight} style={styles.day21Button}>
              Save Final Weight
            </button>
          </div>
        )}

        {/* Weight Comparison */}
        {enrollment?.day1_weight && (enrollment?.day21_weight || weightSaved) && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Weight Journey</div>
            <div style={styles.card}>
              <div style={styles.weightRow}>
                <div>
                  <div style={styles.weightLabel}>Day 1</div>
                  <div style={styles.weightValue}>{enrollment.day1_weight} kg</div>
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: '20px', color: colors.creamDark }}>→</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={styles.weightLabel}>Day {duration}</div>
                  <div style={styles.weightValue}>{enrollment.day21_weight || day21Weight} kg</div>
                </div>
              </div>
              <div style={styles.weightChange}>
                <div style={styles.weightChangeNumber}>
                  {(parseFloat(enrollment.day21_weight || day21Weight) - enrollment.day1_weight).toFixed(1)} kg
                </div>
                <div style={styles.weightChangeLabel}>change over {duration} days</div>
              </div>
            </div>
          </div>
        )}

        {/* 21-Day Calendar */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Daily Log</div>
          <div style={styles.card}>
            <div style={styles.calendarGrid}>
              {Array.from({ length: duration }, (_, i) => {
                const day = i + 1;
                const entry = entries.find((e) => e.day_number === day);
                const isFuture = day > dayNumber;
                const isToday = day === dayNumber;

                const checksCompleted = entry
                  ? [
                      entry.woke_up_on_time, entry.drank_water, entry.exercised,
                      entry.ate_home_cooked, entry.avoided_processed, entry.no_sugar,
                      entry.read_or_learned, entry.slept_before_10,
                    ].filter(Boolean).length
                  : 0;

                return (
                  <div
                    key={day}
                    style={{
                      ...styles.calendarDay,
                      ...(entry ? styles.calendarDayCompleted : isFuture ? styles.calendarDayFuture : styles.calendarDayMissed),
                      ...(isToday ? styles.calendarDayToday : {}),
                    }}
                  >
                    <span>{day}</span>
                    {entry && <span style={styles.calendarScore}>{checksCompleted}/8</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trends */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Trends</div>
          <div style={styles.card}>
            <div style={styles.trendContainer}>
              {['energy', 'mood', 'sleep_quality', 'cravings'].map((metric) => {
                const label = metric === 'sleep_quality' ? 'Sleep' : metric.charAt(0).toUpperCase() + metric.slice(1);
                return (
                  <div key={metric} style={styles.trendRow}>
                    <div style={styles.trendLabel}>{label}</div>
                    <div style={styles.trendBars}>
                      {Array.from({ length: duration }, (_, i) => {
                        const day = i + 1;
                        const entry = entries.find((e) => e.day_number === day);
                        const value = entry ? valueToNumber[entry[metric]] || 0 : 0;
                        const height = value > 0 ? `${(value / 4) * 100}%` : '4px';
                        const color = value > 0 ? levelColors[value] : colors.creamDark;

                        return (
                          <div
                            key={day}
                            style={{
                              ...styles.trendBar,
                              height,
                              backgroundColor: color,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA — Talk to Dr. Aparna */}
        <div style={styles.section}>
          <div style={styles.ctaCard}>
            <div style={styles.ctaTitle}>
              Want to understand your patterns?
            </div>
            <div style={styles.ctaText}>
              Dr. Aparna can look at your 21-day data and tell you what it means for your body — and what to do next.
            </div>
            <a
              href={`https://wa.me/917012399593?text=${encodeURIComponent(
                `Hi Dr. Aparna, I just completed the ${enrollment?.my21_challenges?.name || 'My21'} challenge. I tracked ${completedDays} days with ${overallScore}% completion. I'd love to discuss what I noticed about my body during this time.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.ctaButton}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.607-.798-6.384-2.147l-.108-.086-3.348 1.123 1.123-3.348-.086-.108A9.953 9.953 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              Talk to Dr. Aparna
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
