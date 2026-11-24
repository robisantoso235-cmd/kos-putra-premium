import type { MetadataRoute } from "next";
import { getSiteData, hasDemoContent } from "@/lib/data/site";
import { siteUrl } from "@/lib/config";

export const dynamic = "force-static";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const data = await getSiteData();
  const demo = hasDemoContent(data);

  if (demo) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
