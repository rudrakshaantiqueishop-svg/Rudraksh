import "server-only";
import { prisma } from "@/lib/prisma";
import { DEFAULT_BANNERS } from "@/lib/banners";

export async function listBannersForAdmin() {
  try {
    if (!prisma.banner) {
      console.warn("prisma.banner is not defined yet on Prisma Client instance.");
      return [];
    }

    const banners = await prisma.banner.findMany({
      orderBy: { sortOrder: "asc" },
    });

    // If DB is empty, auto-seed default banners so admin panel has initial items immediately
    if (banners.length === 0) {
      const seeded = [];
      for (const key of Object.keys(DEFAULT_BANNERS)) {
        const def = DEFAULT_BANNERS[key];
        const b = await prisma.banner.create({
          data: {
            key: def.key,
            name: def.name,
            title: def.title,
            titleHighlight: def.titleHighlight,
            subtitle: def.subtitle,
            imageUrl: def.imageUrl,
            ctaText: def.ctaText,
            ctaLink: def.ctaLink,
            gradientFrom: def.gradientFrom,
            gradientTo: def.gradientTo,
            isActive: true,
          },
        });
        seeded.push(b);
      }
      return seeded;
    }

    return banners;
  } catch (error) {
    console.error("Error listing banners for admin:", error);
    return [];
  }
}

export async function getBannerForAdmin(id: string) {
  try {
    return await prisma.banner.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Error getting banner by ID:", error);
    return null;
  }
}

export type BannerForAdmin = NonNullable<Awaited<ReturnType<typeof getBannerForAdmin>>>;
