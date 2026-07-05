import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = ["Cleaning", "Security", "Parking", "Facility Support"];

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

        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-slate-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_32%,rgba(20,184,166,0.2),transparent_34%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-14 pt-40 sm:px-6 md:px-10 lg:pt-48">
        <FadeIn>
          <div className="w-full max-w-5xl">
            <h1 className="max-w-full leading-[0.96] tracking-[-0.035em]">
              <span className="block text-[3.15rem] font-medium text-white sm:text-6xl md:text-7xl lg:text-[5.8rem] xl:text-[6rem]">
                Creating
              </span>

              <span className="mt-2 block text-[3.65rem] font-semibold text-teal-300 sm:text-7xl md:text-8xl lg:text-[6.9rem] xl:text-[7.8rem]">
                Better
              </span>

              <span className="block text-[3.65rem] font-semibold text-teal-300 sm:text-7xl md:text-8xl lg:text-[6.9rem] xl:text-[7.8rem]">
                Environments
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 md:text-xl md:leading-9">
              Relasi Global Solusi delivers professional cleaning, security,
              parking management, and integrated facility support for businesses
              that require dependable daily operations.
            </p>

            <div className="mt-7 flex max-w-full flex-wrap gap-2.5">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3.5 py-2 text-xs font-semibold text-slate-100 shadow-sm backdrop-blur-xl sm:px-4 sm:text-sm"
                >
                  <CheckCircle2 size={15} className="shrink-0 text-teal-300" />
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-3 sm:flex sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-teal-300 px-7 py-4 text-sm font-bold uppercase tracking-wide text-slate-950 shadow-xl shadow-teal-300/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-white/20 sm:px-9 sm:py-5 sm:text-base"
              >
                Request Proposal
                <ArrowRight
                  size={19}
                  className="transition duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-xl shadow-black/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/12 hover:text-teal-200 sm:px-9 sm:py-5 sm:text-base"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-12 grid max-w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/20 backdrop-blur-2xl sm:mt-16 sm:grid-cols-3 sm:rounded-[2rem]">
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
}