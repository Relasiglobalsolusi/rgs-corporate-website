import FadeIn from "@/components/ui/FadeIn";
import Image from "next/image";

const industries = [
  {
    title: "Corporate Offices",
    image: "/images/industries/offices.jpg",
  },
  {
    title: "Commercial Buildings",
    image: "/images/industries/commercial.jpg",
  },
  {
    title: "Shopping Centres",
    image: "/images/industries/mall.jpg",
  },
  {
    title: "Hospitals",
    image: "/images/industries/hospital.jpg",
  },
  {
    title: "Hotels",
    image: "/images/industries/hotel.jpg",
  },
  {
    title: "Industrial Facilities",
    image: "/images/industries/industrial.jpg",
  },
  {
    title: "Warehouses",
    image: "/images/industries/warehouse.jpg",
  },
  {
    title: "Educational Institutions",
    image: "/images/industries/education.jpg",
  },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="bg-slate-950 site-gutter-x py-28 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-300">
              Industries We Serve
            </p>

            <h2 className="mx-auto max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Supporting every environment that matters.
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              From premium office towers to hospitals, hotels, logistics
              facilities, and educational institutions, RGS provides dependable
              facility management solutions tailored to each industry.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((industry, index) => (
            <FadeIn key={industry.title} delay={index * 0.06}>
              <div className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur transition duration-500 hover:-translate-y-2 hover:border-teal-300/40 hover:shadow-2xl hover:shadow-teal-500/10">
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-3xl font-black leading-tight text-white">
                      {industry.title}
                    </h3>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}