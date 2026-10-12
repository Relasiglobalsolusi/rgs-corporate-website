"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, ChevronRight, MessageSquareText, X } from "lucide-react";
import WhatsappIcon from "@/components/WhatsappIcon";
import { dictionaries, type Lang, type Page } from "@/lib/i18n";
import { whatsappHref, type WhatsappNumbers } from "@/lib/whatsapp";

type Props = {
  lang: Lang;
  page: Page;
  numbers: WhatsappNumbers;
};

/**
 * The green WhatsApp button at the bottom right of every page. It opens a
 * small panel with RGS's two numbers, each clearly labelled: client inquiries
 * (admin) and careers (recruitment). On the careers page careers comes first.
 */
export default function WhatsappButton({ lang, page, numbers }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = dictionaries[lang];

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const all = [
    {
      key: "inquiries",
      icon: MessageSquareText,
      title: t.whatsapp.inquiries,
      hint: t.whatsapp.inquiriesHint,
      number: numbers.inquiries,
      message: t.whatsapp.adminMessage,
    },
    {
      key: "careers",
      icon: Briefcase,
      title: t.whatsapp.careers,
      hint: t.whatsapp.careersHint,
      number: numbers.recruitment,
      message: t.careers.whatsappMessage,
    },
  ];
  // Only the numbers set in RGS ONE → Company Details; none set = no button.
  const options = all.flatMap(({ number, message, ...rest }) =>
    number ? [{ ...rest, number, href: whatsappHref(number, message) }] : []
  );
  if (page === "careers") options.reverse();
  if (!options.length) return null;

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {open ? (
        <div
          role="dialog"
          aria-label={t.whatsapp.panelTitle}
          className="w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-slate-200 bg-white text-ink-950 shadow-[0_30px_60px_-20px_rgba(4,10,23,0.5)]"
        >
          <div className="flex items-start justify-between gap-3 bg-[#25D366] px-5 py-4 text-white">
            <div>
              <p className="flex items-center gap-2 font-semibold">
                <WhatsappIcon size={18} />
                {t.whatsapp.panelTitle}
              </p>
              <p className="mt-1 text-xs leading-5 text-white/85">{t.whatsapp.panelLead}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.whatsapp.close}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
            >
              <X size={16} />
            </button>
          </div>
          <ul className="divide-y divide-slate-100 p-2">
            {options.map(({ key, icon: Icon, title, hint, number, href }) => (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3.5 rounded-2xl p-3 transition hover:bg-mist-50"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/12 text-[#128C4B]">
                    <Icon size={20} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{title}</span>
                    <span className="block text-xs text-slate-500">{hint}</span>
                    <span className="mt-0.5 block text-sm font-medium text-[#128C4B]">{number}</span>
                  </span>
                  <ChevronRight size={18} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={t.whatsapp.chat}
        className="flex items-center gap-2.5 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5a] sm:py-3 sm:pl-4 sm:pr-5"
      >
        {open ? <X size={26} /> : <WhatsappIcon size={26} />}
        <span className="hidden text-sm font-semibold sm:inline">{t.whatsapp.chat}</span>
      </button>
    </div>
  );
}
