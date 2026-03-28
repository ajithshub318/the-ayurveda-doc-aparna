'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUserEnrollment, getDailyEntry, saveDailyEntry } from '../../../lib/actions';

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
  success: '#7BA787',
  successBg: '#E8F0EA',
};

const fonts = {
  heading: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', -apple-system, sans-serif",
};

// ==================== CHECKLIST CONFIG ====================
const CHECKLIST_ITEMS = [
  { key: 'wokeUpOnTime', label: 'Woke up on time', icon: '☀️' },
  { key: 'drankWater', label: 'Drank 3+ litres of water', icon: '💧' },
  { key: 'exercised', label: 'Exercised or walked 30+ mins', icon: '🚶' },
  { key: 'ateHomeCooked', label: 'Ate home-cooked meals', icon: '🍲' },
  { key: 'avoidedProcessed', label: 'Avoided processed/packaged food', icon: '🚫' },
  { key: 'noSugar', label: 'No sugar', icon: '🍬' },
  { key: 'readOrLearned', label: 'Read or learned something new', icon: '📖' },
  { key: 'sleptBefore10', label: 'Slept before 10 PM', icon: '🌙' },
];

const ASSESSMENT_OPTIONS = {
  energy: ['low', 'okay', 'good', 'great'],
  mood: ['low', 'okay', 'good', 'great'],
  sleepQuality: ['low', 'okay', 'good', 'great'],
  cravings: ['none', 'mild', 'strong', 'gave_in'],
};

const ASSESSMENT_LABELS = {
  energy: { label: 'Energy', options: ['Low', 'Okay', 'Good', 'Great'] },
  mood: { label: 'Mood', options: ['Low', 'Okay', 'Good', 'Great'] },
  sleepQuality: { label: 'Sleep Quality', options: ['Low', 'Okay', 'Good', 'Great'] },
  cravings: { label: 'Cravings', options: ['None', 'Mild', 'Strong', 'Gave in'] },
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
    padding: '24px 24px 100px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  headerLeft: {},
  greeting: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.warmGray,
  },
  dayTitle: {
    fontFamily: fonts.heading,
    fontSize: '28px',
    fontWeight: '400',
    color: colors.charcoal,
    marginTop: '2px',
  },
  dayAccent: {
    color: colors.sage,
    fontStyle: 'italic',
  },
  progressRing: {
    position: 'relative',
    width: '56px',
    height: '56px',
  },
  progressText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: fonts.heading,
    fontSize: '14px',
    fontWeight: '600',
    color: colors.charcoal,
  },
  dateBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: '14px 20px',
    marginBottom: '24px',
    border: `1px solid ${colors.creamDark}`,
  },
  dateText: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.charcoal,
    fontWeight: '500',
  },
  dayBadge: {
    fontFamily: fonts.body,
    fontSize: '12px',
    color: colors.sage,
    fontWeight: '500',
    backgroundColor: colors.sageLight,
    padding: '4px 12px',
    borderRadius: '20px',
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
  checkItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 0',
    borderBottom: `1px solid ${colors.cream}`,
    cursor: 'pointer',
    transition: 'opacity 0.2s ease',
  },
  checkItemLast: {
    borderBottom: 'none',
  },
  checkbox: {
    width: '24px',
    height: '24px',
    borderRadius: '8px',
    border: `2px solid ${colors.creamDark}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '14px',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: colors.sage,
    borderColor: colors.sage,
  },
  checkMark: {
    color: colors.white,
    fontSize: '14px',
    fontWeight: 'bold',
  },
  checkLabel: {
    fontFamily: fonts.body,
    fontSize: '15px',
    color: colors.charcoal,
    flex: 1,
  },
  checkLabelChecked: {
    color: colors.warmGray,
  },
  checkIcon: {
    fontSize: '18px',
    marginRight: '12px',
    width: '24px',
    textAlign: 'center',
  },
  assessmentGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  assessmentRow: {},
  assessmentLabel: {
    fontFamily: fonts.body,
    fontSize: '13px',
    fontWeight: '500',
    color: colors.charcoalLight,
    marginBottom: '10px',
  },
  optionGroup: {
    display: 'flex',
    gap: '8px',
  },
  option: {
    flex: 1,
    padding: '10px 4px',
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: '12px',
    fontWeight: '500',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: `1px solid ${colors.creamDark}`,
    backgroundColor: colors.cream,
    color: colors.warmGray,
  },
  optionSelected: {
    backgroundColor: colors.sage,
    borderColor: colors.sage,
    color: colors.white,
  },
  notesInput: {
    width: '100%',
    padding: '14px 16px',
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.charcoal,
    backgroundColor: colors.cream,
    border: `1px solid ${colors.creamDark}`,
    borderRadius: '10px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '80px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  },
  saveBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    padding: '16px 24px',
    borderTop: `1px solid ${colors.creamDark}`,
    display: 'flex',
    justifyContent: 'center',
    zIndex: 100,
  },
  saveButton: {
    maxWidth: '480px',
    width: '100%',
    padding: '16px',
    fontFamily: fonts.body,
    fontSize: '15px',
    fontWeight: '500',
    color: colors.white,
    backgroundColor: colors.charcoal,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  savedButton: {
    backgroundColor: colors.sage,
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
    transition: 'all 0.2s ease',
  },
  navLinkActive: {
    color: colors.sage,
    borderColor: colors.sage,
    backgroundColor: colors.sageLight,
  },
  completionBar: {
    display: 'flex',
    gap: '4px',
    marginBottom: '6px',
  },
  completionSegment: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    backgroundColor: colors.creamDark,
  },
  completionFilled: {
    backgroundColor: colors.sage,
  },
  completionText: {
    fontFamily: fonts.body,
    fontSize: '12px',
    color: colors.warmGray,
    textAlign: 'right',
  },
};

// ==================== PROGRESS RING COMPONENT ====================
function ProgressRing({ completed, total }) {
  const pct = total > 0 ? (completed / total) * 100 : 0;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div style={styles.progressRing}>
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={radius} fill="none" stroke={colors.creamDark} strokeWidth="4" />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={colors.sage}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 28 28)"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <div style={styles.progressText}>{completed}/{total}</div>
    </div>
  );
}

// ==================== MAIN PAGE ====================
export default function TodayPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [userName, setUserName] = useState('');
  const [enrollment, setEnrollment] = useState(null);
  const [dayNumber, setDayNumber] = useState(1);

  // Checklist state
  const [checklist, setChecklist] = useState({
    wokeUpOnTime: false,
    drankWater: false,
    exercised: false,
    ateHomeCooked: false,
    avoidedProcessed: false,
    noSugar: false,
    readOrLearned: false,
    sleptBefore10: false,
  });

  // Assessment state
  const [assessment, setAssessment] = useState({
    energy: null,
    mood: null,
    sleepQuality: null,
    cravings: null,
    notes: '',
  });

  useEffect(() => {
    async function load() {
      const userId = sessionStorage.getItem('my21_user_id');
      const name = sessionStorage.getItem('my21_user_name');

      if (!userId) {
        router.push('/my21');
        return;
      }

      setUserName(name || 'there');

      const { enrollment: enr } = await getUserEnrollment(userId);
      if (!enr) {
        router.push('/my21');
        return;
      }

      setEnrollment(enr);

      // Calculate current day number
      const startDate = new Date(enr.start_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
      const currentDay = Math.min(Math.max(diffDays, 1), enr.my21_challenges?.duration || 21);
      setDayNumber(currentDay);

      // Load existing entry for today
      const { entry } = await getDailyEntry(enr.id, currentDay);
      if (entry) {
        setChecklist({
          wokeUpOnTime: entry.woke_up_on_time || false,
          drankWater: entry.drank_water || false,
          exercised: entry.exercised || false,
          ateHomeCooked: entry.ate_home_cooked || false,
          avoidedProcessed: entry.avoided_processed || false,
          noSugar: entry.no_sugar || false,
          readOrLearned: entry.read_or_learned || false,
          sleptBefore10: entry.slept_before_10 || false,
        });
        setAssessment({
          energy: entry.energy || null,
          mood: entry.mood || null,
          sleepQuality: entry.sleep_quality || null,
          cravings: entry.cravings || null,
          notes: entry.notes || '',
        });
      }

      setLoading(false);
    }
    load();
  }, [router]);

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const setAssessmentValue = (key, value) => {
    setAssessment((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const handleSave = async () => {
    setSaving(true);
    const result = await saveDailyEntry({
      enrollmentId: enrollment.id,
      dayNumber,
      checklist,
      assessment,
    });

    setSaving(false);
    if (!result.error) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const duration = enrollment?.my21_challenges?.duration || 21;
  const challengeComplete = dayNumber > duration;

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, textAlign: 'center', paddingTop: '120px' }}>
          <div style={{ fontFamily: fonts.heading, fontSize: '24px', color: colors.sage }}>My21</div>
          <div style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.warmGray, marginTop: '12px' }}>
            Loading your tracker...
          </div>
        </div>
      </div>
    );
  }

  if (challengeComplete) {
    router.push('/my21/progress');
    return null;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Navigation */}
        <div style={styles.navBar}>
          <button style={{ ...styles.navLink, ...styles.navLinkActive }}>Today</button>
          <button
            style={styles.navLink}
            onClick={() => router.push('/my21/progress')}
          >
            Progress
          </button>
        </div>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.greeting}>Hello, {userName}</div>
            <div style={styles.dayTitle}>
              Day <span style={styles.dayAccent}>{dayNumber}</span>
            </div>
          </div>
          <ProgressRing completed={checkedCount} total={8} />
        </div>

        {/* Date Bar */}
        <div style={styles.dateBar}>
          <div style={styles.dateText}>{dateString}</div>
          <div style={styles.dayBadge}>
            {dayNumber} of {duration}
          </div>
        </div>

        {/* Day Progress Bar */}
        <div style={{ marginBottom: '28px' }}>
          <div style={styles.completionBar}>
            {Array.from({ length: duration }, (_, i) => (
              <div
                key={i}
                style={{
                  ...styles.completionSegment,
                  ...(i < dayNumber ? styles.completionFilled : {}),
                }}
              />
            ))}
          </div>
          <div style={styles.completionText}>
            {Math.round((dayNumber / duration) * 100)}% complete
          </div>
        </div>

        {/* Checklist */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Daily Checklist</div>
          <div style={styles.card}>
            {CHECKLIST_ITEMS.map((item, index) => (
              <div
                key={item.key}
                style={{
                  ...styles.checkItem,
                  ...(index === CHECKLIST_ITEMS.length - 1 ? styles.checkItemLast : {}),
                }}
                onClick={() => toggleCheck(item.key)}
              >
                <div
                  style={{
                    ...styles.checkbox,
                    ...(checklist[item.key] ? styles.checkboxChecked : {}),
                  }}
                >
                  {checklist[item.key] && <span style={styles.checkMark}>✓</span>}
                </div>
                <span style={styles.checkIcon}>{item.icon}</span>
                <span
                  style={{
                    ...styles.checkLabel,
                    ...(checklist[item.key] ? styles.checkLabelChecked : {}),
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Self Assessment */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>How are you feeling?</div>
          <div style={styles.card}>
            <div style={styles.assessmentGrid}>
              {Object.entries(ASSESSMENT_LABELS).map(([key, config]) => (
                <div key={key} style={styles.assessmentRow}>
                  <div style={styles.assessmentLabel}>{config.label}</div>
                  <div style={styles.optionGroup}>
                    {config.options.map((optLabel, i) => {
                      const optValue = ASSESSMENT_OPTIONS[key][i];
                      const isSelected = assessment[key] === optValue;
                      return (
                        <button
                          key={optValue}
                          style={{
                            ...styles.option,
                            ...(isSelected ? styles.optionSelected : {}),
                          }}
                          onClick={() => setAssessmentValue(key, optValue)}
                        >
                          {optLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Notes */}
              <div style={styles.assessmentRow}>
                <div style={styles.assessmentLabel}>Notes (optional)</div>
                <textarea
                  value={assessment.notes}
                  onChange={(e) => setAssessmentValue('notes', e.target.value)}
                  placeholder="How was your day? Any observations..."
                  style={styles.notesInput}
                  onFocus={(e) => (e.target.style.borderColor = colors.sage)}
                  onBlur={(e) => (e.target.style.borderColor = colors.creamDark)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Info */}
        {enrollment?.my21_challenges && (
          <div style={{ ...styles.card, marginBottom: '24px', backgroundColor: colors.sageLight, borderColor: colors.sage + '30' }}>
            <div style={{ fontFamily: fonts.body, fontSize: '11px', fontWeight: '500', letterSpacing: '1.5px', textTransform: 'uppercase', color: colors.sage, marginBottom: '6px' }}>
              Your Challenge
            </div>
            <div style={{ fontFamily: fonts.heading, fontSize: '16px', color: colors.charcoal, marginBottom: '6px' }}>
              {enrollment.my21_challenges.name}
            </div>
            <div style={{ fontFamily: fonts.body, fontSize: '13px', color: colors.charcoalLight, lineHeight: '1.6' }}>
              {enrollment.my21_challenges.description}
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div style={styles.saveBar}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            ...styles.saveButton,
            ...(saved ? styles.savedButton : {}),
            ...(saving ? { opacity: 0.6, cursor: 'not-allowed' } : {}),
          }}
        >
          {saving ? 'Saving...' : saved ? '✓ Saved for today' : 'Save Day ' + dayNumber}
        </button>
      </div>
    </div>
  );
}
