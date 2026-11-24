import type {
  ContentBlock,
  Facility,
  Faq,
  GalleryItem,
  Highlight,
  RoomTypeWithRelations,
  SiteData,
  SiteSettings,
  Testimonial,
} from "@/lib/types";

/*
 * KONTEN WEBSITE: satu-satunya tempat mengubah isi situs.
 *
 * Sumber data: profil Google Maps "Kost Graha Dhewa (Kost Putra)".
 * Foto asli disimpan di `public/images/` dan berasal dari profil Google Maps
 * tersebut. Perbarui berkas ini lalu jalankan `npm run build`.
 *
 * Bagian: pengaturan situs, blok teks halaman (hero, profil, lokasi, CTA),
 * keunggulan, fasilitas, tipe kamar, galeri, FAQ, dan testimoni.
 */

/** Konten sudah memakai data dan foto asli dari Google Maps. */
export const isDemo = false;

const UPDATED_AT = "2026-11-24T00:00:00.000Z";

/* Pengaturan situs */

const settings: SiteSettings = {
  id: true,
  site_name: "Kost Graha Dhewa",
  tagline: "Kos putra di Kramas, Tembalang, Semarang.",
  logo_url: null, // contoh: "/images/logo.png"
  logo_alt: "Logo Kost Graha Dhewa",
  // Nomor WhatsApp format Indonesia, hanya angka. Kosongkan (null) bila belum ada.
  whatsapp_number: "6285780780845",
  whatsapp_message:
    "Halo, saya ingin bertanya mengenai Kost Graha Dhewa di Kramas, Tembalang.",
  address_line: "Perumahan Griya Borobudur Cluster Arupadhatu No. A234, RT 1/RW 7",
  district: "Kramas, Tembalang",
  city: "Semarang",
  province: "Jawa Tengah",
  // Tautan tombol "Buka di Google Maps".
  maps_url: "https://maps.app.goo.gl/D9m7xDwpUMzPMtaNA",
  // URL pada atribut src iframe Google Maps.
  maps_embed_url:
    "https://maps.google.com/maps?q=-7.0689397,110.4431542&z=17&output=embed",
  latitude: -7.0689397,
  longitude: 110.4431542,
  instagram_url: null,
  email: null,
  footer_note:
    "Ketersediaan kamar dan jadwal survei dikonfirmasi langsung oleh pengelola. Data lokasi dan ulasan mengacu pada Google Maps.",
  privacy_note:
    "Website ini hanya menampilkan informasi kos dan tidak menyimpan data pribadi pengunjung.",
  seo_title: "Kost Graha Dhewa (Kost Putra) | Kos Putra Kramas, Tembalang, Semarang",
  seo_description:
    "Kost Graha Dhewa, kos putra di Perumahan Griya Borobudur, Kramas, Tembalang, Semarang. Lima tipe kamar single ber-AC dengan smart TV, kamar mandi dalam, kulkas mini, dan WiFi. Tarif Rp1.310.000–Rp1.610.000 per bulan. Rating 5,0 dari 27 ulasan Google Maps.",
  og_image_url: "/images/tampak-depan-malam.jpg",
  updated_at: UPDATED_AT,
};

/* Blok teks halaman */

const block = (
  key: string,
  title: string,
  subtitle: string,
  body: string,
  extra: Partial<ContentBlock> = {},
): ContentBlock => ({
  key,
  title,
  subtitle,
  body,
  image_url: null,
  image_alt: null,
  is_published: true,
  updated_at: UPDATED_AT,
  ...extra,
});

const blocks: Record<string, ContentBlock> = {
  hero: block(
    "hero",
    "Kos putra di Kramas, Tembalang",
    "Kost Graha Dhewa berada di Perumahan Griya Borobudur, Kramas, Tembalang. Lima tipe kamar single ber-AC dengan smart TV, kamar mandi dalam, kulkas mini, dan WiFi, dengan tarif Rp1.310.000–Rp1.610.000 per bulan. Rating 5,0 dari 27 ulasan Google Maps.",
    "Kos putra dua lantai dengan lima tipe kamar, parkir motor di lantai dasar, dapur bersama, dan area duduk di lantai dua.",
    {
      image_url: "/images/kamar-single.jpg",
      image_alt:
        "Kamar single ber-AC dengan tempat tidur, meja belajar, dan lemari pakaian di Kost Graha Dhewa",
    },
  ),
  profile: block(
    "profile",
    "Tentang Kost Graha Dhewa",
    "Kos putra di Kramas, Tembalang",
    "Kost Graha Dhewa adalah rumah pondokan putra dua lantai di Perumahan Griya Borobudur Cluster Arupadhatu, Kramas, Tembalang, Semarang. Penghuni di Google Maps menilai kos ini nyaman, bersih, dan pengelola serta penghuninya ramah. Tersedia lima tipe kamar single—Small, Back-L, Side-L, Corner, dan Square—dengan tarif Rp1.310.000–Rp1.610.000 per bulan. Setiap kamar dilengkapi AC, smart TV, kamar mandi dalam, kulkas mini, dan WiFi.",
    {
      image_url: "/images/area-duduk-lantai-2.jpg",
      image_alt: "Area duduk di lantai dua Kost Graha Dhewa",
    },
  ),
  location_intro: block(
    "location_intro",
    "Lokasi",
    "Kramas, Tembalang, Semarang",
    "Kost Graha Dhewa berada di Perumahan Griya Borobudur Cluster Arupadhatu No. A234, RT 1/RW 7, Kramas, Tembalang, Semarang 50277. Titik peta mengikuti data Google Maps; gunakan tombol petunjuk lokasi untuk navigasi.",
  ),
  cta: block(
    "cta",
    "Tertarik tinggal di Kost Graha Dhewa?",
    "Tanyakan ketersediaan kamar dan jadwal survei langsung kepada pengelola melalui WhatsApp.",
    "Nomor pengelola: 0857-8078-0845.",
  ),
};

/* Keunggulan */

const highlights: Highlight[] = [
  {
    id: "hl-1",
    title: "Kamar ber-AC",
    description: "Setiap kamar dilengkapi AC, smart TV, dan kulkas mini.",
    icon: "snowflake",
    sort_order: 1,
    is_published: true,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "hl-2",
    title: "Kamar mandi dalam",
    description: "Kamar mandi dalam yang bersih di setiap kamar.",
    icon: "shower",
    sort_order: 2,
    is_published: true,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "hl-3",
    title: "WiFi kencang",
    description: "Penghuni menyebut WiFi kencang untuk kebutuhan kuliah dan hiburan.",
    icon: "wifi",
    sort_order: 3,
    is_published: true,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "hl-4",
    title: "Pengelola dan penghuni ramah",
    description: "Ulasan Google Maps menilai pengelola dan penghuni kos ramah.",
    icon: "message-circle",
    sort_order: 4,
    is_published: true,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
];

/* Fasilitas */

const facility = (
  id: string,
  name: string,
  icon: string,
  category: Facility["category"],
  sort_order: number,
): Facility => ({
  id,
  name,
  description: null,
  icon,
  category,
  sort_order,
  is_published: true,
  created_at: UPDATED_AT,
  updated_at: UPDATED_AT,
});

const facilities: Facility[] = [
  facility("f-ac", "AC", "snowflake", "room", 1),
  facility("f-tv", "Smart TV", "tv", "room", 2),
  facility("f-kulkas", "Kulkas mini", "refrigerator", "room", 3),
  facility("f-km", "Kamar mandi dalam", "shower", "room", 4),
  facility("f-kasur", "Kasur", "bed", "room", 5),
  facility("f-lemari", "Lemari pakaian", "wardrobe", "room", 6),
  facility("f-meja", "Meja & kursi belajar", "book-open", "room", 7),
  facility("f-dapur", "Dapur bersama", "cooking-pot", "shared", 8),
  facility("f-duduk", "Area duduk lantai 2", "sofa", "shared", 9),
  facility("f-jemur", "Area jemur", "shirt", "shared", 10),
  facility("f-parkir", "Parkir motor", "bike", "shared", 11),
  facility("f-wifi", "WiFi", "wifi", "building", 12),
  facility("f-lantai", "Bangunan dua lantai", "home", "building", 13),
];

const facilityById = new Map(facilities.map((item) => [item.id, item]));

/* Tipe kamar */

function room(input: {
  id: string;
  name: string;
  slug: string;
  short: string;
  description: string;
  price: number;
  priceNote: string;
  cover: string;
  coverAlt: string;
  sortOrder: number;
  facilityIds: string[];
  images?: Array<{ url: string; alt: string }>;
}): RoomTypeWithRelations {
  return {
    id: input.id,
    name: input.name,
    slug: input.slug,
    short_description: input.short,
    description: input.description,
    price_amount: input.price,
    price_period: "bulan",
    price_note: input.priceNote,
    cover_image_url: input.cover,
    cover_image_alt: input.coverAlt,
    is_published: true,
    is_demo: isDemo,
    sort_order: input.sortOrder,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
    facilities: input.facilityIds
      .map((id) => facilityById.get(id))
      .filter((item): item is Facility => Boolean(item)),
    images: (input.images ?? []).map((image, index) => ({
      id: `${input.id}-img-${index + 1}`,
      room_type_id: input.id,
      image_url: image.url,
      alt_text: image.alt,
      sort_order: index + 1,
      created_at: UPDATED_AT,
    })),
  };
}

const rooms: RoomTypeWithRelations[] = [
  room({
    id: "room-square",
    name: "Kamar Square",
    slug: "kamar-square",
    short:
      "Kamar single paling luas dengan denah persegi, AC, smart TV, kamar mandi dalam, dan kulkas mini.",
    description:
      "Kamar single dengan denah persegi dan ruang gerak lebih luas. Dilengkapi AC, smart TV, kulkas mini, kamar mandi dalam, kasur, lemari pakaian, dan meja belajar. Tarif Rp1.610.000 per bulan; ketersediaan unit dikonfirmasi ke pengelola.",
    price: 1_610_000,
    priceNote:
      "Tarif sewa per bulan; konfirmasi ketersediaan unit dan rincian biaya ke pengelola.",
    cover: "/images/rooms/square/cover.jpg",
    coverAlt: "Kamar Square dengan tempat tidur, meja belajar, lemari, dan kulkas mini",
    sortOrder: 1,
    facilityIds: [
      "f-ac",
      "f-tv",
      "f-kulkas",
      "f-km",
      "f-kasur",
      "f-lemari",
      "f-meja",
      "f-wifi",
      "f-dapur",
      "f-duduk",
      "f-jemur",
      "f-parkir",
      "f-lantai",
    ],
    images: [
      {
        url: "/images/rooms/square/kamar.jpg",
        alt: "Tempat tidur dan smart TV di Kamar Square",
      },
      {
        url: "/images/rooms/square/kamar-mandi.jpg",
        alt: "Kamar mandi dalam Kamar Square",
      },
    ],
  }),
  room({
    id: "room-back-l",
    name: "Kamar Back-L",
    slug: "kamar-back-l",
    short:
      "Kamar single dengan denah L di bagian belakang, AC, smart TV, kamar mandi dalam, dan kulkas mini.",
    description:
      "Kamar single dengan denah L di bagian belakang. Dilengkapi AC, smart TV, kulkas mini, kamar mandi dalam, kasur, lemari pakaian, dan meja belajar. Tarif Rp1.510.000 per bulan; ketersediaan unit dikonfirmasi ke pengelola.",
    price: 1_510_000,
    priceNote:
      "Tarif sewa per bulan; konfirmasi ketersediaan unit dan rincian biaya ke pengelola.",
    cover: "/images/rooms/back-l/cover.jpg",
    coverAlt: "Kamar Back-L dengan tempat tidur, lemari pakaian, dan AC",
    sortOrder: 2,
    facilityIds: [
      "f-ac",
      "f-tv",
      "f-kulkas",
      "f-km",
      "f-kasur",
      "f-lemari",
      "f-meja",
      "f-wifi",
      "f-dapur",
      "f-duduk",
      "f-jemur",
      "f-parkir",
      "f-lantai",
    ],
    images: [
      {
        url: "/images/rooms/back-l/meja-dan-pintu.jpg",
        alt: "Meja belajar dan pintu kamar mandi di Kamar Back-L",
      },
      {
        url: "/images/rooms/back-l/meja-tv.jpg",
        alt: "Meja belajar, smart TV, dan kulkas mini di Kamar Back-L",
      },
      {
        url: "/images/rooms/back-l/kamar-mandi.jpg",
        alt: "Kamar mandi dalam Kamar Back-L",
      },
    ],
  }),
  room({
    id: "room-side-l",
    name: "Kamar Side-L",
    slug: "kamar-side-l",
    short:
      "Kamar single dengan denah L di sisi samping, AC, smart TV, kamar mandi dalam, dan kulkas mini.",
    description:
      "Kamar single dengan denah L di sisi samping. Dilengkapi AC, smart TV, kulkas mini, kamar mandi dalam, kasur, lemari pakaian, dan meja belajar. Tarif Rp1.510.000 per bulan; ketersediaan unit dikonfirmasi ke pengelola.",
    price: 1_510_000,
    priceNote:
      "Tarif sewa per bulan; konfirmasi ketersediaan unit dan rincian biaya ke pengelola.",
    cover: "/images/rooms/side-l/cover.jpg",
    coverAlt: "Kamar Side-L dengan tempat tidur, meja belajar, dan lemari pakaian",
    sortOrder: 3,
    facilityIds: [
      "f-ac",
      "f-tv",
      "f-kulkas",
      "f-km",
      "f-kasur",
      "f-lemari",
      "f-meja",
      "f-wifi",
      "f-dapur",
      "f-duduk",
      "f-jemur",
      "f-parkir",
      "f-lantai",
    ],
    images: [
      {
        url: "/images/rooms/side-l/tv-dan-meja.jpg",
        alt: "Smart TV, meja belajar, dan kulkas mini di Kamar Side-L",
      },
      {
        url: "/images/rooms/side-l/jendela-dan-pintu.jpg",
        alt: "Jendela dan pintu Kamar Side-L",
      },
      {
        url: "/images/rooms/side-l/kamar-mandi.jpg",
        alt: "Kamar mandi dalam Kamar Side-L",
      },
    ],
  }),
  room({
    id: "room-corner",
    name: "Kamar Corner",
    slug: "kamar-corner",
    short:
      "Kamar single di sudut bangunan dengan jendela, AC, smart TV, kamar mandi dalam, dan kulkas mini.",
    description:
      "Kamar single di sudut bangunan dengan jendela dan cahaya alami. Dilengkapi AC, smart TV, kulkas mini, kamar mandi dalam, kasur, lemari pakaian, dan meja belajar. Tarif Rp1.510.000 per bulan; ketersediaan unit dikonfirmasi ke pengelola.",
    price: 1_510_000,
    priceNote:
      "Tarif sewa per bulan; konfirmasi ketersediaan unit dan rincian biaya ke pengelola.",
    cover: "/images/rooms/corner/cover.jpg",
    coverAlt: "Kamar Corner dengan tempat tidur, meja belajar, lemari, dan jendela",
    sortOrder: 4,
    facilityIds: [
      "f-ac",
      "f-tv",
      "f-kulkas",
      "f-km",
      "f-kasur",
      "f-lemari",
      "f-meja",
      "f-wifi",
      "f-dapur",
      "f-duduk",
      "f-jemur",
      "f-parkir",
      "f-lantai",
    ],
    images: [
      {
        url: "/images/rooms/corner/kamar.jpg",
        alt: "Smart TV, kulkas mini, dan lemari pakaian di Kamar Corner",
      },
      {
        url: "/images/rooms/corner/kamar-mandi.jpg",
        alt: "Kamar mandi dalam Kamar Corner",
      },
    ],
  }),
  room({
    id: "room-small",
    name: "Kamar Small",
    slug: "kamar-small",
    short:
      "Kamar single paling ringkas dengan AC, smart TV, kamar mandi dalam, dan kulkas mini.",
    description:
      "Kamar single dengan ukuran paling ringkas. Dilengkapi AC, smart TV, kulkas mini, kamar mandi dalam, kasur, lemari pakaian, dan meja belajar. Tarif Rp1.310.000 per bulan; ketersediaan unit dikonfirmasi ke pengelola.",
    price: 1_310_000,
    priceNote:
      "Tarif sewa per bulan; konfirmasi ketersediaan unit dan rincian biaya ke pengelola.",
    cover: "/images/rooms/small/cover.jpg",
    coverAlt: "Kamar Small dengan smart TV, tempat tidur, meja belajar, dan lemari",
    sortOrder: 5,
    facilityIds: [
      "f-ac",
      "f-tv",
      "f-kulkas",
      "f-km",
      "f-kasur",
      "f-lemari",
      "f-meja",
      "f-wifi",
      "f-dapur",
      "f-duduk",
      "f-jemur",
      "f-parkir",
      "f-lantai",
    ],
    images: [
      {
        url: "/images/rooms/small/kamar.jpg",
        alt: "Smart TV, meja belajar, dan lemari pakaian di Kamar Small",
      },
      {
        url: "/images/rooms/small/kamar-mandi.jpg",
        alt: "Kamar mandi dalam Kamar Small",
      },
    ],
  }),
];

/* Galeri */

const gallery: GalleryItem[] = [
  {
    id: "g-1",
    title: "Tampak depan malam",
    image_url: "/images/tampak-depan-malam.jpg",
    alt_text: "Tampak depan Kost Graha Dhewa pada malam hari",
    category: "lainnya",
    sort_order: 1,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-2",
    title: "Tampak depan siang",
    image_url: "/images/tampak-depan-siang.jpg",
    alt_text: "Tampak depan Kost Graha Dhewa pada siang hari",
    category: "lainnya",
    sort_order: 2,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-3",
    title: "Papan nama Graha Dhewa",
    image_url: "/images/papan-nama.jpg",
    alt_text: "Papan nama Graha Dhewa di fasad bangunan",
    category: "lainnya",
    sort_order: 3,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-4",
    title: "Kamar single",
    image_url: "/images/kamar-single.jpg",
    alt_text: "Kamar single dengan tempat tidur, meja belajar, dan lemari pakaian",
    category: "kamar",
    sort_order: 4,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-5",
    title: "Kasur dan dinding hijau",
    image_url: "/images/kamar-single-kasur.jpg",
    alt_text: "Kasur single di kamar dengan dinding hijau",
    category: "kamar",
    sort_order: 5,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-6",
    title: "Area duduk lantai 2",
    image_url: "/images/area-duduk-lantai-2.jpg",
    alt_text: "Meja dan kursi di area duduk lantai dua Kost Graha Dhewa",
    category: "area-bersama",
    sort_order: 6,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-7",
    title: "Dapur bersama",
    image_url: "/images/dapur-bersama.jpg",
    alt_text: "Dapur bersama dengan kompor, wastafel, dan kabinet di Kost Graha Dhewa",
    category: "fasilitas",
    sort_order: 7,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-8",
    title: "Kamar Square",
    image_url: "/images/rooms/square/cover.jpg",
    alt_text: "Kamar Square dengan tempat tidur, meja belajar, dan lemari pakaian",
    category: "kamar",
    sort_order: 8,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-9",
    title: "Kamar Back-L",
    image_url: "/images/rooms/back-l/cover.jpg",
    alt_text: "Kamar Back-L dengan tempat tidur, lemari pakaian, dan AC",
    category: "kamar",
    sort_order: 9,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-10",
    title: "Kamar Side-L",
    image_url: "/images/rooms/side-l/cover.jpg",
    alt_text: "Kamar Side-L dengan tempat tidur, meja belajar, dan lemari pakaian",
    category: "kamar",
    sort_order: 10,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-11",
    title: "Kamar Corner",
    image_url: "/images/rooms/corner/cover.jpg",
    alt_text: "Kamar Corner dengan tempat tidur, meja belajar, lemari, dan jendela",
    category: "kamar",
    sort_order: 11,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "g-12",
    title: "Kamar Small",
    image_url: "/images/rooms/small/cover.jpg",
    alt_text: "Kamar Small dengan smart TV, tempat tidur, meja belajar, dan lemari",
    category: "kamar",
    sort_order: 12,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
];

/* FAQ */

const faqs: Faq[] = [
  {
    id: "faq-1",
    question: "Di mana lokasi Kost Graha Dhewa?",
    answer:
      "Kost Graha Dhewa berada di Perumahan Griya Borobudur Cluster Arupadhatu No. A234, RT 1/RW 7, Kramas, Tembalang, Semarang 50277. Titik peta mengikuti data Google Maps.",
    sort_order: 1,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "faq-2",
    question: "Berapa tarif kamar per bulan?",
    answer:
      "Tarif kamar di Kost Graha Dhewa Rp1.310.000–Rp1.610.000 per bulan, tergantung tipe kamar: Small Rp1.310.000, Back-L/Side-L/Corner Rp1.510.000, dan Square Rp1.610.000. Ketersediaan unit dan rincian biaya dikonfirmasi langsung oleh pengelola.",
    sort_order: 2,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "faq-3",
    question: "Fasilitas apa saja yang ada di kamar?",
    answer:
      "Kamar dilengkapi AC, smart TV, kulkas mini, kamar mandi dalam, kasur, lemari pakaian, meja belajar, dan WiFi.",
    sort_order: 3,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "faq-4",
    question: "Apakah ada fasilitas bersama?",
    answer:
      "Tersedia dapur bersama, area duduk di lantai dua, area jemur, dan parkir motor di lantai dasar.",
    sort_order: 4,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "faq-5",
    question: "Apakah kos ini khusus putra?",
    answer:
      "Ya. Kost Graha Dhewa terdaftar di Google Maps sebagai kos putra (rumah pondokan) dan ditujukan untuk penghuni putra.",
    sort_order: 5,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "faq-6",
    question: "Bagaimana cara survei atau bertanya soal kamar?",
    answer:
      "Hubungi pengelola melalui WhatsApp di 0857-8078-0845 untuk menanyakan ketersediaan kamar dan mengatur waktu survei.",
    sort_order: 6,
    is_published: true,
    is_demo: isDemo,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
];

/* Testimoni */

/** Kutipan ulasan publik Kost Graha Dhewa di Google Maps. */
const testimonials: Testimonial[] = [
  {
    id: "t-1",
    author_name: "Ariq Fadhali",
    author_detail: "Ulasan Google Maps · 3 tahun lalu",
    quote:
      "worth it bgt!!! harga 1 jutaan udah dapet ac, smart tv, km dalem yang bersih bgt, ada mini kulkasnya juga, wifinya kenceng pol, plus kamar cukup luas dan estetik bgt. apalagi kosnya baru selesai pembangunan jadi semua serba baruu uyyy. Mantap pokoknyaaa, dulu emg sempet berisik tapi sekarang udh engga kok gaisss.",
    is_published: true,
    is_demo: false,
    sort_order: 1,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "t-2",
    author_name: "Ikbar H",
    author_detail: "Ulasan Google Maps · 3 tahun lalu",
    quote:
      "kos termantap!!!. Pemilik kos dan penghuni kos nya sangat amat ramah dan merangkul satu sama lain. Fasilitas disini oke bgt dimulai dari wifi kenceng polll, ac dingin pol, ada kulkas mini juga…",
    is_published: true,
    is_demo: false,
    sort_order: 2,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "t-3",
    author_name: "Nabiel Hutama",
    author_detail: "Ulasan Google Maps · 3 tahun lalu",
    quote:
      "kostnya enak banget, nyaman, bersih, dan penghuni lainnya bersahabat baik baik jugaa.",
    is_published: true,
    is_demo: false,
    sort_order: 3,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "t-4",
    author_name: "Muhammad Ilhan Ghiffary",
    author_detail: "Ulasan Google Maps · 3 tahun lalu",
    quote: "kos nyaman, penghuni dan pemilik kost ramah, pokonya top dehh",
    is_published: true,
    is_demo: false,
    sort_order: 4,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
  {
    id: "t-5",
    author_name: "tedy iskandar",
    author_detail: "Ulasan Google Maps · 5 bulan lalu",
    quote: "Mantab stay di kost graha dewa",
    is_published: true,
    is_demo: false,
    sort_order: 5,
    created_at: UPDATED_AT,
    updated_at: UPDATED_AT,
  },
];

/* Data akhir yang dibaca situs */

export const siteContent: SiteData = {
  settings,
  blocks,
  highlights,
  facilities,
  rooms,
  gallery,
  faqs,
  testimonials,
  isFallback: isDemo,
};
