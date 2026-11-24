# Kost Graha Dhewa — Website

Website informasi **Kost Graha Dhewa (Kost Putra)**, kos putra dua lantai di
Perumahan Griya Borobudur, Kramas, Tembalang, Semarang.

Dibangun dengan **Next.js 15 (App Router)** dan **Tailwind CSS v4**, lalu diekspor menjadi
**HTML statis**. Tidak ada database, API route, atau server Node.js di produksi.

- Alamat: Perumahan Griya Borobudur Cluster Arupadhatu No. A234, RT 1/RW 7, Kramas,
  Tembalang, Semarang 50277
- WhatsApp: 0857-8078-0845
- Rating Google Maps: 5,0 dari 27 ulasan

Seluruh isi situs (teks, harga, foto, FAQ, testimoni) berada di satu berkas:
[`src/content/site.ts`](src/content/site.ts).

## Fitur

- Beranda: hero, profil kos, keunggulan, fasilitas, pratinjau kamar, galeri, lokasi/peta,
  testimoni, FAQ, dan ajakan WhatsApp.
- Katalog kamar `/kamar` dengan pencarian, filter harga/fasilitas, dan pengurutan yang berjalan
  di browser. Filter tersimpan di URL sehingga bisa dibagikan.
- Halaman detail `/kamar/[slug]` untuk setiap tipe kamar, lengkap dengan galeri foto.
- Tombol WhatsApp dengan pesan otomatis sesuai tipe kamar.
- Metadata SEO, JSON-LD (LodgingBusiness/FAQ/Breadcrumb), `robots.txt`, dan `sitemap.xml` statis.
- Tanpa analytics dan tanpa data pengunjung yang dikirim ke mana pun.

## Tipe kamar

| Tipe | Harga per bulan | Foto |
| --- | --- | --- |
| Square | Rp1.610.000 | `public/images/rooms/square/` |
| Back-L | Rp1.510.000 | `public/images/rooms/back-l/` |
| Side-L | Rp1.510.000 | `public/images/rooms/side-l/` |
| Corner | Rp1.510.000 | `public/images/rooms/corner/` |
| Small | Rp1.310.000 | `public/images/rooms/small/` |

Semua kamar dilengkapi AC, smart TV, kulkas mini, kamar mandi dalam, kasur, lemari pakaian,
meja belajar, dan WiFi. Fasilitas bersama: dapur, area duduk lantai dua, area jemur, dan
parkir motor.

## Stack

| Bagian | Teknologi |
| --- | --- |
| Bahasa | TypeScript, JSX/TSX, CSS |
| Framework | Next.js 15.5 (App Router, `output: "export"`) |
| UI | React 19, Tailwind CSS v4, lucide-react |
| Font | Archivo, Cormorant Garamond, IBM Plex Mono via `next/font` |
| Output | HTML/CSS/JS statis di folder `out/` |
| Deploy | Firebase Hosting (project `grahadewakost`) |

## Menjalankan secara lokal

Prasyarat: **Node.js 20.9+** dan npm.

```bash
git clone https://github.com/robisantoso235-cmd/kos-putra-premium.git
cd kos-putra-premium
npm install
```

Buat `.env.local` dari contohnya, lalu sesuaikan URL situs:

```bash
cp .env.example .env.local      # Windows: copy .env.example .env.local
```

```dotenv
NEXT_PUBLIC_SITE_URL=https://grahadewakost.web.app
```

Jalankan server pengembangan:

```bash
npm run dev
```

Buka <http://localhost:3000>.

### Build statis

```bash
npm run build     # menghasilkan folder out/
npm run preview   # pratinjau hasil build
npm run check     # typecheck + lint + build
```

Isi folder `out/` bisa diunggah apa adanya ke hosting statis mana pun.

## Mengubah konten

Semua konten berada di `src/content/site.ts`:

1. **Pengaturan situs** — nama, WhatsApp, alamat, koordinat, peta, SEO.
2. **Blok teks halaman** — hero, profil, intro lokasi, CTA.
3. **Keunggulan**, **fasilitas**, **galeri**, **FAQ**, **testimoni**.
4. **Tipe kamar** — nama, harga, fasilitas, foto utama, dan foto tambahan.

Foto disimpan di `public/images/` dan ditulis sebagai path, misalnya
`"/images/rooms/square/cover.jpg"`. Foto properti berasal dari profil Google Maps;
foto kamar berasal dari dokumentasi pengelola. Setelah mengubah konten, jalankan
`npm run build` lagi.

Untuk menambah tipe kamar baru, salin pola objek `room({...})` di `src/content/site.ts`
dan tambahkan foldernya di `public/images/rooms/`.

## Deploy ke Firebase Hosting

Konfigurasi ada di `firebase.json` dan `.firebaserc` (project `grahadewakost`).

```bash
npm run build
npx firebase-tools deploy --only hosting
```

Produksi: <https://grahadewakost.web.app>.

Karena hasilnya statis, situs juga bisa dipindah ke Netlify, Cloudflare Pages, Vercel,
GitHub Pages, atau cPanel tanpa perubahan kode:

| Hosting | Pengaturan |
| --- | --- |
| Netlify / Cloudflare Pages / Vercel | Build command `npm run build`, output directory `out` |
| GitHub Pages | Unggah isi `out/` ke branch `gh-pages` |
| Hosting biasa / cPanel | Unggah isi folder `out/` ke `public_html` |

Set `NEXT_PUBLIC_SITE_URL` ke domain produksi sebelum build agar canonical, Open Graph,
`robots.txt`, dan `sitemap.xml` memakai URL yang benar.

## Struktur penting

```
src/
├─ app/
│  ├─ (site)/               # halaman publik: beranda, katalog, detail kamar
│  ├─ layout.tsx            # font, metadata, viewport
│  ├─ robots.ts             # robots.txt statis
│  ├─ sitemap.ts            # sitemap.xml statis
│  └─ globals.css           # design token Tailwind v4
├─ components/
│  ├─ site/                 # bagian-bagian situs publik
│  └─ ui/                   # primitif UI bersama
├─ content/site.ts          # ★ SATU-SATUNYA sumber konten
└─ lib/                     # tipe, data, WhatsApp, util
public/
└─ images/
   ├─ rooms/{square,back-l,side-l,corner,small}/
   └─ *.jpg                 # foto properti dari Google Maps
```

## Catatan

- `isDemo` di `src/content/site.ts` sudah bernilai `false`; situs boleh diindeks mesin pencari.
- Optimasi gambar `next/image` dimatikan (`images.unoptimized`) karena hosting statis tidak
  punya server optimasi. Kompres foto sebelum mengunggah.
- `.env.local`, `.next/`, `out/`, `node_modules/`, dan `.firebase/` tidak ikut di-commit.
- `npm run lint` memakai ESLint 9 (`eslint-config-next`).
- Peringatan *multiple lockfiles* saat build bisa muncul jika ada `package-lock.json` di folder
  induk mesin lokal; tidak memengaruhi hasil build proyek ini.
