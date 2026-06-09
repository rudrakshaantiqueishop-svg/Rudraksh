import BlogHero from "@/components/blog/BlogHero";
import BlogListing from "@/components/blog/BlogListing";
import BlogStillUnsure from "@/components/blog/BlogStillUnsure";

export default function BlogPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <BlogHero />
      <BlogListing />
      <BlogStillUnsure />
    </div>
  );
}
