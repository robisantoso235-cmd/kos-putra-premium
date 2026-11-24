import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Ekspor statis: `npm run build` menghasilkan HTML/CSS/JS di folder `out/`.
   * Tidak ada server Next.js, database, atau API route yang dibutuhkan.
   */
  output: "export",
  /** `/kamar` → `out/kamar/index.html`, cocok untuk hosting statis apa pun. */
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    /** Optimasi gambar next/image butuh server; untuk ekspor statis dimatikan. */
    unoptimized: true,
  },
};

export default nextConfig;
