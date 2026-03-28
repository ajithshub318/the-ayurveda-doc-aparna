'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getActiveChallenge, signUp, login } from '../../lib/actions';

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
  error: '#C45B4A',
  errorBg: '#FDF0EE',
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
    padding: '40px 24px',
  },
  logo: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoText: {
    fontFamily: fonts.heading,
    fontSize: '14px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: colors.warmGray,
  },
  brandName: {
    fontFamily: fonts.heading,
    fontSize: '28px',
    fontWeight: '400',
    color: colors.charcoal,
    marginTop: '4px',
    fontStyle: 'italic',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: colors.sageLight,
    color: colors.sageDark,
    fontFamily: fonts.body,
    fontSize: '12px',
    fontWeight: '500',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '6px 16px',
    borderRadius: '20px',
    marginBottom: '20px',
  },
  heroTitle: {
    fontFamily: fonts.heading,
    fontSize: '42px',
    fontWeight: '400',
    color: colors.charcoal,
    lineHeight: '1.15',
    marginBottom: '8px',
  },
  heroAccent: {
    fontStyle: 'italic',
    color: colors.sage,
  },
  heroSubtitle: {
    fontFamily: fonts.body,
    fontSize: '16px',
    color: colors.warmGray,
    lineHeight: '1.6',
    marginTop: '16px',
  },
  challengeCard: {
    backgroundColor: colors.white,
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '32px',
    border: `1px solid ${colors.creamDark}`,
  },
  challengeLabel: {
    fontFamily: fonts.body,
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: colors.sage,
    marginBottom: '8px',
  },
  challengeName: {
    fontFamily: fonts.heading,
    fontSize: '22px',
    fontWeight: '400',
    color: colors.charcoal,
    marginBottom: '12px',
  },
  challengeDesc: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.warmGray,
    lineHeight: '1.7',
  },
  challengeDuration: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '16px',
    fontFamily: fonts.body,
    fontSize: '13px',
    color: colors.sage,
    fontWeight: '500',
  },
  tabs: {
    display: 'flex',
    backgroundColor: colors.creamDark,
    borderRadius: '12px',
    padding: '4px',
    marginBottom: '28px',
  },
  tab: {
    flex: 1,
    padding: '12px',
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: '14px',
    fontWeight: '500',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
  },
  tabActive: {
    backgroundColor: colors.white,
    color: colors.charcoal,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  tabInactive: {
    backgroundColor: 'transparent',
    color: colors.warmGray,
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: '16px',
    padding: '28px',
    border: `1px solid ${colors.creamDark}`,
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '13px',
    fontWeight: '500',
    color: colors.charcoalLight,
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontFamily: fonts.body,
    fontSize: '15px',
    color: colors.charcoal,
    backgroundColor: colors.cream,
    border: `1px solid ${colors.creamDark}`,
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box',
  },
  inputFocus: {
    borderColor: colors.sage,
  },
  pinContainer: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  pinInput: {
    width: '56px',
    height: '56px',
    textAlign: 'center',
    fontFamily: fonts.heading,
    fontSize: '24px',
    color: colors.charcoal,
    backgroundColor: colors.cream,
    border: `1px solid ${colors.creamDark}`,
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  },
  weightInput: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  weightUnit: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.warmGray,
  },
  button: {
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
    marginTop: '8px',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  error: {
    backgroundColor: colors.errorBg,
    color: colors.error,
    fontFamily: fonts.body,
    fontSize: '13px',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '16px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '32px',
    fontFamily: fonts.body,
    fontSize: '13px',
    color: colors.warmGray,
  },
  footerLink: {
    color: colors.sage,
    textDecoration: 'none',
    fontWeight: '500',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    margin: '20px 0',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: colors.creamDark,
  },
  dividerText: {
    fontFamily: fonts.body,
    fontSize: '12px',
    color: colors.warmGray,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  optional: {
    fontWeight: '400',
    color: colors.warmGray,
    fontSize: '12px',
    marginLeft: '4px',
  },
};

// ==================== PIN INPUT COMPONENT ====================
function PinInput({ value, onChange }) {
  const pins = value.split('');

  const handleChange = (index, digit) => {
    if (!/^\d?$/.test(digit)) return;
    const newPins = [...pins, '', '', '', ''].slice(0, 4);
    newPins[index] = digit;
    onChange(newPins.join(''));

    // Auto-focus next input
    if (digit && index < 3) {
      const next = document.getElementById(`pin-${index + 1}`);
      if (next) next.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pins[index] && index > 0) {
      const prev = document.getElementById(`pin-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  return (
    <div style={styles.pinContainer}>
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          id={`pin-${i}`}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={pins[i] || ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          style={styles.pinInput}
          onFocus={(e) => (e.target.style.borderColor = colors.sage)}
          onBlur={(e) => (e.target.style.borderColor = colors.creamDark)}
        />
      ))}
    </div>
  );
}

// ==================== MAIN PAGE ====================
export default function My21Page() {
  const router = useRouter();
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Sign up form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [pin, setPin] = useState('');
  const [day1Weight, setDay1Weight] = useState('');

  // Login form
  const [loginWhatsapp, setLoginWhatsapp] = useState('');
  const [loginPin, setLoginPin] = useState('');

  useEffect(() => {
    async function load() {
      const { challenge: c } = await getActiveChallenge();
      setChallenge(c);
      setLoading(false);
    }
    // Check if already logged in
    const userId = sessionStorage.getItem('my21_user_id');
    if (userId) {
      router.push('/my21/today');
      return;
    }
    load();
  }, [router]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !whatsapp || pin.length !== 4) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    const result = await signUp({
      name,
      email,
      whatsapp,
      pin,
      challengeId: challenge?.id,
      day1Weight: day1Weight ? parseFloat(day1Weight) : null,
    });

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    // Save session
    sessionStorage.setItem('my21_user_id', result.userId);
    sessionStorage.setItem('my21_user_name', name);
    router.push('/my21/today');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginWhatsapp || loginPin.length !== 4) {
      setError('Please enter your WhatsApp number and 4-digit PIN.');
      return;
    }

    setSubmitting(true);
    const result = await login({ whatsapp: loginWhatsapp, pin: loginPin });

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    sessionStorage.setItem('my21_user_id', result.userId);
    sessionStorage.setItem('my21_user_name', result.name);
    router.push('/my21/today');
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, textAlign: 'center', paddingTop: '120px' }}>
          <div style={{ fontFamily: fonts.heading, fontSize: '24px', color: colors.sage }}>
            My21
          </div>
          <div style={{ fontFamily: fonts.body, fontSize: '14px', color: colors.warmGray, marginTop: '12px' }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Logo */}
        <div style={styles.logo}>
          <div style={styles.logoText}>The Ayurveda Doc</div>
          <div style={styles.brandName}>My21</div>
        </div>

        {/* Hero */}
        <div style={styles.heroSection}>
          <div style={styles.badge}>21-Day Tracker</div>
          <h1 style={styles.heroTitle}>
            Your <span style={styles.heroAccent}>21 days</span>
            <br />start here
          </h1>
          <p style={styles.heroSubtitle}>
            Track your daily habits, see your progress,
            and transform how you feel — one day at a time.
          </p>
        </div>

        {/* Active Challenge Card */}
        {challenge && (
          <div style={styles.challengeCard}>
            <div style={styles.challengeLabel}>Current Challenge</div>
            <div style={styles.challengeName}>{challenge.name}</div>
            <div style={styles.challengeDesc}>{challenge.description}</div>
            <div style={styles.challengeDuration}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.sage} strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              {challenge.duration} days
            </div>
          </div>
        )}

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            onClick={() => { setMode('signup'); setError(''); }}
            style={{
              ...styles.tab,
              ...(mode === 'signup' ? styles.tabActive : styles.tabInactive),
            }}
          >
            Join Challenge
          </button>
          <button
            onClick={() => { setMode('login'); setError(''); }}
            style={{
              ...styles.tab,
              ...(mode === 'login' ? styles.tabActive : styles.tabInactive),
            }}
          >
            Log In
          </button>
        </div>

        {/* Error */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Sign Up Form */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp}>
            <div style={styles.formCard}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dr. Aparna Albert"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = colors.sage)}
                  onBlur={(e) => (e.target.style.borderColor = colors.creamDark)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = colors.sage)}
                  onBlur={(e) => (e.target.style.borderColor = colors.creamDark)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>WhatsApp Number</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91 70123 99593"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = colors.sage)}
                  onBlur={(e) => (e.target.style.borderColor = colors.creamDark)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Set a 4-Digit PIN</label>
                <PinInput value={pin} onChange={setPin} />
              </div>

              <div style={styles.divider}>
                <div style={styles.dividerLine} />
                <span style={styles.dividerText}>Optional</span>
                <div style={styles.dividerLine} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Day 1 Weight
                  <span style={styles.optional}>(you can skip this)</span>
                </label>
                <div style={styles.weightInput}>
                  <input
                    type="number"
                    value={day1Weight}
                    onChange={(e) => setDay1Weight(e.target.value)}
                    placeholder="70"
                    style={{ ...styles.input, width: '120px' }}
                    onFocus={(e) => (e.target.style.borderColor = colors.sage)}
                    onBlur={(e) => (e.target.style.borderColor = colors.creamDark)}
                  />
                  <span style={styles.weightUnit}>kg</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  ...styles.button,
                  ...(submitting ? styles.buttonDisabled : {}),
                }}
                onMouseOver={(e) => { if (!submitting) e.target.style.backgroundColor = colors.charcoalLight; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = colors.charcoal; }}
              >
                {submitting ? 'Joining...' : "I'm In — Start My 21 Days"}
              </button>
            </div>
          </form>
        )}

        {/* Login Form */}
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div style={styles.formCard}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>WhatsApp Number</label>
                <input
                  type="tel"
                  value={loginWhatsapp}
                  onChange={(e) => setLoginWhatsapp(e.target.value)}
                  placeholder="+91 70123 99593"
                  style={styles.input}
                  onFocus={(e) => (e.target.style.borderColor = colors.sage)}
                  onBlur={(e) => (e.target.style.borderColor = colors.creamDark)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Your 4-Digit PIN</label>
                <PinInput value={loginPin} onChange={setLoginPin} />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  ...styles.button,
                  ...(submitting ? styles.buttonDisabled : {}),
                }}
                onMouseOver={(e) => { if (!submitting) e.target.style.backgroundColor = colors.charcoalLight; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = colors.charcoal; }}
              >
                {submitting ? 'Logging in...' : 'Continue My Challenge'}
              </button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div style={styles.footer}>
          <a href="https://theayurvedadoc.com" style={styles.footerLink}>
            theayurvedadoc.com
          </a>
          <span style={{ margin: '0 8px' }}>·</span>
          A journey with Dr. Aparna Albert
        </div>
      </div>
    </div>
  );
}
