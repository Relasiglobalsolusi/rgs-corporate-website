"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { LANGS, dictionaries, pagePath, type Lang, type Page } from "@/lib/i18n";

type Props = {
  lang: Lang;
  page: Page;
  /** "menu": drop-down (desktop top strip); "segmented": EN | ID buttons (phone menu). */
  variant?: "menu" | "segmented";
};

/**
 * The same page in the other language, at the section the reader is looking
 * at now. Not the address's #hash: that stays on the last link clicked
 * (e.g. #contact) after the reader has scrolled elsewhere.
 */
function hrefFor(target: Lang, page: Page) {
  let section = "";
  for (const el of document.querySelectorAll<HTMLElement>("main section[id]")) {
    if (el.getBoundingClientRect().top <= window.innerHeight / 3) section = el.id;
  }
  // The first section is the top of the page: no anchor needed.
  const first = document.querySelector("main section[id]")?.id;
  return pagePath(target, page) + (section && section !== first ? `#${section}` : "");
}

export default function LanguageSwitcher({ lang, page, variant = "menu" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const t = dictionaries[lang].nav;
  const current = LANGS.find((item) => item.value === lang) ?? LANGS[0];

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

  const go = (target: Lang) => {
    setOpen(false);
    if (target !== lang) window.location.assign(hrefFor(target, page));
  };

  if (variant === "segmented") {
    return (
      <div role="group" aria-label={t.language} className="flex items-center gap-1 rounded-full border border-white/15 p-1">
        {LANGS.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => go(item.value)}
            aria-pressed={item.value === lang}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
              item.value === lang ? "bg-white text-ink-950" : "text-white/70 hover:text-white"
            }`}
          >
            {item.short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.language}: ${current.name}`}
        className="group flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 text-white/75 transition hover:bg-white/10 hover:text-white"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-brand-300">
          <Languages size={13} aria-hidden />
        </span>
        <span className="text-[0.8125rem] font-semibold tracking-wide text-white">{current.short}</span>
        <ChevronDown size={13} className={`transition ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-52 overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-1.5 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)]"
        >
          <p className="px-3 pb-1 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/40">
            {t.language}
          </p>
          {LANGS.map((item) => {
            const selected = item.value === lang;
            return (
              <button
                key={item.value}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => go(item.value)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  selected ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="w-6 text-xs font-bold text-brand-300">{item.short}</span>
                <span className="flex-1">{item.name}</span>
                {selected ? <Check size={15} className="text-brand-300" aria-hidden /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
