/**
 * One-off / maintenance script: renders an A4 multi-page Company Profile PDF
 * from real site/CMS copy and client logos under public/images/clients.
 *
 * Usage: node scripts/generate-company-profile-pdf.mjs
 * Output: public/RGS-Company-Profile.pdf
 *
 * Page color zigzag (website-style):
 * 1 Cover dark → 2 About white → 3 Services dark →
 * 4 Industries/Why white → 5 Clients dark → 6 Contact white + navy closing footer
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicDir = path.join(root, "public");
const outPdf = path.join(publicDir, "RGS-Company-Profile.pdf");
const year = new Date().getFullYear();

const MIME_BY_EXT = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

/**
 * Embed public/ assets as data URIs. Puppeteer page.setContent() uses about:blank,
 * which Chromium blocks from loading file:// images — so file URLs appear broken
 * even when the files exist on disk.
 */
function assetUrl(rel) {
  const abs = path.join(publicDir, rel.replace(/^\//, ""));
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing asset: ${abs}`);
  }
  const ext = path.extname(abs).toLowerCase();
  const mime = MIME_BY_EXT[ext];
  if (!mime) {
    throw new Error(`Unsupported asset type for PDF embed: ${abs}`);
  }
  const base64 = fs.readFileSync(abs).toString("base64");
  return `data:${mime};base64,${base64}`;
}

const clients = [
  { name: "ACSET", logo: "images/clients/acset.png" },
  { name: "ASRI", logo: "images/clients/asri.png" },
  { name: "Boga Group", logo: "images/clients/boga-group.png" },
  { name: "Brawijaya Hospital", logo: "images/clients/brawijaya-hospital.png" },
  { name: "Damansara", logo: "images/clients/damansara.png" },
  { name: "ERHA", logo: "images/clients/erha.png" },
  { name: "First Filled", logo: "images/clients/first-filled.png" },
  { name: "FTL", logo: "images/clients/ftl.png" },
  // Light wordmark on white cards — invert like the website Clients section
  { name: "Gitalaras", logo: "images/clients/gitalaras.png", darken: true },
  { name: "Haidilao", logo: "images/clients/haidilao.png" },
  { name: "Hana Bank", logo: "images/clients/hana-bank.png" },
  { name: "Hokkaido Ya", logo: "images/clients/hokkaido-ya.png" },
  { name: "LOTTE", logo: "images/clients/lotte.png" },
  { name: "LRT Jakarta", logo: "images/clients/lrt-jakarta.png" },
  { name: "MAP", logo: "images/clients/map.png" },
  { name: "MRT Jakarta", logo: "images/clients/mrt-jakarta.png" },
  { name: "Nifarro Park", logo: "images/clients/nifarro-park.png" },
  { name: "Pakubuwono Signature", logo: "images/clients/pakubuwono-signature.png" },
  { name: "Panin Bank", logo: "images/clients/panin-bank.png" },
  { name: "PIK 2", logo: "images/clients/pik-2.png" },
  { name: "Pondok Indah", logo: "images/clients/pondok-indah.png" },
  { name: "PP Construction", logo: "images/clients/pp-construction.png" },
  { name: "Sentul City", logo: "images/clients/sentul-city.png" },
  { name: "Springhill Group", logo: "images/clients/springhill-group.png" },
  { name: "Sushi Tei", logo: "images/clients/sushi-tei.png" },
  { name: "Tiberias", logo: "images/clients/tiberias.png" },
  { name: "Tom Sushi", logo: "images/clients/tom-sushi.png" },
  { name: "Trans7", logo: "images/clients/trans7.png" },
  { name: "UNIQLO", logo: "images/clients/uniqlo.png" },
  { name: "Yoka Yoka", logo: "images/clients/yoka-yoka.png" },
];

const services = [
  {
    title: "Cleaning Services",
    label: "Clean & Healthy Workplaces",
    description:
      "Professional cleaning solutions for offices, commercial buildings, restaurants, hospitals, industrial facilities, and public environments.",
  },
  {
    title: "Security Services",
    label: "Safe & Controlled Facilities",
    description:
      "Reliable security personnel, access control, patrol operations, and facility protection delivered with discipline and professionalism.",
  },
  {
    title: "Parking Management",
    label: "Efficient Parking Operations",
    description:
      "Structured parking management designed to improve traffic flow, visitor experience, site control, and operational efficiency.",
  },
];

const industries = [
  "Corporate Offices",
  "Commercial Buildings",
  "Shopping Centres",
  "Hospitals",
  "Hotels",
  "Industrial Facilities",
  "Warehouses",
  "Educational Institutions",
];

const whyFeatures = [
  {
    title: "Integrated Facility Management",
    description:
      "One trusted partner for cleaning, security, parking, and daily facility support.",
  },
  {
    title: "Experienced Professional Team",
    description:
      "Trained personnel with discipline, supervision, and clear operational standards.",
  },
  {
    title: "Customized Service Solutions",
    description:
      "Every facility receives a practical solution based on its site, risk, and operating needs.",
  },
  {
    title: "Consistent Quality Assurance",
    description:
      "Routine inspections, reporting, and evaluations help maintain reliable service quality.",
  },
  {
    title: "Responsive Operations",
    description:
      "Fast support from supervisors and management when urgent operational needs arise.",
  },
  {
    title: "Trusted Client Experience",
    description:
      "Supporting offices, hospitals, hotels, retail destinations, residences, and industrial sites.",
  },
];

const erpFeatures = [
  "Project tracking & site locations",
  "Daily progress & photo reports",
  "Staff attendance & on-site check-in",
  "Leave requests & approvals",
  "Client portal & monthly reports",
];

const stats = [
  { value: "1000+", label: "Professional Personnel" },
  { value: "50+", label: "Corporate Clients" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "24/7", label: "Operational Support" },
];

const contact = {
  phone: "+62 21 2295 2228",
  email: "contact@rgs.co.id",
  addressLines: [
    "Jalan Daan Mogot KM 14.5",
    "Ruko Point 8 Blok F6",
    "Duri Kosambi, Cengkareng",
    "West Jakarta, Indonesia",
  ],
};

const logoUrl = assetUrl("images/logo.png");
const rgsOneUrl = assetUrl("images/rgs-one-logo-nav.png");

const clientCards = clients
  .map(
    (c) => `
    <div class="client-card">
      <img src="${assetUrl(c.logo)}" alt="${c.name}"${c.darken ? ' class="logo-dark"' : ""} />
    </div>`
  )
  .join("");

const serviceCards = services
  .map(
    (s) => `
    <div class="service-card">
      <p class="eyebrow">${s.label}</p>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    </div>`
  )
  .join("");

const industryItems = industries
  .map((name) => `<li>${name}</li>`)
  .join("");

const whyItems = whyFeatures
  .map(
    (f) => `
    <div class="why-card">
      <h3>${f.title}</h3>
      <p>${f.description}</p>
    </div>`
  )
  .join("");

const statItems = stats
  .map(
    (s) => `
    <div class="stat-card">
      <div class="stat-value">${s.value}</div>
      <div class="stat-label">${s.label}</div>
    </div>`
  )
  .join("");

const erpItems = erpFeatures.map((f) => `<li>${f}</li>`).join("");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>RGS Company Profile</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      color: #0f172a;
      background: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Shared page shell — balanced margins, vertically centered body */
    .page {
      width: 210mm;
      min-height: 297mm;
      height: 297mm;
      padding: 16mm 16mm 14mm;
      page-break-after: always;
      break-after: page;
      position: relative;
      overflow: hidden;
      background: #fff;
      color: #0f172a;
    }
    .page:last-child { page-break-after: auto; break-after: auto; }
    .page-inner {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .page-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 0;
    }

    .eyebrow {
      margin: 0 0 8px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      color: #0d9488;
    }
    h1, h2, h3 { margin: 0; }
    h2 {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      line-height: 1.15;
      color: #020617;
    }
    h3 {
      font-size: 14px;
      font-weight: 800;
      color: #020617;
      margin-bottom: 6px;
    }
    p { margin: 0; line-height: 1.55; color: #475569; font-size: 12px; }
    .lede { margin-top: 12px; max-width: 150mm; font-size: 13px; line-height: 1.65; }
    .divider {
      height: 2px;
      width: 42px;
      background: linear-gradient(90deg, #14b8a6, #0ea5e9);
      margin: 14px 0 18px;
      border: 0;
    }
    .footer-meta {
      flex-shrink: 0;
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #94a3b8;
      font-weight: 600;
      letter-spacing: 0.04em;
    }

    /* Dark page theme (cover navy) */
    .page-dark {
      background: #020617;
      color: #fff;
      padding: 0;
    }
    .page-dark .page-inner {
      padding: 18mm 16mm 14mm;
      background:
        radial-gradient(circle at 14% 18%, rgba(20,184,166,0.18), transparent 32%),
        radial-gradient(circle at 88% 82%, rgba(14,165,233,0.12), transparent 34%),
        linear-gradient(160deg, #020617 0%, #0f172a 55%, #020617 100%);
    }
    .page-dark .eyebrow { color: #5eead4; }
    .page-dark h2 { color: #f8fafc; }
    .page-dark h3 { color: #f1f5f9; }
    .page-dark p { color: #94a3b8; }
    .page-dark .lede { color: #cbd5e1; }
    .page-dark .footer-meta {
      border-top-color: rgba(255,255,255,0.12);
      color: #64748b;
    }

    /* Cover */
    .cover { padding: 0; background: #020617; color: #fff; }
    .cover-inner {
      height: 100%;
      padding: 22mm 18mm 18mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background:
        radial-gradient(circle at 18% 22%, rgba(20,184,166,0.22), transparent 34%),
        radial-gradient(circle at 86% 78%, rgba(14,165,233,0.16), transparent 36%),
        linear-gradient(160deg, #020617 0%, #0f172a 55%, #020617 100%);
    }
    .cover-logo { width: 380px; height: auto; }
    .cover-kicker {
      margin-top: 28px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: #5eead4;
    }
    .cover-title {
      margin-top: 14px;
      font-size: 46px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.05;
    }
    .cover-title span { color: #5eead4; }
    .cover-legal {
      margin-top: 18px;
      font-size: 16px;
      font-weight: 700;
      color: #e2e8f0;
    }
    .cover-tagline {
      margin-top: 10px;
      max-width: 140mm;
      font-size: 13px;
      line-height: 1.65;
      color: #94a3b8;
    }
    .cover-bottom {
      margin-top: 48px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 24px;
      border-top: 1px solid rgba(255,255,255,0.12);
      padding-top: 16px;
    }
    .cover-pill {
      display: inline-block;
      padding: 8px 14px;
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 999px;
      background: rgba(255,255,255,0.06);
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #cbd5e1;
    }
    .cover-year {
      font-size: 12px;
      font-weight: 700;
      color: #94a3b8;
      letter-spacing: 0.12em;
    }

    /* About */
    .about-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 14px;
      margin-top: 4px;
    }
    .panel {
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 14px 16px;
      background: #f8fafc;
    }
    .panel.dark {
      background: #020617;
      border-color: #1e293b;
      color: #e2e8f0;
    }
    .panel.dark p { color: #cbd5e1; }
    .panel.dark .eyebrow { color: #5eead4; }
    .highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 12px;
    }
    .about-rgsone { margin-top: 16px; }
    .about-rgsone h2,
    .about-glance h2 { font-size: 20px; }
    .about-glance { margin-top: 16px; }
    .chip {
      padding: 7px 11px;
      border-radius: 999px;
      border: 1px solid #99f6e4;
      background: #f0fdfa;
      color: #0f766e;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.04em;
    }

    /* Services (dark page) */
    .service-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
      margin-top: 10px;
    }
    .service-card {
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 16px 18px;
      background: #fff;
      border-left: 4px solid #14b8a6;
    }
    .service-card .eyebrow { color: #0d9488; margin-bottom: 4px; }
    .page-dark .service-card {
      background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.1);
      border-left-color: #2dd4bf;
    }
    .page-dark .service-card .eyebrow { color: #5eead4; }
    .page-dark .service-card h3 { color: #f8fafc; }
    .page-dark .service-card p { color: #94a3b8; }

    /* Industries */
    .industry-grid {
      list-style: none;
      margin: 10px 0 0;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .industry-grid li {
      padding: 14px 16px;
      border-radius: 12px;
      background: #020617;
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      border: 1px solid #1e293b;
    }

    /* Why */
    .why-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-top: 8px;
    }
    .why-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 12px 14px;
      background: #fff;
    }
    .why-card p { font-size: 11px; }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-top: 6px;
    }
    .stat-card {
      border-radius: 12px;
      padding: 12px 8px;
      background: #020617;
      color: #fff;
      border: 1px solid #1e293b;
      text-align: center;
    }
    .stat-value {
      font-size: 24px;
      font-weight: 800;
      color: #5eead4;
      letter-spacing: -0.03em;
      line-height: 1.1;
    }
    .stat-label {
      margin-top: 6px;
      font-size: 8px;
      font-weight: 800;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #cbd5e1;
      line-height: 1.3;
    }
    .stats-note {
      margin-top: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      background: #f0fdfa;
      border: 1px solid #99f6e4;
      color: #134e4a;
      font-size: 11px;
      line-height: 1.5;
    }

    /* Clients — logo-only white cards (match website Clients section) */
    .clients-intro { margin-bottom: 12px; }
    .client-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .client-card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #fff;
      padding: 6px 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 78px;
    }
    .page-dark .client-card {
      border-color: rgba(255,255,255,0.08);
      box-shadow: 0 1px 0 rgba(255,255,255,0.04);
    }
    .client-card img {
      max-width: 92%;
      max-height: 52px;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    /* Light logos (e.g. Gitalaras white-on-transparent) → solid black */
    .client-card img.logo-dark {
      filter: brightness(0);
      max-height: 44px;
    }
    .clients-note {
      margin-top: 14px;
      font-size: 10px;
      color: #64748b;
      text-align: center;
    }
    .page-dark .clients-note { color: #64748b; }

    /* RGS ONE */
    .rgsone-wrap {
      display: grid;
      grid-template-columns: 0.75fr 1.25fr;
      gap: 10px;
      margin-top: 6px;
      align-items: stretch;
    }
    .rgsone-panel {
      border-radius: 14px;
      background: #020617;
      border: 1px solid #1e293b;
      padding: 14px 12px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .rgsone-panel img {
      width: 120px;
      height: auto;
      margin: 0 auto;
    }
    .rgsone-tag {
      margin-top: 10px;
      font-size: 8px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .rgsone-list {
      margin: 0;
      padding: 0 0 0 16px;
      color: #334155;
      font-size: 11px;
      line-height: 1.55;
    }

    /* Contact — open typography (no bordered twin cards) */
    .contact-flow {
      margin-top: 22px;
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .contact-details {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 28px 36px;
      align-items: start;
    }
    .contact-block {
      position: relative;
      padding-left: 14px;
    }
    .contact-block::before {
      content: "";
      position: absolute;
      left: 0;
      top: 2px;
      bottom: 2px;
      width: 2px;
      border-radius: 1px;
      background: linear-gradient(180deg, #14b8a6, #0ea5e9);
      opacity: 0.85;
    }
    .contact-label {
      margin: 0 0 8px;
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #0d9488;
    }
    .contact-line {
      display: block;
      color: #0f172a;
      font-size: 13px;
      line-height: 1.65;
      text-decoration: none;
      font-weight: 700;
      letter-spacing: -0.01em;
    }
    .contact-line + .contact-line { margin-top: 4px; }
    .contact-address {
      margin-top: 10px;
      color: #475569;
      font-size: 11.5px;
      line-height: 1.65;
      font-weight: 500;
    }
    .contact-note {
      margin-top: 10px;
      color: #64748b;
      font-size: 11px;
      line-height: 1.55;
      font-weight: 500;
    }
    .contact-cta {
      margin-top: 4px;
      padding-top: 18px;
      border-top: 1px solid rgba(148, 163, 184, 0.28);
    }
    .contact-cta h3 {
      font-size: 17px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #020617;
      margin-bottom: 6px;
    }
    .contact-cta p {
      max-width: 140mm;
      color: #64748b;
      font-size: 12px;
      line-height: 1.6;
    }
    .contact-cta-links {
      margin-top: 12px;
      display: flex;
      flex-wrap: wrap;
      gap: 8px 18px;
      align-items: center;
    }
    .contact-cta-links a {
      color: #0f766e;
      font-size: 12px;
      font-weight: 800;
      text-decoration: none;
      letter-spacing: 0.01em;
      border-bottom: 1.5px solid rgba(20, 184, 166, 0.45);
      padding-bottom: 1px;
    }

    /* Contact — white body + full-bleed navy closing footer (cover brand dark) */
    .page-contact {
      padding-bottom: 0;
    }
    .page-contact .page-body {
      justify-content: flex-start;
      padding-top: 6px;
    }
    .closing-footer {
      position: relative;
      flex-shrink: 0;
      margin-top: auto;
      margin-left: -16mm;
      margin-right: -16mm;
      padding: 28px 16mm 22px;
      overflow: hidden;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 10px;
      /* Soft white→navy transition + brand glow spots behind logo */
      background:
        radial-gradient(ellipse 70% 55% at 50% 42%, rgba(20, 184, 166, 0.22), transparent 58%),
        radial-gradient(circle at 18% 28%, rgba(20, 184, 166, 0.16), transparent 36%),
        radial-gradient(circle at 84% 72%, rgba(14, 165, 233, 0.12), transparent 38%),
        radial-gradient(circle at 50% 100%, rgba(45, 212, 191, 0.08), transparent 42%),
        linear-gradient(180deg, #0b1224 0%, #020617 28%, #020617 100%);
      border-top: none;
      box-shadow: inset 0 1px 0 rgba(94, 234, 212, 0.22);
    }
    .closing-footer::before {
      content: "";
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 56px;
      height: 2px;
      background: linear-gradient(90deg, #14b8a6, #0ea5e9);
      border-radius: 1px;
      opacity: 0.9;
    }
    .closing-footer > * {
      position: relative;
      z-index: 1;
    }
    .closing-logo {
      width: 132px;
      height: auto;
      display: block;
      margin-top: 4px;
    }
    .closing-name {
      margin: 0;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.04em;
      color: #fff;
    }
    .closing-web {
      margin: 2px 0 0;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      color: #5eead4;
    }
    .closing-copy {
      margin: 4px 0 0;
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: #94a3b8;
    }
  </style>
</head>
<body>

  <!-- 1. Cover — dark -->
  <section class="page cover">
    <div class="cover-inner">
      <div>
        <img class="cover-logo" src="${logoUrl}" alt="RGS Relasi Global Solusi" />
        <p class="cover-kicker">Company Profile</p>
        <h1 class="cover-title">Creating<br /><span>Better</span><br /><span>Environments</span></h1>
        <p class="cover-legal">PT Relasi Global Solusi</p>
        <p class="cover-tagline">Built for cleaner, safer, better-managed environments.</p>
      </div>
      <div class="cover-bottom">
        <div>
          <span class="cover-pill">Cleaning · Security · Parking · Facility Support</span>
        </div>
        <div class="cover-year">${year}</div>
      </div>
    </div>
  </section>

  <!-- 2. About — white -->
  <section class="page">
    <div class="page-inner">
      <div class="page-body">
        <p class="eyebrow">About Us</p>
        <h2>Company Overview</h2>
        <hr class="divider" />
        <div class="about-grid">
          <div>
            <p class="lede" style="margin-top:0">
              Relasi Global Solusi delivers professional cleaning, security, parking management,
              and integrated facility support for businesses that require dependable daily operations.
            </p>
            <p class="lede" style="margin-top:8px">
              RGS provides essential facility services that help businesses maintain cleaner, safer,
              and more efficient environments every day.
            </p>
            <div class="highlights">
              <span class="chip">Cleaning</span>
              <span class="chip">Security</span>
              <span class="chip">Parking</span>
              <span class="chip">Facility Support</span>
            </div>
          </div>
          <div class="panel dark" style="padding:12px 14px">
            <p class="eyebrow">Trusted Operations</p>
            <p style="margin-top:8px;font-size:11.5px">
              RGS supports demanding facilities with trained personnel, responsive management,
              and consistent daily execution across commercial offices, hospitals, hotels,
              retail centres, residential developments, and industrial facilities.
            </p>
          </div>
        </div>

        <div class="about-glance">
          <p class="eyebrow">At a Glance</p>
          <h2>Scale, reliability, and operational discipline.</h2>
          <hr class="divider" />
          <div class="stats-grid">${statItems}</div>
          <div class="stats-note">
            Highly trained personnel supporting cleaning, security, parking, and integrated facility
            management throughout Indonesia — with responsive coordination every day.
          </div>
        </div>

        <div class="about-rgsone">
          <p class="eyebrow">RGS ONE Platform</p>
          <h2>One Platform. Complete Visibility.</h2>
          <hr class="divider" />
          <div class="rgsone-wrap">
            <div class="rgsone-panel">
              <img src="${rgsOneUrl}" alt="RGS ONE" />
              <p class="rgsone-tag">Track · Report · Monitor</p>
            </div>
            <div>
              <p class="lede" style="margin-top:0;font-size:12px">
                Real-time project visibility, client portal access, and transparent reporting in one portal.
              </p>
              <ul class="rgsone-list" style="margin-top:8px">${erpItems}</ul>
              <p class="lede" style="margin-top:8px;font-size:12px">
                Clients can access operational insight through the RGS ONE Client Portal at
                <strong>one.rgs.co.id</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 3. Services — dark -->
  <section class="page page-dark">
    <div class="page-inner">
      <div class="page-body">
        <p class="eyebrow">Our Services</p>
        <h2>Integrated services for better facility operations.</h2>
        <hr class="divider" />
        <p class="lede">
          RGS provides essential facility services that help businesses maintain cleaner, safer,
          and more efficient environments every day.
        </p>
        <div class="service-grid">${serviceCards}</div>
      </div>
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 4. Industries + Why — white -->
  <section class="page">
    <div class="page-inner">
      <div class="page-body">
        <p class="eyebrow">Industries We Serve</p>
        <h2>Supporting every environment that matters.</h2>
        <hr class="divider" />
        <p class="lede">
          From premium office towers to hospitals, hotels, logistics facilities, and educational
          institutions, RGS provides dependable facility management solutions tailored to each industry.
        </p>
        <ul class="industry-grid">${industryItems}</ul>

        <div style="margin-top:20px">
          <p class="eyebrow">Why Choose RGS</p>
          <h2 style="font-size:22px">A trusted partner for modern facility management.</h2>
          <hr class="divider" />
          <p class="lede" style="margin-top:0">
            We combine experienced professionals, standardized operating procedures, and integrated
            service management to help clients maintain safe, clean, and efficient facilities.
          </p>
          <div class="why-grid">${whyItems}</div>
        </div>
      </div>
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 5. Clients — dark (logos on white cards) -->
  <section class="page page-dark">
    <div class="page-inner">
      <div class="page-body">
        <p class="eyebrow">Client Experience</p>
        <h2>Trusted by respected brands and destinations.</h2>
        <hr class="divider" />
        <p class="lede clients-intro">
          RGS has supported organizations across commercial properties, banking, healthcare,
          hospitality, retail, residential, and public facilities.
        </p>
        <div class="client-grid">${clientCards}</div>
        <p class="clients-note">
          Selected client experience across commercial, healthcare, hospitality, retail,
          residential, industrial, and infrastructure sectors.
        </p>
      </div>
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year} · ${clients.length} Featured Clients</span>
      </div>
    </div>
  </section>

  <!-- 6. Contact — white body + navy closing footer -->
  <section class="page page-contact">
    <div class="page-inner">
      <div class="page-body">
        <p class="eyebrow">Contact</p>
        <h2>Request a proposal for your facility.</h2>
        <hr class="divider" />
        <p class="lede">
          Whether you need cleaning, security, parking management, or a fully integrated facility
          solution, RGS is ready to support your daily operations with dependable service teams.
        </p>
        <div class="contact-flow">
          <div class="contact-details">
            <div class="contact-block">
              <p class="contact-label">Get In Touch</p>
              <a class="contact-line" href="tel:+622122952228">${contact.phone}</a>
              <a class="contact-line" href="mailto:${contact.email}">${contact.email}</a>
              <p class="contact-address">${contact.addressLines.join("<br />")}</p>
            </div>
            <div class="contact-block">
              <p class="contact-label">Online</p>
              <a class="contact-line" href="https://www.rgs.co.id">www.rgs.co.id</a>
              <a class="contact-line" href="https://one.rgs.co.id/login">RGS ONE Client Portal</a>
              <p class="contact-note">
                Integrated Services · Responsive Support · Reliable Execution
              </p>
            </div>
          </div>
          <div class="contact-cta">
            <h3>Ready to strengthen your facility operations?</h3>
            <p>
              Offices, hospitals, hotels, retail destinations, residences, logistics facilities,
              and industrial sites — RGS is ready when you are.
            </p>
            <div class="contact-cta-links">
              <a href="mailto:${contact.email}">${contact.email}</a>
              <a href="tel:+622122952228">${contact.phone}</a>
            </div>
          </div>
        </div>
      </div>
      <div class="closing-footer">
        <img class="closing-logo" src="${logoUrl}" alt="RGS Relasi Global Solusi" />
        <div>
          <p class="closing-name">PT Relasi Global Solusi</p>
          <p class="closing-web">www.rgs.co.id</p>
          <p class="closing-copy">© ${year} All rights reserved.</p>
        </div>
      </div>
    </div>
  </section>

</body>
</html>`;

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    // Confirm every <img> decoded (data URIs / network), not broken placeholders.
    const imageCheck = await page.evaluate(async () => {
      const imgs = [...document.querySelectorAll("img")];
      await Promise.all(
        imgs.map(
          (img) =>
            img.complete
              ? Promise.resolve()
              : new Promise((resolve) => {
                  img.addEventListener("load", resolve, { once: true });
                  img.addEventListener("error", resolve, { once: true });
                })
        )
      );
      const broken = imgs
        .filter((img) => !(img.naturalWidth > 0 && img.naturalHeight > 0))
        .map((img) => img.alt || img.src.slice(0, 64));
      return { total: imgs.length, broken };
    });

    if (imageCheck.broken.length > 0) {
      throw new Error(
        `PDF images failed to load (${imageCheck.broken.length}/${imageCheck.total}): ${imageCheck.broken.join(", ")}`
      );
    }

    await page.pdf({
      path: outPdf,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });

    const pages = await page.evaluate(() => document.querySelectorAll(".page").length);
    const sizeKb = Math.round(fs.statSync(outPdf).size / 1024);
    console.log(`Wrote ${outPdf}`);
    console.log(`Pages: ${pages}`);
    console.log(`Size: ${sizeKb} KB`);
    console.log(`Clients embedded: ${clients.length}`);
    console.log(`Images verified: ${imageCheck.total}/${imageCheck.total}`);
    console.log(
      "Page colors: 1 Cover dark · 2 About white · 3 Services dark · 4 Industries/Why white · 5 Clients dark · 6 Contact white + navy footer"
    );
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
