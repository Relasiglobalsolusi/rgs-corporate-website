# RGS Corporate Website — PT Relasi Global Solusi

Next.js site for **https://rgs.co.id** (Vercel).

RGS ONE ERP lives separately at **https://one.rgs.co.id** (RumahWeb VPS).

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

ERP (optional, for CMS content) runs on [http://localhost:3000](http://localhost:3000).

## Environment

See `.env.example`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CMS_URL` | ERP CMS API (`https://one.rgs.co.id/api/website/content`) |
| `NEXT_PUBLIC_PORTAL_URL` | Login button (`https://one.rgs.co.id/login`) |
| `SMTP_*` | Contact form mail |
| `CONTACT_TO` | Inbox for inquiries (defaults to `SMTP_USER`) |

## Production

- Host: **Vercel** (GitHub `main` auto-deploys)
- Domain: `rgs.co.id`
- Login / CMS: `one.rgs.co.id` (ERP on RumahWeb VPS + local Postgres)

Do **not** point portal/CMS URLs at `app.rgs.co.id`.
