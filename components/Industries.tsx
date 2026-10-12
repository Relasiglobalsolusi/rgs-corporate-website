import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import { dictionaries, type Lang } from "@/lib/i18n";

// Bento layout on wide screens: one large tile, one wide tile, six small ones.
const industries = [
  { title: "Corporate Offices", image: "/images/industries/offices.jpg", span: "lg:col-span-2 lg:row-span-2" },
  { title: "Commercial Buildings", image: "/images/industries/commercial.jpg" },
  { title: "Shopping Centres", image: "/images/industries/mall.jpg" },
  { title: "Hospitals", image: "/images/industries/hospital.jpg" },
  { title: "Hotels", image: "/images/industries/hotel.jpg" },
  { title: "Industrial Facilities", image: "/images/industries/industrial.jpg", span: "lg:col-span-2" },
  { title: "Warehouses", image: "/images/industries/warehouse.jpg" },
  { title: "Educational Institutions", image: "/images/industries/education.jpg", span: "col-span-2 lg:col-span-1" },
];

export default function Industries({ lang }: { lang: Lang }) {
  const t = dictionaries[lang].industries;
  return (
    <section id="industries" className="relative overflow-hidden bg-mist-50 py-20 text-ink-950 lg:py-28">
      <div className="site-gutter-x relative mx-auto max-w-7xl">
        <FadeIn className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-brand-700">{t.eyebrow}</p>
            <h2 className="section-title mt-4">{t.title}</h2>
          </div>
          <p className="section-lead max-w-xl text-slate-600 lg:justify-self-end">
            {t.lead}
          </p>
        </FadeIn>

        <ul className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:auto-rows-[15rem] lg:grid-cols-4">
          {industries.map((industry, index) => (
            <FadeIn
              as="li"
              key={industry.title}
              delay={index * 0.05}
              className={`group relative overflow-hidden rounded-2xl ${industry.span ?? ""} ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
            >
              <Image
                src={industry.image}
                alt=""
                fill
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent transition duration-500 group-hover:from-ink-950/80" />
              <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white sm:inset-x-5 sm:bottom-5">
                <h3
                  className={`font-semibold leading-tight tracking-tight ${
                    index === 0 ? "text-2xl sm:text-3xl" : "text-base sm:text-lg"
                  }`}
                >
                  {t.names[index] ?? industry.title}
                </h3>
                <span className="hidden text-xs font-medium text-white/50 tabular-nums sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
