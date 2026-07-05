import {
  Award,
  Building2,
  CheckCircle2,
  Headphones,
  Users,
} from "lucide-react";

const stats = [
  {
    value: "1000+",
    label: "Professional Personnel",
    description:
      "Highly trained personnel deployed across cleaning, security, parking, and integrated facility management operations throughout Indonesia.",
    icon: Users,
  },
  {
    value: "50+",
    label: "Corporate Clients",
    description:
      "Trusted by commercial, healthcare, hospitality, retail, and industrial organizations.",
    icon: Building2,
  },
  {
    value: "99%",
    label: "Client Satisfaction",
    description:
      "Built through consistent supervision, reporting, and dependable service delivery.",
    icon: Award,
  },
  {
    value: "24/7",
    label: "Operational Support",
    description:
      "Responsive coordination to keep facilities running smoothly every day.",
    icon: Headphones,
  },
];

export default function Stats() {
  return (
    <section
      id="stats"
      className="relative overflow-hidden bg-slate-950 px-6 py-28 text-white md:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.14),transparent_36%)]" />

      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-300">
              RGS By The Numbers
            </p>

            <h2 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Scale, reliability, and operational discipline.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-teal-300">
              Trusted Operations
            </p>

            <p className="mt-5 text-xl leading-9 text-slate-200">
              RGS supports demanding facilities with trained personnel,
              responsive management, and consistent daily execution across
              commercial offices, hospitals, hotels, retail centres,
              residential developments, and industrial facilities.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_1.85fr]">
          <div className="rounded-[2.5rem] border border-teal-300/20 bg-teal-300 p-8 text-slate-950 shadow-2xl shadow-teal-950/30 md:p-10">
            <p className="mb-8 text-sm font-black uppercase tracking-[0.3em]">
              Core Strength
            </p>

            <h3 className="text-8xl font-black leading-none tracking-tight md:text-9xl">
              1000+
            </h3>

            <p className="mt-5 text-3xl font-black leading-tight">
              Professional Personnel
            </p>

            <p className="mt-5 max-w-md text-lg font-semibold leading-8 text-slate-800">
              Highly trained personnel supporting cleaning, security, parking,
              and integrated facility management operations throughout
              Indonesia.
            </p>

            <div className="mt-10 flex items-center gap-3 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-black uppercase tracking-wide text-white">
              <CheckCircle2 size={20} className="text-teal-300" />
              Ready for Daily Operations
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {stats.slice(1).map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-teal-300/40 hover:bg-white/10"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-950 transition duration-300 group-hover:rotate-6">
                    <Icon size={28} />
                  </div>

                  <h3 className="mb-3 text-6xl font-black tracking-tight text-white">
                    {stat.value}
                  </h3>

                  <h4 className="mb-4 text-xl font-black text-white">
                    {stat.label}
                  </h4>

                  <p className="leading-7 text-slate-300">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}