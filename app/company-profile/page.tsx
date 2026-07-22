import Image from "next/image";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { clients } from "@/components/company-profile/profile-data";

const PDF_HREF = "/RGS-Company-Profile.pdf";

const sections = [
  "Cover",
  "About Us · At a Glance · RGS ONE",
  "Our Services",
  "Industries Served",
  "Why Choose Us",
  "Featured Clients",
  "Contact",
] as const;

export default function CompanyProfilePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.22),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(14,165,233,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-10 sm:px-8 sm:py-14">
        <a
          href="/"
          className="mb-10 inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-teal-300"
        >
          <ArrowLeft size={16} aria-hidden />
          Back to Website
        </a>

        <div className="mb-10">
          <Image
            src="/images/logo.png"
            alt="RGS Relasi Global Solusi"
            width={280}
            height={84}
            priority
            className="h-auto w-[180px] sm:w-[220px]"
          />
        </div>

        <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-teal-300">
          Company Profile
        </p>

        <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
          PT Relasi Global Solusi
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Download the official company profile PDF — services, industries,{" "}
          {clients.length} featured clients, RGS ONE, and contact details.
          Content matches the corporate website.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={PDF_HREF}
            download="RGS-Company-Profile.pdf"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            <Download size={18} aria-hidden />
            Download PDF
          </a>

          <a
            href={PDF_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/10"
          >
            <FileText size={18} aria-hidden />
            Open PDF
          </a>
        </div>

        <div className="mt-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-teal-300">
            Inside This Profile
          </p>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {sections.map((section) => (
              <li
                key={section}
                className="flex items-center gap-2.5 text-sm font-semibold text-slate-200"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"
                  aria-hidden
                />
                {section}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-auto pt-12 text-sm text-slate-500">
          Direct file:{" "}
          <a
            href={PDF_HREF}
            className="font-semibold text-teal-300/90 underline-offset-2 hover:underline"
          >
            www.rgs.co.id/RGS-Company-Profile.pdf
          </a>
        </p>
      </div>
    </main>
  );
}
