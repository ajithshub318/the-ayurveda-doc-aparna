import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveChallenges, signUp, login } from '../../lib/my21-actions';
import { getChallengeConfig, type ChallengeConfig } from '../../lib/challenge-config';
import logoImg from '../../assets/logo.png';
import './my21.css';

// ==================== PIN Input ====================
function PinInput({ value, onChange, disabled, accentColor }: {
  value: string; onChange: (v: string) => void; disabled?: boolean; accentColor: string;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(4, '').split('').slice(0, 4);

  const handleChange = (index: number, char: string) => {
    if (!/^\d?$/.test(char)) return;
    const newDigits = [...digits];
    newDigits[index] = char;
    onChange(newDigits.join(''));
    if (char && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    onChange(pasted);
    inputRefs.current[Math.min(pasted.length, 3)]?.focus();
  };

  return (
    <div className="flex gap-2">
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          className="w-10 h-12 text-center text-xl font-semibold font-headline bg-stone-50 border-2 border-stone-200 rounded-lg outline-none transition-all duration-200 focus:scale-105"
          type="text" inputMode="numeric" maxLength={1}
          value={digits[i] || ''} disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          style={{ color: '#2C2C2C' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.boxShadow = `0 0 0 4px ${accentColor}1a`; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = '#e7e5e4'; e.currentTarget.style.boxShadow = 'none'; }}
        />
      ))}
    </div>
  );
}

// ==================== Auth Modal ====================
function AuthModal({ open, onClose, config, theme, onSuccess }: {
  open: boolean;
  onClose: () => void;
  config: ChallengeConfig;
  theme: ChallengeConfig['theme'];
  onSuccess: (userId: string, name: string, challengeId: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [pin, setPin] = useState('');
  const [day1Weight, setDay1Weight] = useState('');
  const [loginWhatsapp, setLoginWhatsapp] = useState('');
  const [loginPin, setLoginPin] = useState('');

  // Get challengeId from parent via config — we need it from the selected challenge
  // We'll receive it via a data attribute or prop. For now, use a ref approach.

  if (!open) return null;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!whatsapp.trim()) { setError('Please enter your WhatsApp number.'); return; }
    if (pin.length !== 4) { setError('Please enter a 4-digit PIN.'); return; }

    setLoading(true);
    try {
      const result = await signUp({
        name: name.trim(),
        email: email.trim() || undefined,
        whatsapp: whatsapp.trim(),
        pin,
        challengeId: (config as any)._challengeId,
        day1Weight: day1Weight ? parseFloat(day1Weight) : undefined,
      });
      if ('error' in result && result.error) {
        setError(result.error);
      } else if ('success' in result && result.success && result.userId) {
        onSuccess(result.userId, name.trim(), (config as any)._challengeId);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!loginWhatsapp.trim()) { setError('Please enter your WhatsApp number.'); return; }
    if (loginPin.length !== 4) { setError('Please enter your 4-digit PIN.'); return; }

    setLoading(true);
    try {
      const result = await login({
        whatsapp: loginWhatsapp.trim(),
        pin: loginPin,
        challengeId: (config as any)._challengeId,
      });
      if ('error' in result && result.error) {
        setError(result.error);
      } else if ('success' in result && result.success && result.userId) {
        onSuccess(result.userId, result.name || '', (config as any)._challengeId);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.15)] w-full max-w-md overflow-hidden animate-[my21ScaleIn_0.3s_ease-out]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors z-10"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

        {/* Tabs */}
        <div className="flex text-center border-b border-stone-100">
          <button
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              activeTab === 'signup' ? 'border-b-2' : 'font-medium text-[#8A8778] hover:text-[#2C2C2C]'
            }`}
            style={activeTab === 'signup' ? { borderColor: theme.primary, color: theme.primary } : {}}
            onClick={() => { setActiveTab('signup'); setError(''); }}
          >
            Sign Up
          </button>
          <button
            className={`flex-1 py-4 text-sm font-bold transition-colors ${
              activeTab === 'login' ? 'border-b-2' : 'font-medium text-[#8A8778] hover:text-[#2C2C2C]'
            }`}
            style={activeTab === 'login' ? { borderColor: theme.primary, color: theme.primary } : {}}
            onClick={() => { setActiveTab('login'); setError(''); }}
          >
            Log In
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="bg-[#FDF0EE] text-[#C45B4A] px-4 py-3 rounded-lg text-sm leading-relaxed">
              {error}
            </div>
          )}

          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-[#8A8778] uppercase tracking-wider mb-1 px-1">Full Name *</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Your name" disabled={loading}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  onFocus={(e) => { e.currentTarget.style.borderColor = theme.primary; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#e7e5e4'; }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-[#8A8778] uppercase tracking-wider mb-1 px-1">Email (Optional)</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="hello@email.com" disabled={loading}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                    onFocus={(e) => { e.currentTarget.style.borderColor = theme.primary; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#e7e5e4'; }}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#8A8778] uppercase tracking-wider mb-1 px-1">WhatsApp No. *</label>
                  <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 7012345678" disabled={loading}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                    onFocus={(e) => { e.currentTarget.style.borderColor = theme.primary; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#e7e5e4'; }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8A8778] uppercase tracking-wider mb-1 px-1">4-Digit PIN *</label>
                <PinInput value={pin} onChange={setPin} disabled={loading} accentColor={theme.primary} />
                <p className="text-[9px] text-[#8A8778] mt-1 px-1">You'll use this to log in daily</p>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8A8778] uppercase tracking-wider mb-1 px-1">Weight (Optional)</label>
                <input type="number" value={day1Weight} onChange={(e) => setDay1Weight(e.target.value)}
                  placeholder="e.g. 72.5 kg" disabled={loading} step="0.1"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  onFocus={(e) => { e.currentTarget.style.borderColor = theme.primary; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#e7e5e4'; }}
                />
              </div>
              <button type="submit" disabled={loading}
                className="w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 duration-150"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 10px 15px -3px ${theme.primary}33`,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = theme.primaryDark; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; }}
              >
                {loading ? 'Joining...' : config.landing.signupButtonText}
              </button>
              <p className="text-[10px] text-center text-[#8A8778]">
                By signing up, you agree to our terms and wellness guidelines.
              </p>
            </form>
          )}

          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[10px] font-bold text-[#8A8778] uppercase tracking-wider mb-1 px-1">WhatsApp Number</label>
                <input type="tel" value={loginWhatsapp} onChange={(e) => setLoginWhatsapp(e.target.value)}
                  placeholder="+91 7012345678" disabled={loading}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-3 text-sm outline-none transition-colors"
                  onFocus={(e) => { e.currentTarget.style.borderColor = theme.primary; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#e7e5e4'; }}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-[#8A8778] uppercase tracking-wider mb-1 px-1">Your 4-Digit PIN</label>
                <div className="flex justify-center">
                  <PinInput value={loginPin} onChange={setLoginPin} disabled={loading} accentColor={theme.primary} />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 duration-150"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: `0 10px 15px -3px ${theme.primary}33`,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = theme.primaryDark; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; }}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== Challenge Picker ====================
function ChallengePicker({ challenges, configs, onSelect }: {
  challenges: any[];
  configs: ChallengeConfig[];
  onSelect: (challenge: any, config: ChallengeConfig) => void;
}) {
  return (
    <div className="my21-page min-h-screen pb-20">
      <header className="bg-[#FAF7F2] sticky top-0 z-50 border-b border-stone-100">
        <div className="flex items-center gap-3 px-6 py-4 max-w-5xl mx-auto">
          <img src={logoImg} alt="The Ayurveda Doc" className="w-9 h-9 rounded-full object-cover" />
          <span className="font-headline text-lg font-bold text-[#E07A5F]">The Ayurveda Doc</span>
        </div>
      </header>
      <div className="max-w-3xl mx-auto px-6 pt-12 text-center">
        <h1 className="font-headline text-3xl font-bold text-[#2C2C2C] mb-2">My21</h1>
        <p className="text-[15px] text-[#8A8778] mb-2">21-Day Challenges by The Ayurveda Doc</p>
        <p className="text-sm text-[#4A4A4A] mb-9 leading-relaxed">Choose a challenge to begin your wellness journey</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {challenges.map((ch) => {
            const config = configs.find((c) => c.type === ch.type) || configs[0];
            return (
              <div key={ch.id}
                className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-7 text-left cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-200"
                onClick={() => onSelect(ch, config)}
                style={{ borderLeft: `5px solid ${config.theme.primary}` }}
              >
                <div className="text-4xl mb-3">{config.heroIcon}</div>
                <h2 className="font-headline text-xl font-semibold text-[#2C2C2C] mb-2">{ch.name}</h2>
                <p className="text-sm text-[#8A8778] mb-3 leading-relaxed">{ch.description || config.tagline}</p>
                <div className="text-[13px] font-semibold" style={{ color: config.theme.primary }}>
                  {ch.duration} days &rarr; Join Now
                </div>
              </div>
            );
          })}
        </div>
        <a href="/" className="inline-block mt-8 text-[13px] text-[#8A8778] hover:text-[#E07A5F] transition-colors">
          &larr; Back to The Ayurveda Doc
        </a>
      </div>
    </div>
  );
}

// ==================== Main Landing ====================
export default function My21Landing() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Challenge state
  const [activeChallenges, setActiveChallenges] = useState<any[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<any | null>(null);
  const [config, setConfig] = useState<ChallengeConfig | null>(null);

  useEffect(() => {
    const init = async () => {
      const existingUserId = sessionStorage.getItem('my21_user_id');
      if (existingUserId) { navigate('/my21/today'); return; }
      try {
        const challenges = await getActiveChallenges();
        setActiveChallenges(challenges);
        if (challenges.length === 1) {
          setSelectedChallenge(challenges[0]);
          setConfig(getChallengeConfig(challenges[0].type));
        }
      } catch { /* No challenges */ }
      setPageLoading(false);
    };
    init();
  }, [navigate]);

  const handleSelectChallenge = (challenge: any, cfg: ChallengeConfig) => {
    setSelectedChallenge(challenge);
    setConfig(cfg);
  };

  const handleAuthSuccess = (userId: string, name: string, challengeId: string) => {
    sessionStorage.setItem('my21_user_id', userId);
    if (name) sessionStorage.setItem('my21_user_name', name);
    sessionStorage.setItem('my21_challenge_id', challengeId);
    navigate('/my21/today');
  };

  if (pageLoading) {
    return (
      <div className="my21-loading">
        <div className="my21-loading-spinner" />
        Loading...
      </div>
    );
  }

  if (activeChallenges.length === 0) {
    return (
      <div className="my21-page min-h-screen flex items-center justify-center text-center px-5">
        <div>
          <h1 className="font-headline text-3xl font-bold text-[#2C2C2C] mb-3">My21</h1>
          <p className="text-[#8A8778] text-[15px] mb-6">No active challenges at the moment. Check back soon!</p>
          <a href="/" className="text-[#7BA787] text-sm font-medium hover:opacity-80 transition-opacity">&larr; Back to The Ayurveda Doc</a>
        </div>
      </div>
    );
  }

  if (!selectedChallenge) {
    const configs = activeChallenges.map((ch) => getChallengeConfig(ch.type));
    return <ChallengePicker challenges={activeChallenges} configs={configs} onSelect={handleSelectChallenge} />;
  }

  if (!config) return null;
  const theme = config.theme;
  const heroEmojis = config.landing.heroEmojis || [config.heroIcon];
  const benefitsTitle = config.landing.benefitsSectionTitle || 'What Happens in 21 Days';
  const checklistCount = config.checklistItems.length;

  // Attach challengeId to config for the modal
  const configWithId = { ...config, _challengeId: selectedChallenge.id } as any;

  return (
    <div className="my21-page min-h-screen">

      {/* ===== Top App Bar ===== */}
      <header className="bg-[#FAF7F2] sticky top-0 z-50 border-b border-stone-100">
        <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="The Ayurveda Doc" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-headline text-lg font-bold" style={{ color: theme.primary }}>The Ayurveda Doc</span>
          </div>
          <button
            onClick={() => setShowAuthModal(true)}
            className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: theme.primary }}
          >
            Join Challenge
          </button>
        </div>
      </header>

      <main className="overflow-x-hidden">

        {/* ===== Hero Section (full width) ===== */}
        <section
          className="relative px-6 pt-16 pb-20 overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryDark} 100%)` }}
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none select-none text-4xl flex flex-wrap gap-8 p-4">
            {heroEmojis.map((emoji, i) => (<span key={i}>{emoji}</span>))}
          </div>
          <div className="absolute -right-12 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center md:text-left">
            <span className="inline-block text-[10px] font-bold tracking-widest px-3 py-1 rounded-full mb-5 font-body"
              style={{ backgroundColor: theme.primaryLight || '#FAD9D1', color: theme.primaryDark }}>
              21-DAY CHALLENGE
            </span>
            <h1 className="font-headline text-4xl md:text-5xl leading-tight text-white font-bold mb-5 whitespace-pre-line">
              {config.landing.heroTitle}
            </h1>
            <p className="text-white/90 text-base md:text-lg leading-relaxed mb-6 font-body max-w-xl">
              {config.landing.heroSubtitle}
            </p>
            <p className="text-white/70 text-sm font-medium font-body italic mb-8">
              by Dr. Aparna Albert — The Ayurveda Doc
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all active:scale-95 duration-150 text-base"
              style={{ color: theme.primary }}
            >
              {config.landing.signupButtonText} &rarr;
            </button>
          </div>
        </section>

        {/* ===== Quote Card (overlaps hero) ===== */}
        {config.landing.quote && (
          <section className="px-6 -mt-8 relative z-20 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-[#D4A843]/20">
              <p className="font-headline italic text-[#2C2C2C] text-lg leading-snug mb-2">
                &ldquo;{config.landing.quote.text}&rdquo;
              </p>
              <p className="text-[#8A8778] text-xs font-bold uppercase tracking-wider">
                &mdash; {config.landing.quote.author}
              </p>
            </div>
          </section>
        )}

        {/* Back to picker */}
        {activeChallenges.length > 1 && (
          <div className="px-6 pt-4 text-center">
            <button onClick={() => { setSelectedChallenge(null); setConfig(null); }}
              className="text-[13px] text-[#8A8778] hover:text-[#E07A5F] transition-colors bg-transparent border-none cursor-pointer">
              &larr; Choose a different challenge
            </button>
          </div>
        )}

        {/* ===== Benefits Grid ===== */}
        <section className="px-6 py-14 max-w-4xl mx-auto">
          <h2 className="font-headline text-2xl md:text-3xl font-bold mb-8 text-center text-[#2C2C2C]">{benefitsTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {config.landing.benefits.map((b, i) => (
              <div key={b.title}
                className="bg-white p-5 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200"
                style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="text-3xl mb-3">{b.icon}</span>
                <h3 className="font-bold text-sm text-[#2C2C2C]">{b.title}</h3>
                <p className="text-[11px] text-[#8A8778] leading-tight mt-1">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Daily Checklist Preview ===== */}
        <section className="px-6 py-10 bg-[#F0EBE3]/30">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-end mb-6">
              <h2 className="font-headline text-2xl font-bold text-[#2C2C2C]">Your Daily Companion</h2>
              <span className="text-[10px] font-bold" style={{ color: theme.primary }}>PREVIEW</span>
            </div>
            <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ color: theme.primary }}>calendar_today</span>
                  <span className="font-bold text-sm">Day 01 Tasks</span>
                </div>
                <span className="text-[10px] text-[#8A8778]">0/{checklistCount} Complete</span>
              </div>
              <div className="p-2 grid grid-cols-1 md:grid-cols-2">
                {config.checklistItems.map((item) => (
                  <div key={item.key} className="p-3 flex items-center gap-3 border-b border-stone-50 md:border-b-0 md:border-r md:border-stone-50 last:border-0">
                    <div className="w-5 h-5 rounded border-2 border-stone-200 flex-shrink-0" />
                    <span className="text-sm text-[#4A4A4A]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA Section ===== */}
        <section className="px-6 py-14 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="font-headline text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-4">Ready to Transform?</h2>
            <p className="text-[#8A8778] text-base mb-8 leading-relaxed">
              Join hundreds of participants who have already started their 21-day journey with Dr. Aparna Albert.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all active:scale-95 duration-150 text-base"
              style={{ backgroundColor: theme.primary, boxShadow: `0 10px 15px -3px ${theme.primary}33` }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.primaryDark; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.primary; }}
            >
              {config.landing.signupButtonText}
            </button>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="bg-[#FAF7F2] pb-8 pt-10 border-t border-stone-200">
          <div className="flex flex-col items-center text-center px-8 gap-4 max-w-3xl mx-auto">
            <a href="/" className="flex items-center gap-1 mb-2 hover:opacity-80 transition-opacity" style={{ color: theme.primary }}>
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              <span className="text-xs font-medium">Back to The Ayurveda Doc</span>
            </a>
            <div className="flex gap-4">
              <span className="text-[#8A8778] hover:text-[#E07A5F] transition-colors cursor-pointer text-xs">Privacy Policy</span>
              <span className="text-[#8A8778] hover:text-[#E07A5F] transition-colors cursor-pointer text-xs">Terms of Service</span>
              <span className="text-[#8A8778] hover:text-[#E07A5F] transition-colors cursor-pointer text-xs">Contact</span>
            </div>
            <p className="font-body text-xs leading-relaxed text-[#4A4A4A]">
              &copy; 2025 The Ayurveda Doc. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {/* ===== Auth Modal ===== */}
      <AuthModal
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        config={configWithId}
        theme={theme}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
