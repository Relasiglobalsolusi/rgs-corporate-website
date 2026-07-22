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
    {
      url: "https://rgs.co.id/company-profile",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://rgs.co.id/RGS-Company-Profile.pdf",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
