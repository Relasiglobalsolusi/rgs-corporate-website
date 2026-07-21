export type CmsStatItem = {
  value: string;
  label: string;
  description?: string;
};

export type CmsServiceItem = {
  title: string;
  label: string;
  description: string;
  image: string;
};

export type CmsContent = {
  hero: {
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    backgroundImage: string;
    highlights: string[];
    stats: CmsStatItem[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    items: CmsServiceItem[];
  };
  stats: {
    sectionLabel: string;
    title: string;
    sidebarLabel: string;
    sidebarText: string;
    featuredValue: string;
    featuredLabel: string;
    featuredDescription: string;
    items: CmsStatItem[];
  };
  cta: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    backgroundImage: string;
    ctaPrimary: string;
    badges: string[];
    footerNote: string;
  };
  whyChooseUs: {
    sectionLabel: string;
    title: string;
    subtitle: string;
    imageCaptionLabel: string;
    imageCaptionTitle: string;
    imageCaptionText: string;
    features: { title: string; description: string }[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    addressLines: string[];
  };
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  meta: {
    siteName: string;
    tagline: string;
  };
};

export type CmsResponse = {
  published: boolean;
  updatedAt: string | null;
  content: CmsContent;
};

const fallbackContent: CmsContent = {
  hero: {
    titleLine1: "Creating",
    titleLine2: "Better",
    titleLine3: "Environments",
    subtitle:
      "Relasi Global Solusi delivers professional cleaning, security, parking management, and integrated facility support for businesses that require dependable daily operations.",
    backgroundImage: "/images/hero/hero.jpg",
    highlights: ["Cleaning", "Security", "Parking", "Facility Support"],
    stats: [
      { value: "1000+", label: "Professional Personnel" },
      { value: "50+", label: "Corporate Clients" },
      { value: "24/7", label: "Operational Support" },
    ],
    ctaPrimary: "Request Proposal",
    ctaSecondary: "Explore Services",
  },
  services: {
    sectionLabel: "Our Services",
    title: "Integrated services for better facility operations.",
    subtitle:
      "RGS provides essential facility services that help businesses maintain cleaner, safer, and more efficient environments every day.",
    items: [],
  },
  stats: {
    sectionLabel: "RGS By The Numbers",
    title: "Scale, reliability, and operational discipline.",
    sidebarLabel: "Trusted Operations",
    sidebarText: "",
    featuredValue: "1000+",
    featuredLabel: "Professional Personnel",
    featuredDescription: "",
    items: [],
  },
  cta: {
    sectionLabel: "Let's Work Together",
    title: "Ready to strengthen your facility operations?",
    subtitle: "",
    backgroundImage: "/images/cta/cta.jpg",
    ctaPrimary: "Request Proposal",
    badges: [],
    footerNote: "",
  },
  whyChooseUs: {
    sectionLabel: "Why Choose RGS",
    title: "A trusted partner for modern facility management.",
    subtitle: "",
    imageCaptionLabel: "Operational Excellence",
    imageCaptionTitle: "Reliable people, clear standards, and consistent execution.",
    imageCaptionText: "",
    features: [],
  },
  contact: {
    phone: "+62 21 2295 2228",
    email: "contact@rgs.co.id",
    address: "Jakarta, Indonesia",
    addressLines: [
      "Jalan Daan Mogot KM 14.5",
      "Ruko Point 8 Blok F6",
      "Duri Kosambi, Cengkareng",
      "West Jakarta, Indonesia",
    ],
  },
  social: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
  meta: {
    siteName: "PT Relasi Global Solusi",
    tagline: "Built for cleaner, safer, better-managed environments.",
  },
};

export async function fetchWebsiteContent(): Promise<CmsResponse> {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;

  if (!cmsUrl) {
    return {
      published: false,
      updatedAt: null,
      content: fallbackContent,
    };
  }

  try {
    const headers: HeadersInit = {};
    if (process.env.CMS_API_KEY) {
      headers["x-api-key"] = process.env.CMS_API_KEY;
    }

    const res = await fetch(cmsUrl, {
      next: { revalidate: 60 },
      headers,
    });

    if (!res.ok) {
      throw new Error(`CMS fetch failed: ${res.status}`);
    }

    return (await res.json()) as CmsResponse;
  } catch (error) {
    console.error("[CMS] Failed to fetch website content:", error);
    return {
      published: false,
      updatedAt: null,
      content: fallbackContent,
    };
  }
}
