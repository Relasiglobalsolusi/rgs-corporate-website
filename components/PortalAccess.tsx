import { ArrowUpRight } from "lucide-react";
import { portalLabel, portalLoginUrl } from "@/lib/portal";

type Props = {
  variant?: "compact" | "featured";
  onClick?: () => void;
};

const logoSrc = "/images/rgs-one-logo-nav.png";
const logoIntrinsic = { width: 1024, height: 682 };

const darkShell =
  "border border-white/10 bg-slate-950/90 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-slate-900/95";

const compactLogoClass =
  "h-9 w-auto shrink-0 object-contain sm:h-10 lg:h-10 xl:h-11";

const featuredLogoClass =
  "h-14 w-auto shrink-0 object-contain sm:h-16";

const loginLabelClass =
  "relative shrink-0 text-[11px] font-medium text-white transition duration-300 group-hover:text-cyan-100 sm:text-xs";

const featuredLoginLabelClass =
  "relative shrink-0 text-xs font-medium text-white transition duration-300 group-hover:text-cyan-100 sm:text-sm";

export default function PortalAccess({
  variant = "compact",
  onClick,
}: Props) {
  if (variant === "featured") {
    return (
      <a
        href={portalLoginUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-label={portalLabel}
        className={`group relative overflow-hidden rounded-2xl px-4 py-3.5 shadow-lg shadow-black/20 sm:px-5 sm:py-4 ${darkShell}`}
      >
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl transition duration-500 group-hover:bg-cyan-400/15" />

        <div className="relative flex items-center justify-center gap-3">
          {/* Native img keeps the navbar logo sharp; Next/Image rasterizes this asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="RGS ONE"
            width={logoIntrinsic.width}
            height={logoIntrinsic.height}
            decoding="async"
            className={featuredLogoClass}
          />

          <span className={featuredLoginLabelClass}>Login</span>

          <ArrowUpRight
            size={20}
            className="shrink-0 text-cyan-300 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
          />
        </div>
      </a>
    );
  }

  return (
    <a
      href={portalLoginUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      aria-label={portalLabel}
      className={`group relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-2xl p-1.5 sm:gap-2 sm:p-2 lg:p-2 xl:gap-2.5 xl:p-2.5 ${darkShell}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/0 to-blue-500/0 opacity-0 transition duration-300 group-hover:from-cyan-500/10 group-hover:via-cyan-400/5 group-hover:to-blue-500/10 group-hover:opacity-100" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="RGS ONE"
        width={logoIntrinsic.width}
        height={logoIntrinsic.height}
        decoding="async"
        className={compactLogoClass}
      />

      <span className={loginLabelClass}>Login</span>

      <ArrowUpRight
        size={14}
        className="relative shrink-0 text-cyan-300/80 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan-200"
      />
    </a>
  );
}
