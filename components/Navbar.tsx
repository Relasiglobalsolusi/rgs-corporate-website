"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import PortalAccess from "@/components/PortalAccess";

type NavLink = {
  name: string;
  href: string;
  shortName?: string;
};

const links: NavLink[] = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Industries", href: "#industries" },
  { name: "Clients", href: "#clients" },
  { name: "Stats", href: "#stats" },
  { name: "Why Choose Us", shortName: "Why Us", href: "#why-choose-us" },
  { name: "Contact", href: "#contact" },
];

/** Tailwind xl — horizontal nav needs this width for 7 pills + logo + CTAs */
const DESKTOP_NAV_MEDIA = "(min-width: 1280px)";

function getScrollSpyOffset() {
  const root = document.documentElement;
  const fromPadding = parseFloat(getComputedStyle(root).scrollPaddingTop);
  if (Number.isFinite(fromPadding) && fromPadding > 0) return fromPadding;

  const section = document.querySelector("section");
  if (!section) return 120;

  const offset = parseFloat(getComputedStyle(section).scrollMarginTop);
  return Number.isFinite(offset) && offset > 0 ? offset : 120;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const scrollSpyOffset = getScrollSpyOffset();

      let currentName = links[0]?.name;
      for (const link of links) {
        const section = document.querySelector(link.href);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= scrollSpyOffset) {
          currentName = link.name;
        }
      }

      if (currentName) setActive(currentName);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_NAV_MEDIA);

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full site-gutter-x pb-3 pt-[var(--site-gutter)] transition-all duration-500 ${
        scrolled ? "pb-2" : "pb-3"
      }`}
    >
      <div
        className={`mx-auto w-full max-w-[1850px] overflow-hidden rounded-[1.5rem] border transition-all duration-500 2xl:rounded-[2rem] ${
          scrolled
            ? "border-white/10 bg-slate-950/90 shadow-2xl shadow-black/35 backdrop-blur-2xl"
            : "border-white/10 bg-slate-950/70 shadow-xl shadow-black/10 backdrop-blur-xl"
        }`}
      >
        <div className="site-inner-x flex min-w-0 items-center gap-2 py-3.5 transition-all duration-500 sm:gap-3 sm:py-4 xl:gap-4 2xl:py-5">
          <a
            href="#home"
            onClick={closeMenu}
            className="flex shrink-0 items-center transition hover:opacity-90"
            aria-label="Go to home section"
          >
            <Image
              src="/images/logo.png"
              alt="RGS Relasi Global Solusi"
              width={340}
              height={100}
              priority
              className={`h-auto transition-all duration-500 ${
                scrolled
                  ? "w-[130px] sm:w-[145px] xl:w-[165px] 2xl:w-[200px]"
                  : "w-[145px] sm:w-[160px] xl:w-[180px] 2xl:w-[215px]"
              }`}
            />
          </a>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5 xl:flex xl:gap-1 xl:p-1"
          >
            {links.map((link) => {
              const isActive = active === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-bold transition-all duration-300 xl:px-3 xl:py-2.5 xl:text-sm 2xl:px-5 2xl:py-3 2xl:text-base ${
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-white/85 hover:bg-white/10 hover:text-teal-300"
                  }`}
                >
                  {link.shortName ? (
                    <>
                      <span className="2xl:hidden">{link.shortName}</span>
                      <span className="hidden 2xl:inline">{link.name}</span>
                    </>
                  ) : (
                    link.name
                  )}
                </a>
              );
            })}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-2 xl:flex xl:gap-3">
            <div className="hidden h-8 w-px shrink-0 bg-white/10 2xl:block" aria-hidden />

            <PortalAccess />

            <a
              href="#contact"
              className="hero-cta-label group inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-slate-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md 2xl:gap-2 2xl:px-6 2xl:py-3"
            >
              <span className="hidden 2xl:inline">Request Proposal</span>
              <span className="2xl:hidden">Proposal</span>
              <ArrowRight
                size={16}
                className="shrink-0 transition duration-300 group-hover:translate-x-1 2xl:h-[18px] 2xl:w-[18px]"
              />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          id="mobile-nav-drawer"
          className={`grid transition-all duration-500 xl:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav
              aria-label="Mobile"
              className="site-inner-x grid gap-3 border-t border-white/10 pb-6 pt-5"
            >
              {links.map((link) => {
                const isActive = active === link.name;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={closeMenu}
                    className={`rounded-2xl px-5 py-4 text-base font-bold transition ${
                      isActive
                        ? "bg-white text-slate-950"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}

              <PortalAccess variant="featured" onClick={closeMenu} />

              <a
                href="#contact"
                onClick={closeMenu}
                className="hero-cta-label mt-1 flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-slate-950 shadow-sm transition hover:shadow-md"
              >
                Request Proposal
                <ArrowRight size={18} />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
