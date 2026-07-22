import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import type { CmsContent } from "@/lib/cms";
import { resolveCmsImageUrl } from "@/lib/cms-images";
import { portalLoginUrl } from "@/lib/portal";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Download,
  LogIn,
  TrendingUp,
} from "lucide-react";

const COMPANY_PROFILE_PDF = "/RGS-Company-Profile.pdf";

type Props = {
  content: CmsContent["hero"];
};

const rgsOneLogoSrc = "/images/rgs-one-logo-nav.png";
const rgsOneLogoIntrinsic = { width: 1024, height: 682 };

const capabilities = [
  { icon: ClipboardList, label: "Track" },
  { icon: BarChart3, label: "Report" },
  { icon: TrendingUp, label: "Monitor" },
] as const;

const erpFeatures = [
  "Project tracking & site locations",
  "Daily progress & photo reports",
  "Staff attendance & on-site check-in",
  "Leave requests & approvals",
  "Client portal & monthly reports",
] as const;

function RgsOnePanel() {
  return (
    <div
      id="rgs-one"
      className="scroll-anchor relative mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-black/50 sm:rounded-[2rem] sm:p-6 lg:p-8"
    >
      <div className="flex w-full min-w-0 flex-col items-center justify-center text-center">
        <div className="mx-auto flex w-full justify-center px-1 py-2 sm:px-4 sm:py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={rgsOneLogoSrc}
            alt="RGS ONE"
            width={rgsOneLogoIntrinsic.width}
            height={rgsOneLogoIntrinsic.height}
            decoding="async"
            className="mx-auto h-28 w-auto max-w-[min(100%,22rem)] object-contain sm:h-36 lg:h-40 xl:h-44"
          />
        </div>

        {/*
          Lockup matches ERP login (/login): left accent rule + all-caps
          tagline. Keep on one line (whitespace-nowrap); scale down size/
          tracking on narrow card widths so overflow-hidden on the panel
          cannot clip "VISIBILITY".
        */}
        <div className="mt-5 flex w-full items-center justify-center gap-2 overflow-visible px-0.5 sm:gap-3">
          <span
            className="h-px w-6 shrink-0 bg-gradient-to-r from-cyan-400 to-blue-500 sm:w-10 md:w-12"
            aria-hidden
          />
          <span className="shrink-0 whitespace-nowrap text-center text-[8px] font-medium uppercase leading-none tracking-[0.08em] text-slate-400 min-[360px]:text-[9px] min-[360px]:tracking-[0.1em] min-[400px]:text-[10px] min-[400px]:tracking-[0.12em] sm:text-[11px] sm:tracking-[0.14em] lg:tracking-[0.16em]">
            One Platform. Complete Visibility.
          </span>
        </div>
      </div>

      <ul className="mt-6 space-y-2.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-4 sm:px-5 sm:py-5">
        {erpFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-left">
            <CheckCircle2
              size={15}
              className="mt-0.5 shrink-0 text-teal-400"
              aria-hidden="true"
            />
            <span className="text-sm leading-snug text-slate-200 sm:text-[0.9375rem]">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="mt-5 grid grid-cols-3 divide-x divide-slate-800 overflow-hidden rounded-xl border border-slate-800 bg-slate-900"
        role="list"
        aria-label="Platform capabilities"
      >
        {capabilities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              role="listitem"
              className="flex flex-col items-center gap-2 px-2 py-3.5 sm:gap-2.5 sm:px-3 sm:py-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-700/80 bg-slate-800 sm:h-9 sm:w-9">
                <Icon size={15} className="text-teal-400" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-[11px]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      <a
        href={portalLoginUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cta-label group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md sm:px-7"
      >
        <LogIn size={17} />
        Client Portal Login
        <ArrowUpRight
          size={17}
          className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </div>
  );
}

export default function Hero({ content }: Props) {
  const highlights = content.highlights.length
    ? content.highlights
    : ["Cleaning", "Security", "Parking", "Facility Support"];

  const stats = content.stats.length
    ? content.stats
    : [
        { value: "1000+", label: "Professional Personnel" },
        { value: "50+", label: "Corporate Clients" },
        { value: "24/7", label: "Operational Support" },
      ];

  const heroImage = resolveCmsImageUrl(
    content.backgroundImage,
    "/images/hero/hero.jpg"
  );

  return (
    <section
      id="home"
      className="hero-section relative min-h-[100svh] bg-slate-950 text-white"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Modern office building"
          fill
          priority
          sizes="100vw"
          className="scale-[1.02] object-cover object-center lg:object-right"
        />

        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_32%,rgba(20,184,166,0.2),transparent_34%)]" />
      </div>

      {/*
        Hero shell (globals.css): nav clearance → flex-1 stage that
        vertically centers one composition (copy | RGS ONE + stats).
      */}
      <div className="hero-shell relative z-10 site-gutter-x mx-auto max-w-7xl">
        <div className="hero-stage w-full min-h-0">
          <div className="hero-group w-full">
            {/*
              Desktop gap/columns live in globals.css (.hero-grid / .hero-copy /
              .hero-panel). Tailwind gap-* alone was masked by overflowing type.
            */}
            {/*
              Top-align columns so the RGS ONE card sits with the headline,
              not mid/low against the taller row (items-center / slide offset).
            */}
            <div className="hero-grid grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,27rem)]">
              <FadeIn offsetY="0" className="hero-copy min-w-0 self-start">
                <div className="max-w-xl">
                  <h1 className="max-w-full break-words leading-[0.98] tracking-[-0.03em]">
                    <span className="block text-[1.875rem] font-medium text-white min-[400px]:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.25rem]">
                      {content.titleLine1}
                    </span>

                    <span className="mt-1.5 block text-[1.95rem] font-semibold text-teal-300 min-[400px]:text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[3.75rem] xl:text-[4.5rem] 2xl:text-[4.75rem]">
                      {content.titleLine2}
                    </span>

                    <span className="block text-[1.95rem] font-semibold text-teal-300 min-[400px]:text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[3.75rem] xl:text-[4.5rem] 2xl:text-[4.75rem]">
                      {content.titleLine3}
                    </span>
                  </h1>

                  <p className="mt-5 max-w-lg text-sm leading-7 text-slate-200 md:text-base md:leading-8 lg:max-w-xl lg:text-lg lg:leading-8">
                    {content.subtitle}
                  </p>

                  <div className="mt-5 flex max-w-full flex-wrap gap-2">
                    {highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold text-slate-100 shadow-sm backdrop-blur-xl sm:px-3.5 sm:py-2 sm:text-xs"
                      >
                        <CheckCircle2
                          size={13}
                          className="shrink-0 text-teal-300"
                        />
                        {item}
                      </div>
                    ))}
                  </div>

                  {/*
                    CTA stack: primary + secondary side-by-side, then download
                    spans the full width of that two-button row (incl. gap).
                  */}
                  <div className="mt-6 inline-flex w-full max-w-full flex-col gap-2.5 sm:w-auto">
                    <div className="grid gap-2.5 sm:flex sm:flex-row">
                      <a
                        href="#contact"
                        className="hero-cta-label group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md sm:px-7 sm:py-4"
                      >
                        {content.ctaPrimary}
                        <ArrowRight
                          size={17}
                          className="transition duration-300 group-hover:translate-x-1"
                        />
                      </a>

                      <a
                        href="#services"
                        className="hero-cta-label inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-6 py-3.5 text-white shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/12 hover:text-teal-200 sm:px-7 sm:py-4"
                      >
                        {content.ctaSecondary}
                      </a>
                    </div>

                    <a
                      href={COMPANY_PROFILE_PDF}
                      download="RGS-Company-Profile.pdf"
                      className="hero-cta-label group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md sm:px-7 sm:py-4"
                    >
                      <Download size={17} className="shrink-0" aria-hidden />
                      Download Company Profile
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn offsetY="0" className="hero-panel min-w-0 self-start">
                <RgsOnePanel />
              </FadeIn>
            </div>

            <FadeIn delay={0.25} className="hero-stats-wrap w-full shrink-0">
              <div className="hero-stats grid max-w-full overflow-hidden sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`hero-stat px-5 py-4 text-center sm:px-6 sm:py-5 lg:px-8 lg:py-6 ${
                      index !== stats.length - 1 ? "hero-stat-divider" : ""
                    }`}
                  >
                    <div className="hero-stat-value text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                      {stat.value}
                    </div>

                    <div className="hero-stat-label mt-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] sm:text-xs sm:tracking-[0.28em]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
