import { ArrowRight, Briefcase } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import WhatsappIcon from "@/components/WhatsappIcon";
import { dictionaries, pagePath, type Lang } from "@/lib/i18n";
import { whatsappHref } from "@/lib/whatsapp";

type Props = {
  lang: Lang;
  /** The career inquiries WhatsApp number; null = not set in RGS ONE. */
  recruitment: string | null;
};

/** A short band on the home page that sends job seekers to the careers page or WhatsApp. */
export default function CareersStrip({ lang, recruitment }: Props) {
  const t = dictionaries[lang].careers;

  return (
    <section id="join-us" className="relative isolate overflow-hidden bg-brand-400 text-ink-950">
      <div className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-white/25 blur-3xl" aria-hidden />
      <div className="absolute -bottom-32 left-1/3 -z-10 h-72 w-72 rounded-full bg-accent-400/30 blur-3xl" aria-hidden />
      <FadeIn className="site-gutter-x mx-auto flex max-w-7xl flex-col gap-7 py-12 lg:flex-row lg:items-center lg:justify-between lg:py-14">
        <div className="flex items-start gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink-950 text-brand-300 sm:flex">
            <Briefcase size={24} aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-950/70">{t.stripEyebrow}</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{t.stripTitle}</h2>
            <p className="mt-2 max-w-xl leading-7 text-ink-950/75">{t.stripText}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          {recruitment ? (
            <a href={whatsappHref(recruitment, t.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-dark group">
              <WhatsappIcon size={18} className="text-[#25D366]" />
              {t.applyWhatsapp}
            </a>
          ) : null}
          <a
            href={pagePath(lang, "careers")}
            className={`btn group ${
              recruitment
                ? "border-ink-950/30 text-ink-950 hover:-translate-y-0.5 hover:border-ink-950 hover:bg-white/30"
                : "btn-dark"
            }`}
          >
            {t.viewCareers}
            <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden />
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
