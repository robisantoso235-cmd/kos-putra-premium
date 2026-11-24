import type { GalleryCategory } from "./types";

export const siteNav = [
  { href: "/#beranda", label: "Beranda" },
  { href: "/#tentang", label: "Tentang" },
  { href: "/#kamar", label: "Kamar" },
  { href: "/#fasilitas", label: "Fasilitas" },
  { href: "/#galeri", label: "Galeri" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const facilityCategoryLabels = {
  room: "Dalam kamar",
  shared: "Fasilitas bersama",
  building: "Bangunan & keamanan",
} as const;

export const galleryCategoryLabels: Record<GalleryCategory, string> = {
  kamar: "Kamar",
  fasilitas: "Fasilitas",
  "area-bersama": "Area bersama",
  lainnya: "Lainnya",
};
