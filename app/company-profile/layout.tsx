import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile",
  description:
    "Download the PT Relasi Global Solusi (RGS) company profile PDF — integrated facility management across Indonesia.",
  alternates: {
    canonical: "/company-profile",
  },
  openGraph: {
    title: "Company Profile | PT Relasi Global Solusi",
    description:
      "Download the RGS company profile PDF covering services, industries, clients, and RGS ONE.",
    url: "https://rgs.co.id/company-profile",
  },
};

export default function CompanyProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      {children}
    </div>
  );
}
