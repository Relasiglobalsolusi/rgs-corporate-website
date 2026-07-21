const DEFAULT_CMS_ORIGIN = "https://one.rgs.co.id";

function getCmsAssetBaseUrl(): string {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL?.trim();
  if (!cmsUrl) {
    return DEFAULT_CMS_ORIGIN;
  }

  return cmsUrl.replace(/\/api\/website\/content\/?$/, "") || DEFAULT_CMS_ORIGIN;
}

export function resolveCmsImageUrl(
  path: string | undefined | null,
  fallback: string
): string {
  const value = path?.trim() || fallback;

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/uploads/")) {
    return `${getCmsAssetBaseUrl()}${value}`;
  }

  return value;
}

export function cmsImageRemotePatterns() {
  const patterns: Array<{
    protocol: "http" | "https";
    hostname: string;
    port?: string;
    pathname: string;
  }> = [
    {
      protocol: "https",
      hostname: "one.rgs.co.id",
      pathname: "/uploads/**",
    },
  ];

  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL?.trim();
  if (cmsUrl) {
    try {
      const parsed = new URL(cmsUrl);
      const alreadyListed = patterns.some((p) => p.hostname === parsed.hostname);
      if (!alreadyListed) {
        patterns.push({
          protocol: parsed.protocol.replace(":", "") as "http" | "https",
          hostname: parsed.hostname,
          port: parsed.port || undefined,
          pathname: "/uploads/**",
        });
      }
    } catch {
      // Ignore invalid CMS URL during config generation.
    }
  }

  return patterns;
}
