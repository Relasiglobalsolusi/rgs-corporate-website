# RGS Corporate Website — Continuity Brief (READ THIS FIRST)

> **For any AI assistant opening this project with no chat history.**  
> Last updated: 2026-07-22 (Asia/Jakarta).

---

## One-sentence product

Public marketing site for **PT Relasi Global Solusi** at **https://www.rgs.co.id**, with Login / CMS wired to the ERP at **https://one.rgs.co.id**.

---

## Production (live)

| Item | Value |
|------|--------|
| URL | **https://www.rgs.co.id** (apex `rgs.co.id` → 301 to www) |
| Host | **Same RumahWeb VPS** as ERP (`103.253.213.233`) |
| Path | `/var/www/rgs-corporate-website` |
| PM2 | **`rgs-website`**, `PORT=3001` |
| Nginx | `www.rgs.co.id` → `127.0.0.1:3001`; apex redirects to www |
| Code | `https://github.com/Relasiglobalsolusi/rgs-corporate-website.git` (`main`) |

### Not used in production anymore

- **Vercel** — site was moved to VPS (safe to delete Vercel account only after public HTTPS shows `Server: nginx` for apex + www with no `X-Vercel-*`).
- **`app.rgs.co.id`** — never use; portal is **`one.rgs.co.id`**.

---

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev   # port 3001
```

ERP (optional CMS) on **3000**.

### Env

| Variable | Production default |
|----------|-------------------|
| `NEXT_PUBLIC_CMS_URL` | `https://one.rgs.co.id/api/website/content` |
| `NEXT_PUBLIC_PORTAL_URL` | `https://one.rgs.co.id/login` |
| `SMTP_*` / `CONTACT_TO` | Contact form |

Fallbacks in code also default portal/CMS to `one.rgs.co.id` if env missing.

---

## Deploy updates

```bash
cd /var/www/rgs-corporate-website
git pull --ff-only origin main
npm install
npm run build
pm2 restart rgs-website --update-env
```

---

## Key code map

| Concern | File |
|---------|------|
| Portal login URL | `lib/portal.ts` |
| CMS fetch | `lib/cms.ts` |
| CMS images | `lib/cms-images.ts` |
| Contact form API | `app/api/contact/route.ts` |
| Hero / portal CTA | `components/Hero.tsx`, `components/PortalAccess.tsx` |
| robots.txt / sitemap | `app/robots.ts`, `app/sitemap.ts` |
| Favicon | `app/favicon.ico` |

---

## Pair project

ERP: **`rgs-system`** → https://one.rgs.co.id — see that repo’s `CONTINUITY.md`.

---

## First message on a new PC

> Read `CONTINUITY.md`. This site is on RumahWeb VPS (not Vercel). Portal/CMS use one.rgs.co.id. Then: \<task\>.
