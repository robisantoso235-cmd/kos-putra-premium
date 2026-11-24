import type { MetadataRoute } from "next";
import { getSiteData, hasDemoContent } from "@/lib/data/site";
import { siteUrl } from "@/lib/config";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getSiteData();
  const demo = hasDemoContent(data);
  const settingsUpdated = new Date(data.settings.updated_at);

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: settingsUpdated,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/kamar/`,
      lastModified: settingsUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Selama masih ada konten DEMO, seluruh situs di-disallow pada robots.txt,
  // sehingga detail kamar tidak perlu dimasukkan.
  if (!demo) {
    for (const room of data.rooms) {
      entries.push({
        url: `${siteUrl}/kamar/${room.slug}/`,
        lastModified: new Date(room.updated_at),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
