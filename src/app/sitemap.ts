import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const getBaseUrl = () => {
    if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  };
  const baseUrl = getBaseUrl();

  // Fetch all active products
  const products = await prisma.product.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Fetch all published blog posts
  const posts = await prisma.blog.findMany({
    select: { slug: true, updatedAt: true },
  });

  // Define static routes
  const routes = [
    "",
    "/about",
    "/products",
    "/blog",
    "/consultation",
    "/contact",
    "/energisation-process",
    "/how-to-choose",
    "/authenticity",
    "/testimonial",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Map product routes
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt.toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.9,
  }));

  // Map blog routes
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt.toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...routes, ...productRoutes, ...blogRoutes];
}
