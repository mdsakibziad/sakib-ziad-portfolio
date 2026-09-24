# Sakib Ziad — Portfolio Website

A luxury personal portfolio for **Sakib Ziad**, AI Creative Strategist, built with Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui primitives, and Framer Motion.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom design system |
| Animation | Framer Motion 11 |
| UI Primitives | Radix UI (Dialog, Accordion, Tabs, Label, Slot) |
| Icons | Lucide React |
| Email | Resend |
| Validation | Zod |
| Fonts | Fraunces (serif) + Inter (sans) via Google Fonts |
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

Then open `.env.local` and fill in each variable (see table below).

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ Yes | API key from [resend.com](https://resend.com) for sending contact form emails |
| `NOTIFICATION_EMAIL` | ✅ Yes | Email address that receives contact form notifications (e.g. `Sakib@witlyn.com`) |
| `OPENAI_API_KEY` | Optional | OpenAI API key for the Gap & Opportunity Report generation feature |
| `ANTHROPIC_API_KEY` | Optional | Anthropic Claude API key (alternative to OpenAI) |
| `SLACK_WEBHOOK_URL` | Optional | Slack incoming webhook URL for real-time lead notifications |
| `NEXT_PUBLIC_CAL_LINK` | ✅ Yes | Public Cal.com booking URL (e.g. `https://cal.com/sakib-ziad/strategy-call`) |

> **Important:** Never commit `.env.local` to version control. It is already listed in `.gitignore`.

---

## Deploying to Vercel

1. Push your repository to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Under **Environment Variables**, add each variable from the table above.
4. Click **Deploy**. Vercel will auto-detect Next.js and configure the build.
5. Set up your custom domain under **Project → Settings → Domains**.

For production, set `metadataBase` in `app/layout.tsx` to your live domain:

```ts
metadataBase: new URL('https://yourdomain.com'),
```

---

## Content Replacement Guide

Search the codebase for the following placeholders and replace them with real content before launch:

| Placeholder | Location | Description |
|---|---|---|
| `[HERO_HEADLINE]` | `app/page.tsx` | Main hero headline copy |
| `[HERO_SUBHEAD]` | `app/page.tsx` | Hero supporting sentence |
| `[HERO_IMAGE]` | `app/page.tsx` | Hero section background or portrait image path |
| `[CASE_STUDY_1_TITLE]` | `app/work/page.tsx` | First case study headline |
| `[CASE_STUDY_1_RESULT]` | `app/work/page.tsx` | Key result metric |
| `[CASE_STUDY_1_IMAGE]` | `app/work/page.tsx` | Case study cover image |
| `[SERVICE_1_TITLE]` | `app/consulting/page.tsx` | First consulting offer name |
| `[SERVICE_1_DESC]` | `app/consulting/page.tsx` | Service description |
| `[PRODUCT_1_TITLE]` | `app/digital-products/page.tsx` | First digital product name |
| `[PRODUCT_1_PRICE]` | `app/digital-products/page.tsx` | Product price |
| `[TESTIMONIAL_1_QUOTE]` | Various | Client quote text |
| `[TESTIMONIAL_1_NAME]` | Various | Client name and title |
| `[ABOUT_BIO]` | `app/about/page.tsx` | Full biography copy |
| `[ABOUT_IMAGE]` | `app/about/page.tsx` | Portrait photograph path |
| `[OG_IMAGE]` | `public/og-image.jpg` | OpenGraph social share image (1200×630px) |

---

## Cal.com Setup

1. Create an account at [cal.com](https://cal.com).
2. Set up an event type named **"Strategy Call"** (or similar).
3. Copy your booking link (e.g. `https://cal.com/sakib-ziad/strategy-call`).
4. Set it as `NEXT_PUBLIC_CAL_LINK` in `.env.local`.
5. The "Apply for a Call" buttons throughout the site will link directly to this URL.

For embedded Cal.com widgets, install the embed:

```bash
npm install @calcom/embed-react
```

Then use `<Cal calLink="sakib-ziad/strategy-call" />` in your contact or hero sections.

---

## Project Structure

```
├── app/
│   ├── globals.css          # Base styles, fonts, CSS variables
│   ├── layout.tsx           # Root layout — Nav + Footer
│   └── page.tsx             # Homepage (scaffold)
├── components/
│   ├── navigation.tsx       # Scroll-aware site nav
│   ├── footer.tsx           # Full site footer
│   └── ui/
│       ├── button.tsx       # CVA button variants
│       ├── input.tsx        # Styled input
│       ├── textarea.tsx     # Styled textarea
│       └── badge.tsx        # Tag/badge component
├── lib/
│   └── utils.ts             # cn() helper
├── public/                  # Static assets
├── tailwind.config.ts       # Full luxury design tokens
├── next.config.ts           # Next.js config
├── tsconfig.json            # TypeScript config
└── .env.local.example       # Environment variable template
```

---

## License

Private — all rights reserved. © 2024 Sakib Ziad / Witlyn.
