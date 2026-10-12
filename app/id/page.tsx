import type { Metadata } from "next";
import HomePage from "@/components/site/HomePage";
import { pageOpenGraph } from "@/lib/seo";

const description =
  "PT Relasi Global Solusi (RGS) menghadirkan layanan manajemen fasilitas terpadu di seluruh Indonesia: kebersihan, keamanan, manajemen parkir, dan dukungan fasilitas untuk perkantoran, industri, rumah sakit, hotel, ritel, hunian, dan sektor publik.";

export const metadata: Metadata = {
  // Absolute: the layout's template would otherwise add the company name twice.
  title: { absolute: "RGS | PT Relasi Global Solusi" },
  description,
  alternates: {
    canonical: "/id",
    languages: { en: "/", id: "/id" },
  },
  openGraph: pageOpenGraph(
    "id",
    "/id",
    "PT Relasi Global Solusi (RGS)",
    "Layanan manajemen fasilitas terpadu yang profesional di seluruh Indonesia."
  ),
};

export default function HomeIndonesian() {
  return <HomePage lang="id" />;
}
