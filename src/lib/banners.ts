import { prisma } from "@/lib/prisma";

export interface BannerData {
  id?: string;
  key: string;
  name: string;
  title: string;
  titleHighlight?: string | null;
  subtitle?: string | null;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
  gradientFrom?: string | null;
  gradientTo?: string | null;
  isActive?: boolean;
}

export const DEFAULT_BANNERS: Record<string, BannerData> = {
  festival_banner: {
    key: "festival_banner",
    name: "Festival Banner (Shivratri)",
    title: "This Shivratri, get the divine blessings of Bhagwaan Shiv",
    titleHighlight: "Shivratri",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786122587/rudraksh/banners/festival_banner_god.webp",
    ctaText: "SHOP NOW",
    ctaLink: "#",
    gradientFrom: "#298FC2",
    gradientTo: "#FFFFFF",
    isActive: true,
  },
  indramala_banner: {
    key: "indramala_banner",
    name: "Indramala Banner",
    title: "Indramala",
    titleHighlight: "Indramala",
    subtitle:
      "Experience the pinnacle of divine craftsmanship, blessed by all Gods and Goddesses. Each meticulously chosen Rudraksha bead forms a conduit of sacred energy, bestowing profound blessings, heightened intuition, and spiritual harmony upon its wearer.",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786122589/rudraksh/banners/indramala_banner_rudraksh.webp",
    ctaText: "SHOP NOW",
    ctaLink: "#",
    gradientFrom: "#F89F20",
    gradientTo: "#FFFFFF",
    isActive: true,
  },
};

export async function getBannerByKey(key: string): Promise<BannerData> {
  const fallback = DEFAULT_BANNERS[key] ?? {
    key,
    name: key,
    title: "Special Offer",
    imageUrl: "/assets/images/home/god.png",
    ctaText: "SHOP NOW",
    ctaLink: "#",
    isActive: true,
  };

  try {
    if (!prisma.banner) return fallback;

    const banner = await prisma.banner.findUnique({
      where: { key },
    });

    if (banner && banner.isActive) {
      return {
        id: banner.id,
        key: banner.key,
        name: banner.name,
        title: banner.title,
        titleHighlight: banner.titleHighlight,
        subtitle: banner.subtitle,
        imageUrl: banner.imageUrl,
        ctaText: banner.ctaText,
        ctaLink: banner.ctaLink,
        gradientFrom: banner.gradientFrom,
        gradientTo: banner.gradientTo,
        isActive: banner.isActive,
      };
    }
  } catch (error) {
    console.error(`Error loading banner '${key}' from database:`, error);
  }

  return fallback;
}
