"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";

const links = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Industries", href: "#industries" },
  { name: "Clients", href: "#clients" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const current = links.findLast((link) => {
        const section = document.querySelector(link.href);
        if (!section) return false;
        return section.getBoundingClientRect().top <= 160;
      });

      if (current) setActive(current.name);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full px-4 transition-all duration-500 md:px-5 ${
        scrolled ? "py-3" : "py-5 md:py-6"
      }`}
    >
      <div
        className={`mx-auto w-full max-w-[1850px] overflow-hidden rounded-[1.75rem] border transition-all duration-500 md:rounded-[2rem] ${
          scrolled
            ? "border-white/10 bg-slate-950/90 shadow-2xl shadow-black/35 backdrop-blur-2xl"
            : "border-white/10 bg-slate-950/70 shadow-xl shadow-black/10 backdrop-blur-xl"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-500 ${
            scrolled
              ? "px-5 py-4 md:px-10 lg:px-12 xl:px-14"
              : "px-5 py-5 md:px-10 lg:px-14 xl:px-16"
          }`}
        >
          <a
            href="#home"
            onClick={closeMenu}
            className="flex min-w-0 items-center transition hover:opacity-90"
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
                  ? "w-[150px] sm:w-[175px] md:w-[230px] lg:w-[265px]"
                  : "w-[170px] sm:w-[195px] md:w-[260px] lg:w-[300px]"
              }`}
            />
          </a>

          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] p-1.5 xl:flex">
            {links.map((link) => {
              const isActive = active === link.name;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`rounded-full px-5 py-3 text-base font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-white text-slate-950 shadow-sm"
                      : "text-white/85 hover:bg-white/10 hover:text-teal-300"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full bg-teal-300 px-7 py-3.5 text-base font-black text-slate-950 shadow-lg shadow-teal-300/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-white/20 xl:inline-flex"
          >
            Request Proposal
            <ArrowRight
              size={19}
              className="transition duration-300 group-hover:translate-x-1"
            />
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 sm:h-13 sm:w-13 xl:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <div
          className={`grid transition-all duration-500 xl:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <nav className="grid gap-3 border-t border-white/10 px-5 pb-6 pt-5">
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

              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-teal-300 px-5 py-4 text-base font-black text-slate-950 transition hover:bg-white"
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