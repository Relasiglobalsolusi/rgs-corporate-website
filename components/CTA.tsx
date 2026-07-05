import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Phone,
  ShieldCheck,
} from "lucide-react";

const phoneDisplay = "+62 21 2295 2228";
const phoneHref = "tel:+622122952228";

const badges = [
  {
    icon: ShieldCheck,
    label: "Integrated Services",
  },
  {
    icon: Headphones,
    label: "Responsive Support",
  },
  {
    icon: CheckCircle2,
    label: "Reliable Execution",
  },
];

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28 text-white md:px-10">
      <div className="absolute inset-0">
        <Image
          src="/images/cta/cta.jpg"
          alt="Corporate facility management"
          fill
          priority
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
              Let&apos;s Work Together
            </p>

            <h2 className="max-w-5xl text-5xl font-black leading-tight md:text-7xl">
              Ready to strengthen your facility operations?
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl md:leading-9">
              Whether you need cleaning, security, parking management, or a
              fully integrated facility solution, RGS is ready to support your
              daily operations with dependable service teams.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-teal-300 px-8 py-5 text-base font-black uppercase tracking-wide text-slate-950 transition hover:-translate-y-1 hover:bg-white"
              >
                Request Proposal
                <ArrowRight
                  size={19}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <a
                href={phoneHref}
                className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-8 py-5 text-base font-black uppercase tracking-wide text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
              >
                <Phone size={19} />
                {phoneDisplay}
              </a>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-8">
            <div className="grid gap-4">
              {badges.map((badge) => {
                const Icon = badge.icon;

                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/35 p-5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-300 text-slate-950">
                      <Icon size={24} />
                    </div>

                    <p className="text-lg font-black">{badge.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-3xl border border-teal-300/20 bg-teal-300/10 p-6">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-teal-200">
                Built for demanding environments
              </p>

              <p className="mt-3 leading-7 text-slate-300">
                Offices, hospitals, hotels, retail destinations, residences,
                logistics facilities, and industrial sites.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
