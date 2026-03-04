import { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';

const WA = '917012399593';
const TL_START = 5;
const TL_END = 25;
const TL_SPAN = 20;

const BANDS = [
  { from: 6, to: 10, color: 'rgba(123,175,149,0.12)', dosha: 'Kapha', lc: '#7BAF95' },
  { from: 10, to: 14, color: 'rgba(196,168,130,0.12)', dosha: 'Pitta', lc: '#C4A882' },
  { from: 14, to: 18, color: 'rgba(160,149,144,0.12)', dosha: 'Vata', lc: '#A09590' },
  { from: 18, to: 22, color: 'rgba(123,175,149,0.12)', dosha: 'Kapha', lc: '#7BAF95' },
  { from: 22, to: 25, color: 'rgba(196,168,130,0.12)', dosha: 'Pitta', lc: '#C4A882' },
];

const TICKS = [
  { h: 6, l: '6AM' }, { h: 10, l: '10AM' }, { h: 14, l: '2PM' }, { h: 18, l: '6PM' }, { h: 22, l: '10PM' },
];

interface Opt {
  lbl: string;
  note: string;
  h: number | string | null;
}

interface Question {
  step: string;
  q: string;
  sub: string;
  key: string;
  opts: Opt[];
}

const QS: Question[] = [
  {
    step: 'Moment 1 \u2014 Wake', q: 'What time do your eyes actually open?',
    sub: 'Not the alarm. What actually happens.', key: 'wake',
    opts: [
      { lbl: 'Before 5:30', note: 'Vata time \u2014 the mind is clear', h: 5.0 },
      { lbl: 'Around 6', note: 'Right at the transition', h: 6.0 },
      { lbl: '6:30 \u2013 7', note: 'Early Kapha', h: 6.75 },
      { lbl: '7:30 \u2013 8', note: 'Mid Kapha', h: 7.75 },
      { lbl: 'After 8:30', note: 'Deep in Kapha', h: 9.0 },
    ],
  },
  {
    step: 'Moment 2 \u2014 First meal', q: 'When does your first meal happen?',
    sub: 'Breakfast, or whatever you call it.', key: 'breakfast',
    opts: [
      { lbl: 'Before 8', note: 'Still in Kapha \u2014 good', h: 7.5 },
      { lbl: '8:30 \u2013 9', note: 'Kapha winding down', h: 8.75 },
      { lbl: '9:30 \u2013 10', note: 'Very late Kapha', h: 9.75 },
      { lbl: 'I skip it', note: 'Straight to lunch', h: null },
    ],
  },
  {
    step: 'Moment 3 \u2014 Main meal', q: 'When does your main meal happen?',
    sub: 'The biggest thing you eat all day.', key: 'lunch',
    opts: [
      { lbl: 'Around noon', note: 'Pitta at peak \u2014 this is it', h: 12.0 },
      { lbl: '12:30 \u2013 1', note: 'Strong Pitta', h: 12.75 },
      { lbl: '1:30 \u2013 2', note: 'Pitta waning', h: 13.75 },
      { lbl: 'After 2:30', note: 'Pitta has passed', h: 14.75 },
      { lbl: 'I skip lunch', note: 'Or eat something very small', h: null },
    ],
  },
  {
    step: 'Moment 4 \u2014 Dinner', q: 'What time does dinner actually land?',
    sub: 'Most nights. The honest average.', key: 'dinner',
    opts: [
      { lbl: 'Before 7', note: 'Digestive fire still active', h: 6.5 },
      { lbl: 'Around 7 \u2013 7:30', note: 'Early Kapha', h: 7.25 },
      { lbl: 'Around 8', note: 'Mid Kapha', h: 20.0 },
      { lbl: '8:30 \u2013 9', note: 'Late Kapha', h: 20.75 },
      { lbl: 'After 9:30', note: 'Kapha nearly over', h: 21.75 },
    ],
  },
  {
    step: 'Moment 5 \u2014 Movement', q: 'When do you move your body?',
    sub: 'Workout, walk \u2014 whatever it looks like.', key: 'workout',
    opts: [
      { lbl: 'Morning, before 10', note: 'Kapha time \u2014 optimal', h: 'morning' },
      { lbl: 'Afternoon 2\u20135', note: 'Vata time \u2014 decent', h: 'afternoon' },
      { lbl: 'Evening 6\u20138', note: 'Kapha wind-down', h: 'evening' },
      { lbl: 'Late night 9+', note: 'Into repair window', h: 'late' },
      { lbl: 'Not regularly', note: 'Right now, not really', h: 'none' },
    ],
  },
  {
    step: 'Moment 6 \u2014 Sleep', q: 'When do you actually go to sleep?',
    sub: 'Lights out, phone down. The real time.', key: 'sleep',
    opts: [
      { lbl: 'Before 10', note: 'Full repair window \u2014 ideal', h: 22.0 },
      { lbl: 'Around 10:30', note: 'Just catching it', h: 22.5 },
      { lbl: 'Around 11', note: 'Missing first hour', h: 23.0 },
      { lbl: 'Around midnight', note: 'Missing two hours', h: 24.0 },
      { lbl: 'After midnight', note: 'Most of the window gone', h: 25.0 },
    ],
  },
];

interface Gap {
  sev: 'optimal' | 'mild' | 'warn';
  marker: number | null;
  moment: string;
  title: string;
  body: string;
  truth: string;
}

function hStr(h: number | null | string): string | null {
  if (h === null || typeof h === 'string') return null;
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  const ap = hh >= 12 ? 'PM' : 'AM';
  const d = hh > 12 ? hh - 12 : hh === 0 ? 12 : hh;
  return d + (mm > 0 ? ':' + (mm < 10 ? '0' + mm : mm) : '') + '\u202F' + ap;
}

function analyzeWake(h: number | null): Gap | null {
  if (h === null) return null;
  if (h <= 6.25) return { sev: 'optimal', marker: h, moment: 'Wake \u2014 ' + hStr(h), title: 'Waking at the right time', body: 'Rising at or before dawn puts you in Vata time \u2014 when the mind is clear and the body is light. You\u2019ve already completed your repair cycle. The day starts clean.', truth: 'This one habit sets the tone for your digestion, energy and focus for everything that follows.' };
  if (h <= 7.5) return { sev: 'mild', marker: h, moment: 'Wake \u2014 ' + hStr(h), title: 'Waking in Kapha \u2014 the heaviness is not in your head', body: 'Kapha starts at 6AM and brings a natural heaviness to the body. Waking at ' + hStr(h) + ' puts you inside it. The grogginess isn\u2019t laziness. It\u2019s Kapha. The longer you sleep into it, the harder it pulls.', truth: 'Shifting your wake time 30 minutes earlier is one of the highest-leverage changes you can make.' };
  return { sev: 'warn', marker: h, moment: 'Wake \u2014 ' + hStr(h), title: 'Deep Kapha wake \u2014 this is why you feel heavy before the day even starts', body: 'By ' + hStr(h) + ', your body has been in Kapha\u2019s slow, heavy phase for over two hours. You\u2019re waking up mid-inertia. No amount of coffee fully fixes what earlier waking prevents.', truth: 'Every 30 minutes reclaimed from Kapha changes how your whole day feels.' };
}

function analyzeBreakfast(h: number | null): Gap | null {
  if (h === null) return { sev: 'mild', marker: null, moment: 'Breakfast \u2014 skipped', title: 'Skipping breakfast leaves your nervous system running on empty', body: 'Vata time activates your mind and nervous system before you wake. By morning they\u2019re already running. With nothing in the system, concentration wavers and energy drops before noon.', truth: 'A small, warm breakfast isn\u2019t about calories. It\u2019s a signal to the nervous system that the day has begun.' };
  if (h <= 9.0) return null;
  return { sev: 'mild', marker: h, moment: 'Breakfast \u2014 ' + hStr(h), title: 'Late breakfast is competing with a system already building toward lunch', body: 'By ' + hStr(h) + ' Pitta is waking up. A heavy breakfast now competes with the digestive fire that should be building toward your biggest meal at noon.', truth: 'Earlier and lighter here. Save the fire for lunch.' };
}

function analyzeLunch(h: number | null): Gap | null {
  if (h === null) return { sev: 'warn', marker: null, moment: 'Lunch \u2014 skipped', title: 'Skipping lunch wastes the one window your body was built for', body: '10AM\u20132PM is your digestive fire at absolute peak. Skip this window and the fire burns through itself. You compensate at dinner \u2014 when the fire is already winding down.', truth: 'Whatever you save skipping lunch, your body takes back at dinner when it can least afford to process it.' };
  if (h >= 11.5 && h <= 13.5) return { sev: 'optimal', marker: h, moment: 'Lunch \u2014 ' + hStr(h), title: 'Lunch at ' + hStr(h) + ' \u2014 right in the window', body: 'Pitta peaks between 10AM and 2PM. ' + hStr(h) + ' is the middle of it. Your digestive fire is at maximum. This meal gets fully processed, absorbed and converted to energy exactly as it should.', truth: 'Make this your biggest meal. Everything you put here, your body handles well.' };
  if (h <= 14.25) return { sev: 'mild', marker: h, moment: 'Lunch \u2014 ' + hStr(h), title: 'Lunch at ' + hStr(h) + ' \u2014 catching the end of the window', body: 'Pitta starts winding down after 2PM. ' + hStr(h) + ' still catches some fire \u2014 but it\u2019s declining, not peaking. You get maybe 70% of the processing you\u2019d get at noon.', truth: '30\u201340 minutes earlier would show up in your afternoon energy.' };
  return { sev: 'warn', marker: h, moment: 'Lunch \u2014 ' + hStr(h), title: 'Lunch at ' + hStr(h) + ' \u2014 eating after the kitchen closed', body: 'The Pitta window closed at 2PM. Lunch at ' + hStr(h) + ' asks your body to process a full meal on a declining fire. What doesn\u2019t process fully gets stored \u2014 not as energy, but as weight and ama.', truth: 'This single shift \u2014 eating your main meal before 2PM \u2014 changes more symptoms than any supplement.' };
}

function analyzeDinner(h: number | null): Gap | null {
  if (h === null) return null;
  const rh = h < 12 ? h + 12 : h;
  if (rh <= 19.25) return { sev: 'optimal', marker: rh, moment: 'Dinner \u2014 ' + hStr(rh), title: 'Dinner at ' + hStr(rh) + ' \u2014 still catching the fire', body: 'Kapha starts at 6PM and brings a natural slowing of digestion. Eating at ' + hStr(rh) + ' catches the very beginning of that transition \u2014 your fire still has capacity. The body processes it, rests well, and begins its repair cycle on schedule.', truth: 'If other timings are aligned, this dinner pattern shows up directly in your sleep quality and how you feel at 7AM.' };
  if (rh <= 20.25) return { sev: 'mild', marker: rh, moment: 'Dinner \u2014 ' + hStr(rh), title: 'Dinner at ' + hStr(rh) + ' \u2014 working with less fire', body: 'By ' + hStr(rh) + ' Kapha has been running for over an hour. Digestive fire is winding down. The food gets processed \u2014 but at 60\u201370% capacity. The heaviness before bed, the coating on your tongue in the morning \u2014 this is where it comes from.', truth: '45 minutes earlier is enough to feel the difference.' };
  if (rh <= 21.25) return { sev: 'warn', marker: rh, moment: 'Dinner \u2014 ' + hStr(rh), title: 'Dinner at ' + hStr(rh) + ' \u2014 the kitchen was already closing', body: 'Your digestive fire has been declining for two hours by ' + hStr(rh) + '. The meal doesn\u2019t process properly \u2014 it sits, ferments, and becomes ama. This is the pattern behind morning heaviness, skin issues, and weight that won\u2019t move.', truth: 'The body doesn\u2019t care how clean the food was. It cares when it arrived.' };
  return { sev: 'warn', marker: rh, moment: 'Dinner \u2014 ' + hStr(rh), title: 'Dinner at ' + hStr(rh) + ' \u2014 your body was preparing to repair, not digest', body: 'By ' + hStr(rh) + ' Pitta\u2019s repair cycle is about to begin. You\u2019re asking a system preparing to restore itself to do digestion instead. The repair gets pushed back. You wake up tired not from bad sleep but from a body that was doing overtime.', truth: 'This is the most common pattern in patients who say everything they try eventually stops working.' };
}

function analyzeWorkout(h: string | null): Gap | null {
  if (h === 'none' || h === null) return null;
  if (h === 'morning') return { sev: 'optimal', marker: 8.0, moment: 'Workout \u2014 Morning', title: 'Morning exercise \u2014 working with your body', body: 'Kapha (6\u201310AM) is when the body is physically strongest and needs movement to clear stagnation. Exercise here ignites digestive fire, clears Kapha heaviness and sets the metabolic tone for the day.', truth: 'The ancient texts called morning movement maintenance, not optional.' };
  if (h === 'afternoon') return null;
  if (h === 'evening') return { sev: 'mild', marker: 19.0, moment: 'Workout \u2014 Evening', title: 'Evening workouts stimulate you when the body wants to wind down', body: 'Kapha (6\u201310PM) is your natural wind-down window. A hard workout at 6\u20138PM spikes cortisol right into it. You feel wired when you should feel settled. Sleep takes longer to arrive.', truth: 'If evenings are all you have, lighter movement \u2014 walk, yoga, stretching \u2014 works with the window instead of against it.' };
  return { sev: 'warn', marker: 21.5, moment: 'Workout \u2014 Late night', title: 'Late training borrows from the window your body uses to repair itself', body: 'After 10PM your body enters its Pitta repair cycle \u2014 rebuilding tissue, processing the day, restoring immunity. Exercise here spikes cortisol directly into that window. Recovery slows. You feel it the next morning.', truth: 'The harder you train at night, the more the body falls behind. It\u2019s a debt that compounds.' };
}

function analyzeSleep(h: number): Gap {
  if (h <= 22.25) return { sev: 'optimal', marker: h, moment: 'Sleep \u2014 ' + hStr(h), title: 'Sleeping at ' + hStr(h) + ' \u2014 the full repair window is yours', body: 'The body\u2019s Pitta repair cycle runs 10PM\u20132AM. Falling asleep at ' + hStr(h) + ' means you\u2019re present for all of it. Tissue rebuilds, the day gets processed, immunity restores \u2014 on schedule. This is why early sleepers wake up different.', truth: 'This window cannot be replicated at midnight. The body does this work now, or it doesn\u2019t do it.' };
  if (h <= 23.25) return { sev: 'mild', marker: h, moment: 'Sleep \u2014 ' + hStr(h), title: 'Sleeping at ' + hStr(h) + ' \u2014 missing the first hour of repair', body: 'The window opened at 10PM. By ' + hStr(h) + ' an hour has passed. You get most of the cycle \u2014 not all. Over weeks, that hour compounds into tiredness you can\u2019t sleep off.', truth: 'You can sleep nine hours and wake up tired if you consistently miss the start of this window.' };
  if (h <= 24.25) return { sev: 'warn', marker: h, moment: 'Sleep \u2014 midnight', title: 'Sleeping at midnight \u2014 two hours of your repair window are already gone', body: 'The Pitta repair window opened at 10PM. By midnight the body has been trying to do this work for two hours while you were still awake, asking it for energy. When you finally sleep, the cycle is already disrupted.', truth: 'This is why eight hours at midnight never feels the same as six hours at 10PM.' };
  return { sev: 'warn', marker: Math.min(h, 25.5), moment: 'Sleep \u2014 After midnight', title: 'After midnight \u2014 most of your body\u2019s repair window is already gone', body: 'The Pitta repair window runs 10PM to 2AM. If you\u2019re sleeping after midnight the best part of the cycle has passed. The fatigue that doesn\u2019t go away with sleep, the immunity that keeps dipping \u2014 these are the symptoms of a consistently missed repair cycle.', truth: 'No supplement, no morning routine and no amount of weekend sleep compensates for what happens between 10PM and 2AM.' };
}

type Data = Record<string, number | string | null>;

function computeGaps(data: Data): Gap[] {
  const gaps: Gap[] = [];
  let g: Gap | null;
  g = analyzeWake(data.wake as number | null); if (g) gaps.push(g);
  g = analyzeBreakfast(data.breakfast as number | null); if (g) gaps.push(g);
  g = analyzeLunch(data.lunch as number | null); if (g) gaps.push(g);
  g = analyzeDinner(data.dinner as number | null); if (g) gaps.push(g);
  g = analyzeWorkout(data.workout as string | null); if (g) gaps.push(g);
  g = analyzeSleep(data.sleep as number); if (g) gaps.push(g);
  return gaps;
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Timeline Component ── */
function Timeline({ data, gaps }: { data: Data; gaps: Gap[] }) {
  const wh = data.workout as string;
  const workoutH = wh === 'morning' ? 8.0 : wh === 'afternoon' ? 15.0 : wh === 'evening' ? 19.0 : wh === 'late' ? 21.5 : null;

  const moments = [
    { h: data.wake as number | null, label: 'Wake', key: 'wake' },
    { h: data.breakfast as number | null, label: 'Breakfast', key: 'breakfast' },
    { h: data.lunch as number | null, label: 'Lunch', key: 'lunch' },
    { h: data.dinner as number | null, label: 'Dinner', key: 'dinner' },
    { h: workoutH, label: 'Workout', key: 'workout' },
    { h: data.sleep as number | null, label: 'Sleep', key: 'sleep' },
  ];

  const resolved: { lp: number; label: string; sev: string }[] = [];
  moments.forEach((m) => {
    if (m.h === null || typeof m.h === 'string') return;
    const rh = m.key === 'dinner' && m.h < 12 ? m.h + 12 : m.h;
    const clamp = Math.min(Math.max(rh, TL_START + 0.3), TL_END - 0.3);
    const lp = ((clamp - TL_START) / TL_SPAN) * 100;
    const found = gaps.find((g) => g.moment?.toLowerCase().includes(m.label.toLowerCase()));
    resolved.push({ lp, label: m.label, sev: found ? found.sev : 'optimal' });
  });

  const rows: number[] = [];
  resolved.forEach((r, i) => {
    let row = 0;
    for (let j = 0; j < i; j++) {
      if (Math.abs(resolved[j].lp - r.lp) < 13) {
        row = rows[j] === 0 ? 1 : 0;
        break;
      }
    }
    rows.push(row);
  });

  const sevColor = (sev: string) => sev === 'optimal' ? '#7BAF95' : sev === 'mild' ? '#C4A882' : '#C47B5A';

  return (
    <div className="bg-ivory border border-charcoal/10 rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-5 sm:p-7 lg:p-8 mb-8 lg:mb-10">
      <div className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-walnut mb-5 lg:mb-6">Your day vs the Ayurvedic clock &mdash; 6AM to 1AM</div>
      {/* Zone labels */}
      <div className="relative h-5 sm:h-6 mb-1">
        {BANDS.map((b, i) => (
          <div key={i} className="absolute text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase whitespace-nowrap" style={{ left: `${((b.from + b.to) / 2 - TL_START) / TL_SPAN * 100}%`, transform: 'translateX(-50%)', color: b.lc }}>{b.dosha}</div>
        ))}
      </div>
      {/* Bar */}
      <div className="relative mb-14 sm:mb-16">
        <div className="relative h-9 sm:h-11 lg:h-12 rounded-xl bg-sand/60 overflow-visible">
          {BANDS.map((b, i) => (
            <div key={i} className="absolute top-0 bottom-0 first:rounded-l-xl last:rounded-r-xl" style={{ left: `${(b.from - TL_START) / TL_SPAN * 100}%`, width: `${(b.to - b.from) / TL_SPAN * 100}%`, background: b.color }} />
          ))}
          {resolved.map((r, i) => (
            <div key={i}>
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-ivory z-[2] shadow-sm" style={{ left: `${r.lp}%`, background: sevColor(r.sev) }} />
              <div className="absolute" style={{ left: `${r.lp}%`, top: '100%', width: '1px', height: rows[i] === 0 ? 18 : 34, background: 'rgba(74,67,64,0.15)', transform: 'translateX(-50%)' }} />
              <div className="absolute text-[9px] sm:text-[10px] font-semibold text-charcoal whitespace-nowrap" style={{ left: `${r.lp}%`, top: `calc(100% + ${rows[i] === 0 ? 20 : 36}px)`, transform: 'translateX(-50%)' }}>{r.label}</div>
            </div>
          ))}
        </div>
        <div className="relative h-5 mt-1.5">
          {TICKS.map((t, i) => (
            <div key={i} className="absolute text-[9px] sm:text-[10px] text-walnut whitespace-nowrap" style={{ left: `${(t.h - TL_START) / TL_SPAN * 100}%`, transform: 'translateX(-50%)' }}>{t.l}</div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center flex-wrap gap-4 sm:gap-6 pt-4 border-t border-charcoal/10">
        {[{ c: '#7BAF95', l: 'Aligned' }, { c: '#C4A882', l: 'Slight gap' }, { c: '#C47B5A', l: 'Significant gap' }].map((leg, i) => (
          <div key={i} className="flex items-center gap-2 text-[10px] sm:text-xs text-walnut">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0" style={{ background: leg.c }} />{leg.l}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Intro pain points for desktop layout ── */
const PAIN_POINTS = [
  {
    big: <>You slept 7 hours.<br />You're still <em className="italic text-forest">tired.</em></>,
    answer: "That's not a sleep problem. That's a timing problem.",
  },
  {
    big: <>You eat well.<br />You still <em className="italic text-forest">bloat.</em></>,
    answer: <>Not what you're eating. <strong className="text-charcoal font-medium">When</strong> you're eating it.</>,
  },
  {
    big: <>3PM hits.<br />You <em className="italic text-forest">crash.</em></>,
    answer: <>Every single day. Like clockwork. Because it <strong className="text-charcoal font-medium">is</strong> a clock.</>,
  },
];

/* ── Main Section ── */
export function DinacharyaSection() {
  const [view, setView] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [cur, setCur] = useState(0);
  const [data, setData] = useState<Data>({});
  const [animDir, setAnimDir] = useState<'in' | 'out'>('in');
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const startQuiz = () => {
    setCur(0);
    setData({});
    setView('quiz');
    setTimeout(scrollToTop, 100);
  };

  const pick = (h: number | string | null, key: string) => {
    setAnimDir('out');
    setTimeout(() => {
      setData((prev) => ({ ...prev, [key]: h }));
      if (cur < QS.length - 1) {
        setCur((c) => c + 1);
      } else {
        setData((prev) => {
          const final = { ...prev, [key]: h };
          setTimeout(() => {
            setView('result');
            setTimeout(scrollToTop, 100);
          }, 50);
          return final;
        });
      }
      setAnimDir('in');
    }, 240);
  };

  const reset = () => {
    setCur(0);
    setData({});
    setView('intro');
    setTimeout(scrollToTop, 100);
  };

  const gaps = view === 'result' ? computeGaps(data) : [];
  const warns = gaps.filter((g) => g.sev === 'warn').length;
  const milds = gaps.filter((g) => g.sev === 'mild').length;

  const resultSub = warns >= 2
    ? 'Several of your daily timings are running against your body\u2019s natural clock. The symptoms you\u2019ve been trying to explain are most likely connected to these specific moments.'
    : milds >= 2
      ? 'A few of your timings are slightly off. These are not large gaps \u2014 but consistent ones, and consistency is what creates the symptoms that feel impossible to pin down.'
      : 'Your daily rhythm is largely aligned. The gaps below are small \u2014 but naming them precisely is what changes the remaining symptoms.';

  const closingText = warns >= 2
    ? 'These patterns are not permanent. They are just habits formed without a map. Understanding which window to protect first \u2014 and in what order \u2014 is the difference between trying things and things actually working.'
    : milds >= 2
      ? 'What Ayurveda offers is not a harder routine. It is a different relationship with time. Your body already knows how to heal. It needs the right timing to do it.'
      : 'Your rhythm is close. Precise, small adjustments to timing \u2014 not more supplements, not more effort \u2014 are what close the remaining gap.';

  const badGaps = gaps.filter((g) => g.sev !== 'optimal').slice(0, 3).map((g) => g.moment);
  const waMsg = encodeURIComponent('Hi Dr. Aparna! I used the Body Clock calculator on your website. The gaps it found were: ' + (badGaps.length ? badGaps.join(', ') : 'a few small ones') + '. I would love to understand what to do about these.');
  const waHref = `https://wa.me/${WA}?text=${waMsg}`;

  const q = QS[cur];

  return (
    <section ref={containerRef} id="body-clock" className="py-16 sm:py-24 lg:py-32 bg-sand/40 relative overflow-hidden" aria-label="Dinacharya Body Clock Calculator">
      {/* Subtle bg pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #4A4340 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* ════════════════════════════════════════════
            INTRO — Two-column on desktop
        ════════════════════════════════════════════ */}
        {view === 'intro' && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            {/* Section header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <div className="divider-leaf justify-center text-forest mb-6 sm:mb-8">
                <span className="text-forest text-xs tracking-[0.2em] uppercase font-medium">Your Body Clock</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-charcoal font-medium leading-tight mb-4 sm:mb-6">
                Your body runs on a<br className="hidden sm:block" /> 5,000-year-old <span className="text-forest italic">rhythm.</span>
              </h2>
              <p className="text-base sm:text-lg text-charcoal font-light leading-relaxed max-w-2xl mx-auto">
                Most symptoms aren't random. They're timing problems. Take 2 minutes to map your day against the Ayurvedic clock and see where the gaps are.
              </p>
            </div>

            {/* Pain points — cards on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14 lg:mb-16">
              {PAIN_POINTS.map((point, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="group p-6 sm:p-8 lg:p-10 bg-ivory rounded-[2rem_0.75rem_2rem_0.75rem] border border-charcoal/5 hover:border-forest/20 transition-all duration-500 hover:shadow-lg hover:shadow-forest/5"
                >
                  <span className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold leading-[1.1] text-charcoal block mb-4">
                    {point.big}
                  </span>
                  <div className="w-8 h-px bg-charcoal/10 mb-4" />
                  <span className="text-sm sm:text-[15px] text-walnut leading-relaxed block">{point.answer}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                onClick={startQuiz}
                className="btn-leaf btn-glow group inline-flex items-center justify-center gap-3 px-10 sm:px-14 py-4 sm:py-5 bg-charcoal text-ivory font-medium text-sm sm:text-[15px] tracking-[0.06em] shadow-lg shadow-charcoal/10 hover:shadow-xl hover:shadow-charcoal/20"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Map my day &rarr;
                </span>
              </button>
              <p className="text-xs sm:text-sm text-walnut mt-3 sm:mt-4">6 questions &middot; 2 minutes &middot; No email required</p>
            </div>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════
            QUIZ — Centered card, wider on desktop
        ════════════════════════════════════════════ */}
        {view === 'quiz' && (
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={animDir === 'in' ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: animDir === 'in' ? 0.35 : 0.25 }}
            >
              {/* Card wrapper */}
              <div className="bg-ivory rounded-[2rem_0.75rem_2rem_0.75rem] border border-charcoal/5 p-6 sm:p-10 lg:p-12 shadow-sm">
                {/* Progress */}
                <div className="flex items-center gap-4 mb-8 sm:mb-10">
                  <div className="flex-1 h-0.5 sm:h-1 bg-charcoal/10 rounded-full overflow-hidden">
                    <div className="h-full bg-forest rounded-full transition-all duration-500" style={{ width: `${((cur + 1) / QS.length) * 100}%` }} />
                  </div>
                  <span className="text-xs sm:text-sm text-walnut whitespace-nowrap font-medium">{cur + 1} / {QS.length}</span>
                </div>

                <div className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-forest mb-3 font-medium">{q.step}</div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium italic leading-[1.2] text-charcoal mb-2 sm:mb-3">{q.q}</h3>
                <p className="text-sm sm:text-[15px] text-walnut leading-relaxed mb-6 sm:mb-8">{q.sub}</p>

                {/* Options grid — 2 cols mobile, 3 cols on sm+ for 5 opts, 2 cols for 4 opts */}
                <div className={`grid gap-3 sm:gap-4 ${q.opts.length <= 4 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                  {q.opts.map((opt, i) => {
                    const isLast = i === q.opts.length - 1;
                    const isOdd = q.opts.length % 2 !== 0;
                    const isFiveOpt = q.opts.length === 5;
                    // On mobile: last odd item spans full. On sm+: last item of 5 spans remaining cols
                    const spanClass = isFiveOpt && isLast
                      ? 'col-span-2 sm:col-span-1'
                      : isOdd && isLast && !isFiveOpt
                        ? 'col-span-2'
                        : '';
                    return (
                      <button
                        key={i}
                        onClick={() => pick(opt.h, q.key)}
                        className={`group bg-sand/40 border border-charcoal/8 rounded-[1rem_0.4rem_1rem_0.4rem] py-3.5 sm:py-4 px-4 sm:px-5 text-left transition-all duration-200 hover:border-forest hover:bg-forest/5 hover:-translate-y-1 hover:shadow-md hover:shadow-forest/5 ${spanClass}`}
                      >
                        <span className="block font-semibold text-[15px] sm:text-base text-charcoal mb-0.5 group-hover:text-forest transition-colors duration-300">{opt.lbl}</span>
                        <span className="text-[11px] sm:text-xs text-walnut leading-relaxed">{opt.note}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            RESULT — Full width desktop layout
        ════════════════════════════════════════════ */}
        {view === 'result' && (
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

            {/* Header */}
            <div className="text-center mb-10 sm:mb-14 lg:mb-16">
              <div className="text-[10px] sm:text-xs tracking-[0.22em] uppercase text-forest mb-4 font-medium">Your Dinacharya Report</div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl font-semibold leading-[1.1] text-charcoal mb-4 sm:mb-6">
                Your day, mapped against<br className="hidden sm:block" /> your body's <em className="italic text-forest">clock.</em>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-walnut leading-relaxed max-w-2xl mx-auto">{resultSub}</p>
            </div>

            {/* Timeline — full width */}
            <Timeline data={data} gaps={gaps} />

            {/* Gap cards — 2 cols on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-8 lg:mb-10">
              {gaps.map((g, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className={`rounded-[1.5rem_0.5rem_1.5rem_0.5rem] p-6 sm:p-8 relative overflow-hidden ${g.sev === 'optimal' ? 'bg-ivory border border-charcoal/10' : 'bg-charcoal'}`}
                >
                  {g.sev !== 'optimal' && (
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top right, rgba(123,175,149,0.14) 0%, transparent 60%)' }} />
                  )}
                  <div className="relative">
                    <div className={`text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-3 ${g.sev === 'optimal' ? 'text-forest' : 'text-forest/80'}`}>{g.moment}</div>
                    <div className={`font-serif text-xl sm:text-2xl font-bold leading-[1.2] mb-3 sm:mb-4 ${g.sev === 'optimal' ? 'text-charcoal' : 'text-ivory'}`}>{g.title}</div>
                    <div className={`text-[13px] sm:text-sm leading-relaxed mb-4 ${g.sev === 'optimal' ? 'text-walnut' : 'text-ivory/60'}`}>{g.body}</div>
                    <div className={`font-serif italic text-[15px] sm:text-base leading-relaxed pt-4 border-t ${g.sev === 'optimal' ? 'text-forest border-forest/15' : 'text-forest border-forest/20'}`}>{g.truth}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Closing */}
            <div className="border-l-[3px] border-forest bg-forest/5 rounded-r-[1rem] py-6 px-6 sm:py-8 sm:px-8 lg:py-10 lg:px-10 mb-8 lg:mb-10 max-w-3xl mx-auto">
              <div className="text-[10px] sm:text-xs tracking-[0.18em] uppercase text-forest mb-3 font-medium">What this means</div>
              <div className="font-serif italic text-lg sm:text-xl lg:text-2xl text-charcoal leading-relaxed">{closingText}</div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-leaf btn-glow group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-4 sm:py-5 px-8 sm:px-10 bg-[#25D366] text-white font-medium text-sm sm:text-[15px] tracking-[0.04em] shadow-lg shadow-[#25D366]/20 hover:shadow-xl"
              >
                <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                Talk to Dr. Aparna
              </a>
              <button
                onClick={reset}
                className="btn-leaf group w-full sm:w-auto inline-flex items-center justify-center py-4 sm:py-5 px-8 sm:px-10 bg-transparent text-charcoal border-2 border-charcoal/15 font-medium text-sm tracking-[0.06em] hover:border-forest hover:text-forest"
              >
                Start over
              </button>
            </div>
            <div className="text-center text-[11px] sm:text-xs text-walnut mt-6">theayurvedadoc.com &middot; Dr. Aparna Albert</div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
