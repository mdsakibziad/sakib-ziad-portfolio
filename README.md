# Sakib Ziad — Portfolio Website & Client Portal

A luxury personal portfolio and access-gated client portal for **Sakib Ziad**, AI Creative Strategist. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Supabase Auth & Database, and Stripe Payments.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + Pure Monochromatic Liquid-Glass Design System |
| Animation | Framer Motion 11 + Pure GPU CSS Keyframes |
| Authentication | Supabase Auth (Email/Password, Email Verification, Google OAuth) |
| Database | Supabase Postgres (Profiles, Purchases, Memberships with RLS) |
| Payments | Stripe Checkout (One-time digital products + monthly subscriptions) |
| Customer Portal | Stripe Hosted Customer Billing Portal |
| UI Primitives | Radix UI (Dialog, Accordion, Tabs, Label, Slot) |
| Icons | Lucide React |
| Transactional Email | Resend |
| AI Diagnostic | OpenAI GPT-4o / Anthropic Claude fallback |
| Deployment | Vercel |

---

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and populate the required keys (see Environment Variables table below).

### 3. Initialize Supabase Database

1. Create a project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase Dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](supabase/schema.sql).
4. In **Authentication -> URL Configuration**, add your site URL (e.g. `http://localhost:3000` and `https://sakibziad.my`) and redirect URL: `http://localhost:3000/auth/callback`.

### 4. Set up Stripe Payments (Test Mode)

1. Get your test API keys from **Stripe Dashboard -> Developers -> API Keys**:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (`pk_test_...`)
   - `STRIPE_SECRET_KEY` (`sk_test_...`)
2. To test webhooks locally, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run:
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Copy the outputted webhook signing secret (`whsec_...`) into `STRIPE_WEBHOOK_SECRET` in `.env.local`.
4. In **Stripe Dashboard -> Settings -> Customer Portal**, enable the portal so members can manage or cancel their subscriptions self-serve.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Base URL of the website (e.g. `http://localhost:3000` or production URL) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase Project URL (`https://your-project.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase Anon Public Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase Service Role Secret (used strictly in backend webhook handler) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe Publishable Key (`pk_test_...`) |
| `STRIPE_SECRET_KEY` | Yes | Stripe Secret Key (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe Webhook Secret (`whsec_...`) |
| `RESEND_API_KEY` | Yes | API key from [resend.com](https://resend.com) |
| `NOTIFICATION_EMAIL` | Optional | Inbound notification destination (default: `Sakib@witlyn.com`) |
| `OPENAI_API_KEY` | Optional | For AI Gap & Opportunity Diagnostic Report generation |
| `ANTHROPIC_API_KEY` | Optional | Alternative LLM fallback for diagnostic report |
| `SLACK_WEBHOOK_URL` | Optional | Inbound webhook URL for Slack notifications |
| `NEXT_PUBLIC_CAL_LINK` | Optional | Cal.com booking link |

---

## Database Architecture & Row Level Security

The application uses three dedicated tables in Supabase Postgres:

1. **`profiles`**:
   - Linked 1:1 with `auth.users` on cascade delete.
   - Automatically created via trigger when a new user signs up.
   - Protected with RLS: Users can only select and update their own profile.
2. **`purchases`**:
   - Tracks one-time purchases of digital prompt frameworks and AI kits.
   - Contains `user_id`, `product_id`, `product_name`, `amount_paid`, `stripe_session_id`, and `download_ref`.
   - Protected with RLS: Users can only read their own purchase records.
3. **`memberships`**:
   - Tracks ongoing subscriptions for The Advisory Syndicate.
   - Contains `user_id`, `status` (`active`, `canceled`, `past_due`), `stripe_customer_id`, `stripe_subscription_id`, and `current_period_end`.
   - Protected with RLS: Users can only read their own membership status.
   - Fulfillments and updates are performed securely by the Stripe webhook route via the Supabase Service Role client.

---

## Account & Offer Architecture

* **Authentication Pages**:
  * `/sign-in`: Password authentication, Google OAuth, and redirect handling.
  * `/sign-up`: Account creation with email confirmation support.
  * `/forgot-password`: Password reset dispatch via Supabase Auth.
  * `/auth/callback`: Session exchange for OAuth and email verification links.
* **Protected Dashboard (`/account`)**:
  * Automatically gated by Next.js middleware.
  * Displays licensed digital blueprints with immediate asset download links.
  * Displays Advisory Syndicate membership tier, renewal date, and a direct button to the self-serve Stripe Customer Billing Portal.
  * Allows password updates and account sign out.
* **Offers**:
  * **Digital Products (`/digital-products`)**: Gated via Stripe Checkout for one-time purchases. Instant access unlocked in `/account`.
  * **Membership (`/membership`)**: Gated via Stripe Checkout recurring subscriptions.
  * **Consulting (`/consulting`)**: Application-gated (no account required) to preserve high conversion and zero friction for enterprise founders.
