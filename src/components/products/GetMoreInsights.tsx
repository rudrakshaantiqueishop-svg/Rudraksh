import Image from "next/image";
import Link from "next/link";
import { getBlogsByCategory } from "@/lib/blogs";

function formatPostDate(date: Date, readTimeMinutes: number) {
  const formatted = new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `${formatted}  -  ${readTimeMinutes} mins Read`;
}

export default async function GetMoreInsights({ categoryId }: { categoryId: string }) {
  const posts = await getBlogsByCategory(categoryId, 3);

  if (posts.length === 0) {
    return null;
  }

  const [featured, ...sideArticles] = posts;

  return (
    <section className="h-px-section py-14 lg:py-20" style={{ background: "#FEF9F2" }}>
      <h2 className="font-prata text-3xl lg:text-[36px] font-normal text-dark text-center m-0 mb-10 lg:mb-12">
        Get More Insights
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
          <Image
            src={featured.coverImage}
            alt={featured.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
            <span className="font-lato text-xs tracking-[1.5px] uppercase text-white/90 mb-3">
              {formatPostDate(featured.publishedAt, featured.readTimeMinutes)}
            </span>
            <h3 className="font-prata text-2xl lg:text-[32px] leading-tight text-white m-0 max-w-[75%] mb-6">
              {featured.title}
            </h3>
          </div>
          <Link
            href={`/blog/${featured.slug}`}
            className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 inline-flex items-center gap-2 bg-brown text-white font-lato text-sm font-medium px-5 py-2.5"
          >
            Read More
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* Side articles */}
        <div className="flex flex-col gap-6">
          {sideArticles.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="flex flex-col gap-4">
              <div className="relative h-[180px] sm:h-[200px] lg:h-[218px] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-lato text-base text-dark m-0">{post.title}</p>
                <p className="font-lato text-sm text-gray-text m-0">{formatPostDate(post.publishedAt, post.readTimeMinutes)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
