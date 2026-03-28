# My21 — 21-Day Challenge Platform

## Complete Documentation

**Project:** The Ayurveda Doc — My21 Challenge System
**Built by:** Dr. Aparna Albert / The Ayurveda Doc
**Tech Stack:** React + TypeScript + Vite + Tailwind CSS + Supabase
**Live URL:** theayurvedadoc.com/my21

---

## 1. Overview

My21 is a unified 21-day wellness challenge platform embedded into The Ayurveda Doc website. It allows Dr. Aparna Albert to create and manage different types of 21-day challenges (e.g., Sugar Cut, Health) where patients sign up, track daily habits, and monitor their progress.

### Key Features
- **Multi-challenge support** — One platform, multiple challenge types (health, sugar cut, etc.)
- **Config-driven UI** — Challenge type determines checklist items, theme colors, tips, and copy
- **User authentication** — WhatsApp number + 4-digit PIN (hashed with SHA-256)
- **Daily tracking** — Checklist items, self-assessment (energy, mood, sleep, cravings), notes
- **Progress dashboard** — 21-day calendar, trends, weight journey, streaks
- **Admin panel** — Sidebar navigation, participant management, CSV export, participant detail modal
- **Mobile-first** — Optimized for mobile with bottom nav bar, responsive on desktop

---

## 2. Routes

| Route | Page | Access |
|---|---|---|
| `/my21` | Landing page — challenge info + signup/login modal | Public |
| `/my21/today` | Daily tracker — checklist, assessment, notes | Authenticated users |
| `/my21/progress` | Progress dashboard — calendar, trends, weight | Authenticated users |
| `/my21/admin` | Admin dashboard — manage challenges & participants | Password protected |
| `/sugar-cut-21` | Redirects to `/my21` | Public (legacy) |

---

## 3. User Flow

### 3.1 Patient/User Journey

1. **Visit** `/my21` — sees the active challenge landing page
   - If multiple challenges are active → sees a challenge picker card view
   - If one challenge is active → goes directly to that challenge's landing page
2. **Sign Up** — clicks "Join Challenge" or CTA button → modal opens
   - Enters: Name (required), WhatsApp (required), 4-digit PIN (required)
   - Optional: Email, Current Weight
   - Data stored in Supabase `my21_users` + `my21_enrollments`
3. **Daily Tracking** (`/my21/today`)
   - Sees Day X of 21 with daily Ayurvedic tip
   - Checks off daily habits (8 items, specific to challenge type)
   - Rates: Energy, Cravings, Mood, Sleep Quality
   - Writes optional notes
   - Saves entry → stored in `my21_daily_entries` (checklist as JSONB)
4. **Progress** (`/my21/progress`)
   - Stats: Days tracked, Sugar-free days, Best streak, Completion %
   - 21-day calendar with completed/missed/today indicators
   - Trend bars for each assessment category
   - Weight journey: Day 1 vs Day 21
   - WhatsApp CTA to contact Dr. Aparna
5. **Login next day** — WhatsApp + PIN → resumes from where they left off
6. **Day 21** — prompted to enter final weight, sees completion message

### 3.2 Admin Journey

1. **Login** at `/my21/admin` with admin password
2. **Dashboard view** — sees stats, challenges list, participants table, new challenge form
3. **Sidebar navigation:**
   - **Dashboard** — everything at a glance
   - **Challenges** — manage challenges + create new ones
   - **Participants** — full-width participant table with stats
   - **Settings** — placeholder (env-based config)
4. **Click a challenge** → loads its participants with progress bars
5. **Click a participant** → modal shows full detail:
   - Profile: name, WhatsApp, email, start date
   - Stats: days done, sugar-free days, weight
   - Day-by-day entries: checklist (green checks/gray circles), assessment tags, notes
6. **Create new challenge** — pick type (Health/Sugar Cut), set name, description, duration
7. **Toggle active/inactive** — only one challenge per type can be active at a time
8. **Export CSV** — downloads participant data as spreadsheet

---

## 4. Database Schema (Supabase)

### Tables

#### `my21_users`
| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | Auto-generated |
| name | TEXT | Required |
| email | TEXT | Optional, unique if provided |
| whatsapp | TEXT | Required, unique |
| pin_hash | TEXT | SHA-256 hash of 4-digit PIN |
| created_at | TIMESTAMPTZ | Auto |

#### `my21_challenges`
| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | Auto-generated |
| name | TEXT | Challenge name |
| description | TEXT | Challenge description |
| duration | INTEGER | Default 21 |
| is_active | BOOLEAN | Only one per type should be active |
| type | TEXT | 'health' or 'sugar_cut' |
| created_at | TIMESTAMPTZ | Auto |

#### `my21_enrollments`
| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | Auto-generated |
| user_id | UUID (FK) | References my21_users |
| challenge_id | UUID (FK) | References my21_challenges |
| start_date | DATE | Day 1 of the challenge |
| day1_weight | DECIMAL(5,1) | Optional |
| day21_weight | DECIMAL(5,1) | Optional, set at completion |
| completed | BOOLEAN | Set true when day21_weight saved |
| created_at | TIMESTAMPTZ | Auto |
| UNIQUE | | (user_id, challenge_id) |

#### `my21_daily_entries`
| Column | Type | Notes |
|---|---|---|
| id | UUID (PK) | Auto-generated |
| enrollment_id | UUID (FK) | References my21_enrollments |
| day_number | INTEGER | 1-21 |
| entry_date | DATE | Auto |
| checklist_data | JSONB | Flexible checklist (keys vary by challenge type) |
| energy | TEXT | low/okay/good/great |
| mood | TEXT | low/okay/good/great |
| sleep_quality | TEXT | low/okay/good/great |
| cravings | TEXT | none/mild/strong/intense |
| notes | TEXT | Free-form |
| woke_up_on_time | BOOLEAN | Legacy (not used for new entries) |
| drank_water | BOOLEAN | Legacy |
| exercised | BOOLEAN | Legacy |
| ate_home_cooked | BOOLEAN | Legacy |
| avoided_processed | BOOLEAN | Legacy |
| no_sugar | BOOLEAN | Legacy |
| read_or_learned | BOOLEAN | Legacy |
| slept_before_10 | BOOLEAN | Legacy |
| created_at | TIMESTAMPTZ | Auto |
| updated_at | TIMESTAMPTZ | Auto |
| UNIQUE | | (enrollment_id, day_number) |

### Row Level Security (RLS)
All tables have RLS enabled with permissive policies (anon key access for app-level operations).

---

## 5. Challenge Configuration System

The file `src/lib/challenge-config.ts` is the central registry that maps challenge `type` to all UI content.

### Currently Registered Types

#### `health` (21-Day Health Challenge)
- **Theme:** Sage green (#7BA787)
- **Checklist:** Wake up on time, drink water, exercise, home-cooked meals, avoid processed food, no sugar, read/learn, sleep before 10
- **Emojis:** 🌿 🧘 💧 ☀️ 🌙

#### `sugar_cut` (21-Day Sugar Cut Challenge)
- **Theme:** Coral (#E07A5F)
- **Checklist:** No sugar in drinks, no sugary drinks, no sweets, no packaged snacks, read labels, eat fruit, drink water, home-cooked meals
- **Daily tips:** 21 unique Ayurvedic tips (one per day)
- **Extra metric:** Sugar-free days count
- **Emojis:** 🍬 🍭 🍩 🍰 🍦

### Adding a New Challenge Type
1. Add a new config object in `challenge-config.ts`
2. Register it in the `configs` record
3. Add a migration to insert the challenge in the DB
4. That's it — the UI adapts automatically

---

## 6. File Structure

```
src/
  components/
    my21/
      My21Landing.tsx    — Landing page + auth modal + challenge picker
      My21Today.tsx      — Daily tracker (checklist, assessment, notes)
      My21Progress.tsx   — Progress dashboard (calendar, trends, weight)
      My21Admin.tsx      — Admin panel (sidebar, challenges, participants, detail)
      my21.css           — Shared animations, Material Symbols, premium styles
  lib/
    challenge-config.ts  — Central config registry for all challenge types
    my21-actions.ts      — All Supabase operations (auth, CRUD, entries)
    supabase.ts          — Supabase client initialization
  main.tsx               — Routes

supabase/
  migrations/
    20260317000000_my21_schema.sql          — Initial schema
    20260328100000_unified_challenge.sql    — Unified challenge updates
  config.toml                               — Supabase project config

public/
  _redirects             — Netlify SPA routing rule
```

---

## 7. Environment Variables

### Required for Development (.env.local)
```
VITE_SUPABASE_URL=https://ussbsxpvbfxfppjhuahr.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_MY21_ADMIN_PASSWORD=aparna2024a
```

### Required for Netlify (Production)
Same 3 variables must be set in:
**Netlify Dashboard → Site settings → Environment variables**

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project REST API URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| `VITE_MY21_ADMIN_PASSWORD` | Password to access /my21/admin |

---

## 8. Deployment

### Netlify
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18+
- **SPA redirects:** Handled by `public/_redirects` (`/* /index.html 200`)

### Supabase
- **Project:** `ussbsxpvbfxfppjhuahr` (theayurvedadoc-my21)
- **Region:** South Asia (Mumbai) — ap-south-1
- **Important:** Free tier pauses after 7 days of inactivity. Upgrade to Pro ($25/mo) or set up a cron ping.

---

## 9. Design System

### Typography
- **Headlines:** EB Garamond (serif) — elegant, premium feel
- **Body/Labels:** DM Sans (sans-serif) — clean, modern
- **Icons:** Material Symbols Outlined (Google)

### Colors
| Token | Hex | Usage |
|---|---|---|
| Background | #FAF7F2 | Warm cream page background |
| Primary (Sugar Cut) | #E07A5F | Coral — buttons, accents, hero |
| Primary Dark | #C45B4A | Darker coral — hover states |
| Primary Light | #FAD9D1 | Light coral — badges, highlights |
| Secondary (Health) | #7BA787 | Sage green — health theme |
| Accent | #D4A843 | Amber gold — quotes, prompts |
| Charcoal | #2C2C2C | Primary text |
| Warm Gray | #8A8778 | Muted text, labels |

### UI Features
- Glassmorphism bottom bar (backdrop-blur)
- Staggered entrance animations (fade-in-up)
- Check pop animations on checklist items
- Celebration animation when all tasks complete
- Responsive: mobile-first (480px max), expands on desktop
- Material Design 3 tokens for admin panel

---

## 10. API / Actions Reference

### Authentication
| Function | Description |
|---|---|
| `signUp({name, email?, whatsapp, pin, challengeId, day1Weight?})` | Register new user + enroll in challenge |
| `login({whatsapp, pin, challengeId})` | Authenticate + verify enrollment |

### Challenges
| Function | Description |
|---|---|
| `getActiveChallenges()` | Get all active challenges |
| `getAllChallenges()` | Get all challenges (admin) |
| `createChallenge({name, description, duration, type})` | Create + auto-activate |
| `toggleChallenge(id, isActive)` | Activate/deactivate (one per type) |

### Enrollments & Entries
| Function | Description |
|---|---|
| `getUserEnrollment(userId, challengeId?)` | Get user's enrollment + challenge info |
| `saveDailyEntry({enrollmentId, dayNumber, checklistData, assessment, notes})` | Upsert daily entry |
| `getDailyEntry(enrollmentId, dayNumber)` | Get single day's entry |
| `getAllEntries(enrollmentId)` | Get all entries for an enrollment |
| `saveDay21Weight(enrollmentId, weight)` | Save final weight + mark completed |

### Admin
| Function | Description |
|---|---|
| `adminLogin(password)` | Check password against env var |
| `getAdminUsers(challengeId?)` | Get participants with day counts + sugar-free days |

---

## 11. Session Management

Uses `sessionStorage` (clears when browser tab closes):
- `my21_user_id` — authenticated user's UUID
- `my21_user_name` — display name
- `my21_challenge_id` — currently enrolled challenge ID

---

## 12. Security Notes

- PINs are hashed with SHA-256 before storage (never stored in plaintext)
- Supabase RLS enabled on all tables
- Admin password stored as environment variable (not in code)
- No sensitive data exposed in client bundle (keys are anon-level only)
- Session data in sessionStorage (ephemeral, not persisted)

---

## 13. Known Limitations

1. **No "Forgot PIN" flow** — users must contact Dr. Aparna to reset
2. **Supabase free tier pauses** after 7 days of inactivity
3. **No email notifications** — relies on WhatsApp for communication
4. **No offline support** — requires internet connection
5. **Admin password is app-level** — not per-user auth (single admin)
6. **Assessment values vary** — stored lowercase, some inconsistency with legacy entries

---

## 14. Future Enhancements

- Forgot PIN flow via WhatsApp OTP
- Push notifications / WhatsApp reminders
- Recipe suggestions per challenge type
- Community leaderboard
- Multi-language support (Malayalam, Hindi)
- Detailed analytics dashboard with charts
- PDF progress report generation
- Offline-first with service worker sync
