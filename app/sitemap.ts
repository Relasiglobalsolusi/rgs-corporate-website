import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://rgs.co.id",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
