import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (!siteUrl) return [];

  return [
    { url: siteUrl, priority: 1, changeFrequency: "monthly" },
    { url: `${siteUrl}/servicos`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${siteUrl}/sobre`, priority: 0.7, changeFrequency: "yearly" },
    { url: `${siteUrl}/contato`, priority: 0.8, changeFrequency: "yearly" },
  ];
}
