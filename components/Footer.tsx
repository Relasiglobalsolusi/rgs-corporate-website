import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Clients", href: "#clients" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Cleaning Services",
  "Security Services",
  "Parking Management",
  "Integrated Facility Management",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.12),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="mb-20 flex justify-center">
          <a href="#home" aria-label="Back to home" className="transition hover:opacity-90">
            <Image
              src="/images/logo.png"
              alt="RGS Relasi Global Solusi"
              width={520}
              height={155}
              className="h-auto w-[300px] md:w-[420px] lg:w-[500px]"
            />
          </a>
        </div>

        <div className="grid gap-12 border-b border-white/10 pb-16 md:grid-cols-3 lg:gap-20">
          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-teal-300">
              Company
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex text-lg font-semibold text-slate-300 transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-teal-300">
              Services
            </h3>

            <ul className="space-y-4">
              {services.map((service) => (
                <li
                  key={service}
                  className="text-lg font-semibold text-slate-300"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-teal-300">
              Contact
            </h3>

            <div className="space-y-5 text-lg font-semibold text-slate-300">
              <a
                href="tel:+622122952228"
                className="group flex gap-4 transition hover:text-white"
              >
                <Phone
                  className="mt-1 shrink-0 text-teal-300 transition group-hover:scale-110"
                  size={20}
                />
                +62 21 2295 2228
              </a>

              <a
                href="mailto:contact@rgs.co.id"
                className="group flex gap-4 transition hover:text-white"
              >
                <Mail
                  className="mt-1 shrink-0 text-teal-300 transition group-hover:scale-110"
                  size={20}
                />
                contact@rgs.co.id
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Jalan+Daan+Mogot+KM+14.5+Ruko+Point+8+Blok+F6+Duri+Kosambi+Cengkareng+West+Jakarta"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 transition hover:text-white"
              >
                <MapPin
                  className="mt-1 shrink-0 text-teal-300 transition group-hover:scale-110"
                  size={20}
                />
                <span className="leading-8">
                  Jalan Daan Mogot KM 14.5
                  <br />
                  Ruko Point 8 Blok F6
                  <br />
                  Duri Kosambi, Cengkareng
                  <br />
                  West Jakarta, Indonesia
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center text-sm font-semibold text-slate-500 md:flex-row md:text-left">
          <p>© {year} PT Relasi Global Solusi. All rights reserved.</p>

          <p className="text-slate-400">
            Built for cleaner, safer, better-managed environments.
          </p>
        </div>
      </div>
    </footer>
  );
}