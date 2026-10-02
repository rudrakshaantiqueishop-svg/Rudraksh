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
  productSlug?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export const DEFAULT_INSPIRED_ITEMS: InspiredItemData[] = [
  {
    id: "inspired-lakshmi",
    title: "Ornate Inlaid Turquoise & Coral Brass Goddess Lakshmi Idol",
    type: "video",
    videoUrl: "https://www.youtube.com/shorts/VC7Hddui5Mw",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790704961/rudraksh/inspired/cover_lakshmi_video.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790156028/rudraksh/products/idols-singing-bowls/sacred-gemstone-inlaid-goddess-lakshmi-idol/role_0.webp",
    price: "₹9,499",
    originalPrice: "₹14,999",
    productSlug: "sacred-gemstone-inlaid-goddess-lakshmi-idol",
    sortOrder: 0,
    isActive: true,
  },
  {
    id: "inspired-1",
    title: "1008 Beads Nepali Rudraksha Maha Kanthi Mala",
    type: "video",
    videoUrl: "https://youtube.com/shorts/OEgdSN09sBw?si=VXwcmgqbD8sg5xsH",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790705249/rudraksh/inspired/cover_oegd_review_video.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790155950/rudraksh/products/antique-collection/1008-beads-nepali-rudraksha-maha-kanthi-mala/role_0.webp",
    price: "₹35,000",
    originalPrice: "₹48,000",
    productSlug: "1008-beads-nepali-rudraksha-maha-kanthi-mala",
    sortOrder: 1,
    isActive: true,
  },
  {
    id: "inspired-2",
    title: "Astrological Navagraha Nine Gemstone Mala",
    type: "video",
    videoUrl: "https://www.youtube.com/shorts/PmlEZWYldZs",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790708350/rudraksh/inspired/cover_navagraha_video.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790156002/rudraksh/products/gemstones/nine-stone-planetary-mala/role_0.webp",
    price: "₹16,500",
    originalPrice: "₹21,000",
    productSlug: "nine-stone-planetary-mala",
    sortOrder: 2,
    isActive: true,
  },
  {
    id: "inspired-3",
    title: "Sacred Ganesh Nepal Rudraksha",
    type: "video",
    videoUrl: "https://www.youtube.com/shorts/45txFb7-WVU",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790766798/rudraksh/inspired/cover_ganesh_video.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790156079/rudraksh/products/rudraksha/ganesh-rudraksha/role_0.webp",
    price: "₹4,800",
    originalPrice: "₹6,500",
    productSlug: "ganesh-rudraksha",
    sortOrder: 3,
    isActive: true,
  },
  {
    id: "inspired-4",
    title: "Sacred Sandalwood Hand-Carved Kalash Auspicious Bracelet",
    type: "video",
    videoUrl: "https://www.youtube.com/shorts/DGTBku7b_lQ",
    imageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790775905/rudraksh/inspired/cover_sandalwood_kalash_video.webp",
    productImageUrl: "https://res.cloudinary.com/dkbr33fcx/image/upload/v1790155987/rudraksh/products/bracelets/sandalwood-kalash-carved-bracelet/role_0.webp",
    price: "₹4,200",
    originalPrice: "₹6,000",
    productSlug: "sandalwood-kalash-carved-bracelet",
    sortOrder: 4,
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
            slug: true,
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
          const livePrice = `₹${Math.round(item.product.priceCents / 100).toLocaleString("en-IN")}`;
          const liveOrigPrice = item.product.compareAtPriceCents
            ? `₹${Math.round(item.product.compareAtPriceCents / 100).toLocaleString("en-IN")}`
            : null;

          return {
            ...item,
            productSlug: item.product.slug,
            productImageUrl: item.productImageUrl || liveProdImg,
            price: item.price || livePrice,
            originalPrice: item.originalPrice || liveOrigPrice,
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
