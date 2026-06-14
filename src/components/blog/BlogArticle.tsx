import Link from "next/link";

type BlogArticleProps = {
  title: string;
  author: string;
  publishedAt: Date;
  readTimeMinutes: number;
  body: string;
  category?: { name: string; slug: string } | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogArticle({ title, author, publishedAt, readTimeMinutes, body, category }: BlogArticleProps) {
  const paragraphs = body.split("\n\n");

  return (
    <article>
      <div className="h-px-section py-10 lg:py-14 max-w-3xl mx-auto">
        {category && (
          <Link
            href={`/products/category/${category.slug}`}
            className="font-lato text-xs font-bold tracking-[1.5px] uppercase text-brown"
          >
            {category.name}
          </Link>
        )}
        <h1 className="font-prata text-3xl lg:text-[44px] leading-tight text-dark mt-3 mb-6">{title}</h1>

        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[#E7DFD6]">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(180deg, #552912 0%, #BB5A28 100%)" }}
          >
            <span className="font-prata text-base text-white">R</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-lato text-sm font-semibold text-dark">{author}</span>
            <span className="font-lato text-sm text-gray-text">
              {formatDate(publishedAt)} · {readTimeMinutes} mins read
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="font-lato text-base leading-relaxed text-[#44403C] m-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
