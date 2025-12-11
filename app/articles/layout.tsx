import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SlingMe Articles | Slingshot Rental Guides",
  description: "SEO-friendly Slingshot rental guides: pricing, safety, routes, packing lists, and event planning."
};

export default function ArticlesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
