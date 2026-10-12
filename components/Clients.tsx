import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { dictionaries, type Lang } from "@/lib/i18n";

type Client = {
  name: string;
  logo: string;
  /** Per-logo sizing: the source files carry different amounts of padding. */
  className?: string;
};

const clients: Client[] = [
  { name: "ACSET", logo: "/images/clients/acset.png", className: "max-h-12" },
  { name: "ASRI", logo: "/images/clients/asri.png", className: "max-h-14" },
  { name: "Boga Group", logo: "/images/clients/boga-group.png", className: "max-h-12" },
  { name: "Brawijaya Hospital", logo: "/images/clients/brawijaya-hospital.png", className: "max-h-12 scale-[2.25]" },
  { name: "Damansara", logo: "/images/clients/damansara.png", className: "max-h-12 scale-110" },
  { name: "ERHA", logo: "/images/clients/erha.png", className: "max-h-12 scale-125" },
  { name: "First Filled", logo: "/images/clients/first-filled.png", className: "max-h-12 scale-125" },
  { name: "FTL", logo: "/images/clients/ftl.png", className: "max-h-12" },
  { name: "Gitalaras", logo: "/images/clients/gitalaras.png", className: "max-h-8 scale-[1.9] invert" },
  { name: "Haidilao", logo: "/images/clients/haidilao.png", className: "max-h-12 scale-[1.75]" },
  { name: "Hana Bank", logo: "/images/clients/hana-bank.png", className: "max-h-12 scale-[1.9]" },
  { name: "Hokkaido Ya", logo: "/images/clients/hokkaido-ya.png", className: "max-h-12 scale-[1.4]" },
  { name: "LOTTE", logo: "/images/clients/lotte.png", className: "max-h-12 scale-110" },
  { name: "LRT Jakarta", logo: "/images/clients/lrt-jakarta.png", className: "max-h-12 scale-125" },
  { name: "MAP", logo: "/images/clients/map.png", className: "max-h-12 scale-125" },
  { name: "MRT Jakarta", logo: "/images/clients/mrt-jakarta.png", className: "max-h-14 scale-110" },
  { name: "Nifarro Park", logo: "/images/clients/nifarro-park.png", className: "max-h-12 scale-125" },
  { name: "Pakubuwono Signature", logo: "/images/clients/pakubuwono-signature.png", className: "max-h-12 scale-125" },
  { name: "Panin Bank", logo: "/images/clients/panin-bank.png", className: "max-h-12 scale-[1.9]" },
  { name: "PIK 2", logo: "/images/clients/pik-2.png", className: "max-h-14 scale-[1.45]" },
  { name: "Pondok Indah", logo: "/images/clients/pondok-indah.png", className: "max-h-12 scale-[1.75]" },
  { name: "PP Construction", logo: "/images/clients/pp-construction.png", className: "max-h-14 scale-110" },
  { name: "Sentul City", logo: "/images/clients/sentul-city.png", className: "max-h-12 scale-125" },
  { name: "Springhill Group", logo: "/images/clients/springhill-group.png", className: "max-h-12 scale-125" },
  { name: "Sushi Tei", logo: "/images/clients/sushi-tei.png", className: "max-h-12 scale-125" },
  { name: "Tiberias", logo: "/images/clients/tiberias.png", className: "max-h-14 scale-110" },
  { name: "Tom Sushi", logo: "/images/clients/tom-sushi.png", className: "max-h-12 scale-150" },
  { name: "Trans7", logo: "/images/clients/trans7.png", className: "max-h-12 scale-125" },
  { name: "UNIQLO", logo: "/images/clients/uniqlo.png", className: "max-h-12 scale-125" },
  { name: "Yoka Yoka", logo: "/images/clients/yoka-yoka.png", className: "max-h-12 scale-[2.6]" },
];

// Three moving rows of ten, alternating direction.
const ROWS = 3;
const perRow = Math.ceil(clients.length / ROWS);
const rows = Array.from({ length: ROWS }, (_, i) => clients.slice(i * perRow, (i + 1) * perRow));

function LogoTile({ client, hidden }: { client: Client; hidden?: boolean }) {
  return (
    <li
      aria-hidden={hidden || undefined}
      className="mr-4 flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white px-6 sm:h-28 sm:w-52"
    >
      <Image
        src={client.logo}
        alt={hidden ? "" : client.name}
        width={200}
        height={100}
        sizes="208px"
        className={`h-auto w-auto max-w-[80%] object-contain ${client.className ?? "max-h-12"}`}
      />
    </li>
  );
}

export default function Clients({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].clients;
  return (
    <section id="clients" className="bg-mist-50 py-20 text-ink-950 lg:py-28">
      <FadeIn className="site-gutter-x mx-auto mb-12 max-w-7xl lg:mb-14">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-brand-700">{t.eyebrow}</p>
            <h2 className="section-title mt-4">{t.title}</h2>
          </div>
          <p className="section-lead max-w-xl text-slate-600 lg:justify-self-end">
            {t.lead}
          </p>
        </div>
      </FadeIn>

      <div className="grid gap-4" aria-label={t.listLabel}>
        {rows.map((row, index) => (
          <div key={index} className="marquee overflow-hidden">
            <ul
              className={`marquee-track flex w-max ${
                index % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"
              }`}
              style={{ ["--marquee-duration" as string]: `${row.length * 8}s` }}
            >
              {/* Four passes of the row: the track moves by half of it, so the
                  loop stays seamless even on screens wider than one pass. */}
              {[0, 1, 2, 3].flatMap((pass) =>
                row.map((client) => (
                  <LogoTile key={`${client.name}-${pass}`} client={client} hidden={pass > 0} />
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
