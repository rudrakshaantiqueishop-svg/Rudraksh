import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogArticle from "@/components/blog/BlogArticle";

const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};

  const title = blog.metaTitle?.trim() || blog.title;
  const description = blog.metaDescription?.trim() || blog.excerpt;

  return {
    title,
    description,
    keywords: blog.tags,
    openGraph: {
      title,
      description,
      type: "article",
      images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <BlogArticle
        title={blog.title}
        author={blog.author}
        publishedAt={blog.publishedAt}
        readTimeMinutes={blog.readTimeMinutes}
        body={blog.body}
        category={blog.category}
      />
      <BlogStillUnsure />
    </div>
  );
}
