import React, { useState, useEffect } from 'react';
import {
  adminLogin,
  getAllChallenges,
  createChallenge,
  toggleChallenge,
  getAdminUsers,
  getAllEntries,
} from '../../lib/my21-actions';
import { getAllChallengeTypes, getChallengeConfig } from '../../lib/challenge-config';
import './my21.css';

// ==================== Types ====================
interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number;
  is_active: boolean;
  type: string;
  created_at: string;
}

interface Participant {
  id: string;
  user_id: string;
  challenge_id: string;
  start_date: string;
  day1_weight: number | null;
  day21_weight: number | null;
  completed: boolean;
  days_completed: number;
  sugar_free_days: number;
  challenge_type: string;
  my21_users: {
    id: string;
    name: string;
    email: string;
    whatsapp: string;
  };
}

// ==================== Helpers ====================
const challengeIcons: Record<string, string> = {
  sugar_cut: 'eco',
  health: 'health_metrics',
};

const typeLabels: Record<string, string> = {
  health: 'Health',
  sugar_cut: 'Sugar Cut',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function formatDateRibbon(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}

// ==================== Component ====================
export default function My21Admin() {
  // Auth state
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Data state
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  // Form state
  const [showNewForm, setShowNewForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDuration, setNewDuration] = useState(21);
  const [newType, setNewType] = useState('health');
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState('');

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active sidebar section
  const [activeSection, setActiveSection] = useState<'dashboard' | 'challenges' | 'participants' | 'settings'>('dashboard');

  // Participant detail view
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [participantEntries, setParticipantEntries] = useState<any[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);

  const challengeTypes = getAllChallengeTypes();

  useEffect(() => {
    if (authenticated) loadChallengesAndAutoSelect();
  }, [authenticated]);

  async function loadChallengesAndAutoSelect() {
    const { challenges: data } = await getAllChallenges();
    setChallenges(data);
    // Auto-select the first active challenge and load its participants
    const active = data.find((c: Challenge) => c.is_active);
    if (active && !selectedChallengeId) {
      loadParticipants(active.id);
    }
  }

  async function loadChallenges() {
    const { challenges: data } = await getAllChallenges();
    setChallenges(data);
  }

  function navigateTo(section: 'dashboard' | 'challenges' | 'participants' | 'settings') {
    setActiveSection(section);
    setSidebarOpen(false);
    setSelectedParticipant(null);
  }

  async function viewParticipantDetail(p: Participant) {
    setSelectedParticipant(p);
    setLoadingEntries(true);
    const { entries } = await getAllEntries(p.id);
    setParticipantEntries(entries);
    setLoadingEntries(false);
  }

  async function loadParticipants(challengeId: string) {
    setLoadingParticipants(true);
    setSelectedChallengeId(challengeId);
    const { users } = await getAdminUsers(challengeId);
    setParticipants(users as Participant[]);
    setLoadingParticipants(false);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    const result = adminLogin(password);
    if ('success' in result && result.success) setAuthenticated(true);
    else if ('error' in result) setLoginError(result.error);
  }

  async function handleCreateChallenge(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) { setFormError('Challenge name is required.'); return; }
    setCreating(true);
    setFormError('');
    const result = await createChallenge({
      name: newName.trim(),
      description: newDescription.trim(),
      duration: newDuration,
      type: newType,
    });
    if ('error' in result && result.error) {
      setFormError(result.error);
    } else {
      setNewName(''); setNewDescription(''); setNewDuration(21); setNewType('health');
      setShowNewForm(false);
      await loadChallenges();
    }
    setCreating(false);
  }

  async function handleToggle(challengeId: string, currentlyActive: boolean) {
    await toggleChallenge(challengeId, !currentlyActive);
    await loadChallenges();
  }

  function exportCSV() {
    if (participants.length === 0) return;
    const selectedChallenge = challenges.find((c) => c.id === selectedChallengeId);
    const isSugarCut = selectedChallenge?.type === 'sugar_cut';

    const headers = ['Name', 'Email', 'WhatsApp', 'Start Date', 'Days Completed',
      ...(isSugarCut ? ['Sugar-Free Days'] : []),
      'Day 1 Weight', 'Day 21 Weight'];

    const rows = participants.map((p) => [
      p.my21_users.name,
      p.my21_users.email || '',
      p.my21_users.whatsapp,
      p.start_date,
      String(p.days_completed),
      ...(isSugarCut ? [String(p.sugar_free_days)] : []),
      p.day1_weight != null ? String(p.day1_weight) : '',
      p.day21_weight != null ? String(p.day21_weight) : '',
    ]);

    const csvContent = [headers, ...rows].map((row) => row.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my21-participants-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Computed stats
  const totalUsers = participants.length;
  const activeUsers = participants.filter((p) => !p.completed && p.days_completed > 0).length;
  const avgDaysCompleted = totalUsers > 0
    ? Math.round(participants.reduce((sum, p) => sum + p.days_completed, 0) / totalUsers)
    : 0;
  const selectedChallenge = challenges.find((c) => c.id === selectedChallengeId);
  const isSugarCut = selectedChallenge?.type === 'sugar_cut';
  const avgSugarFreeDays = isSugarCut && totalUsers > 0
    ? Math.round(participants.reduce((s, p) => s + p.sugar_free_days, 0) / totalUsers)
    : 0;

  // ==================== LOGIN SCREEN ====================
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center px-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-[0_12px_40px_rgba(28,28,25,0.08)] p-10 sm:p-12 w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold text-on-background text-center mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            My21 Admin
          </h1>
          <p className="text-stone-500 text-center text-sm mb-8">
            Enter the admin password to continue
          </p>
          {loginError && (
            <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm mb-5">
              {loginError}
            </div>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-surface-container-lowest border-0 rounded-lg p-3.5 text-sm mb-5 focus:ring-2 focus:ring-primary/20 shadow-sm outline-none"
          />
          <button
            type="submit"
            className="w-full bg-primary text-on-primary font-bold py-3.5 rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-all text-sm"
          >
            Log In
          </button>
        </form>
      </div>
    );
  }

  // ==================== DASHBOARD ====================
  return (
    <div className="min-h-screen bg-surface" style={{ fontFamily: "'DM Sans', sans-serif", color: '#1c1c19' }}>

      {/* ===== Fixed Top Bar ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center w-full px-6 md:px-10 py-4 bg-white border-b border-surface-variant">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-on-surface"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="text-2xl font-bold text-on-background" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            My21 Admin
          </div>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-6 text-sm items-center">
            {(['dashboard', 'challenges', 'participants', 'settings'] as const).map((s) => (
              <a key={s} onClick={() => navigateTo(s)}
                className={`cursor-pointer transition-colors capitalize ${activeSection === s ? 'text-primary font-semibold' : 'text-stone-500 hover:text-primary'}`}>
                {s}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setAuthenticated(false)}
            className="text-stone-500 text-sm font-medium hover:text-primary transition-colors"
          >
            Log out
          </button>
        </div>
      </header>

      {/* ===== Mobile sidebar overlay ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== Left Sidebar ===== */}
      <aside className={`
        fixed h-full left-0 w-64 top-0 bg-surface-container-low flex-col py-8 px-6 pt-24 z-40
        transition-transform duration-300
        ${sidebarOpen ? 'flex translate-x-0' : '-translate-x-full'}
        md:flex md:translate-x-0
      `}>
        <div className="mb-10">
          <h2 className="text-xl text-on-surface" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
            Editorial Workspace
          </h2>
          <p className="text-[10px] uppercase tracking-wider text-stone-500 mt-1">Management Console</p>
        </div>
        <nav className="flex flex-col gap-2">
          {([
            { key: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
            { key: 'challenges', icon: 'label', label: 'Challenges' },
            { key: 'participants', icon: 'group', label: 'Participants' },
            { key: 'settings', icon: 'settings', label: 'Settings' },
          ] as const).map((item) => {
            const isActive = activeSection === item.key;
            return (
              <a key={item.key}
                onClick={() => navigateTo(item.key)}
                className={`flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'text-primary font-bold border-r-2 border-primary translate-x-1'
                    : 'text-stone-500 hover:bg-surface-container'
                }`}>
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="uppercase tracking-wider text-[10px]">{item.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="mt-auto pt-8">
          <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold">A</div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-on-surface">Admin Profile</span>
              <span className="text-[10px] text-stone-500">Super User</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="md:pl-64 pt-20 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">

          {/* Breadcrumb Ribbon */}
          <div className="bg-surface-variant flex flex-col sm:flex-row items-start sm:items-center justify-between px-6 py-3 rounded-lg mb-8 text-on-surface-variant">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="opacity-60 cursor-pointer hover:opacity-100" onClick={() => navigateTo('dashboard')}>Dashboard</span>
              {activeSection !== 'dashboard' && (
                <>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span className="capitalize">{activeSection}</span>
                </>
              )}
              {activeSection === 'dashboard' && (
                <>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span>Editorial Workspace</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs font-bold mt-2 sm:mt-0">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                System Online
              </span>
              <span className="opacity-60">{formatDateRibbon()}</span>
            </div>
          </div>

          {/* Welcome Heading — dashboard only */}
          {activeSection === 'dashboard' && (
            <div className="mb-12">
              <h1 className="text-4xl mb-2 text-on-background" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                Welcome, Editor.
              </h1>
              <p className="text-stone-500 max-w-lg">
                Manage your 21-day journeys and track participant progress with surgical precision.
              </p>
            </div>
          )}

          {/* Stats Row — dashboard + participants */}
          {(activeSection === 'dashboard' || activeSection === 'participants') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Total Users */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_40px_rgba(28,28,25,0.06)] flex flex-col gap-4">
              <span className="uppercase tracking-widest text-stone-400 font-bold text-[10px]">Total Users</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{totalUsers}</span>
                <span className="text-primary text-xs font-bold">+0%</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="bg-primary h-full transition-all duration-500" style={{ width: `${Math.min(100, totalUsers * 25)}%` }} />
              </div>
            </div>
            {/* Active Users */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_40px_rgba(28,28,25,0.06)] flex flex-col gap-4">
              <span className="uppercase tracking-widest text-stone-400 font-bold text-[10px]">Active Users</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{activeUsers}</span>
                <span className="text-primary text-xs font-bold">Active</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="bg-primary-container h-full transition-all duration-500" style={{ width: totalUsers > 0 ? `${Math.round((activeUsers / totalUsers) * 100)}%` : '0%' }} />
              </div>
            </div>
            {/* Avg Days Completed */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_40px_rgba(28,28,25,0.06)] flex flex-col gap-4">
              <span className="uppercase tracking-widest text-stone-400 font-bold text-[10px]">Avg Days Completed</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>{avgDaysCompleted}</span>
                <span className="text-stone-400 text-xs font-medium">/ 21</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="bg-tertiary h-full transition-all duration-500" style={{ width: `${Math.round((avgDaysCompleted / 21) * 100)}%` }} />
              </div>
            </div>
            {/* Avg Sugar-Free Days (always shown, like Stitch) */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_12px_40px_rgba(28,28,25,0.06)] flex flex-col gap-4">
              <span className="uppercase tracking-widest text-stone-400 font-bold text-[10px]">Avg Sugar-Free Days</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-secondary" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                  {isSugarCut ? avgSugarFreeDays : 0}
                </span>
                <span className="text-secondary text-xs font-bold">Days</span>
              </div>
              <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                <div className="bg-secondary-container h-full transition-all duration-500" style={{ width: isSugarCut && avgSugarFreeDays > 0 ? `${Math.round((avgSugarFreeDays / 21) * 100)}%` : '0%' }} />
              </div>
            </div>
          </div>
          )}

          {/* Two-column layout: 8/12 content + 4/12 form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* ===== Left Column: Challenges + Participants ===== */}
            <div className={`${(activeSection === 'challenges' || activeSection === 'participants') ? 'lg:col-span-12' : 'lg:col-span-8'} flex flex-col gap-10`}>

              {/* Challenges Section — dashboard + challenges */}
              {(activeSection === 'dashboard' || activeSection === 'challenges') && (
              <section className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(28,28,25,0.06)]">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-2xl" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Challenges</h3>
                    <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">Campaign Overview</p>
                  </div>
                  <button
                    onClick={() => setShowNewForm(!showNewForm)}
                    className="bg-primary text-on-primary hover:opacity-90 transition-all rounded-full px-6 py-2.5 text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                    {showNewForm ? 'Cancel' : 'New Challenge'}
                  </button>
                </div>

                {/* Challenge List */}
                {challenges.length === 0 ? (
                  <p className="text-stone-400 text-sm">No challenges yet. Create one to get started.</p>
                ) : (
                  <div className="space-y-4">
                    {challenges.map((ch) => {
                      const isSelected = selectedChallengeId === ch.id;
                      const iconName = challengeIcons[ch.type] || 'medication';
                      return (
                        <div
                          key={ch.id}
                          onClick={() => loadParticipants(ch.id)}
                          className={`p-5 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                            ch.is_active
                              ? 'bg-primary/5 border-l-4 border-primary hover:bg-primary/10'
                              : 'bg-surface-container-low hover:bg-surface-container-high'
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-sm ${
                              ch.is_active ? 'text-primary' : 'text-tertiary'
                            }`}>
                              <span
                                className="material-symbols-outlined text-3xl"
                                style={ch.is_active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                              >
                                {iconName}
                              </span>
                            </div>
                            <div>
                              <div className={`text-lg mb-1 ${ch.is_active ? 'font-bold' : 'font-medium'}`}>{ch.name}</div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                                  ch.type === 'sugar_cut'
                                    ? 'bg-secondary-container text-on-secondary-container'
                                    : 'bg-tertiary-container/20 text-tertiary'
                                }`}>
                                  {typeLabels[ch.type] || ch.type}
                                </span>
                                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tighter ${
                                  ch.is_active
                                    ? 'bg-primary-container/20 text-primary'
                                    : 'bg-stone-200 text-stone-500'
                                }`}>
                                  {ch.is_active ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleToggle(ch.id, ch.is_active); }}
                            className={`flex flex-col items-center gap-1 group transition-colors ${
                              ch.is_active
                                ? 'text-stone-400 hover:text-error'
                                : 'text-stone-400 hover:text-primary'
                            }`}
                          >
                            <span className="material-symbols-outlined">
                              {ch.is_active ? 'toggle_on' : 'toggle_off'}
                            </span>
                            <span className={`text-[9px] font-bold uppercase ${
                              ch.is_active ? 'group-hover:text-error' : 'group-hover:text-primary'
                            }`}>
                              {ch.is_active ? 'Deactivate' : 'Activate'}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
              )}

              {/* Participants Table Section — dashboard + participants */}
              {(activeSection === 'dashboard' || activeSection === 'participants') && (
              <section className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-[0_12px_40px_rgba(28,28,25,0.06)] overflow-hidden">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                  <div>
                    <h3 className="text-2xl" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Participants</h3>
                    <p className="text-xs text-stone-400 mt-1 uppercase tracking-wider">
                      {selectedChallenge ? selectedChallenge.name : 'Select a challenge'}
                    </p>
                  </div>
                  {participants.length > 0 && (
                    <button
                      onClick={exportCSV}
                      className="bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-all rounded-full px-6 py-2.5 text-xs font-bold flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-lg">download</span>
                      Export CSV
                    </button>
                  )}
                </div>

                {!selectedChallengeId ? (
                  <p className="text-stone-400 text-sm">Click on a challenge above to view participants.</p>
                ) : loadingParticipants ? (
                  <p className="text-stone-400 text-sm">Loading participants...</p>
                ) : participants.length === 0 ? (
                  <p className="text-stone-400 text-sm">No participants enrolled yet.</p>
                ) : (
                  <div className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-surface-variant">
                          {['Name', 'WhatsApp', 'Email', 'Start Date', 'Progress',
                            ...(isSugarCut ? ['Sugar-Free'] : []), 'Weight'].map((h) => (
                            <th key={h} className="py-4 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container">
                        {participants.map((p) => {
                          const duration = selectedChallenge?.duration || 21;
                          const progressPct = Math.min(100, Math.round((p.days_completed / duration) * 100));
                          return (
                            <tr key={p.id} className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => viewParticipantDetail(p)}>
                              <td className="py-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs">
                                    {getInitials(p.my21_users.name)}
                                  </div>
                                  <span className="font-semibold text-sm">{p.my21_users.name}</span>
                                </div>
                              </td>
                              <td className="py-5">
                                <a
                                  href={`https://wa.me/${p.my21_users.whatsapp.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline font-medium"
                                >
                                  {p.my21_users.whatsapp}
                                </a>
                              </td>
                              <td className="py-5 text-sm text-stone-400">
                                {p.my21_users.email || '\u2014'}
                              </td>
                              <td className="py-5 text-sm whitespace-nowrap">
                                {p.start_date}
                              </td>
                              <td className="py-5">
                                <div className="flex items-center gap-3">
                                  <div className="w-24 h-1.5 bg-surface-container rounded-full overflow-hidden">
                                    <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                                  </div>
                                  <span className="text-xs font-bold">{p.days_completed}/{duration}</span>
                                </div>
                              </td>
                              {isSugarCut && (
                                <td className="py-5 text-sm font-bold text-on-secondary-container">
                                  {p.sugar_free_days}d
                                </td>
                              )}
                              <td className="py-5 text-sm font-medium whitespace-nowrap">
                                {p.day1_weight != null ? p.day1_weight : '\u2014'}
                                {' '}
                                <span className="text-stone-300">&rarr;</span>
                                {' '}
                                <span className="text-stone-400">{p.day21_weight != null ? p.day21_weight : '\u2014'}</span>
                              </td>
                            </tr>
                          );
                        })}
                        {/* Skeleton placeholder rows for visual balance */}
                        {participants.length < 3 && Array.from({ length: 3 - participants.length }).map((_, i) => (
                          <tr key={`skeleton-${i}`} className="opacity-30">
                            <td className="py-5"><div className="h-4 w-24 bg-surface-container rounded" /></td>
                            <td className="py-5"><div className="h-4 w-20 bg-surface-container rounded" /></td>
                            <td className="py-5"><div className="h-4 w-32 bg-surface-container rounded" /></td>
                            <td className="py-5"><div className="h-4 w-16 bg-surface-container rounded" /></td>
                            <td className="py-5"><div className="h-4 w-24 bg-surface-container rounded" /></td>
                            {isSugarCut && <td className="py-5"><div className="h-4 w-10 bg-surface-container rounded" /></td>}
                            <td className="py-5"><div className="h-4 w-12 bg-surface-container rounded" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
              )}
            </div>

            {/* ===== Right Column: New Challenge Form (dashboard + challenges only) ===== */}
            {(activeSection === 'dashboard' || activeSection === 'challenges') && (
            <div className="lg:col-span-4">
              <section className="sticky top-24 bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10 shadow-sm overflow-hidden relative">
                {/* Decorative blur circle */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <h3 className="text-2xl mb-2" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>New Challenge</h3>
                  <p className="text-sm text-stone-500 mb-8">Architect a new 21-day intervention.</p>

                  <form onSubmit={handleCreateChallenge} className="space-y-6">
                    {formError && (
                      <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg text-sm">
                        {formError}
                      </div>
                    )}

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                        Challenge Type
                      </label>
                      <select
                        value={newType}
                        onChange={(e) => setNewType(e.target.value)}
                        className="w-full bg-surface-container-lowest border-0 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                      >
                        {challengeTypes.map((ct) => (
                          <option key={ct.type} value={ct.type}>{ct.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. 21-Day Metabolic Reboot"
                        className="w-full bg-surface-container-lowest border-0 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                        Description
                      </label>
                      <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Briefly describe the journey..."
                        rows={4}
                        className="w-full bg-surface-container-lowest border-0 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none resize-vertical"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                        Duration (Days)
                      </label>
                      <input
                        type="number"
                        value={newDuration}
                        onChange={(e) => setNewDuration(parseInt(e.target.value) || 21)}
                        min={1}
                        className="w-full bg-surface-container-lowest border-0 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full bg-primary text-white font-bold py-4 rounded-full shadow-xl shadow-primary/30 hover:opacity-90 transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-lg">rocket_launch</span>
                      {creating ? 'Creating...' : 'Create Challenge'}
                    </button>
                  </form>

                  {/* Tip card */}
                  <div className="mt-10 p-4 bg-white/50 rounded-xl backdrop-blur-md">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-secondary/10 rounded-lg flex-shrink-0">
                        <span className="material-symbols-outlined text-secondary">tips_and_updates</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                        Tip: Sugar-cut challenges automatically enable the "Days Clean" tracker for participants.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            )}

            {/* Settings placeholder */}
            {activeSection === 'settings' && (
              <div className="lg:col-span-12">
                <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_12px_40px_rgba(28,28,25,0.06)]">
                  <h3 className="text-2xl mb-4" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>Settings</h3>
                  <p className="text-stone-400 text-sm">Settings page coming soon. Admin password can be changed in the environment variables.</p>
                </section>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Decorative blur in bottom-right */}
      <div className="fixed bottom-10 right-10 z-50 pointer-events-none">
        <div className="w-64 h-64 bg-primary/5 rounded-full blur-[100px] absolute -bottom-20 -right-20" />
      </div>

      {/* ===== Participant Detail Modal ===== */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedParticipant(null)} />
          <div className="relative bg-white rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.15)] w-full max-w-3xl max-h-[80vh] overflow-hidden animate-[my21ScaleIn_0.3s_ease-out]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-surface-variant">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-lg">
                  {getInitials(selectedParticipant.my21_users.name)}
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ fontFamily: "'EB Garamond', Georgia, serif" }}>
                    {selectedParticipant.my21_users.name}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-stone-500">
                    <a href={`https://wa.me/${selectedParticipant.my21_users.whatsapp.replace(/\D/g, '')}`}
                      target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {selectedParticipant.my21_users.whatsapp}
                    </a>
                    {selectedParticipant.my21_users.email && (
                      <span>{selectedParticipant.my21_users.email}</span>
                    )}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedParticipant(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 transition-colors">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Stats bar */}
            <div className="flex gap-4 p-6 bg-surface-container-low border-b border-surface-variant">
              <div className="text-center flex-1">
                <div className="text-2xl font-bold" style={{ fontFamily: "'EB Garamond', serif", color: '#3e674b' }}>
                  {selectedParticipant.days_completed}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Days Done</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-2xl font-bold" style={{ fontFamily: "'EB Garamond', serif", color: '#3e674b' }}>
                  {selectedParticipant.sugar_free_days}d
                </div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Sugar-Free</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-2xl font-bold" style={{ fontFamily: "'EB Garamond', serif" }}>
                  {selectedParticipant.day1_weight != null ? `${selectedParticipant.day1_weight}` : '--'}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Day 1 Wt</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-2xl font-bold" style={{ fontFamily: "'EB Garamond', serif", color: selectedParticipant.day21_weight ? '#3e674b' : undefined }}>
                  {selectedParticipant.day21_weight != null ? `${selectedParticipant.day21_weight}` : '--'}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Day 21 Wt</div>
              </div>
              <div className="text-center flex-1">
                <div className="text-sm font-medium text-stone-500">{selectedParticipant.start_date}</div>
                <div className="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Start Date</div>
              </div>
            </div>

            {/* Day-by-day entries */}
            <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(80vh - 220px)' }}>
              <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'EB Garamond', serif" }}>
                Daily Entries
              </h3>

              {loadingEntries ? (
                <div className="flex items-center gap-3 text-stone-400 py-8 justify-center">
                  <div className="my21-loading-spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />
                  Loading entries...
                </div>
              ) : participantEntries.length === 0 ? (
                <p className="text-stone-400 text-sm py-4 text-center">No entries recorded yet.</p>
              ) : (
                <div className="space-y-4">
                  {participantEntries.map((entry) => {
                    const cl = entry.checklist_data || {};
                    const checkedCount = Object.values(cl).filter(Boolean).length;
                    const totalItems = Object.keys(cl).length;
                    const pct = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

                    // Get challenge config for checklist labels
                    const challengeType = selectedChallenge?.type || 'health';
                    const cfg = getChallengeConfig(challengeType);

                    return (
                      <div key={entry.day_number} className="bg-surface-container-low rounded-xl p-5 border border-surface-variant">
                        {/* Day header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                              {entry.day_number}
                            </div>
                            <div>
                              <div className="font-bold text-sm">Day {entry.day_number}</div>
                              <div className="text-[10px] text-stone-400">{entry.entry_date}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-surface-container rounded-full overflow-hidden">
                              <div className="bg-primary h-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs font-bold text-stone-500">{checkedCount}/{totalItems}</span>
                          </div>
                        </div>

                        {/* Checklist items */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mb-4">
                          {cfg.checklistItems.map((item) => {
                            const done = cl[item.key] === true;
                            return (
                              <div key={item.key} className="flex items-center gap-2 py-1">
                                <span className={`material-symbols-outlined text-sm ${done ? 'text-primary' : 'text-stone-300'}`}
                                  style={done ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                                  {done ? 'check_circle' : 'radio_button_unchecked'}
                                </span>
                                <span className={`text-xs ${done ? 'text-stone-700' : 'text-stone-400 line-through'}`}>
                                  {item.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Assessment + Notes */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {entry.energy && (
                            <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase">
                              Energy: {entry.energy}
                            </span>
                          )}
                          {entry.cravings && (
                            <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold uppercase">
                              Cravings: {entry.cravings}
                            </span>
                          )}
                          {entry.mood && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold uppercase">
                              Mood: {entry.mood}
                            </span>
                          )}
                          {entry.sleep_quality && (
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-[10px] font-bold uppercase">
                              Sleep: {entry.sleep_quality}
                            </span>
                          )}
                        </div>

                        {entry.notes && (
                          <div className="mt-2 p-3 bg-white rounded-lg text-xs text-stone-600 italic leading-relaxed border border-surface-variant">
                            "{entry.notes}"
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
