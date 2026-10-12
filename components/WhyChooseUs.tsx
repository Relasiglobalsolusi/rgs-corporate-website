import { ArrowRight, ArrowUpRight, Award, CheckCircle2, Clock3, Shield, Sparkles, Users } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import type { CmsContent } from "@/lib/cms";
import { portalLoginUrl } from "@/lib/portal";
import { dictionaries, localize, type Lang } from "@/lib/i18n";

const icons = [Shield, Users, Sparkles, Award, Clock3, CheckCircle2];

const defaultFeatures = [
  {
    title: "Integrated Facility Management",
    description: "One partner for cleaning, security, parking, and daily facility support.",
  },
  {
    title: "Experienced Professional Team",
    description: "Trained personnel with discipline, supervision, and clear standards.",
  },
  {
    title: "Consistent Quality Assurance",
    description: "Routine inspections and reporting to maintain reliable service quality.",
  },
  {
    title: "Responsive Operations",
    description: "Fast support from supervisors when urgent operational needs arise.",
  },
];

// Used unless Company Details has its own "RGS ONE" entry in this list.
const defaultRgsOne = {
  title: "RGS ONE Platform",
  description:
    "Real-time project visibility, client portal access, and transparent reporting in one portal.",
};

function isRgsOne(feature: { title: string }) {
  return feature.title.toLowerCase().includes("rgs one");
}

type Props = {
  content: CmsContent["whyChooseUs"];
  lang: Lang;
};

export default function WhyChooseUs({ content, lang }: Props) {
  const t = dictionaries[lang];
  const all = content.features.length ? content.features : localize(lang, defaultFeatures);
  const rgsOne = all.find(isRgsOne) ?? localize(lang, defaultRgsOne);
  const features = all.filter((feature) => !isRgsOne(feature));

  return (
    <section id="why-choose-us" className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="grid-texture pointer-events-none absolute inset-0" aria-hidden />
      <div className="site-gutter-x relative mx-auto max-w-7xl">
        <FadeIn className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <p className="eyebrow text-brand-300">{content.sectionLabel}</p>
          <h2 className="section-title mt-4">{content.title}</h2>
          {content.subtitle ? (
            <p className="section-lead mx-auto mt-5 max-w-2xl text-white/65">{content.subtitle}</p>
          ) : null}
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <FadeIn className="md:col-span-2 lg:col-span-1 lg:row-span-3">
            <article className="relative isolate flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-ink-800 to-ink-900 p-7 text-white ring-1 ring-brand-400/40 sm:p-8">
              <div className="grid-texture pointer-events-none absolute inset-0 -z-10" aria-hidden />
              <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-brand-500/25 blur-[90px]" aria-hidden />

              {/* eslint-disable-next-line @next/next/no-img-element -- the PNG stays sharp at this size */}
              <img src="/images/rgs-one-logo-light.png" alt="RGS ONE" width={596} height={314} className="h-14 w-auto self-center" />

              <h3 className="mt-12 text-2xl font-semibold tracking-tight">{rgsOne.title}</h3>
              <p className="mt-3 leading-7 text-white/70">{rgsOne.description}</p>

              <ul className="mt-7 space-y-3 border-t border-white/10 pt-7">
                {t.why.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/85">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-brand-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto grid gap-3 pt-10 sm:grid-cols-2 lg:grid-cols-1">
                <a href={portalLoginUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary group">
                  {t.rgsOne.portalLogin}
                  <ArrowUpRight size={17} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a href="#rgs-one" className="btn btn-ghost group">
                  {t.why.learnMore}
                  <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          </FadeIn>

          {features.map((feature, index) => {
            const Icon = icons[index] ?? CheckCircle2;
            return (
              <FadeIn key={feature.title} delay={(index % 2) * 0.06} className="h-full">
                <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.07]">
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-300 transition duration-300 group-hover:bg-brand-400 group-hover:text-ink-950">
                      <Icon size={21} aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-white/35 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight sm:text-xl">{feature.title}</h3>
                  <p className="mt-2 leading-7 text-white/60">{feature.description}</p>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
