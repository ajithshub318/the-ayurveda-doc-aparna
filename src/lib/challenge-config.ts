// Central config registry for all challenge types
// The challenge `type` field in the DB drives everything

export interface ChecklistItem {
  key: string;
  label: string;
  icon: string;
}

export interface AssessmentCategory {
  key: string;
  label: string;
  options: string[];
}

export interface ChallengeTheme {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  gradient: string;
}

export interface ChallengeConfig {
  type: string;
  label: string;
  tagline: string;
  heroIcon: string;

  theme: ChallengeTheme;

  // Landing page
  landing: {
    heroTitle: string;
    heroSubtitle: string;
    heroEmojis?: string[];
    benefitsSectionTitle?: string;
    quote?: { text: string; author: string };
    benefits: Array<{ icon: string; title: string; desc: string }>;
    signupButtonText: string;
  };

  checklistItems: ChecklistItem[];
  assessmentCategories: AssessmentCategory[];

  dailyTips: Record<number, string>;
  defaultTip: (day: number) => string;

  // Progress page
  progress: {
    extraStats?: Array<{ key: string; label: string }>;
    completionMessage: string;
    ctaText: string;
  };

  computeSpecialMetrics?: (entries: any[]) => Record<string, number>;
}

// ==================== HEALTH CHALLENGE ====================
const healthConfig: ChallengeConfig = {
  type: 'health',
  label: '21-Day Health Challenge',
  tagline: 'Build healthy habits that stick — one day at a time.',
  heroIcon: '🌿',

  theme: {
    primary: '#7BA787',
    primaryDark: '#6B9575',
    primaryLight: '#E8F0EA',
    gradient: 'linear-gradient(135deg, #7BA787 0%, #6B9575 100%)',
  },

  landing: {
    heroTitle: 'Transform Your Health.\nOne Day at a Time.',
    heroSubtitle: 'A guided 21-day Ayurvedic wellness program to build habits that heal — designed by Dr. Aparna Albert.',
    heroEmojis: ['🌿', '🧘', '💧', '☀️', '🌙'],
    benefitsSectionTitle: 'Why Join?',
    quote: {
      text: 'Health is not just the absence of disease. It is the presence of vitality.',
      author: 'Dr. Aparna Albert',
    },
    benefits: [
      { icon: '☀️', title: 'Better Mornings', desc: 'Wake up refreshed and energized' },
      { icon: '🍲', title: 'Mindful Eating', desc: 'Nourish your body with home-cooked meals' },
      { icon: '🚶', title: 'Active Lifestyle', desc: 'Build a consistent exercise routine' },
      { icon: '💧', title: 'Hydration', desc: 'Stay well-hydrated throughout the day' },
      { icon: '📖', title: 'Growth', desc: 'Learn something new every day' },
      { icon: '🌙', title: 'Better Sleep', desc: 'Reset your sleep cycle naturally' },
    ],
    signupButtonText: 'Start My 21-Day Health Challenge',
  },

  checklistItems: [
    { key: 'wokeUpOnTime', label: 'Woke up on time', icon: '☀️' },
    { key: 'drankWater', label: 'Drank 3+ litres of water', icon: '💧' },
    { key: 'exercised', label: 'Exercised or walked 30+ mins', icon: '🚶' },
    { key: 'ateHomeCooked', label: 'Ate home-cooked meals', icon: '🍲' },
    { key: 'avoidedProcessed', label: 'Avoided processed/packaged food', icon: '🚫' },
    { key: 'noSugar', label: 'No sugar', icon: '🍬' },
    { key: 'readOrLearned', label: 'Read or learned something new', icon: '📖' },
    { key: 'sleptBefore10', label: 'Slept before 10 PM', icon: '🌙' },
  ],

  assessmentCategories: [
    { key: 'energy', label: 'Energy', options: ['Low', 'Okay', 'Good', 'Great'] },
    { key: 'mood', label: 'Mood', options: ['Low', 'Okay', 'Good', 'Great'] },
    { key: 'sleepQuality', label: 'Sleep Quality', options: ['Low', 'Okay', 'Good', 'Great'] },
    { key: 'cravings', label: 'Cravings', options: ['Intense', 'Strong', 'Mild', 'None'] },
  ],

  dailyTips: {
    1: 'Start simple. Focus on just waking up on time and drinking enough water today.',
    7: 'One week in! Your body is already adjusting to the new rhythm.',
    14: 'Two weeks! The habits are becoming second nature. Keep going.',
    21: 'You did it! These 21 days have planted seeds that will grow for life.',
  },
  defaultTip: (day: number) => {
    if (day <= 7) return 'Focus on building one habit at a time. Small wins compound.';
    if (day <= 14) return 'You\'re past the hardest part. Your body is adapting beautifully.';
    return 'Home stretch! Think about which habits you want to carry forward.';
  },

  progress: {
    completionMessage: 'Health Challenge Complete!',
    ctaText: 'Connect with Dr. Aparna for personalized Ayurvedic guidance.',
  },
};

// ==================== SUGAR CUT CHALLENGE ====================
const sugarCutConfig: ChallengeConfig = {
  type: 'sugar_cut',
  label: '21-Day Sugar Cut Challenge',
  tagline: 'Break free from sugar dependency — the Ayurvedic way.',
  heroIcon: '🍬',

  theme: {
    primary: '#E07A5F',
    primaryDark: '#C45B4A',
    primaryLight: '#FAD9D1',
    gradient: 'linear-gradient(135deg, #E07A5F 0%, #C45B4A 100%)',
  },

  landing: {
    heroTitle: 'Cut the Sugar.\nFeel the Difference.',
    heroSubtitle: 'A simple, guided 21-day program to break free from sugar dependency — the Ayurvedic way.',
    heroEmojis: ['🍬', '🍭', '🍩', '🍰', '🍦'],
    benefitsSectionTitle: 'Why Cut Sugar?',
    quote: {
      text: "Sugar doesn't just add weight — it disrupts your entire body clock.",
      author: 'Dr. Aparna Albert',
    },
    benefits: [
      { icon: '🔥', title: 'Better Energy', desc: 'Stable energy all day without crashes' },
      { icon: '😴', title: 'Deeper Sleep', desc: 'Fall asleep faster and wake refreshed' },
      { icon: '🧠', title: 'Mental Clarity', desc: 'Sharper focus and reduced brain fog' },
      { icon: '💪', title: 'Less Inflammation', desc: 'Reduced bloating and joint pain' },
      { icon: '✨', title: 'Clearer Skin', desc: 'Fewer breakouts and a natural glow' },
      { icon: '⚖️', title: 'Healthy Weight', desc: 'Natural weight loss without dieting' },
    ],
    signupButtonText: 'Start My 21-Day Sugar Cut',
  },

  checklistItems: [
    { key: 'noSugarInDrinks', label: 'No added sugar in tea/coffee/milk', icon: '☕' },
    { key: 'noSugaryDrinks', label: 'No soda, packaged juice, or energy drinks', icon: '🥤' },
    { key: 'noSweets', label: 'No sweets, desserts, or mithai', icon: '🍰' },
    { key: 'noPackagedSnacks', label: 'No packaged snacks with hidden sugar', icon: '📦' },
    { key: 'readLabels', label: 'Read a food label before eating', icon: '🏷️' },
    { key: 'ateFruit', label: 'Ate a fresh fruit when craving sugar', icon: '🍎' },
    { key: 'drankWater', label: 'Drank 8+ glasses of water', icon: '💧' },
    { key: 'homeCookedMeals', label: 'Ate home-cooked meals', icon: '🍲' },
  ],

  assessmentCategories: [
    { key: 'energy', label: 'Energy Level', options: ['Low', 'Okay', 'Good', 'Great'] },
    { key: 'cravings', label: 'Sugar Cravings', options: ['Intense', 'Strong', 'Mild', 'None'] },
    { key: 'mood', label: 'Mood', options: ['Low', 'Okay', 'Good', 'Great'] },
    { key: 'sleepQuality', label: 'Sleep Quality', options: ['Low', 'Okay', 'Good', 'Great'] },
  ],

  dailyTips: {
    1: "Day 1 is the hardest. Your body is used to sugar spikes. Drink warm water with lemon when cravings hit.",
    2: "Headaches today? That's withdrawal. It means it's working. Sip ginger tea.",
    3: "By day 3, your taste buds start adjusting. Natural foods will start tasting sweeter.",
    4: "Add a pinch of cinnamon to your morning drink — it naturally curbs sugar cravings.",
    5: "You've completed almost a week! Your insulin levels are already stabilizing.",
    6: "Craving something sweet? Try dates or a banana — nature's candy.",
    7: "One week done! Your gut bacteria are already shifting to healthier varieties.",
    8: "Notice how your afternoon energy crash is fading? That's stable blood sugar.",
    9: "Chew on fennel seeds after meals — an Ayurvedic trick to satisfy the sweet taste.",
    10: "You're in the double digits! Your skin may already be looking clearer.",
    11: "Your body is now burning fat more efficiently without constant sugar interference.",
    12: "Halfway mark is close. Journal how you feel compared to Day 1.",
    13: "Try jaggery if you must sweeten something — it's minimally processed and mineral-rich.",
    14: "Two weeks! You've broken the hardest part of the sugar cycle.",
    15: "Your palate has changed. Fruits now taste incredibly sweet, don't they?",
    16: "Ayurveda says the sweet taste (madhura rasa) should come from whole foods, not refined sugar.",
    17: "Notice better digestion? Sugar disrupts gut health — you're healing it.",
    18: "Almost there. Your inflammation markers are likely dropping significantly.",
    19: "Three days to go. Think about which habits you want to keep permanently.",
    20: "Penultimate day. You've proven that you don't need sugar to feel good.",
    21: "Final day! You did it. Take a moment to celebrate this transformation.",
  },
  defaultTip: (day: number) => {
    if (day <= 7) return 'Focus on removing obvious sugar sources. Drink plenty of warm water.';
    if (day <= 14) return 'Your body is adapting. Replace sugar with natural alternatives like fruits.';
    return "You're in the home stretch. Notice how much better you feel without sugar.";
  },

  progress: {
    extraStats: [{ key: 'sugarFreeDays', label: 'Sugar-Free' }],
    completionMessage: 'Sugar Cut Challenge Complete!',
    ctaText: 'Connect with Dr. Aparna for personalized Ayurvedic advice on your sugar-free journey.',
  },

  computeSpecialMetrics: (entries: any[]) => {
    let sugarFreeDays = 0;
    for (const entry of entries) {
      const cl = entry.checklist_data;
      if (cl && cl.noSugarInDrinks && cl.noSugaryDrinks && cl.noSweets && cl.noPackagedSnacks) {
        sugarFreeDays++;
      }
    }
    return { sugarFreeDays };
  },
};

// ==================== REGISTRY ====================
const configs: Record<string, ChallengeConfig> = {
  health: healthConfig,
  sugar_cut: sugarCutConfig,
};

export function getChallengeConfig(type: string): ChallengeConfig {
  return configs[type] || healthConfig;
}

export function getAllChallengeTypes(): Array<{ type: string; label: string }> {
  return Object.values(configs).map((c) => ({ type: c.type, label: c.label }));
}

export function getDailyTip(config: ChallengeConfig, day: number): string {
  return config.dailyTips[day] || config.defaultTip(day);
}
