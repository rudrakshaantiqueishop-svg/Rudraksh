import dynamic from "next/dynamic";
import BlogHero from "@/components/blog/BlogHero";
import { getBlogsPaginated, getBlogCategories } from "@/lib/blogs";

const BlogListing = dynamic(() => import("@/components/blog/BlogListing"));
const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export default async function BlogPage() {
  const [{ posts, total }, categories] = await Promise.all([
    getBlogsPaginated({ skip: 0, take: 4 }),
    getBlogCategories(),
  ]);

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <BlogHero />
      <BlogListing initialPosts={posts} initialTotal={total} categories={categories} />
      <BlogStillUnsure />
    </div>
  );
}
