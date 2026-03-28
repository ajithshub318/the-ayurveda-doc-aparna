# Netlify Deployment Setup

## Step 1: Add Environment Variables

Go to **Netlify Dashboard** → Your Site → **Site settings** → **Environment variables** → **Add a variable**

Add these 3 variables:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://ussbsxpvbfxfppjhuahr.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzc2JzeHB2YmZ4ZnBwamh1YWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NDQzODgsImV4cCI6MjA4OTMyMDM4OH0.As68yz0kKtmTYlgx9BrixPN71TbyxbEa-aLvO-Kakq4` |
| `VITE_MY21_ADMIN_PASSWORD` | `aparna2024a` |

## Step 2: Build Settings

Make sure your build settings are:

| Setting | Value |
|---|---|
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |
| **Node version** | `18` or higher |

## Step 3: Trigger Deploy

Go to **Deploys** → Click **"Trigger deploy"** → **"Deploy site"**

## Step 4: Verify

Once deployed, check these URLs:

- **Main site:** `yoursite.com` (should work as before)
- **Challenge page:** `yoursite.com/my21` (Sugar Cut Challenge landing)
- **Admin panel:** `yoursite.com/my21/admin` (password: `aparna2024a`)

## What Each Variable Does

| Variable | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Connects the app to the Supabase database (stores all user data, challenge data, daily entries) |
| `VITE_SUPABASE_ANON_KEY` | Public API key for Supabase (allows the app to read/write data securely) |
| `VITE_MY21_ADMIN_PASSWORD` | Password to access the admin dashboard at `/my21/admin` |

## Important Notes

- The `_redirects` file in `public/` folder handles SPA routing (already added)
- All `/my21/*` routes will work correctly after deploy
- The Supabase project may pause after 7 days of inactivity on the free tier — upgrade to Pro ($25/mo) to prevent this
- To change the admin password, update the `VITE_MY21_ADMIN_PASSWORD` variable in Netlify and redeploy
