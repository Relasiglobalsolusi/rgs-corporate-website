import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "Cleaning",
  "Security",
  "Parking",
  "Facility Support",
];

const stats = [
  { value: "1000+", label: "Professional Personnel" },
  { value: "50+", label: "Corporate Clients" },
  { value: "24/7", label: "Operational Support" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.jpg"
          alt="Modern office building"
          fill
          priority
          sizes="100vw"
          className="scale-[1.02] object-cover object-center lg:object-right"
        />

        <div className="absolute inset-0 bg-slate-950/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_32%,rgba(20,184,166,0.22),transparent_34%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-44 md:px-10 lg:pt-48">
        <FadeIn>
          <div className="max-w-5xl">
            <h1 className="max-w-5xl leading-[0.92] tracking-[-0.04em]">
              <span className="block text-5xl font-medium text-white sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[6rem]">
                Creating
              </span>

              <span className="mt-2 block text-6xl font-semibold text-teal-300 sm:text-7xl md:text-8xl lg:text-[6.9rem] xl:text-[7.8rem]">
                Better Environments
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-200 md:text-xl md:leading-9">
              Relasi Global Solusi delivers professional cleaning, security,
              parking management, and integrated facility support for businesses
              that require dependable daily operations.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-slate-100 shadow-sm backdrop-blur-xl"
                >
                  <CheckCircle2 size={16} className="text-teal-300" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-11 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-teal-300 px-9 py-5 text-base font-bold uppercase tracking-wide text-slate-950 shadow-xl shadow-teal-300/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-white/20"
              >
                Request Proposal
                <ArrowRight
                  size={19}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-9 py-5 text-base font-bold uppercase tracking-wide text-white shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/12 hover:text-teal-200"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-16 grid max-w-4xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/20 backdrop-blur-2xl sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`p-8 text-center ${
                    index !== stats.length - 1
                      ? "border-b border-white/10 sm:border-b-0 sm:border-r"
                      : ""
                  }`}
                >
                  <div className="text-5xl font-semibold tracking-tight text-teal-300 md:text-6xl">
                    {stat.value}
                  </div>

                  <div className="mt-3 text-xs font-bold uppercase tracking-[0.28em] text-slate-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}