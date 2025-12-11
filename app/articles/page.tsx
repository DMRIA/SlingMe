"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Header } from "../components/Header";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function ArticlesPage() {
  const articles = useQuery(api.articles.list);
  const seed = useMutation(api.articles.seed);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  useEffect(() => {
    seed();
  }, [seed]);

  const items = articles ?? Array.from({ length: 3 }).map((_, idx) => ({
    _id: `placeholder-${idx}`,
    title: "Article coming soon",
    slug: "#",
    excerpt: "We are warming up the latest stories from the SlingMe team.",
    author: "SlingMe",
    published_at: Date.now(),
    image_url: "/hero.png"
  }));

  return (
    <main className="bg-dark-900 min-h-screen pb-24">
      <Header />
      <div className="pt-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            THE <span className="text-primary">LIFESTYLE</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Curated guides, routes, and news from the world of open-air motoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article._id} className="group block h-full">
              <article className="bg-dark-800 rounded-3xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all h-full flex flex-col hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image_url || "/hero.png"}
                    alt={article.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-400 line-clamp-3 mb-6 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 font-medium">
                    <span>{article.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(article.published_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {articles && articles.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: articles.map((article, idx) => ({
                "@type": "ListItem",
                position: idx + 1,
                url: `${siteUrl}/articles/${article.slug}`,
                name: article.title,
                description: article.excerpt,
                datePublished: article.published_at
              }))
            })
          }}
        />
      ) : null}
    </main>
  );
}
