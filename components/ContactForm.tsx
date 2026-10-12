"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import type { CmsContent } from "@/lib/cms";
import { resolveCmsImageUrl } from "@/lib/cms-images";
import { mapsHref, phoneHref } from "@/lib/contact-links";
import { dictionaries, localize, type Lang } from "@/lib/i18n";
import WhatsappIcon from "@/components/WhatsappIcon";
import { whatsappHref, type WhatsappNumbers } from "@/lib/whatsapp";

type FormStatus = "idle" | "loading" | "success" | "error";

type Props = {
  cta: CmsContent["cta"];
  contact: CmsContent["contact"];
  lang: Lang;
  whatsapp: WhatsappNumbers;
};

export default function ContactForm({ cta, contact, lang, whatsapp }: Props) {
  const t = dictionaries[lang].contact;
  const [status, setStatus] = useState<FormStatus>("idle");
  const addressLines = contact.addressLines.length ? contact.addressLines : [contact.address];
  const badges = cta.badges.length
    ? cta.badges
    : localize(lang, ["Integrated Services", "Responsive Support", "Reliable Execution"]);
  const background = resolveCmsImageUrl(cta.backgroundImage, "/images/cta/cta.jpg");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(
      ["company", "name", "phone", "email", "service", "message"].map((key) => [key, data.get(key)])
    );

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error("Failed to send inquiry.");
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-mist-50 py-20 text-ink-950 lg:py-28">
      <div className="site-gutter-x mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_40px_80px_-40px_rgba(8,18,39,0.35)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative isolate overflow-hidden bg-ink-950 p-7 text-white sm:p-10 lg:p-12">
            <Image src={background} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="-z-10 object-cover opacity-25" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink-950 via-ink-950/90 to-ink-900/70" />

            <p className="eyebrow text-brand-300">{cta.sectionLabel}</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.025em] text-balance sm:text-4xl lg:text-[2.75rem]">
              {cta.title}
            </h2>
            {cta.subtitle ? <p className="mt-5 max-w-md leading-7 text-white/70">{cta.subtitle}</p> : null}

            <ul className="mt-8 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/85"
                >
                  <CheckCircle2 size={13} className="text-brand-300" aria-hidden />
                  {badge}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-3 border-t border-white/10 pt-8">
              {[
                { label: dictionaries[lang].whatsapp.inquiries, number: whatsapp.inquiries, message: dictionaries[lang].whatsapp.adminMessage },
                { label: dictionaries[lang].whatsapp.careers, number: whatsapp.recruitment, message: dictionaries[lang].careers.whatsappMessage },
              ].flatMap((item) => (item.number ? [{ ...item, number: item.number }] : [])).map((item) => (
                <a
                  key={item.label}
                  href={whatsappHref(item.number, item.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl p-2 -m-2 transition hover:bg-white/5"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                    <WhatsappIcon size={20} />
                  </span>
                  <span>
                    <span className="block text-xs text-white/50">WhatsApp · {item.label}</span>
                    <span className="font-medium">{item.number}</span>
                  </span>
                </a>
              ))}
              <a href={phoneHref(contact.phone)} className="group flex items-center gap-4 rounded-2xl p-2 -m-2 transition hover:bg-white/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                  <Phone size={18} aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-white/50">{t.callUs}</span>
                  <span className="font-medium">{contact.phone}</span>
                </span>
              </a>
              <a href={`mailto:${contact.email}`} className="group flex items-center gap-4 rounded-2xl p-2 -m-2 transition hover:bg-white/5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                  <Mail size={18} aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-white/50">{t.emailLabel}</span>
                  <span className="break-words font-medium">{contact.email}</span>
                </span>
              </a>
              <a
                href={mapsHref(addressLines)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-2xl p-2 -m-2 transition hover:bg-white/5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                  <MapPin size={18} aria-hidden />
                </span>
                <span>
                  <span className="block text-xs text-white/50">{t.office}</span>
                  <span className="font-medium leading-7">
                    {addressLines.map((line, index) => (
                      <span key={`${line}-${index}`} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
              </a>
            </div>

            {cta.footerNote ? <p className="mt-10 text-sm leading-6 text-white/50">{cta.footerNote}</p> : null}
          </div>

          <form onSubmit={handleSubmit} className="p-7 sm:p-10 lg:p-12">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t.title}</h3>
            <p className="mt-3 max-w-lg leading-7 text-slate-600">
              {t.intro}
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="company" className="field-label">{t.company}</label>
                <input id="company" name="company" required autoComplete="organization" className="field" />
              </div>
              <div>
                <label htmlFor="name" className="field-label">{t.name}</label>
                <input id="name" name="name" required autoComplete="name" className="field" />
              </div>
              <div>
                <label htmlFor="phone" className="field-label">{t.phone}</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" className="field" />
              </div>
              <div>
                <label htmlFor="email" className="field-label">{t.email}</label>
                <input id="email" name="email" type="email" required autoComplete="email" className="field" />
              </div>
              <div>
                <label htmlFor="service" className="field-label">{t.service}</label>
                <select id="service" name="service" required defaultValue="" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2364748b%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10">
                  <option value="" disabled>{t.chooseService}</option>
                  {t.serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="field-label">{t.message}</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t.messagePlaceholder}
                  className="field resize-y"
                />
              </div>
            </div>

            <div aria-live="polite">
              {status === "success" ? (
                <p className="mt-6 flex items-start gap-3 rounded-xl border border-brand-500/30 bg-brand-500/10 p-4 text-sm font-medium text-brand-700">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden />
                  {t.success}
                </p>
              ) : null}
              {status === "error" ? (
                <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                  {t.errorBefore}{" "}
                  <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a>.
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-500">
                {t.allRequired}
              </p>
              <button type="submit" disabled={status === "loading"} className="btn btn-dark group shrink-0 disabled:cursor-wait disabled:opacity-70">
                {status === "loading" ? (
                  <>
                    <Loader2 size={17} className="animate-spin" aria-hidden />
                    {t.sending}
                  </>
                ) : (
                  <>
                    {t.send}
                    <ArrowRight size={17} className="transition group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
