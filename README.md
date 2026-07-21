# RGS Corporate Website — PT Relasi Global Solusi

Next.js site for **https://rgs.co.id** (RumahWeb VPS, PM2 on port 3001).

RGS ONE ERP lives separately at **https://one.rgs.co.id** (same VPS, port 3000).

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
| `CONTACT_TO` | Inbox for inquiries (falls back to `SMTP_USER`, then `contact@rgs.co.id`) |

## Production

- Host: **RumahWeb VPS** (`/var/www/rgs-corporate-website`, PM2 `rgs-website`, Nginx → `127.0.0.1:3001`)
- Domain: `rgs.co.id` (+ `www`)
- Login / CMS: `one.rgs.co.id` (ERP on same VPS)

Do **not** point portal/CMS URLs at `app.rgs.co.id`.
