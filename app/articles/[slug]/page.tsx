"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "@/app/components/Header";

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = useQuery(api.articles.getBySlug, { slug: params.slug });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (article === undefined) {
    return (
      <main className="bg-dark-900 min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-gray-300">Loading article…</div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="bg-dark-900 min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-16 text-gray-300">
          <p className="text-xl font-semibold mb-4">Article not found.</p>
          <Link href="/articles" className="text-primary hover:text-primary-light font-semibold">
            Back to articles
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString()
    : "Published";
  const paragraphs = article.content.split("\n").filter(Boolean);

  return (
    <main className="bg-dark-900 min-h-screen pb-24">
      <Header />
      <article className="max-w-5xl mx-auto px-4 pt-32">
        <div className="mb-12">
          <div className="text-sm text-gray-400 mb-3 flex items-center gap-3">
            <Link href="/articles" className="text-primary hover:text-primary-light font-semibold">
              Articles
            </Link>
            <span className="text-gray-600">/</span>
            <span>{publishedDate}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{article.title}</h1>
          <p className="text-lg text-gray-300 max-w-3xl">{article.excerpt}</p>
          <div className="mt-4 text-sm text-gray-400 flex items-center gap-3">
            <span>By {article.author || "SlingMe"}</span>
          </div>
        </div>

        <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-white/10 mb-10">
          <Image
            src={article.image_url || "/hero.png"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          {paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.published_at,
            dateModified: article.published_at,
            author: { "@type": "Organization", name: article.author || "SlingMe" },
            image: article.image_url,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${siteUrl}/articles/${article.slug}`
            }
          })
        }}
      />
    </main>
  );
}
