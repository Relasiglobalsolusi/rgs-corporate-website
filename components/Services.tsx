import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import type { CmsContent } from "@/lib/cms";
import { resolveCmsImageUrl } from "@/lib/cms-images";
import { ArrowRight, Car, ShieldCheck, Sparkles } from "lucide-react";

const defaultServices = [
  {
    title: "Cleaning Services",
    label: "Clean & Healthy Workplaces",
    description:
      "Professional cleaning solutions for offices, commercial buildings, restaurants, hospitals, industrial facilities, and public environments.",
    image: "/images/services/cleaning.jpg",
    icon: Sparkles,
  },
  {
    title: "Security Services",
    label: "Safe & Controlled Facilities",
    description:
      "Reliable security personnel, access control, patrol operations, and facility protection delivered with discipline and professionalism.",
    image: "/images/services/security.jpg",
    icon: ShieldCheck,
  },
  {
    title: "Parking Management",
    label: "Efficient Parking Operations",
    description:
      "Structured parking management designed to improve traffic flow, visitor experience, site control, and operational efficiency.",
    image: "/images/services/parking.jpg",
    icon: Car,
  },
];

const iconMap = [Sparkles, ShieldCheck, Car];

type Props = {
  content: CmsContent["services"];
};

export default function Services({ content }: Props) {
  const services = content.items.length
    ? content.items.map((item, index) => ({
        ...item,
        image: resolveCmsImageUrl(
          item.image,
          defaultServices[index]?.image ?? "/images/services/cleaning.jpg"
        ),
        icon: iconMap[index] ?? Sparkles,
      }))
    : defaultServices;

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white site-gutter-x py-24 text-slate-950 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-14 max-w-5xl md:mb-16">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-600">
              {content.sectionLabel}
            </p>

            <h2 className="max-w-5xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-7xl">
              {content.title}
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              {content.subtitle}
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <FadeIn key={service.title} delay={index * 0.1}>
                <div className="group h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/70">
                  <div className="relative h-72 overflow-hidden md:h-80 lg:h-72">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

                    <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-teal-600 shadow-xl md:left-8 md:top-8 md:h-16 md:w-16">
                      <Icon size={30} />
                    </div>

                    <p className="absolute bottom-6 left-6 right-6 text-xs font-black uppercase tracking-[0.22em] text-teal-200 md:bottom-8 md:left-8 md:right-8 md:text-sm md:tracking-[0.25em]">
                      {service.label}
                    </p>
                  </div>

                  <div className="p-7 md:p-8">
                    <h3 className="mb-4 text-2xl font-black text-slate-950 md:text-3xl">
                      {service.title}
                    </h3>

                    <p className="mb-8 leading-8 text-slate-600">
                      {service.description}
                    </p>

                    <a
                      href="#contact"
                      className="group/link inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide text-teal-700"
                    >
                      Request Service
                      <ArrowRight
                        size={16}
                        className="transition group-hover/link:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
