import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserEnrollment, getDailyEntry, saveDailyEntry } from '../../lib/my21-actions';
import { getChallengeConfig, getDailyTip, type ChallengeConfig } from '../../lib/challenge-config';
import './my21.css';

/* ── Progress Ring (SVG) ── */
function ProgressRing({ checked, total }: { checked: number; total: number }) {
  const size = 96; // w-24 h-24
  const strokeWidth = 8;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? checked / total : 0;
  const offset = circumference - progress * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="transparent" stroke="white"
          strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{checked}/{total}</span>
        <span className="text-[10px] uppercase font-bold tracking-tighter text-white">Tasks</span>
      </div>
    </div>
  );
}

export default function My21Today() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [dayNumber, setDayNumber] = useState(1);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [config, setConfig] = useState<ChallengeConfig | null>(null);
  const [challengeName, setChallengeName] = useState('');

  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [assessment, setAssessment] = useState<Record<string, string | null>>({});
  const [notes, setNotes] = useState('');

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  useEffect(() => {
    const userId = sessionStorage.getItem('my21_user_id');
    if (!userId) { navigate('/my21'); return; }

    const challengeId = sessionStorage.getItem('my21_challenge_id') || undefined;

    async function loadData() {
      try {
        const { enrollment } = await getUserEnrollment(userId!, challengeId);
        if (!enrollment) { navigate('/my21'); return; }

        const challengeType = enrollment.my21_challenges?.type || 'health';
        const cfg = getChallengeConfig(challengeType);
        setConfig(cfg);
        setChallengeName(enrollment.my21_challenges?.name || cfg.label);

        // Store challenge ID in session for consistency
        sessionStorage.setItem('my21_challenge_id', enrollment.challenge_id);

        // Init checklist from config
        const initialChecklist: Record<string, boolean> = {};
        cfg.checklistItems.forEach((item) => { initialChecklist[item.key] = false; });

        // Init assessment
        const initialAssessment: Record<string, string | null> = {};
        cfg.assessmentCategories.forEach((cat) => { initialAssessment[cat.key] = null; });

        const startDate = new Date(enrollment.start_date);
        const today = new Date();
        const diffDays = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const duration = enrollment.my21_challenges?.duration || 21;

        if (diffDays > duration) { navigate('/my21/progress'); return; }

        const day = Math.max(1, diffDays);
        setDayNumber(day);
        setEnrollmentId(enrollment.id);

        // Load existing entry
        const { entry } = await getDailyEntry(enrollment.id, day);
        if (entry) {
          // Load from checklist_data JSONB
          if (entry.checklist_data && typeof entry.checklist_data === 'object') {
            const loaded = { ...initialChecklist };
            for (const key of Object.keys(loaded)) {
              if (entry.checklist_data[key] !== undefined) {
                loaded[key] = entry.checklist_data[key];
              }
            }
            setChecklist(loaded);
          } else {
            setChecklist(initialChecklist);
          }

          const loadedAssessment = { ...initialAssessment };
          if (entry.energy) loadedAssessment.energy = entry.energy;
          if (entry.mood) loadedAssessment.mood = entry.mood;
          if (entry.sleep_quality) loadedAssessment.sleepQuality = entry.sleep_quality;
          if (entry.cravings) loadedAssessment.cravings = entry.cravings;
          setAssessment(loadedAssessment);
          setNotes(entry.notes || '');
        } else {
          setChecklist(initialChecklist);
          setAssessment(initialAssessment);
        }
      } catch {
        console.error('Error loading data');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [navigate]);

  const toggleChecklist = useCallback((key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    try {
      const result = await saveDailyEntry({
        enrollmentId, dayNumber, checklistData: checklist, assessment, notes,
      });
      if (result.error) {
        setSaveMessage(result.error);
      } else {
        setSaveMessage('Saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      }
    } catch {
      setSaveMessage('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="my21-loading">
        <div className="my21-loading-spinner" />
        Loading...
      </div>
    );
  }

  const tip = getDailyTip(config, dayNumber);
  const duration = 21;

  return (
    <div className="bg-brand-bg min-h-screen pb-32 font-label">
      {/* ── Fixed Top App Bar ── */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-gradient-to-r from-brand-primary to-brand-coral-dark text-white">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined cursor-pointer">menu</span>
          <h1 className="font-headline text-2xl font-bold tracking-tight">{challengeName}</h1>
        </div>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">person</span>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="mt-16 pt-8 pb-12 px-6 bg-gradient-to-r from-brand-primary to-brand-coral-dark text-white rounded-b-[40px] shadow-lg relative overflow-hidden">
        {/* Decorative blur circle */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
        <div className="flex justify-between items-end relative z-10">
          <div>
            <div className="flex items-baseline gap-2">
              <h2 className="font-headline text-5xl font-bold">Day {dayNumber}</h2>
              <span className="text-xl opacity-80 font-medium">of {duration}</span>
            </div>
            <p className="mt-1 font-label font-medium opacity-90 tracking-wide uppercase text-xs">
              {challengeName}
            </p>
          </div>
          <ProgressRing checked={checkedCount} total={config.checklistItems.length} />
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-md mx-auto px-6 -mt-6 relative z-20 space-y-6">

        {/* Tip of the Day Card */}
        <div className="bg-brand-coral-light border-l-4 border-brand-primary p-5 rounded-xl shadow-sm flex gap-4">
          <div className="bg-brand-primary/10 p-2 rounded-full h-fit">
            <span className="material-symbols-outlined text-brand-primary">lightbulb</span>
          </div>
          <div>
            <h4 className="text-brand-primary font-bold text-sm uppercase tracking-wider mb-1">
              Tip of the Day
            </h4>
            <p className="text-brand-text font-medium leading-relaxed">{tip}</p>
          </div>
        </div>

        {/* ── Daily Checklist ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="font-headline text-2xl font-bold mb-5 text-brand-text">Daily Checklist</h3>
          <div className="space-y-4">
            {config.checklistItems.map((item) => {
              const isChecked = checklist[item.key];
              return (
                <label
                  key={item.key}
                  className="flex items-start gap-3 cursor-pointer group"
                  onClick={(e) => { e.preventDefault(); toggleChecklist(item.key); }}
                >
                  <div className="relative flex items-center justify-center mt-1">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      readOnly
                      className="peer h-5 w-5 rounded border-stone-300 text-brand-primary focus:ring-brand-primary"
                    />
                  </div>
                  <span
                    className={
                      isChecked
                        ? 'text-brand-text-light line-through decoration-brand-primary/40 transition-all font-medium'
                        : 'text-brand-text font-medium transition-all'
                    }
                  >
                    {item.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* All Complete celebration */}
        {checkedCount === config.checklistItems.length && (
          <div className="my21-celebration bg-gradient-to-br from-brand-secondary to-[#6B9575]">
            <div className="text-[32px] mb-2">&#127881;</div>
            <div className="font-headline text-lg font-semibold mb-1">All Tasks Complete!</div>
            <div className="text-sm opacity-90">You crushed it today. Keep going!</div>
          </div>
        )}

        {/* ── Self-Assessment ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="font-headline text-2xl font-bold mb-5 text-brand-text">Self-Assessment</h3>
          <div className="space-y-6">
            {config.assessmentCategories.map((category) => {
              const selectedValue = assessment[category.key];
              return (
                <div key={category.key}>
                  <label className="block text-xs font-bold text-brand-muted uppercase tracking-widest mb-3">
                    {category.label}
                  </label>
                  <div className="flex gap-2 hide-scrollbar overflow-x-auto pb-1">
                    {category.options.map((option) => {
                      const isSelected = selectedValue === option.toLowerCase();
                      return (
                        <button
                          key={option}
                          onClick={() =>
                            setAssessment((prev) => ({ ...prev, [category.key]: option.toLowerCase() }))
                          }
                          className={
                            isSelected
                              ? 'px-4 py-2 rounded-full bg-brand-primary text-white text-sm font-medium shadow-md shadow-brand-primary/20 transition-colors'
                              : 'px-4 py-2 rounded-full border border-stone-200 text-sm font-medium hover:bg-stone-50 transition-colors'
                          }
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Daily Notes ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
          <h3 className="font-headline text-2xl font-bold mb-5 text-brand-text">Daily Notes</h3>
          <textarea
            className="w-full h-32 rounded-xl border-stone-200 focus:ring-brand-primary focus:border-brand-primary placeholder:text-stone-400 font-medium"
            placeholder="How was your day? Any cravings you overcame?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </main>

      {/* ── Fixed Action Bar ── */}
      <div className="fixed bottom-0 left-0 w-full z-40">
        {/* Save message */}
        {saveMessage && (
          <div className="px-6">
            <p
              className={`text-sm text-center mb-1 font-medium ${
                saveMessage.includes('success') ? 'text-brand-secondary' : 'text-red-600'
              }`}
            >
              {saveMessage}
            </p>
          </div>
        )}

        {/* Main Action Button */}
        <div className="px-6 pb-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`w-full text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-brand-primary/30 active:scale-95 transition-transform ${
              saving ? 'bg-brand-muted cursor-not-allowed' : 'bg-brand-primary cursor-pointer'
            }`}
          >
            {saving ? 'Saving...' : "Save Today's Entry"}
          </button>
        </div>

        {/* Bottom NavBar */}
        <nav className="bg-white border-t border-stone-100 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] rounded-t-[24px] flex justify-around items-center px-4 pb-6 pt-3">
          {/* Tracker (active) */}
          <div className="flex flex-col items-center justify-center bg-orange-50 text-orange-700 rounded-xl px-4 py-1.5 active:translate-y-0.5 transition-transform cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              calendar_today
            </span>
            <span className="font-sans text-[11px] font-medium uppercase tracking-wider mt-1">Tracker</span>
          </div>

          {/* Insights */}
          <div
            className="flex flex-col items-center justify-center text-stone-400 px-4 py-1.5 hover:text-orange-500 active:translate-y-0.5 transition-transform cursor-pointer"
            onClick={() => navigate('/my21/progress')}
          >
            <span className="material-symbols-outlined">insights</span>
            <span className="font-sans text-[11px] font-medium uppercase tracking-wider mt-1">Insights</span>
          </div>

          {/* Recipes */}
          <div className="flex flex-col items-center justify-center text-stone-400 px-4 py-1.5 hover:text-orange-500 active:translate-y-0.5 transition-transform cursor-pointer">
            <span className="material-symbols-outlined">restaurant_menu</span>
            <span className="font-sans text-[11px] font-medium uppercase tracking-wider mt-1">Recipes</span>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center justify-center text-stone-400 px-4 py-1.5 hover:text-orange-500 active:translate-y-0.5 transition-transform cursor-pointer">
            <span className="material-symbols-outlined">person</span>
            <span className="font-sans text-[11px] font-medium uppercase tracking-wider mt-1">Profile</span>
          </div>
        </nav>
      </div>
    </div>
  );
}
