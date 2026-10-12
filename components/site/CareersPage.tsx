import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  Car,
  ClipboardCheck,
  GraduationCap,
  MapPin,
  Leaf,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/ui/FadeIn";
import WhatsappButton from "@/components/WhatsappButton";
import WhatsappIcon from "@/components/WhatsappIcon";
import { fetchWebsiteContent } from "@/lib/cms";
import { RECRUITMENT_EMAIL, dictionaries, localize, type Lang } from "@/lib/i18n";
import { whatsappHref, whatsappNumbers } from "@/lib/whatsapp";

const benefitIcons = [TrendingUp, MapPin, GraduationCap, Smartphone];
const roleIcons = [Sparkles, ShieldCheck, Car, Leaf, Users, Building2];

/** The careers page in either language ("/careers" and "/id/careers"). */
export default async function CareersPage({ lang }: { lang: Lang }) {
  const { content: raw } = await fetchWebsiteContent();
  const meta = localize(lang, raw.meta);
  const whatsapp = whatsappNumbers(raw.contact);
  const t = dictionaries[lang].careers;
  // WhatsApp only once the career inquiries number is set in RGS ONE; email otherwise.
  const applyHref = whatsapp.recruitment ? whatsappHref(whatsapp.recruitment, t.whatsappMessage) : null;
  const roleHref = (role: string) =>
    whatsapp.recruitment
      ? whatsappHref(whatsapp.recruitment, t.whatsappRoleMessage(role))
      : `mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent(role)}`;

  return (
    <div lang={lang}>
      <Navbar lang={lang} page="careers" />

      <main>
        {/* Hero (dark) */}
        <section className="relative isolate overflow-hidden bg-ink-950 text-white">
          <div className="absolute inset-0 -z-10">
            <Image src="/images/services/cleaning.jpg" alt="" fill priority sizes="100vw" className="object-cover object-[65%_center]" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/50" />
            <div className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-brand-500/15 blur-[140px]" />
          </div>
          <div className="site-gutter-x mx-auto max-w-7xl pb-20 pt-[calc(var(--header-height)+3.5rem)] lg:pb-28 lg:pt-[calc(var(--header-height)+5rem)]">
            <div className="max-w-2xl">
              <p className="eyebrow text-brand-300">{t.eyebrow}</p>
              <h1 className="mt-5 text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem]">
                {t.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">{t.lead}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                {applyHref ? (
                <a href={applyHref} target="_blank" rel="noopener noreferrer" className="btn group bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] hover:-translate-y-0.5 hover:bg-[#1ebe5a]">
                  <WhatsappIcon size={18} />
                  {t.applyWhatsapp}
                </a>
                ) : null}
                <a href={`mailto:${RECRUITMENT_EMAIL}`} className={`btn ${applyHref ? "btn-ghost" : "btn-primary"}`}>
                  <Mail size={17} aria-hidden />
                  {t.emailUs}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why work with RGS (light) */}
        <section className="bg-mist-50 py-20 text-ink-950 lg:py-28">
          <div className="site-gutter-x mx-auto max-w-7xl">
            <FadeIn className="max-w-2xl">
              <p className="eyebrow text-brand-700">{t.whyEyebrow}</p>
              <h2 className="section-title mt-4">{t.whyTitle}</h2>
            </FadeIn>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-5">
              {t.benefits.map((benefit, index) => {
                const Icon = benefitIcons[index] ?? ClipboardCheck;
                return (
                  <FadeIn as="li" key={benefit.title} delay={index * 0.06} className="h-full">
                    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-7">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mist-100 text-brand-700">
                        <Icon size={21} aria-hidden />
                      </span>
                      <h3 className="mt-6 text-lg font-semibold tracking-tight">{benefit.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{benefit.text}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Roles (dark) */}
        <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
          <div className="grid-texture pointer-events-none absolute inset-0" aria-hidden />
          <div className="site-gutter-x relative mx-auto max-w-7xl">
            <FadeIn className="grid gap-6 lg:grid-cols-2 lg:items-end">
              <div>
                <p className="eyebrow text-brand-300">{t.rolesEyebrow}</p>
                <h2 className="section-title mt-4">{t.rolesTitle}</h2>
              </div>
              <p className="section-lead max-w-xl text-white/65 lg:justify-self-end">{t.rolesLead}</p>
            </FadeIn>
            <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
              {t.roles.map((role, index) => {
                const Icon = roleIcons[index] ?? Users;
                return (
                  <FadeIn as="li" key={role.title} delay={(index % 3) * 0.06} className="h-full">
                    <div className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-7 transition duration-300 hover:-translate-y-1 hover:border-brand-400/40 hover:bg-white/[0.07]">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-300 transition duration-300 group-hover:bg-brand-400 group-hover:text-ink-950">
                        <Icon size={21} aria-hidden />
                      </span>
                      <h3 className="mt-6 text-xl font-semibold tracking-tight">{role.title}</h3>
                      <p className="mt-2 flex-1 leading-7 text-white/60">{role.text}</p>
                      <a
                        href={roleHref(role.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-300 transition hover:text-white"
                      >
                        {t.applyFor}
                        <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                      </a>
                    </div>
                  </FadeIn>
                );
              })}
            </ul>
          </div>
        </section>

        {/* How to apply (light) */}
        <section className="bg-mist-50 py-20 text-ink-950 lg:py-28">
          <div className="site-gutter-x mx-auto max-w-7xl">
            <FadeIn className="max-w-2xl">
              <p className="eyebrow text-brand-700">{t.stepsEyebrow}</p>
              <h2 className="section-title mt-4">{t.stepsTitle}</h2>
            </FadeIn>
            <ol className="mt-12 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-5">
              {t.steps.map((step, index) => (
                <FadeIn as="li" key={step.title} delay={index * 0.08} className="h-full">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 sm:p-8">
                    <span className="text-6xl font-semibold tracking-tight text-brand-500/25 tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{step.text}</p>
                  </div>
                </FadeIn>
              ))}
            </ol>

            <FadeIn className="mt-8 flex gap-4 rounded-3xl border border-amber-300/60 bg-amber-50 p-6 sm:p-7">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <ShieldAlert size={20} aria-hidden />
              </span>
              <div>
                <p className="font-semibold text-amber-900">{t.noFeeTitle}</p>
                <p className="mt-1 leading-7 text-amber-900/80">{t.noFeeText}</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Contact (dark) */}
        <section className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-24">
          <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand-500/15 blur-[120px]" aria-hidden />
          <div className="site-gutter-x relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <FadeIn>
              <h2 className="section-title">{t.contactTitle}</h2>
              <p className="section-lead mt-4 text-white/65">{t.contactLead}</p>
            </FadeIn>
            <FadeIn delay={0.1} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {applyHref && whatsapp.recruitment ? (
              <a
                href={applyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 pr-6 transition hover:border-[#25D366]/60 hover:bg-white/[0.07]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                  <WhatsappIcon size={22} />
                </span>
                <span>
                  <span className="block text-xs text-white/50">{t.whatsappLabel}</span>
                  <span className="text-lg font-semibold">{whatsapp.recruitment}</span>
                </span>
              </a>
              ) : null}
              <a
                href={`mailto:${RECRUITMENT_EMAIL}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 pr-6 transition hover:border-brand-400/50 hover:bg-white/[0.07]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                  <Mail size={20} aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-white/50">{t.emailLabel}</span>
                  <span className="text-lg font-semibold">{RECRUITMENT_EMAIL}</span>
                </span>
              </a>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer content={raw.contact} meta={meta} social={raw.social} lang={lang} whatsapp={whatsapp} />
      <WhatsappButton lang={lang} page="careers" numbers={whatsapp} />
    </div>
  );
}
