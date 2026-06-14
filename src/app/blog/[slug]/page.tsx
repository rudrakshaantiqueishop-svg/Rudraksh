import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogArticle from "@/components/blog/BlogArticle";

const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

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
