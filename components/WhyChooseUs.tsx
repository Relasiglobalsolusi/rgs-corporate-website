import FadeIn from "@/components/ui/FadeIn";
import type { CmsContent } from "@/lib/cms";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  Shield,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

const rgsOneLogoSrc = "/images/rgs-one-logo-nav.png";
const MAX_FEATURES = 5;
const MAX_DESCRIPTION_LENGTH = 90;

type FeatureItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
  iconSrc?: string;
  href?: string;
  linkLabel?: string;
};

const iconMap = [Shield, Users, Sparkles, Award, Clock3, CheckCircle2];

const rgsOneFeature: FeatureItem = {
  iconSrc: rgsOneLogoSrc,
  title: "RGS ONE Platform",
  description:
    "Real-time project visibility, client portal access, and transparent reporting in one portal.",
  href: "#rgs-one",
  linkLabel: "Learn more",
};

const defaultFeatures: FeatureItem[] = [
  {
    icon: Shield,
    title: "Integrated Facility Management",
    description: "One partner for cleaning, security, parking, and daily facility support.",
  },
  {
    icon: Users,
    title: "Experienced Professional Team",
    description: "Trained personnel with discipline, supervision, and clear standards.",
  },
  {
    icon: Award,
    title: "Consistent Quality Assurance",
    description: "Routine inspections and reporting to maintain reliable service quality.",
  },
  {
    icon: Clock3,
    title: "Responsive Operations",
    description: "Fast support from supervisors when urgent operational needs arise.",
  },
];

function isRgsOneFeature(feature: { title: string }) {
  return feature.title.toLowerCase().includes("rgs one");
}

function shortenDescription(text: string): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  const firstSentence =
    normalized.match(/^[^.!?]+[.!?]/)?.[0]?.trim() ?? normalized;

  if (firstSentence.length <= MAX_DESCRIPTION_LENGTH) {
    return firstSentence;
  }

  const truncated = firstSentence.slice(0, MAX_DESCRIPTION_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");

  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : MAX_DESCRIPTION_LENGTH).trim()}…`;
}

function buildFeatures(content: CmsContent["whyChooseUs"]): FeatureItem[] {
  const baseFeatures: FeatureItem[] = content.features.length
    ? content.features.map((feature, index) => ({
        ...feature,
        icon: iconMap[index] ?? CheckCircle2,
      }))
    : defaultFeatures;

  const rgsOneFromContent = baseFeatures.find(isRgsOneFeature);
  const otherFeatures = baseFeatures.filter((feature) => !isRgsOneFeature(feature));

  const ordered: FeatureItem[] = rgsOneFromContent
    ? [
        {
          ...rgsOneFromContent,
          iconSrc: rgsOneFeature.iconSrc,
          href: rgsOneFeature.href,
          linkLabel: rgsOneFeature.linkLabel,
        },
        ...otherFeatures,
      ]
    : [rgsOneFeature, ...otherFeatures];

  return ordered.slice(0, MAX_FEATURES).map((feature) => ({
    ...feature,
    description: shortenDescription(feature.description),
  }));
}

type Props = {
  content: CmsContent["whyChooseUs"];
};

export default function WhyChooseUs({ content }: Props) {
  const features = buildFeatures(content);
  const [featured, ...rest] = features;

  return (
    <section id="why-choose-us" className="bg-white site-gutter-x py-24 text-slate-950 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-12 max-w-3xl md:mb-14">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-600">
              {content.sectionLabel}
            </p>

            <h2 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {content.title}
            </h2>

            {content.subtitle ? (
              <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                {content.subtitle}
              </p>
            ) : null}
          </div>
        </FadeIn>

        {featured ? (
          <FadeIn delay={0.05}>
            <article className="mb-6 flex flex-col gap-5 rounded-[1.75rem] border border-teal-200 bg-gradient-to-br from-teal-50/80 to-white p-6 shadow-sm sm:flex-row sm:items-center sm:gap-6 md:p-7">
              <div
                className={
                  featured.iconSrc
                    ? "flex h-20 w-28 shrink-0 items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-md sm:h-24 sm:w-32"
                    : "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-md ring-1 ring-teal-100"
                }
              >
                {featured.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.iconSrc}
                    alt=""
                    width={96}
                    height={63}
                    className="h-auto w-20 max-w-full object-contain sm:w-24"
                  />
                ) : featured.icon ? (
                  <featured.icon size={24} />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-black text-slate-950 md:text-2xl">
                  {featured.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600 md:text-base">
                  {featured.description}
                </p>
              </div>

              {featured.href ? (
                <a
                  href={featured.href}
                  className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-black uppercase tracking-wide text-teal-700 transition hover:text-teal-600 sm:self-center"
                >
                  {featured.linkLabel ?? "Learn more"}
                  <ArrowRight size={16} />
                </a>
              ) : null}
            </article>
          </FadeIn>
        ) : null}

        {rest.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {rest.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <FadeIn key={feature.title} delay={0.1 + index * 0.05}>
                  <article className="group h-full rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/60">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-teal-400 transition duration-300 group-hover:bg-teal-600 group-hover:text-white">
                      {Icon ? <Icon size={20} /> : null}
                    </div>

                    <h3 className="text-base font-black leading-snug text-slate-950 md:text-lg">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {feature.description}
                    </p>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
