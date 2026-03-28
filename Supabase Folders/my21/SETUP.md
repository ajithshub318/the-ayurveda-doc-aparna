# My21 Tracker — Setup Guide

## 1. Supabase Setup (10 minutes)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click "New Project" — name it `theayurvedadoc-my21`
3. Choose a database password and a region close to India (Mumbai if available)
4. Once the project is created, go to **SQL Editor** in the sidebar
5. Paste the contents of `supabase-schema.sql` and click **Run**
6. Go to **Settings > API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Add to Your Next.js Project

### Install Supabase client:
```bash
npm install @supabase/supabase-js
```

### Copy files into your project:
```
your-nextjs-project/
├── lib/
│   ├── supabase.js          ← from my21/lib/supabase.js
│   └── actions.js            ← from my21/lib/actions.js
├── app/
│   └── my21/
│       ├── page.jsx          ← Landing page (signup + login)
│       ├── today/
│       │   └── page.jsx      ← Daily tracker
│       ├── progress/
│       │   └── page.jsx      ← 21-day progress view
│       └── admin/
│           └── page.jsx      ← Dr. Aparna's dashboard
```

### Add environment variables:
Copy `env.example` to `.env.local` in your project root and fill in the values.

### Add Google Fonts (if not already in your layout):
In your `app/layout.jsx` or `_document.jsx`, add:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
```

## 3. Create the First Challenge

1. Go to `theayurvedadoc.com/my21/admin`
2. Enter your admin password
3. Click "+ New Challenge"
4. Fill in:
   - **Name:** 21-Day Sugar Cut
   - **Description:** For 21 days, cut every source of refined sugar — white sugar, jaggery, honey, ketchup, sauces, ice cream, maida, biscuits, and packaged "health" foods. Keep fruits, dry fruits, rice, and whole grains. Track how your body responds.
   - **Duration:** 21
5. Click "Create & Set as Active"

## 4. Share the Link

The tracker is live at: `theayurvedadoc.com/my21`

Share this link in:
- Instagram bio
- Reel captions
- WhatsApp messages
- The Sugar Cut Challenge intro video end card

## Notes

- **Session storage:** User sessions are stored in browser sessionStorage. If they close the browser, they'll need to log in again with their WhatsApp + PIN. This is intentional — keeps it simple and secure.
- **One active challenge:** Only one challenge can be active at a time. When you create a new one, it automatically deactivates the previous one.
- **CSV export:** The admin panel lets you export all participants as CSV with name, email, WhatsApp, start date, and progress.
- **WhatsApp links:** In the admin panel, each user's WhatsApp number is clickable — opens a direct WhatsApp chat.
