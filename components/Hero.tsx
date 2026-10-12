import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import type { CmsContent } from "@/lib/cms";
import { resolveCmsImageUrl } from "@/lib/cms-images";
import { dictionaries, localize, type Lang } from "@/lib/i18n";

const COMPANY_PROFILE_PDF = "/RGS-Company-Profile.pdf";

const fallbackHighlights = ["Cleaning", "Security", "Parking", "Facility Support"];
const fallbackStats = [
  { value: "1000+", label: "Professional Personnel" },
  { value: "50+", label: "Corporate Clients" },
  { value: "24/7", label: "Operational Support" },
];

type Props = {
  content: CmsContent["hero"];
  lang: Lang;
};

export default function Hero({ content, lang }: Props) {
  const highlights = content.highlights.length ? content.highlights : localize(lang, fallbackHighlights);
  const stats = content.stats.length ? content.stats : localize(lang, fallbackStats);
  const heroImage = resolveCmsImageUrl(content.backgroundImage, "/images/hero/hero.jpg");

  return (
    <section id="home" className="relative isolate flex min-h-[80svh] flex-col overflow-hidden bg-ink-950 text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        <div className="absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-brand-500/15 blur-[140px]" />
      </div>

      <div className="site-gutter-x mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center pb-16 pt-[calc(var(--header-height)+3rem)] lg:pb-20 lg:pt-[calc(var(--header-height)+3.5rem)]">
        <div className="max-w-3xl">
          <ul className="mb-7 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] font-medium text-white/70">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          <h1 className="text-[2.5rem] leading-[1.03] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem] xl:text-[5rem]">
            <span className="block">{content.titleLine1}</span>{" "}
            <span className="block bg-gradient-to-r from-brand-300 via-brand-400 to-accent-400 bg-clip-text text-transparent">
              {content.titleLine2} {content.titleLine3}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
            {content.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contact" className="btn btn-primary group">
              {content.ctaPrimary}
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href={COMPANY_PROFILE_PDF}
              download="RGS-Company-Profile.pdf"
              className="btn btn-light group gap-2.5 py-2 pl-2 pr-6 sm:gap-3 sm:py-1 sm:pl-1 sm:pr-7"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-950 text-brand-300 sm:h-10 sm:w-10 transition duration-300 group-hover:bg-brand-500 group-hover:text-white">
                <Download size={15} className="transition duration-300 group-hover:translate-y-0.5" aria-hidden />
              </span>
              {dictionaries[lang].hero.companyProfile}
            </a>
            <a href="#services" className="btn btn-ghost">
              {content.ctaSecondary}
            </a>
          </div>

          <dl className="mt-12 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/15 pt-8 sm:gap-10 lg:mt-14">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1.5 text-[0.625rem] leading-snug font-medium uppercase tracking-[0.08em] text-white/55 sm:text-xs sm:tracking-[0.14em] lg:whitespace-nowrap">
                  {stat.label}
                </dt>
                <dd className="text-3xl font-semibold tracking-tight text-white tabular-nums sm:text-4xl lg:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

    </section>
  );
}
