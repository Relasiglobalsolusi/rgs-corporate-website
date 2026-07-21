import Image from "next/image";
import type { CmsContent } from "@/lib/cms";
import { resolveCmsImageUrl } from "@/lib/cms-images";
import { phoneHref } from "@/lib/contact-links";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Phone,
  ShieldCheck,
} from "lucide-react";

const badgeIcons = [ShieldCheck, Headphones, CheckCircle2];

type Props = {
  content: CmsContent["cta"];
  contact: CmsContent["contact"];
};

export default function CTA({ content, contact }: Props) {
  const badges = content.badges.length
    ? content.badges
    : ["Integrated Services", "Responsive Support", "Reliable Execution"];

  const ctaImage = resolveCmsImageUrl(
    content.backgroundImage,
    "/images/cta/cta.jpg"
  );

  return (
    <section className="relative overflow-hidden site-gutter-x py-28 text-white">
      <div className="absolute inset-0">
        <Image
          src={ctaImage}
          alt="Corporate facility management"
          fill
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <p className="mb-5 text-sm font-black uppercase tracking-[0.35em] text-teal-300">
              {content.sectionLabel}
            </p>

            <h2 className="max-w-5xl text-5xl font-black leading-tight md:text-7xl">
              {content.title}
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
              {content.subtitle}
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#contact"
                className="hero-cta-label group inline-flex items-center gap-3 rounded-full bg-white px-8 py-5 text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md"
              >
                {content.ctaPrimary}
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href={phoneHref(contact.phone)}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-5 text-base font-black uppercase tracking-wide text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
              >
                <Phone size={19} />
                {contact.phone}
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
            <div className="grid gap-4">
              {badges.map((badge, index) => {
                const Icon = badgeIcons[index] ?? CheckCircle2;

                return (
                  <div
                    key={badge}
                    className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/35 p-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950">
                      <Icon size={24} className="text-teal-600" />
                    </div>

                    <p className="text-lg font-black">{badge}</p>
                  </div>
                );
              })}
            </div>

            {content.footerNote && (
              <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white p-6 text-slate-800 shadow-lg">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-slate-800">
                  Built for demanding environments
                </p>

                <p className="mt-3 font-medium leading-7 text-slate-700">
                  {content.footerNote}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
