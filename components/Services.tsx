import Image from "next/image";
import { ArrowUpRight, Car, ShieldCheck, Sparkles } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import type { CmsContent } from "@/lib/cms";
import { resolveCmsImageUrl } from "@/lib/cms-images";
import { dictionaries, localize, type Lang } from "@/lib/i18n";

const defaultServices = [
  {
    title: "Cleaning Services",
    label: "Clean & Healthy Workplaces",
    description:
      "Professional cleaning solutions for offices, commercial buildings, restaurants, hospitals, industrial facilities, and public environments.",
    image: "/images/services/cleaning.jpg",
  },
  {
    title: "Security Services",
    label: "Safe & Controlled Facilities",
    description:
      "Reliable security personnel, access control, patrol operations, and facility protection delivered with discipline and professionalism.",
    image: "/images/services/security.jpg",
  },
  {
    title: "Parking Management",
    label: "Efficient Parking Operations",
    description:
      "Structured parking management designed to improve traffic flow, visitor experience, site control, and operational efficiency.",
    image: "/images/services/parking.jpg",
  },
];

const icons = [Sparkles, ShieldCheck, Car];

type Props = {
  content: CmsContent["services"];
  lang: Lang;
};

export default function Services({ content, lang }: Props) {
  const services = (content.items.length ? content.items : localize(lang, defaultServices)).map((item, index) => ({
    ...item,
    image: resolveCmsImageUrl(item.image, defaultServices[index]?.image ?? "/images/services/cleaning.jpg"),
    Icon: icons[index] ?? Sparkles,
  }));

  return (
    <section id="services" className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="grid-texture pointer-events-none absolute inset-0" aria-hidden />
      <div className="site-gutter-x relative mx-auto max-w-7xl">
        <FadeIn className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-brand-300">{content.sectionLabel}</p>
            <h2 className="section-title mt-4">{content.title}</h2>
          </div>
          <p className="section-lead max-w-xl text-white/65 lg:justify-self-end">{content.subtitle}</p>
        </FadeIn>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map(({ Icon, ...service }, index) => (
            <FadeIn as="li" key={service.title} delay={index * 0.08} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900 transition duration-500 hover:-translate-y-1 hover:border-brand-400/40 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/0 to-transparent" />
                  <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 text-brand-700 shadow-sm backdrop-blur">
                    <Icon size={20} aria-hidden />
                  </span>
                  <p className="absolute inset-x-5 bottom-5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-300">
                    {service.label}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{service.title}</h3>
                  <p className="mt-3 flex-1 leading-7 text-white/65">{service.description}</p>
                  <a
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-300 transition hover:text-white"
                  >
                    {dictionaries[lang].services.request}
                    <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </article>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
