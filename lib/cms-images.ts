function getCmsAssetBaseUrl(): string | null {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL?.trim();
  if (!cmsUrl) {
    return null;
  }

  return cmsUrl.replace(/\/api\/website\/content\/?$/, "");
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
    const base = getCmsAssetBaseUrl();
    if (base) {
      return `${base}${value}`;
    }
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
      if (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") {
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
