/**
 * Tipe data bersama untuk konten situs (mengikuti penamaan snake_case di src/content/site.ts).
 */

export type PricePeriod = "hari" | "minggu" | "bulan" | "tahun" | "lainnya";
export type FacilityCategory = "room" | "shared" | "building";
export type GalleryCategory = "kamar" | "fasilitas" | "area-bersama" | "lainnya";

export interface SiteSettings {
  id: boolean;
  site_name: string;
  tagline: string;
  logo_url: string | null;
  logo_alt: string | null;
  whatsapp_number: string | null;
  whatsapp_message: string;
  address_line: string | null;
  district: string;
  city: string;
  province: string;
  maps_url: string | null;
  maps_embed_url: string | null;
  latitude: number | null;
  longitude: number | null;
  instagram_url: string | null;
  email: string | null;
  footer_note: string | null;
  privacy_note: string | null;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  updated_at: string;
}

export interface ContentBlock {
  key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  image_url: string | null;
  image_alt: string | null;
  is_published: boolean;
  updated_at: string;
}

export interface Highlight {
  id: string;
  title: string;
  description: string | null;
  icon: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomTypeImage {
  id: string;
  room_type_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
}

export interface RoomType {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  price_amount: number | null;
  price_period: PricePeriod;
  price_note: string | null;
  cover_image_url: string | null;
  cover_image_alt: string | null;
  is_published: boolean;
  is_demo: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string | null;
  icon: string;
  category: FacilityCategory;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoomTypeWithRelations extends RoomType {
  facilities: Facility[];
  images: RoomTypeImage[];
}

export interface GalleryItem {
  id: string;
  title: string | null;
  image_url: string;
  alt_text: string;
  category: GalleryCategory;
  sort_order: number;
  is_published: boolean;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  is_published: boolean;
  is_demo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_detail: string | null;
  quote: string;
  is_published: boolean;
  is_demo: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SiteData {
  settings: SiteSettings;
  blocks: Record<string, ContentBlock>;
  highlights: Highlight[];
  facilities: Facility[];
  rooms: RoomTypeWithRelations[];
  gallery: GalleryItem[];
  faqs: Faq[];
  testimonials: Testimonial[];
  /** true = konten masih contoh (menampilkan penanda & tidak diindeks). */
  isFallback: boolean;
}
