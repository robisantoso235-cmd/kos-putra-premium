/**
 * Konfigurasi situs untuk build statis.
 * `NEXT_PUBLIC_SITE_URL` dipakai untuk canonical, Open Graph, robots, dan sitemap.
 * Contoh: NEXT_PUBLIC_SITE_URL=https://namakos.example.com
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
