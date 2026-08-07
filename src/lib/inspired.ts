import { prisma } from "@/lib/prisma";

export interface InspiredItemData {
  id: string;
  title: string;
  type: string; // "video" | "image"
  videoUrl?: string | null;
  imageUrl: string;
  productImageUrl?: string | null;
  price?: string | null;
  originalPrice?: string | null;
  productId?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export const DEFAULT_INSPIRED_ITEMS: InspiredItemData[] = [
  {
    id: "inspired-1",
    title: "Sacred Store Visit & Mala Review",
    type: "video",
    videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124524/rudraksh/inspired/cover_sacred_1.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124530/rudraksh/inspired/prod_thumb_necklace.webp",
    price: "$230.00",
    originalPrice: "$250.00",
    sortOrder: 0,
    isActive: true,
  },
  {
    id: "inspired-2",
    title: "Energized Rudraksha Bracelet Review",
    type: "video",
    videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124526/rudraksh/inspired/cover_sacred_2.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124532/rudraksh/inspired/prod_thumb_bracelet.webp",
    price: "$120.00",
    originalPrice: "$140.00",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "inspired-3",
    title: "Divine Rudraksha Ring Experience",
    type: "video",
    videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124528/rudraksh/inspired/cover_founding_1.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124534/rudraksh/inspired/prod_thumb_ring.webp",
    price: "$180.00",
    originalPrice: "$200.00",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "inspired-4",
    title: "Authentic Rudraksha Earrings Review",
    type: "video",
    videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124530/rudraksh/inspired/cover_founding_2.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1786124539/rudraksh/inspired/prod_thumb_earrings.webp",
    price: "$280.00",
    originalPrice: "$300.00",
    sortOrder: 3,
    isActive: true,
  },
];

export async function getPublicInspiredItems(): Promise<InspiredItemData[]> {
  try {
    if (!prisma.inspiredItem) {
      return DEFAULT_INSPIRED_ITEMS;
    }

    const items = await prisma.inspiredItem.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            priceCents: true,
            compareAtPriceCents: true,
            images: {
              take: 1,
              orderBy: { sortOrder: "asc" },
              select: { url: true },
            },
          },
        },
      },
    });

    if (items.length > 0) {
      return items.map((item) => {
        if (item.product) {
          const liveProdImg = item.product.images[0]?.url;
          const livePrice = `$${(item.product.priceCents / 100).toFixed(2)}`;
          const liveOrigPrice = item.product.compareAtPriceCents
            ? `$${(item.product.compareAtPriceCents / 100).toFixed(2)}`
            : null;

          return {
            ...item,
            productImageUrl: liveProdImg || item.productImageUrl,
            price: livePrice,
            originalPrice: liveOrigPrice,
          };
        }
        return item;
      });
    }
  } catch (error) {
    console.error("Error fetching public inspired items:", error);
  }

  return DEFAULT_INSPIRED_ITEMS;
}
