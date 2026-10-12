"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { dictionaries, pagePath, sectionHref, type Lang, type Page } from "@/lib/i18n";
import { portalLoginUrl } from "@/lib/portal";

// The home page's sections, in page order (components/site/HomePage.tsx).
const sections = [
  { id: "clients", key: "clients" },
  { id: "services", key: "services" },
  { id: "industries", key: "industries" },
  { id: "rgs-one", key: "rgsOne" },
  { id: "why-choose-us", key: "whyRgs" },
  { id: "contact", key: "contact" },
] as const;

/** Tailwind xl: the full menu needs this width; below it the menu button shows. */
const DESKTOP_NAV_MEDIA = "(min-width: 1280px)";

type Props = {
  lang: Lang;
  page: Page;
};

export default function Navbar({ lang, page }: Props) {
  const t = dictionaries[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (page !== "home") return;
      // A section is current once its top is in the upper third of the screen.
      const line = Math.max(
        (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 96) + 8,
        window.innerHeight / 3
      );
      let current: string | null = null;
      let best = -Infinity;
      for (const section of sections) {
        const top = document.getElementById(section.id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > best) {
          best = top;
          current = section.id;
        }
      }
      // At the very bottom the last section may never reach the line.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = sections[sections.length - 1].id;
      }
      setActive(current);
    };
    // At most once per frame while scrolling.
    let frame = 0;
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        onScroll();
      });
    };
    onScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [page]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const media = window.matchMedia(DESKTOP_NAV_MEDIA);
    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
    };
  }, [open]);

  const links = [
    ...sections.map((section) => ({
      href: sectionHref(lang, section.id),
      label: t[section.key],
      active: page === "home" && active === section.id,
    })),
    { href: pagePath(lang, "careers"), label: t.careers, active: page === "careers" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink-950/90 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-ink-950/80 to-transparent"
      }`}
    >
      <div className="site-gutter-x mx-auto flex h-[var(--nav-height)] max-w-[90rem] items-center gap-6 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <a href={pagePath(lang, "home")} onClick={() => setOpen(false)} aria-label={t.backToTop} className="flex shrink-0 items-center xl:justify-self-start">
          <Image
            src="/images/logo.png"
            alt="RGS Relasi Global Solusi"
            width={340}
            height={100}
            priority
            className="h-auto w-[150px] xl:w-[190px]"
          />
        </a>

        <nav aria-label="Primary" className="hidden h-full items-center justify-center xl:flex">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={link.active ? (page === "careers" ? "page" : "location") : undefined}
                  className={`relative flex items-center whitespace-nowrap rounded-full px-3 py-2.5 text-[0.9375rem] font-medium transition 2xl:px-3.5 ${
                    link.active ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand-400 transition-transform duration-300 2xl:inset-x-3.5 ${
                      link.active ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 xl:flex xl:justify-self-end">
          <LanguageSwitcher lang={lang} page={page} />
          <a
            href={portalLoginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 text-[0.9375rem] font-medium text-white/80 transition hover:text-white 2xl:inline-flex"
          >
            {t.clientLogin}
            <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a href={sectionHref(lang, "contact")} className="btn btn-primary whitespace-nowrap px-6 py-3 text-[0.9375rem] sm:px-6">
            {t.requestProposal}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="ml-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white/10 xl:hidden"
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu below xl */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="h-[calc(100dvh-var(--nav-height))] overflow-y-auto border-t border-white/10 bg-ink-950 xl:hidden"
      >
        <nav aria-label="Mobile" className="site-gutter-x mx-auto flex min-h-full max-w-3xl flex-col pb-8 pt-5">
          <div className="flex items-center justify-between pb-4">
            <span className="text-sm text-white/50">{t.language}</span>
            <LanguageSwitcher lang={lang} page={page} variant="segmented" />
          </div>
          <ul className="divide-y divide-white/10 border-t border-white/10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-4 text-xl font-medium ${link.active ? "text-brand-300" : "text-white"}`}
                >
                  {link.label}
                  <ArrowRight size={18} className="text-white/40" />
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-8">
            <a href={sectionHref(lang, "contact")} onClick={() => setOpen(false)} className="btn btn-primary w-full">
              {t.requestProposal}
              <ArrowRight size={17} />
            </a>
            <a
              href={portalLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-ghost w-full"
            >
              {t.rgsOneClientLogin}
              <ArrowUpRight size={17} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
