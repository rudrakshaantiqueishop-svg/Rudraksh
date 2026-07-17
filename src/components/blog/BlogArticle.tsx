import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock } from "lucide-react";
import { isHtmlContent } from "@/lib/blog-content";
import ShareRow from "./ShareRow";

type BlogArticleProps = {
  title: string;
  excerpt?: string;
  coverImage: string;
  coverImageAlt?: string | null;
  author: string;
  publishedAt: Date;
  readTimeMinutes: number;
  body: string;
  category?: { name: string; slug: string } | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogArticle({
  title,
  excerpt,
  coverImage,
  coverImageAlt,
  author,
  publishedAt,
  readTimeMinutes,
  body,
  category,
}: BlogArticleProps) {
  const isHtml = isHtmlContent(body);
  const paragraphs = isHtml ? [] : body.split("\n\n");

  return (
    <article className="min-w-0">
      {/* Category eyebrow */}
      {category && (
        <Link
          href={`/products/category/${category.slug}`}
          className="font-lato text-xs font-bold tracking-[1.5px] uppercase text-brown"
        >
          {category.name}
        </Link>
      )}

      {/* Title */}
      <h1 className={`font-prata text-3xl lg:text-[40px] leading-tight text-dark mb-4 ${category ? "mt-3" : ""}`}>
        {title}
      </h1>

      {/* Excerpt / standfirst */}
      {excerpt && (
        <p className="font-lato text-lg leading-relaxed text-gray-text mb-6">{excerpt}</p>
      )}

      {/* Meta row with icons */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 pb-8 border-b border-[#E7DFD6]">
        <span className="flex items-center gap-2 font-lato text-sm text-gray-text">
          <Calendar size={16} className="text-brown" />
          {formatDate(publishedAt)}
        </span>
        <span className="flex items-center gap-2 font-lato text-sm text-gray-text">
          <User size={16} className="text-brown" />
          {author}
        </span>
        <span className="flex items-center gap-2 font-lato text-sm text-gray-text">
          <Clock size={16} className="text-brown" />
          {readTimeMinutes} min read
        </span>
      </div>

      {/* Cover image */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[#F0E8DD] mb-10">
        <Image
          src={coverImage}
          alt={coverImageAlt || title}
          fill
          sizes="(max-width: 1024px) 100vw, 760px"
          className="object-cover"
          priority
        />
      </div>

      {/* Body */}
      {isHtml ? (
        <div
          className="blog-article-content font-lato text-base leading-relaxed text-[#44403C] [&_p]:my-4 [&_h2]:font-prata [&_h2]:text-2xl [&_h2]:text-dark [&_h2]:font-normal [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:leading-snug [&_h3]:font-bold [&_h3]:text-lg [&_h3]:text-dark [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:leading-snug [&_h4]:font-bold [&_h4]:text-base [&_h4]:text-dark [&_h4]:mt-5 [&_h4]:mb-2 [&_strong]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-3 [&_li]:my-1.5 [&_blockquote]:bg-dark [&_blockquote]:text-[#F5EDE2] [&_blockquote]:rounded-xl [&_blockquote]:not-italic [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:my-6 [&_blockquote]:font-prata [&_blockquote]:text-lg [&_blockquote]:leading-relaxed [&_a]:text-brown [&_a]:underline [&_a]:underline-offset-2 [&_img]:w-full [&_img]:rounded-xl [&_img]:my-6 [&_table]:w-full [&_table]:my-5 [&_table]:border-collapse [&_th]:border [&_th]:border-[#E7DFD6] [&_th]:bg-[#FFF5E6] [&_th]:p-2.5 [&_th]:text-left [&_td]:border [&_td]:border-[#E7DFD6] [&_td]:p-2.5 [&_hr]:border-[#E7DFD6] [&_hr]:my-8 [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-xl [&_iframe]:my-6"
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

      {/* Share */}
      <ShareRow title={title} />
    </article>
  );
}
