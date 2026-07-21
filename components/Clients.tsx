import Image from "next/image";

type Client = {
  name: string;
  logo: string;
  className?: string;
};

const clients: Client[] = [
  { name: "ACSET", logo: "/images/clients/acset.png", className: "max-h-24" },
  { name: "ASRI", logo: "/images/clients/asri.png", className: "max-h-28" },
  { name: "Boga Group", logo: "/images/clients/boga-group.png", className: "max-h-24" },
  { name: "Brawijaya Hospital", logo: "/images/clients/brawijaya-hospital.png", className: "max-h-24 scale-[2.25]" },
  { name: "Damansara", logo: "/images/clients/damansara.png", className: "max-h-24 scale-110" },
  { name: "ERHA", logo: "/images/clients/erha.png", className: "max-h-24 scale-125" },
  { name: "First Filled", logo: "/images/clients/first-filled.png", className: "max-h-24 scale-125" },
  { name: "FTL", logo: "/images/clients/ftl.png", className: "max-h-24" },
  { name: "Gitalaras", logo: "/images/clients/gitalaras.png", className: "max-h-16 scale-[1.9] invert" },
  { name: "Haidilao", logo: "/images/clients/haidilao.png", className: "max-h-24 scale-[1.75]" },
  { name: "Hana Bank", logo: "/images/clients/hana-bank.png", className: "max-h-24 scale-[2.1]" },
  { name: "Hokkaido Ya", logo: "/images/clients/hokkaido-ya.png", className: "max-h-24 scale-[1.4]" },
  { name: "LOTTE", logo: "/images/clients/lotte.png", className: "max-h-24 scale-110" },
  { name: "LRT Jakarta", logo: "/images/clients/lrt-jakarta.png", className: "max-h-24 scale-125" },
  { name: "MAP", logo: "/images/clients/map.png", className: "max-h-24 scale-125" },
  { name: "MRT Jakarta", logo: "/images/clients/mrt-jakarta.png", className: "max-h-28 scale-110" },
  { name: "Nifarro Park", logo: "/images/clients/nifarro-park.png", className: "max-h-24 scale-125" },
  { name: "Pakubuwono Signature", logo: "/images/clients/pakubuwono-signature.png", className: "max-h-24 scale-125" },
  { name: "Panin Bank", logo: "/images/clients/panin-bank.png", className: "max-h-24 scale-[2.05]" },
  { name: "PIK 2", logo: "/images/clients/pik-2.png", className: "max-h-28 scale-[1.45]" },
  { name: "Pondok Indah", logo: "/images/clients/pondok-indah.png", className: "max-h-24 scale-[1.75]" },
  { name: "PP Construction", logo: "/images/clients/pp-construction.png", className: "max-h-28 scale-110" },
  { name: "Sentul City", logo: "/images/clients/sentul-city.png", className: "max-h-24 scale-125" },
  { name: "Springhill Group", logo: "/images/clients/springhill-group.png", className: "max-h-24 scale-125" },
  { name: "Sushi Tei", logo: "/images/clients/sushi-tei.png", className: "max-h-24 scale-125" },
  { name: "Tiberias", logo: "/images/clients/tiberias.png", className: "max-h-28 scale-110" },
  { name: "Tom Sushi", logo: "/images/clients/tom-sushi.png", className: "max-h-24 scale-150" },
  { name: "Trans7", logo: "/images/clients/trans7.png", className: "max-h-24 scale-125" },
  { name: "UNIQLO", logo: "/images/clients/uniqlo.png", className: "max-h-24 scale-125" },
  { name: "Yoka Yoka", logo: "/images/clients/yoka-yoka.png", className: "max-h-24 scale-[2.85]" },
];

export default function Clients() {
  return (
    <section
      id="clients"
      className="bg-white site-gutter-x py-28 text-slate-950"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-600">
            Client Experience
          </p>

          <h2 className="mx-auto max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Trusted by respected brands and destinations.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            RGS has supported organizations across commercial properties,
            banking, healthcare, hospitality, retail, residential, and public
            facilities.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-slate-900/25 md:p-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {clients.map((client) => (
              <div
                key={client.name}
                className="group relative flex h-40 items-center justify-center overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-2xl hover:shadow-teal-500/15"
              >
                <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_35%,rgba(20,184,166,0.12),transparent_55%)]" />

                <Image
                  src={client.logo}
                  alt={client.name}
                  width={220}
                  height={120}
                  sizes="(max-width: 768px) 40vw, 12vw"
                  className={`relative z-10 h-auto w-auto max-w-[90%] object-contain transition duration-300 group-hover:scale-105 ${
                    client.className ?? "max-h-24"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-4xl text-center text-sm leading-7 text-slate-500">
          Selected client experience across commercial, healthcare,
          hospitality, retail, residential, industrial, and infrastructure
          sectors.
        </p>
      </div>
    </section>
  );
}
