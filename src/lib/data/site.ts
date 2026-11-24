import { cache } from "react";
import { siteContent } from "@/content/site";
import type { SiteData } from "../types";

/**
 * Lapisan baca konten publik.
 *
 * Konten berasal dari `src/content/site.ts` (tanpa database/backend).
 * Seluruh halaman di-prerender sebagai HTML statis saat `npm run build`.
 */
export const getSiteData = cache(async (): Promise<SiteData> => siteContent);

export const getRoomTypeBySlug = cache(async (slug: string) => {
  return siteContent.rooms.find((room) => room.slug === slug) ?? null;
});

/** Apakah konten yang tampil masih ditandai contoh? */
export function hasDemoContent(data: SiteData): boolean {
  if (data.isFallback) return true;
  return data.rooms.some((room) => room.is_demo) || data.gallery.some((item) => item.is_demo);
}
