import Image from "next/image";
import type { CmsContent } from "@/lib/cms";
import { mapsHref, phoneHref } from "@/lib/contact-links";
import { portalLabel, portalLoginUrl } from "@/lib/portal";
import { LogIn, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Clients", href: "#clients" },
  { label: "RGS ONE", href: "#rgs-one" },
  { label: "Company Profile", href: "/company-profile" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  { label: "Cleaning Services", href: "#services" },
  { label: "Security Services", href: "#services" },
  { label: "Parking Management", href: "#services" },
  { label: "Integrated Facility Management", href: "#services" },
];

type Props = {
  content: CmsContent["contact"];
  meta: CmsContent["meta"];
  social: CmsContent["social"];
};

export default function Footer({ content, meta, social }: Props) {
  const year = new Date().getFullYear();
  const addressLines = content.addressLines.length
    ? content.addressLines
    : [content.address];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.12),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 site-gutter-x mx-auto max-w-7xl py-24">
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
              <li>
                <a
                  href={portalLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-teal-300 transition hover:translate-x-1 hover:text-white"
                >
                  <LogIn size={18} />
                  {portalLabel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-sm font-black uppercase tracking-[0.3em] text-teal-300">
              Services
            </h3>

            <ul className="space-y-4">
              {serviceLinks.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="inline-flex text-lg font-semibold text-slate-300 transition hover:translate-x-1 hover:text-white"
                  >
                    {service.label}
                  </a>
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
                href={phoneHref(content.phone)}
                className="group flex gap-4 transition hover:text-white"
              >
                <Phone
                  className="mt-1 shrink-0 text-teal-300 transition group-hover:scale-110"
                  size={20}
                />
                {content.phone}
              </a>

              <a
                href={`mailto:${content.email}`}
                className="group flex gap-4 transition hover:text-white"
              >
                <Mail
                  className="mt-1 shrink-0 text-teal-300 transition group-hover:scale-110"
                  size={20}
                />
                {content.email}
              </a>

              <a
                href={mapsHref(addressLines)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-4 transition hover:text-white"
              >
                <MapPin
                  className="mt-1 shrink-0 text-teal-300 transition group-hover:scale-110"
                  size={20}
                />
                <span className="leading-8">
                  {addressLines.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </span>
              </a>

              {(social.instagram || social.linkedin || social.facebook) && (
                <div className="flex flex-wrap gap-4 pt-2 text-sm">
                  {social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-white">
                      Instagram
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-white">
                      LinkedIn
                    </a>
                  )}
                  {social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-white">
                      Facebook
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center text-sm font-semibold text-slate-500 md:flex-row md:text-left">
          <p>© {year} {meta.siteName}. All rights reserved.</p>

          <p className="text-slate-400">{meta.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
