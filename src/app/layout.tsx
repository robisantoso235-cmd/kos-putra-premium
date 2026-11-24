import type { Metadata, Viewport } from "next";
import { Archivo, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { getSiteData, hasDemoContent } from "@/lib/data/site";
import { siteUrl } from "@/lib/config";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-archivo",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f2e8",
  colorScheme: "light",
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  const { settings } = data;
  const demo = hasDemoContent(data);
  const ogImage = settings.og_image_url ?? data.blocks.hero?.image_url ?? null;

  const title = settings.seo_title || `${settings.site_name} | Kos Putra ${settings.district}`;
  const description =
    settings.seo_description ||
    `${settings.site_name}: informasi kos putra di ${settings.district}, ${settings.city}. Tipe kamar, fasilitas, dan kontak pengelola.`;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s | ${settings.site_name}`,
    },
    description,
    applicationName: settings.site_name,
    keywords: [
      `kos putra ${settings.district}`,
      `kos mahasiswa ${settings.district}`,
      `kos di ${settings.city}`,
      `hunian mahasiswa ${settings.district}`,
    ],
    authors: [{ name: settings.site_name }],
    alternates: { canonical: siteUrl },
    robots: demo
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: settings.site_name,
      title,
      description,
      url: siteUrl,
      images: ogImage ? [{ url: ogImage, alt: settings.site_name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    icons: settings.logo_url ? { icon: settings.logo_url } : undefined,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${archivo.variable} ${cormorant.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh bg-paper-50 antialiased">{children}</body>
    </html>
  );
}
