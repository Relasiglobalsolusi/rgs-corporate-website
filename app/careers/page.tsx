import type { Metadata } from "next";
import CareersPage from "@/components/site/CareersPage";
import { dictionaries } from "@/lib/i18n";
import { pageOpenGraph } from "@/lib/seo";

const t = dictionaries.en.careers;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: {
    canonical: "/careers",
    languages: { en: "/careers", id: "/id/careers" },
  },
  openGraph: pageOpenGraph("en", "/careers", `${t.metaTitle} | PT Relasi Global Solusi`, t.metaDescription),
};

export default function Careers() {
  return <CareersPage lang="en" />;
}
