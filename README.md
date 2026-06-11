# Rudraksh — Jewellery E-Commerce Platform

A full-stack e-commerce platform for a premium jewellery store based in **Rishikesh, Uttarakhand**. Built with Next.js 15 App Router, PostgreSQL, Prisma ORM, and Razorpay payments.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | NextAuth.js v5 |
| Payments | Razorpay |
| Image Storage | Cloudinary |
| Emails | Resend |
| Deployment | Vercel |

---

## Features

**Customer Facing**
- Product catalog with filters (category, price, material)
- Product detail page with image gallery
- Cart & wishlist
- Secure checkout with Razorpay
- Order tracking & history
- Address management (multiple addresses)
- Email verification & password reset
- Google OAuth login
- Email OTP login

**Admin Panel**
- Dashboard (revenue, orders, stock overview)
- Product & category management
- Order management & status updates
- Customer management
- Review moderation
- Site settings (banners, announcements, contact info)

---

## Project Structure

```
rudraksh/
├── app/
│   ├── (store)/          # customer facing pages
│   ├── (admin)/          # admin panel
│   ├── (auth)/           # login, signup, reset password
│   └── api/              # API route handlers
├── components/           # reusable UI components
├── lib/                  # prisma client, helpers, utils
├── prisma/               # schema + migrations
├── public/               # static assets
├── SECURITY_README.md    # security rules for AI agents
└── PERFORMANCE_README.md # performance rules for AI agents
```

---

## Auth Phases

- **Phase 1** ✅ Email + Password + Email Verification + Password Reset
- **Phase 2** Google OAuth + Google One Tap
- **Phase 3** Email OTP Login

---

## Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/akshatkant/rudraksh.git
cd rudraksh
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in all values in `.env.local` (see Environment Variables below)

### 4. Push database schema
```bash
npx prisma db push
npx prisma generate
```

### 5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Environment Variables

```env
# Database
DATABASE_URL=

# Auth
AUTH_SECRET=
AUTH_URL=

# Google OAuth (Phase 2)
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXT_PUBLIC_GOOGLE_CLIENT_ID=

# Email (Resend)
RESEND_API_KEY=
EMAIL_FROM=

# Payments (Razorpay)
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Images (Cloudinary)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

> ⚠️ Never commit `.env.local` to git. All production secrets are managed by the client.

---

## Branch Strategy

```
main     → production (rudraksh.com)
dev      → staging
feature/ → preview deployments (auto by Vercel)
```

Always work on a feature branch → merge to dev → test → merge to main.

---

## Important Docs

Read these before making any changes:

- [`SECURITY_README.md`](./SECURITY_README.md) — auth guards, payment safety, SQL injection prevention
- [`PERFORMANCE_README.md`](./PERFORMANCE_README.md) — pagination, indexes, select optimization

---

## Deployment

Deployed on **Vercel** with automatic CI/CD:
- Push to `feature/*` → preview URL
- Push to `dev` → staging URL
- Push to `main` → production (`rudraksh.com`)

---

## About

Rudraksh is a premium jewellery brand located in **Rishikesh, Uttarakhand, India**, offering handcrafted gold, silver, and gemstone jewellery.

**Developed by [Akshat Kant](https://portfolio-ruby-nu-19.vercel.app)**