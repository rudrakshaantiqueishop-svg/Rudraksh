import "dotenv/config";
import { PrismaClient, ProductImageRole } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { readFileSync } from "node:fs";
import { join, parse } from "node:path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

function slugify(segment: string): string {
  return segment
    .toLowerCase()
    .trim()
    .replace(/[()]/g, " ")
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function getRole(index: number): ProductImageRole {
  if (index === 0) return "MAIN";
  if (index === 1) return "GALLERY_LEFT";
  if (index === 2) return "GALLERY_TOP_RIGHT";
  if (index === 3) return "GALLERY_BOTTOM_RIGHT";
  return "EXTRA";
}

async function main() {
  console.log("=== FIXING SKIPPED PRODUCTS ===");
  const cachePath = join(process.cwd(), "scripts", "cloudinary_assets_cache.json");
  const cloudinaryCache: Record<string, { public_id: string; secure_url: string; format: string; bytes: number }> =
    JSON.parse(readFileSync(cachePath, "utf-8"));
  
  const cacheKeys = Object.keys(cloudinaryCache);

  const skippedSlugs = [
    "grand-temple-inlaid-brass-radha-krishna-pair",
    "antique-brass-radha-krishna-murti-pair",
    "dhyana-mudra-brass-shiva-idol",
    "sacred-brass-bal-gopal-idol",
    "verdigris-patina-meditating-buddha-idol",
    "sacred-standing-tirupati-balaji-brass-idol",
    "vintage-handcrafted-brass-eiffel-tower",
    "handcrafted-golden-tibetan-singing-bowl",
    "hand-painted-floral-mandala-singing-bowl",
    "zen-black-matte-ohm-lotus-singing-bowl",
    "sacred-tibetan-mantra-etched-singing-bowl-set",
    "sacred-natural-loud-resonant-blowing-puja-shankh",
    "master-temple-grade-resonant-vamavarti-blowing-shankh",
    "sphatik-faceted-diamond-cut-mala",
    "sphatik-pure-round-japa-mala",
    "sphatik-devi-crimson-thread-mala",
    "indonesian-sarva-siddha-mala-silver-capped",
    "indonesian-siddha-mala-sacred-thread",
    "vedic-blue-sapphire-astrological-silver-ring",
    "multi-wrap-rudraksha-tassel-wrist-mala",
  ];

  let dbUpdated = 0;

  for (const slug of skippedSlugs) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      console.log(`Product not found in DB: ${slug}`);
      continue;
    }

    // Find all cloudinary keys containing the slug
    const matchingKeys = cacheKeys.filter(k => k.includes(slug));
    if (matchingKeys.length === 0) {
      console.log(`No Cloudinary assets found for: ${slug}`);
      continue;
    }
    
    // filter to only real product images under rudraksh/products/
    const productKeys = matchingKeys.filter(k => k.startsWith("rudraksh/products/"));

    if (productKeys.length === 0) {
      console.log(`No valid Cloudinary product assets found for: ${slug}`);
      continue;
    }

    // Sort the keys so role_0 is first, etc.
    productKeys.sort();

    // Delete existing images
    await prisma.productImage.deleteMany({ where: { productId: product.id } });

    const imageData = productKeys.map((key, i) => {
        const cUrl = cloudinaryCache[key].secure_url;
        return {
            productId: product.id,
            url: cUrl,
            alt: slug,
            role: getRole(i),
            sortOrder: i
        }
    });

    await prisma.productImage.createMany({ data: imageData });
    console.log(`✅ [${slug}] Updated ${imageData.length} images`);
    
    // Also update variant image if it is pool image
    const variants = await prisma.productVariant.findMany({ where: { productId: product.id } });
    for (const v of variants) {
      if (v.image && v.image.includes("/pool/")) {
        await prisma.productVariant.update({
          where: { id: v.id },
          data: { image: imageData[0].url },
        });
        console.log(`  - Variant updated`);
      }
    }
    
    dbUpdated++;
  }
  
  console.log(`\n✅ Total products updated: ${dbUpdated}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
