import FadeIn from "@/components/ui/FadeIn";
import type { CmsContent } from "@/lib/cms";

type Props = {
  content: CmsContent["stats"];
};

export default function Stats({ content }: Props) {
  const figures = [
    {
      value: content.featuredValue,
      label: content.featuredLabel,
      description: content.featuredDescription,
      featured: true,
    },
    ...content.items.map((item) => ({ ...item, featured: false })),
  ].filter((figure) => figure.value);

  return (
    <section id="stats" className="relative overflow-hidden bg-ink-950 py-20 text-white lg:py-28">
      <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand-500/15 blur-[120px]" aria-hidden />
      <div className="site-gutter-x relative mx-auto max-w-7xl">
        <FadeIn className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-brand-300">{content.sectionLabel}</p>
            <h2 className="section-title mt-4">{content.title}</h2>
          </div>
          {content.sidebarText ? (
            <div className="lg:justify-self-end">
              {content.sidebarLabel ? (
                <p className="text-sm font-semibold text-white">{content.sidebarLabel}</p>
              ) : null}
              <p className="section-lead mt-2 max-w-xl text-white/65">{content.sidebarText}</p>
            </div>
          ) : null}
        </FadeIn>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {figures.map((figure, index) => (
            <FadeIn
              key={figure.label}
              delay={index * 0.06}
              className={`flex flex-col p-7 sm:p-8 ${figure.featured ? "bg-brand-400 text-ink-950" : "bg-ink-900"}`}
            >
              <dt className="order-2 mt-4 text-base font-semibold">{figure.label}</dt>
              <dd
                className={`order-1 text-5xl font-semibold tracking-[-0.04em] tabular-nums lg:text-6xl ${
                  figure.featured ? "text-ink-950" : "text-white"
                }`}
              >
                {figure.value}
              </dd>
              {figure.description ? (
                <dd className={`order-3 mt-2 text-sm leading-6 ${figure.featured ? "text-ink-950/70" : "text-white/60"}`}>
                  {figure.description}
                </dd>
              ) : null}
            </FadeIn>
          ))}
        </dl>
      </div>
    </section>
  );
}
