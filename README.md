# FileXone — Migrated to Supabase + Vercel

## Architecture

| Component | Service | Cost |
|-----------|---------|------|
| Frontend hosting | Vercel | Free |
| Auth (Google, Apple, Magic Link) | Supabase Auth | Free (50K users) |
| Database (profiles, Pro status) | Supabase Postgres | Free (500MB) |
| Serverless functions (3) | Supabase Edge Functions | Free (500K invocations/month) |
| Payments | Stripe | Pay-as-you-go |
| PDF processing | iLovePDF + CloudConvert + PDF.co | Existing API keys |

## Deployment Guide

### Step 1 — Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Copy your **Project URL** and **anon public key** from Settings → API
3. Run the database migration:
   - Go to SQL Editor in your Supabase dashboard
   - Paste the contents of `supabase/migrations/001_initial.sql`
   - Click "Run"
4. Enable Auth providers:
   - Go to Authentication → Providers
   - Enable **Google** (add your Google OAuth credentials)
   - Enable **Apple** (add your Apple OAuth credentials)
   - **Email** (Magic Link) is enabled by default
5. Set the Site URL in Authentication → URL Configuration:
   - Site URL: `https://your-domain.com`
   - Redirect URLs: `https://your-domain.com/**`

### Step 2 — Deploy Edge Functions

Install the Supabase CLI:

```bash
npm install -g supabase
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

Set your API secrets:

```bash
supabase secrets set CLOUDCONVERT_API_KEY=your-key-here
supabase secrets set PDFCO_API_KEY=your-key-here
```

Deploy the functions:

```bash
supabase functions deploy cloud-convert
supabase functions deploy pdfco-proxy
supabase functions deploy web-to-pdf
```

### Step 3 — Vercel Deployment

1. Push your code to a GitHub repo
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Set these environment variables in Vercel:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Deploy!

### Step 4 — Logo & Images

1. Download your logo from the old Base44 media URL
2. Save it as `public/logo.png`
3. Save an OG image as `public/og-image.png` (used for social media previews)

### Step 5 — Stripe Webhook (Optional but recommended)

To automatically activate Pro status when someone pays:

1. In Stripe Dashboard → Webhooks, create a new endpoint pointing to:
   `https://YOUR_PROJECT.supabase.co/functions/v1/stripe-webhook`
2. Listen for `checkout.session.completed` events
3. Create a new edge function `stripe-webhook` that updates the user's `is_pro` status

Currently, Pro activation happens on the `/success` page when the user returns from Stripe.

## Project Structure

```
src/
├── lib/
│   ├── supabaseClient.js    # Supabase client (NEW)
│   ├── api.js               # Edge function caller (NEW, replaces base44.functions.invoke)
│   ├── AuthContext.jsx       # Auth context (REWRITTEN for Supabase)
│   ├── useUsage.js           # Usage tracking (UPDATED, no more base44)
│   ├── pdfco.js              # PDF.co integration (UPDATED)
│   ├── ilovepdf.js           # iLovePDF integration (unchanged)
│   ├── stripe.js             # Stripe redirect (unchanged)
│   └── i18n.jsx              # Internationalization (unchanged)
├── components/
│   ├── AuthModal.jsx         # Sign-in modal (NEW, replaces base44.auth.redirectToLogin)
│   └── ...
├── pages/
│   └── ...
supabase/
├── functions/
│   ├── cloud-convert/        # PDF conversion (migrated from base44)
│   ├── pdfco-proxy/          # PDF.co proxy (migrated from base44)
│   └── web-to-pdf/           # Web to PDF (migrated from base44)
├── migrations/
│   └── 001_initial.sql       # Database schema
vercel.json                   # SPA routing config
.env.example                  # Environment variables template
```

## What Was Removed

- `@base44/sdk` — replaced by `@supabase/supabase-js`
- `@base44/vite-plugin` — not needed
- `src/api/base44Client.js` — replaced by `src/lib/supabaseClient.js`
- `src/lib/app-params.js` — not needed
- `base44/functions/` — migrated to `supabase/functions/`
- `src/components/UserNotRegisteredError.jsx` — not needed (Supabase handles this differently)
