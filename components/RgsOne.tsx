import { ArrowRight, ArrowUpRight, BarChart3, CalendarCheck, Camera, MapPinned } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import { portalLoginUrl } from "@/lib/portal";
import { dictionaries, type Lang } from "@/lib/i18n";

const featureIcons = [MapPinned, CalendarCheck, Camera, BarChart3];

export default function RgsOne({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].rgsOne;
  return (
    <section id="rgs-one" className="relative overflow-hidden bg-mist-50 py-20 text-ink-950 lg:py-28">
      <div className="absolute -right-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-brand-400/15 blur-[120px]" aria-hidden />
      <div className="site-gutter-x relative mx-auto max-w-7xl">
        <FadeIn className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- the PNG stays sharp at this size */}
          <img src="/images/rgs-one-logo-dark.png" alt="RGS ONE" width={596} height={314} className="block h-20 w-auto sm:h-24" />
          <p className="eyebrow mt-8 text-brand-700">{t.eyebrow}</p>
          <h2 className="section-title mt-4">{t.title}</h2>
          <p className="section-lead mt-5 max-w-2xl text-slate-600">{t.lead}</p>

          <div className="mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <a href={portalLoginUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark group">
              {t.portalLogin}
              <ArrowUpRight size={17} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="btn btn-outline group">
              {t.talkToUs}
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </a>
          </div>
        </FadeIn>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {t.features.map(({ title, text }, index) => {
            const Icon = featureIcons[index] ?? MapPinned;
            return (
              <FadeIn as="li" key={title} delay={index * 0.06} className="h-full">
                <div className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_20px_40px_-30px_rgba(8,18,39,0.4)] transition duration-300 hover:-translate-y-1 hover:border-brand-500/40">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-950 text-brand-300 transition duration-300 group-hover:bg-brand-400 group-hover:text-ink-950">
                      <Icon size={21} aria-hidden />
                    </span>
                    <span className="text-sm font-medium text-slate-400 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight sm:text-xl">{title}</h3>
                  <p className="mt-2 leading-7 text-slate-600">{text}</p>
                </div>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
