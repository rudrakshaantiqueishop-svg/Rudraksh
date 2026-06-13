import dynamic from "next/dynamic";
import BlogHero from "@/components/blog/BlogHero";

const BlogListing = dynamic(() => import("@/components/blog/BlogListing"));
const BlogStillUnsure = dynamic(() => import("@/components/blog/BlogStillUnsure"));

export default function BlogPage() {
  return (
    <div style={{ background: "#FEF9F2", overflowX: "hidden" }}>
      <BlogHero />
      <BlogListing />
      <BlogStillUnsure />
    </div>
  );
}
