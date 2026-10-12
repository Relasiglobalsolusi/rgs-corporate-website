import type { MetadataRoute } from "next";

const SITE = "https://www.rgs.co.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Each page in English and Indonesian, telling search engines the two belong together.
  const pair = (en: string, id: string, priority: number, changeFrequency: "weekly" | "monthly") =>
    [en, id].map((path) => ({
      url: `${SITE}${path}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages: { en: `${SITE}${en}`, id: `${SITE}${id}` } },
    }));

  return [
    ...pair("", "/id", 1, "weekly"),
    ...pair("/careers", "/id/careers", 0.8, "monthly"),
    {
      url: `${SITE}/company-profile`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE}/RGS-Company-Profile.pdf`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
