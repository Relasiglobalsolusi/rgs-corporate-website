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
  LogIn,
  TrendingUp,
} from "lucide-react";

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

        <div className="mt-4 flex w-full min-w-0 max-w-full items-center justify-center gap-2 sm:mt-5 sm:gap-4">
          <span
            className="h-px w-8 shrink-0 bg-gradient-to-r from-cyan-400 to-blue-500 sm:w-16 md:w-20"
            aria-hidden
          />
          <span className="min-w-0 whitespace-nowrap text-[0.5625rem] font-medium uppercase tracking-[0.08em] text-slate-400 min-[380px]:text-[0.625rem] min-[380px]:tracking-[0.12em] sm:text-[11px] sm:tracking-[0.2em]">
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
      className="relative min-h-[100svh] overflow-hidden bg-slate-950 text-white"
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

      <div className="relative z-10 site-gutter-x mx-auto min-h-[100svh] max-w-7xl pb-14 pt-[var(--hero-pad-top)] xl:flex xl:min-h-screen xl:pt-52">
        <div className="w-full xl:my-auto">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.85fr] lg:gap-8 xl:gap-12">
            <FadeIn>
              <div className="max-w-xl xl:max-w-none">
                <h1 className="max-w-full break-words leading-[0.98] tracking-[-0.03em]">
                  <span className="block text-[1.875rem] font-medium text-white min-[400px]:text-[2.25rem] sm:text-5xl md:text-6xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.25rem]">
                    {content.titleLine1}
                  </span>

                  <span className="mt-1.5 block text-[1.95rem] font-semibold text-teal-300 min-[400px]:text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[3.75rem] xl:text-[4.75rem] 2xl:text-[5.25rem]">
                    {content.titleLine2}
                  </span>

                  <span className="block text-[1.95rem] font-semibold text-teal-300 min-[400px]:text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[3.75rem] xl:text-[4.75rem] 2xl:text-[5.25rem]">
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

                <div className="mt-6 grid gap-2.5 sm:flex sm:flex-row">
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
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <RgsOnePanel />
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <div className="mt-12 grid max-w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/20 backdrop-blur-2xl sm:mt-14 sm:grid-cols-3 sm:rounded-[2rem] lg:mt-16">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-6 text-center sm:p-8 ${
                    index !== stats.length - 1
                      ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <div className="text-4xl font-semibold tracking-tight text-teal-300 sm:text-5xl md:text-6xl">
                    {stat.value}
                  </div>

                  <div className="mt-3 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-200 sm:text-xs sm:tracking-[0.28em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
