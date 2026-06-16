import Link from "next/link";
import { isHtmlContent } from "@/lib/blog-content";

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
  const isHtml = isHtmlContent(body);
  const paragraphs = isHtml ? [] : body.split("\n\n");

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

        {isHtml ? (
          <div
            className="font-lato text-base leading-relaxed text-[#44403C] [&_p]:my-4 [&_h2]:font-prata [&_h2]:text-2xl [&_h2]:text-dark [&_h2]:font-normal [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:leading-snug [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-dark [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:leading-snug [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1 [&_blockquote]:border-l-[3px] [&_blockquote]:border-brown [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-text [&_blockquote]:my-4 [&_a]:text-brown [&_a]:underline [&_a]:underline-offset-2 [&_img]:max-w-full [&_img]:rounded-lg [&_img]:my-4"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        ) : (
          <div className="flex flex-col gap-5">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="font-lato text-base leading-relaxed text-[#44403C] m-0">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
