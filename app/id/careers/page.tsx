import type { Metadata } from "next";
import CareersPage from "@/components/site/CareersPage";
import { dictionaries } from "@/lib/i18n";
import { pageOpenGraph } from "@/lib/seo";

const t = dictionaries.id.careers;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/id/careers",
    languages: { en: "/careers", id: "/id/careers" },
  },
  openGraph: pageOpenGraph("id", "/id/careers", `${t.metaTitle} | PT Relasi Global Solusi`, t.metaDescription),
};

export default function CareersIndonesian() {
  return <CareersPage lang="id" />;
}
