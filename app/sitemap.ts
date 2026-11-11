import type { MetadataRoute } from "next";
import { siteUrl } from "@/app/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    { url: `${siteUrl}/servicos`, priority: 0.9 },
    { url: `${siteUrl}/contato`, priority: 0.8 },
    { url: `${siteUrl}/sobre`, priority: 0.7 },
  ];
}
