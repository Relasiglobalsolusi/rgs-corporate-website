import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rgs.co.id"),

  title: {
    default: "RGS | PT Relasi Global Solusi",
    template: "%s | PT Relasi Global Solusi",
  },

  description:
    "PT Relasi Global Solusi (RGS) delivers professional integrated facility management services across Indonesia, including cleaning services, security services, parking management, and facility support for commercial, industrial, healthcare, hospitality, retail, residential, and public sectors.",

  keywords: [
    "PT Relasi Global Solusi",
    "RGS",
    "Facility Management Indonesia",
    "Integrated Facility Management",
    "Cleaning Services",
    "Security Services",
    "Parking Management",
    "Property Management",
    "Facility Services Jakarta",
    "Commercial Cleaning",
  ],

  applicationName: "RGS",
  authors: [{ name: "PT Relasi Global Solusi" }],
  creator: "PT Relasi Global Solusi",
  publisher: "PT Relasi Global Solusi",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "PT Relasi Global Solusi (RGS)",
    description:
      "Professional integrated facility management services across Indonesia.",
    url: "https://www.rgs.co.id",
    siteName: "PT Relasi Global Solusi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "PT Relasi Global Solusi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PT Relasi Global Solusi",
    description:
      "Professional integrated facility management services across Indonesia.",
    images: ["/images/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className={`${sans.className} overflow-x-hidden bg-slate-950 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
