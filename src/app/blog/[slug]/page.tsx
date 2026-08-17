import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPopularBlogs, getRelatedBlogs } from "@/lib/blogs";
import { getRelatedProducts } from "@/lib/products";
import BlogArticle from "@/components/blog/BlogArticle";
import BlogSidebar from "@/components/blog/BlogSidebar";
import RelatedArticles from "@/components/blog/RelatedArticles";

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

  const [relatedProducts, popularPosts, relatedPosts] = await Promise.all([
    getRelatedProducts(blog.categoryId, 3),
    getPopularBlogs(blog.id, 4),
    getRelatedBlogs(blog.id, blog.categoryId, 3),
  ]);

  return (
    <div style={{ background: "#FEF9F2" }}>
      <div className="h-px-section py-10 lg:py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-14 items-start">
          <BlogArticle
            title={blog.title}
            excerpt={blog.excerpt}
            coverImage={blog.coverImage}
            coverImageAlt={blog.coverImageAlt}
            author={blog.authorUser?.name ?? blog.author}
            publishedAt={blog.publishedAt}
            readTimeMinutes={blog.readTimeMinutes}
            body={blog.body}
            category={blog.category}
          />
          <BlogSidebar relatedProducts={relatedProducts} popularPosts={popularPosts} />
        </div>
      </div>

      <RelatedArticles posts={relatedPosts} />
      <BlogStillUnsure />
    </div>
  );
}
