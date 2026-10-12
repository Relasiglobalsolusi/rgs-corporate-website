import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";

/**
 * The full link preview for a page (WhatsApp, Facebook, LinkedIn). A page's
 * own openGraph replaces the layout's whole object, so each page passes all of it.
 */
export function pageOpenGraph(lang: Lang, path: string, title: string, description: string): Metadata["openGraph"] {
  return {
    title,
    description,
    url: `https://www.rgs.co.id${path}`,
    siteName: "PT Relasi Global Solusi",
    locale: lang === "id" ? "id_ID" : "en_US",
    type: "website",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "PT Relasi Global Solusi" }],
  };
}
