/**
 * One-off / maintenance script: renders an A4 multi-page Company Profile PDF
 * from real site/CMS copy and client logos under public/images/clients.
 *
 * Usage: node scripts/generate-company-profile-pdf.mjs
 * Output: public/RGS-Company-Profile.pdf
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
  { name: "Gitalaras", logo: "images/clients/gitalaras.png" },
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
      <img src="${assetUrl(c.logo)}" alt="${c.name}" />
      <span>${c.name}</span>
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
    .page {
      width: 210mm;
      min-height: 297mm;
      height: 297mm;
      padding: 18mm 16mm 16mm;
      page-break-after: always;
      break-after: page;
      position: relative;
      overflow: hidden;
    }
    .page:last-child { page-break-after: auto; break-after: auto; }
    .page-inner { height: 100%; display: flex; flex-direction: column; }

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
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #94a3b8;
      font-weight: 600;
      letter-spacing: 0.04em;
    }

    /* Cover */
    .cover {
      padding: 0;
      background: #020617;
      color: #fff;
    }
    .cover-inner {
      height: 100%;
      padding: 22mm 18mm 18mm;
      display: flex;
      flex-direction: column;
      background:
        radial-gradient(circle at 18% 22%, rgba(20,184,166,0.22), transparent 34%),
        radial-gradient(circle at 86% 78%, rgba(14,165,233,0.16), transparent 36%),
        linear-gradient(160deg, #020617 0%, #0f172a 55%, #020617 100%);
    }
    .cover-logo { width: 210px; height: auto; }
    .cover-kicker {
      margin-top: 48px;
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
      margin-top: auto;
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
      gap: 16px;
      margin-top: 8px;
    }
    .panel {
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 16px;
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
      margin-top: 14px;
    }
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

    /* Services */
    .service-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 6px;
    }
    .service-card {
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 14px 16px;
      background: #fff;
      border-left: 4px solid #14b8a6;
    }
    .service-card .eyebrow { color: #0d9488; margin-bottom: 4px; }

    /* Industries */
    .industry-grid {
      list-style: none;
      margin: 8px 0 0;
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
      margin-top: 6px;
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
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 8px;
    }
    .stat-card {
      border-radius: 16px;
      padding: 22px 18px;
      background: #020617;
      color: #fff;
      border: 1px solid #1e293b;
      text-align: center;
    }
    .stat-value {
      font-size: 36px;
      font-weight: 800;
      color: #5eead4;
      letter-spacing: -0.03em;
    }
    .stat-label {
      margin-top: 8px;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: #cbd5e1;
    }
    .stats-note {
      margin-top: 16px;
      padding: 14px 16px;
      border-radius: 12px;
      background: #f0fdfa;
      border: 1px solid #99f6e4;
      color: #134e4a;
      font-size: 12px;
      line-height: 1.6;
    }

    /* Clients — full logo grid */
    .clients-intro { margin-bottom: 10px; }
    .client-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .client-card {
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #fff;
      padding: 8px 6px 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 72px;
    }
    .client-card img {
      max-width: 90%;
      max-height: 36px;
      width: auto;
      height: auto;
      object-fit: contain;
    }
    .client-card span {
      margin-top: 5px;
      font-size: 7.5px;
      font-weight: 700;
      color: #64748b;
      text-align: center;
      line-height: 1.2;
    }
    .clients-note {
      margin-top: 12px;
      font-size: 10px;
      color: #64748b;
      text-align: center;
    }

    /* RGS ONE */
    .rgsone-wrap {
      display: grid;
      grid-template-columns: 0.9fr 1.1fr;
      gap: 16px;
      margin-top: 8px;
      align-items: center;
    }
    .rgsone-panel {
      border-radius: 18px;
      background: #020617;
      border: 1px solid #1e293b;
      padding: 22px 18px;
      text-align: center;
    }
    .rgsone-panel img {
      width: 160px;
      height: auto;
    }
    .rgsone-tag {
      margin-top: 14px;
      font-size: 9px;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .rgsone-list {
      margin: 0;
      padding: 0 0 0 18px;
      color: #334155;
      font-size: 12px;
      line-height: 1.8;
    }

    /* Contact */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 10px;
    }
    .contact-card h3 { margin-bottom: 10px; }
    .contact-card p, .contact-card a {
      display: block;
      color: #334155;
      font-size: 12px;
      line-height: 1.7;
      text-decoration: none;
      font-weight: 600;
    }
    .cta-box {
      margin-top: 16px;
      border-radius: 16px;
      padding: 18px;
      background: linear-gradient(135deg, #020617, #0f172a);
      color: #fff;
    }
    .cta-box h3 { color: #fff; font-size: 18px; margin-bottom: 8px; }
    .cta-box p { color: #cbd5e1; }
    .cta-actions {
      margin-top: 14px;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .cta-chip {
      padding: 8px 12px;
      border-radius: 999px;
      background: #fff;
      color: #020617;
      font-size: 10px;
      font-weight: 800;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>

  <!-- 1. Cover -->
  <section class="page cover">
    <div class="cover-inner">
      <img class="cover-logo" src="${logoUrl}" alt="RGS Relasi Global Solusi" />
      <p class="cover-kicker">Company Profile</p>
      <h1 class="cover-title">Creating<br /><span>Better</span><br /><span>Environments</span></h1>
      <p class="cover-legal">PT Relasi Global Solusi</p>
      <p class="cover-tagline">Built for cleaner, safer, better-managed environments.</p>
      <div class="cover-bottom">
        <div>
          <span class="cover-pill">Cleaning · Security · Parking · Facility Support</span>
        </div>
        <div class="cover-year">${year}</div>
      </div>
    </div>
  </section>

  <!-- 2. About -->
  <section class="page">
    <div class="page-inner">
      <p class="eyebrow">About Us</p>
      <h2>Company Overview</h2>
      <hr class="divider" />
      <div class="about-grid">
        <div>
          <p class="lede">
            Relasi Global Solusi delivers professional cleaning, security, parking management,
            and integrated facility support for businesses that require dependable daily operations.
          </p>
          <p class="lede" style="margin-top:14px">
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
        <div class="panel dark">
          <p class="eyebrow">Trusted Operations</p>
          <p style="margin-top:10px">
            RGS supports demanding facilities with trained personnel, responsive management,
            and consistent daily execution across commercial offices, hospitals, hotels,
            retail centres, residential developments, and industrial facilities.
          </p>
        </div>
      </div>
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 3. Services -->
  <section class="page">
    <div class="page-inner">
      <p class="eyebrow">Our Services</p>
      <h2>Integrated services for better facility operations.</h2>
      <hr class="divider" />
      <p class="lede">
        RGS provides essential facility services that help businesses maintain cleaner, safer,
        and more efficient environments every day.
      </p>
      <div class="service-grid" style="margin-top:18px">
        ${serviceCards}
      </div>
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 4. Industries + Why -->
  <section class="page">
    <div class="page-inner">
      <p class="eyebrow">Industries We Serve</p>
      <h2>Supporting every environment that matters.</h2>
      <hr class="divider" />
      <p class="lede">
        From premium office towers to hospitals, hotels, logistics facilities, and educational
        institutions, RGS provides dependable facility management solutions tailored to each industry.
      </p>
      <ul class="industry-grid">${industryItems}</ul>

      <div style="margin-top:22px">
        <p class="eyebrow">Why Choose RGS</p>
        <h2 style="font-size:22px">A trusted partner for modern facility management.</h2>
        <hr class="divider" />
        <p class="lede" style="margin-top:0">
          We combine experienced professionals, standardized operating procedures, and integrated
          service management to help clients maintain safe, clean, and efficient facilities.
        </p>
        <div class="why-grid">${whyItems}</div>
      </div>

      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 5. At a Glance -->
  <section class="page">
    <div class="page-inner">
      <p class="eyebrow">At a Glance</p>
      <h2>Scale, reliability, and operational discipline.</h2>
      <hr class="divider" />
      <div class="stats-grid">${statItems}</div>
      <div class="stats-note">
        Highly trained personnel supporting cleaning, security, parking, and integrated facility
        management operations throughout Indonesia — with responsive coordination to keep facilities
        running smoothly every day.
      </div>
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 6. Featured Clients (all logos from site) -->
  <section class="page">
    <div class="page-inner">
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
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year} · ${clients.length} Featured Clients</span>
      </div>
    </div>
  </section>

  <!-- 7. RGS ONE -->
  <section class="page">
    <div class="page-inner">
      <p class="eyebrow">RGS ONE Platform</p>
      <h2>One Platform. Complete Visibility.</h2>
      <hr class="divider" />
      <div class="rgsone-wrap">
        <div class="rgsone-panel">
          <img src="${rgsOneUrl}" alt="RGS ONE" />
          <p class="rgsone-tag">Track · Report · Monitor</p>
        </div>
        <div>
          <p class="lede" style="margin-top:0">
            Real-time project visibility, client portal access, and transparent reporting in one portal.
          </p>
          <ul class="rgsone-list" style="margin-top:14px">${erpItems}</ul>
          <p class="lede" style="margin-top:16px">
            Clients can access operational insight through the RGS ONE Client Portal at
            <strong>one.rgs.co.id</strong>.
          </p>
        </div>
      </div>
      <div class="footer-meta">
        <span>PT Relasi Global Solusi</span>
        <span>Company Profile · ${year}</span>
      </div>
    </div>
  </section>

  <!-- 8. Contact -->
  <section class="page">
    <div class="page-inner">
      <p class="eyebrow">Contact</p>
      <h2>Request a proposal for your facility.</h2>
      <hr class="divider" />
      <p class="lede">
        Whether you need cleaning, security, parking management, or a fully integrated facility
        solution, RGS is ready to support your daily operations with dependable service teams.
      </p>
      <div class="contact-grid">
        <div class="panel contact-card">
          <h3>Get In Touch</h3>
          <a href="tel:+622122952228">${contact.phone}</a>
          <a href="mailto:${contact.email}">${contact.email}</a>
          <p style="margin-top:10px">${contact.addressLines.join("<br />")}</p>
        </div>
        <div class="panel contact-card">
          <h3>Online</h3>
          <a href="https://rgs.co.id">rgs.co.id</a>
          <a href="https://one.rgs.co.id/login">RGS ONE Client Portal</a>
          <p style="margin-top:10px">
            Integrated Services · Responsive Support · Reliable Execution
          </p>
        </div>
      </div>
      <div class="cta-box">
        <h3>Ready to strengthen your facility operations?</h3>
        <p>
          Offices, hospitals, hotels, retail destinations, residences, logistics facilities,
          and industrial sites.
        </p>
        <div class="cta-actions">
          <span class="cta-chip">${contact.email}</span>
          <span class="cta-chip">${contact.phone}</span>
        </div>
      </div>
      <div class="footer-meta">
        <span>© ${year} PT Relasi Global Solusi. All rights reserved.</span>
        <span>rgs.co.id</span>
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
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
