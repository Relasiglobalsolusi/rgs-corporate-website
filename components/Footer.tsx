import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { CmsContent } from "@/lib/cms";
import { mapsHref, phoneHref } from "@/lib/contact-links";
import WhatsappIcon from "@/components/WhatsappIcon";
import { whatsappHref, type WhatsappNumbers } from "@/lib/whatsapp";
import { portalLoginUrl } from "@/lib/portal";
import { dictionaries, pagePath, sectionHref, type Lang } from "@/lib/i18n";


type Props = {
  content: CmsContent["contact"];
  meta: CmsContent["meta"];
  social: CmsContent["social"];
  lang: Lang;
  whatsapp: WhatsappNumbers;
};

export default function Footer({ content, meta, social, lang, whatsapp }: Props) {
  const { nav, footer } = dictionaries[lang];
  const companyLinks = [
    { label: nav.clients, href: sectionHref(lang, "clients") },
    { label: nav.services, href: sectionHref(lang, "services") },
    { label: nav.industries, href: sectionHref(lang, "industries") },
    { label: nav.rgsOne, href: sectionHref(lang, "rgs-one") },
    { label: nav.careers, href: pagePath(lang, "careers") },
    { label: footer.companyProfile, href: "/company-profile" },
    { label: nav.contact, href: sectionHref(lang, "contact") },
  ];
  const year = new Date().getFullYear();
  const addressLines = content.addressLines.length ? content.addressLines : [content.address];
  const socials = [
    { label: "Instagram", href: social.instagram },
    { label: "LinkedIn", href: social.linkedin },
    { label: "Facebook", href: social.facebook },
  ].filter((item) => item.href);

  return (
    <footer className="bg-ink-950 text-white">
      <div className="site-gutter-x mx-auto max-w-7xl py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:gap-10">
          <div>
            <a href={pagePath(lang, "home")} aria-label={nav.backToTop} className="inline-block">
              <Image src="/images/logo.png" alt="RGS Relasi Global Solusi" width={340} height={100} className="h-auto w-[150px]" />
            </a>
            <p className="mt-6 max-w-xs leading-7 text-white/55">{meta.tagline}</p>
            <a
              href={portalLoginUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand-300 transition hover:text-white"
            >
              {footer.portal}
              <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <nav aria-label={footer.company}>
            <h3 className="text-sm font-semibold text-white">{footer.company}</h3>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/60 transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={footer.services}>
            <h3 className="text-sm font-semibold text-white">{footer.services}</h3>
            <ul className="mt-5 space-y-3">
              {footer.serviceLinks.map((label) => (
                <li key={label}>
                  <a href={sectionHref(lang, "services")} className="text-white/60 transition hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-white">{footer.contact}</h3>
            <ul className="mt-5 space-y-4 text-white/60">
              <li>
                <a href={phoneHref(content.phone)} className="flex gap-3 transition hover:text-white">
                  <Phone size={17} className="mt-1 shrink-0 text-brand-300" aria-hidden />
                  {content.phone}
                </a>
              </li>
              {[
                { label: dictionaries[lang].whatsapp.inquiries, number: whatsapp.inquiries, message: dictionaries[lang].whatsapp.adminMessage },
                { label: dictionaries[lang].whatsapp.careers, number: whatsapp.recruitment, message: dictionaries[lang].careers.whatsappMessage },
              ].flatMap((item) => (item.number ? [{ ...item, number: item.number }] : [])).map((item) => (
                <li key={item.label}>
                  <a
                    href={whatsappHref(item.number, item.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex gap-3 transition hover:text-white"
                  >
                    <WhatsappIcon size={17} className="mt-1 shrink-0 text-[#25D366]" />
                    <span>
                      <span className="block text-xs text-white/40">{item.label}</span>
                      {item.number}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${content.email}`} className="flex gap-3 transition hover:text-white">
                  <Mail size={17} className="mt-1 shrink-0 text-brand-300" aria-hidden />
                  {content.email}
                </a>
              </li>
              <li>
                <a href={mapsHref(addressLines)} target="_blank" rel="noopener noreferrer" className="flex gap-3 leading-7 transition hover:text-white">
                  <MapPin size={17} className="mt-1.5 shrink-0 text-brand-300" aria-hidden />
                  <span>
                    {addressLines.map((line, index) => (
                      <span key={`${line}-${index}`} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {meta.siteName}. {footer.rights}
          </p>
          {socials.length ? (
            <ul className="flex gap-5">
              {socials.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
