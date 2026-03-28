'use client';

import { useState, useEffect } from 'react';
import {
  adminLogin,
  getAllChallenges,
  createChallenge,
  toggleChallenge,
  getAdminUsers,
} from '../../../lib/actions';

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
    maxWidth: '720px',
    margin: '0 auto',
    padding: '32px 24px',
  },
  header: {
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
    marginTop: '4px',
  },
  section: {
    marginBottom: '32px',
  },
  sectionTitle: {
    fontFamily: fonts.heading,
    fontSize: '20px',
    fontWeight: '400',
    color: colors.charcoal,
    marginBottom: '16px',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: '16px',
    padding: '24px',
    border: `1px solid ${colors.creamDark}`,
    marginBottom: '16px',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    fontFamily: fonts.body,
    fontSize: '13px',
    fontWeight: '500',
    color: colors.charcoalLight,
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.charcoal,
    backgroundColor: colors.cream,
    border: `1px solid ${colors.creamDark}`,
    borderRadius: '10px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 14px',
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
  },
  button: {
    padding: '12px 24px',
    fontFamily: fonts.body,
    fontSize: '14px',
    fontWeight: '500',
    color: colors.white,
    backgroundColor: colors.charcoal,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  buttonSmall: {
    padding: '8px 16px',
    fontFamily: fonts.body,
    fontSize: '12px',
    fontWeight: '500',
    borderRadius: '8px',
    cursor: 'pointer',
    border: 'none',
  },
  buttonSage: {
    backgroundColor: colors.sage,
    color: colors.white,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    color: colors.warmGray,
    border: `1px solid ${colors.creamDark}`,
  },
  challengeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: `1px solid ${colors.cream}`,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    fontFamily: fonts.heading,
    fontSize: '16px',
    color: colors.charcoal,
    marginBottom: '4px',
  },
  challengeMeta: {
    fontFamily: fonts.body,
    fontSize: '12px',
    color: colors.warmGray,
  },
  activeBadge: {
    display: 'inline-block',
    backgroundColor: colors.sageLight,
    color: colors.sage,
    fontFamily: fonts.body,
    fontSize: '11px',
    fontWeight: '500',
    padding: '3px 10px',
    borderRadius: '12px',
    marginLeft: '8px',
  },
  inactiveBadge: {
    display: 'inline-block',
    backgroundColor: colors.cream,
    color: colors.warmGray,
    fontFamily: fonts.body,
    fontSize: '11px',
    fontWeight: '500',
    padding: '3px 10px',
    borderRadius: '12px',
    marginLeft: '8px',
  },
  // Table
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    fontFamily: fonts.body,
    fontSize: '11px',
    fontWeight: '500',
    color: colors.warmGray,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '12px 10px',
    textAlign: 'left',
    borderBottom: `1px solid ${colors.creamDark}`,
  },
  td: {
    fontFamily: fonts.body,
    fontSize: '13px',
    color: colors.charcoal,
    padding: '14px 10px',
    borderBottom: `1px solid ${colors.cream}`,
  },
  tdMuted: {
    color: colors.warmGray,
  },
  completionBar: {
    width: '60px',
    height: '6px',
    backgroundColor: colors.creamDark,
    borderRadius: '3px',
    overflow: 'hidden',
    display: 'inline-block',
    marginRight: '6px',
  },
  completionFill: {
    height: '100%',
    backgroundColor: colors.sage,
    borderRadius: '3px',
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
  loginCard: {
    maxWidth: '380px',
    margin: '80px auto',
    backgroundColor: colors.white,
    borderRadius: '16px',
    padding: '32px',
    border: `1px solid ${colors.creamDark}`,
    textAlign: 'center',
  },
  loginTitle: {
    fontFamily: fonts.heading,
    fontSize: '24px',
    color: colors.charcoal,
    marginBottom: '8px',
  },
  loginSubtitle: {
    fontFamily: fonts.body,
    fontSize: '14px',
    color: colors.warmGray,
    marginBottom: '24px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '24px',
  },
  statBox: {
    backgroundColor: colors.cream,
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
  },
  statNumber: {
    fontFamily: fonts.heading,
    fontSize: '28px',
    color: colors.charcoal,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: '11px',
    color: colors.warmGray,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginTop: '4px',
  },
  exportButton: {
    padding: '8px 16px',
    fontFamily: fonts.body,
    fontSize: '12px',
    fontWeight: '500',
    color: colors.sage,
    backgroundColor: colors.sageLight,
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginLeft: '12px',
  },
};

// ==================== ADMIN PAGE ====================
export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [challenges, setChallenges] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(false);

  // New challenge form
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDuration, setNewDuration] = useState('21');
  const [showNewForm, setShowNewForm] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const result = await adminLogin(password);
    if (result.error) {
      setError(result.error);
      return;
    }
    setAuthenticated(true);
    loadData();
  };

  const loadData = async () => {
    setLoading(true);
    const { challenges: c } = await getAllChallenges();
    setChallenges(c);

    // Load users for the active challenge or first challenge
    const active = c.find((ch) => ch.is_active) || c[0];
    if (active) {
      setSelectedChallenge(active.id);
      const { users: u } = await getAdminUsers(active.id);
      setUsers(u);
    }
    setLoading(false);
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    setError('');
    const result = await createChallenge({
      name: newName,
      description: newDesc,
      duration: parseInt(newDuration) || 21,
    });

    if (result.error) {
      setError(result.error);
      return;
    }

    setNewName('');
    setNewDesc('');
    setNewDuration('21');
    setShowNewForm(false);
    loadData();
  };

  const handleToggle = async (id, isActive) => {
    await toggleChallenge(id, !isActive);
    loadData();
  };

  const handleSelectChallenge = async (challengeId) => {
    setSelectedChallenge(challengeId);
    setLoading(true);
    const { users: u } = await getAdminUsers(challengeId);
    setUsers(u);
    setLoading(false);
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'WhatsApp', 'Start Date', 'Days Completed', 'Day 1 Weight', 'Day 21 Weight'];
    const rows = users.map((u) => [
      u.my21_users?.name || '',
      u.my21_users?.email || '',
      u.my21_users?.whatsapp || '',
      u.start_date || '',
      u.days_completed || 0,
      u.day1_weight || '',
      u.day21_weight || '',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my21-users-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Login screen
  if (!authenticated) {
    return (
      <div style={styles.page}>
        <div style={styles.loginCard}>
          <div style={styles.loginTitle}>My21 Admin</div>
          <div style={styles.loginSubtitle}>Enter your admin password</div>
          {error && <div style={styles.error}>{error}</div>}
          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={styles.input}
              />
            </div>
            <button type="submit" style={{ ...styles.button, width: '100%' }}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  const activeChallenge = challenges.find((c) => c.is_active);
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.days_completed > 0).length;
  const avgCompletion = totalUsers > 0
    ? Math.round(users.reduce((acc, u) => acc + (u.days_completed || 0), 0) / totalUsers)
    : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>
            My21 <span style={styles.titleAccent}>Admin</span>
          </h1>
          <p style={styles.subtitle}>Manage challenges and track participants</p>
        </div>

        {/* Quick Stats */}
        <div style={styles.statsGrid}>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{totalUsers}</div>
            <div style={styles.statLabel}>Total Users</div>
          </div>
          <div style={styles.statBox}>
            <div style={styles.statNumber}>{activeUsers}</div>
            <div style={styles.statLabel}>Active Users</div>
          </div>
          <div style={styles.statBox}>
            <div style={{ ...styles.statNumber, color: colors.sage }}>{avgCompletion}</div>
            <div style={styles.statLabel}>Avg Days Done</div>
          </div>
        </div>

        {/* Challenges Section */}
        <div style={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={styles.sectionTitle}>Challenges</div>
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              style={{ ...styles.buttonSmall, ...styles.buttonSage }}
            >
              {showNewForm ? 'Cancel' : '+ New Challenge'}
            </button>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {/* New Challenge Form */}
          {showNewForm && (
            <div style={{ ...styles.card, borderColor: colors.sage + '40' }}>
              <form onSubmit={handleCreateChallenge}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Challenge Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g., 21-Day Sugar Cut"
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Description</label>
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Describe the challenge — what to do, what to avoid, what the commitment is..."
                    style={styles.textarea}
                    required
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Duration (days)</label>
                  <input
                    type="number"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    style={{ ...styles.input, width: '100px' }}
                    min="7"
                    max="90"
                  />
                </div>
                <button type="submit" style={styles.button}>
                  Create & Set as Active
                </button>
              </form>
            </div>
          )}

          {/* Challenges List */}
          <div style={styles.card}>
            {challenges.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: colors.warmGray, fontFamily: fonts.body, fontSize: '14px' }}>
                No challenges yet. Create your first one.
              </div>
            ) : (
              challenges.map((ch, i) => (
                <div
                  key={ch.id}
                  style={{
                    ...styles.challengeRow,
                    ...(i === challenges.length - 1 ? { borderBottom: 'none' } : {}),
                    cursor: 'pointer',
                    backgroundColor: selectedChallenge === ch.id ? colors.cream : 'transparent',
                    margin: '-0 -8px',
                    padding: '16px 8px',
                    borderRadius: '8px',
                  }}
                  onClick={() => handleSelectChallenge(ch.id)}
                >
                  <div style={styles.challengeInfo}>
                    <div style={styles.challengeName}>
                      {ch.name}
                      {ch.is_active ? (
                        <span style={styles.activeBadge}>Active</span>
                      ) : (
                        <span style={styles.inactiveBadge}>Inactive</span>
                      )}
                    </div>
                    <div style={styles.challengeMeta}>
                      {ch.duration} days · Created {new Date(ch.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggle(ch.id, ch.is_active);
                    }}
                    style={{
                      ...styles.buttonSmall,
                      ...(ch.is_active ? styles.buttonOutline : styles.buttonSage),
                    }}
                  >
                    {ch.is_active ? 'Deactivate' : 'Set Active'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Users Section */}
        <div style={styles.section}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={styles.sectionTitle}>Participants</div>
            {users.length > 0 && (
              <button onClick={exportCSV} style={styles.exportButton}>
                Export CSV
              </button>
            )}
          </div>

          <div style={{ ...styles.card, overflowX: 'auto' }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '24px', color: colors.warmGray }}>
                Loading...
              </div>
            ) : users.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: colors.warmGray, fontFamily: fonts.body, fontSize: '14px' }}>
                No participants yet for this challenge.
              </div>
            ) : (
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>WhatsApp</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Started</th>
                    <th style={styles.th}>Progress</th>
                    <th style={styles.th}>Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => {
                    const duration = 21;
                    const pct = Math.round(((u.days_completed || 0) / duration) * 100);
                    return (
                      <tr key={u.id}>
                        <td style={styles.td}>{u.my21_users?.name || '—'}</td>
                        <td style={styles.td}>
                          <a
                            href={`https://wa.me/${(u.my21_users?.whatsapp || '').replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: colors.sage, textDecoration: 'none' }}
                          >
                            {u.my21_users?.whatsapp || '—'}
                          </a>
                        </td>
                        <td style={{ ...styles.td, ...styles.tdMuted }}>{u.my21_users?.email || '—'}</td>
                        <td style={{ ...styles.td, ...styles.tdMuted }}>
                          {u.start_date ? new Date(u.start_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                        </td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={styles.completionBar}>
                              <div style={{ ...styles.completionFill, width: `${pct}%` }} />
                            </div>
                            <span style={{ fontSize: '12px', color: colors.warmGray }}>
                              {u.days_completed || 0}/{duration}
                            </span>
                          </div>
                        </td>
                        <td style={{ ...styles.td, ...styles.tdMuted }}>
                          {u.day1_weight ? `${u.day1_weight}→${u.day21_weight || '?'}` : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
