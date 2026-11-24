# DESIGN.md

Arah visual situs: **Kediaman Teduh**. Situs dibaca seperti buku kecil
kediaman privat: kertas ivory, hijau botol, kuningan matte, dan garis rambut.
Bukan landing page startup, bukan katalog properti yang penuh kartu mengambang.

Sumber kebenaran token ada di `src/app/globals.css` (`@theme`). Dokumen ini
menjelaskan cara memakainya agar halaman baru tetap satu bahasa.

## Dial

| Dial | Nilai | Arti |
|---|---|---|
| ENERGY | 2 | Tenang, tetapi hadir. Judul besar dan bidang hijau gelap memberi bobot, tanpa teriakan. |
| RHYTHM | 2 | Seksi berganti napas: ivory, hijau gelap, ivory, kertas. Perubahan terasa, tidak ramai. |
| MOTION | 1 | Hampir diam. Hanya transisi warna, garis, dan zoom gambar yang halus. |

## Design Read

Katalog kos putra premium untuk mahasiswa dan orang tua di Tembalang, dengan
bahasa visual kediaman privat editorial, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

## Prinsip

1. **Kemewahan lewat ketenangan.** Tidak ada gradien terang, glow, glassmorphism,
   atau bayangan. Kesan mahal datang dari proporsi, ruang kosong, dan material
   warna yang konsisten.
2. **Satu bahasa material.** Ivory sebagai kertas, hijau botol sebagai bidang
   istirahat, kuningan sebagai aksen. Tidak ada warna keempat yang bersaing.
3. **Informasi dulu.** Judul menjelaskan isi. Label menjelaskan status data.
   Tidak ada angka bab dekoratif atau metafora pemasaran.
4. **Jujur soal data.** Konten contoh diberi label demo. Harga contoh diberi
   catatan. Testimoni tanpa izin tidak ditampilkan.
5. **Mobile adalah tata letak lain.** Bukan desktop yang diperkecil. Filter
   dilipat, galeri tetap dua kolom, navigasi menjadi menu penuh.

## Warna

| Token | Nilai | Pemakaian |
|---|---|---|
| `paper-50` | `#f7f2e8` | Latar halaman, kertas utama |
| `paper-100` | `#f1eadc` | Seksi selang-seling, panel informasi |
| `paper-200` | `#e7decd` | Placeholder gambar, bidang lembut |
| `paper-300` | `#d9cdb7` | Batas tipis pada bidang gelap |
| `card` | `#fcf8ef` | Permukaan kartu dan form |
| `line` | `#d6c9b2` | Garis rambut utama |
| `line-strong` | `#b4a17e` | Garis pada kontrol dan label |
| `ink-900` | `#161b14` | Judul, teks terkuat |
| `ink-800` | `#20261c` | Teks isi utama |
| `ink-700` | `#333b2d` | Teks isi sekunder |
| `ink-600` | `#4b5443` | Paragraf penjelas |
| `ink-500` | `#59624f` | Label dan keterangan |
| `ink-400` | `#646d57` | Anotasi paling tenang, masih lolos AA di atas `paper-50` dan `paper-100` |
| `forest-950` | `#0b120c` | Footer, latar dialog galeri |
| `forest-900` | `#101a12` | Seksi fasilitas, CTA, header katalog |
| `forest-800` | `#17251a` | Tombol utama, panel kontak |
| `forest-700` | `#223526` | Batas bidang gelap |
| `forest-600` | `#314a33` | Hijau antara |
| `brass-100` | `#f2e7d2` | Latar badge demo |
| `brass-200` | `#e4d2ae` | Aksen lembut, seleksi teks |
| `brass-300` | `#cfb183` | Label dan garis di atas hijau gelap |
| `brass-400` | `#b08a50` | Ikon dan aksen di atas hijau gelap |
| `brass-500` | `#96703a` | Garis aksen, bingkai gambar, garis kartu |
| `brass-600` | `#87622b` | Teks aksen dan focus ring di latar terang |
| `brass-700` | `#6b4b1f` | Label aksen di latar terang |

Aturan kontras: teks normal minimal 4.5:1. Jangan menurunkan opasitas warna
teks kecil. `ink-400` hanya dipakai di atas `paper-50`, `paper-100`, dan `card`.
`brass-500` tidak dipakai untuk teks kecil di latar terang, hanya garis, ikon,
dan teks besar. `brass-600` dan `brass-700` aman untuk teks kecil di latar terang.

## Tipografi

| Peran | Keluarga | Ukuran | Detail |
|---|---|---|---|
| Teks isi | Archivo | 15.5px / 1.65 | `font-sans`, tegas dan mudah dibaca di ponsel |
| Judul | Cormorant Garamond | 2.4rem sampai 5.2rem | `font-serif`, weight 400, tracking -0.012em, `text-wrap: balance` |
| Label | Archivo | 10px sampai 11px | `.label`: uppercase, tracking 0.18em, weight 600 |
| Angka dan harga | IBM Plex Mono | 12px sampai 1.55rem | `.label-mono` atau `font-mono`, `tnum` agar rata |

Alasan: Cormorant memberi suara editorial kediaman privat dengan kontras
tebal-tipis yang khas. Archivo menjaga badan teks tetap netral dan terbaca.
Mono hanya muncul pada angka, harga, dan indeks, seperti folio hotel, bukan
sebagai tema terminal.

## Bentuk dan jarak

- Radius kontrol: **2px**. Tidak ada tombol pil.
- Bayangan: **tidak ada**. Kedalaman dibuat dengan garis, bingkai offset, dan
  bidang warna.
- `container-page`: maksimal 78rem, padding 1.25rem di ponsel dan 2.5rem mulai
  768px.
- Jarak seksi: `py-16` sampai `py-24`, mengikuti kepadatan isi.
- Grid: 12 kolom pada `lg`, satu kolom pada ponsel. Kartu kamar dua kolom pada
  `sm` ke atas.
- Rasio gambar: 4:3 untuk kartu dan galeri, 4:5 untuk foto utama dan profil,
  1:1 untuk thumbnail.
- Bingkai offset kuningan hanya dipakai pada dua gambar utama (hero dan profil).
  Tujuannya membedakan gambar editorial dari thumbnail katalog, bukan hiasan
  yang diulang di semua gambar.

## Motif identitas

1. **Garis kuningan dan kotak kecil** sebelum label seksi. Diulang konsisten
   sebagai penanda awal bacaan.
2. **Monogram dalam bingkai persegi** dari inisial nama kos. Dipakai di logo,
   footer, dan tanda air besar di CTA. Bukan logo palsu; bila `logo_url` diisi,
   logo asli menggantikan monogram.
3. **Bingkai ganda** pada gambar utama: garis tipis gambar ditambah garis
   kuningan offset. Menandai gambar yang layak dibaca perlahan.

## Komponen

- **Tombol** (`buttonClasses`): varian `primary` (hijau botol), `outline`
  (garis kuningan), `soft` (ivory gelap), `ghost` (tautan bergaris), `light`
  (ivory di atas hijau), `onDark` (garis terang di atas hijau), dan `brass`
  (kuningan dengan teks hijau gelap). Tinggi minimal 44px. Fokus memakai
  outline 2px `brass-600` dengan offset 3px.
- **Tautan teks** (`link-rule`): garis bawah 1px yang menyusut saat hover atau
  fokus. Bukan perubahan warna saja.
- **Kartu kamar**: bingkai 1px, gambar 4:3, nomor folio, judul serif, harga mono.
  Semua kartu sengaja sama besar karena pengguna membandingkan tipe kamar pada
  bobot yang setara. Hierarki dibawa oleh nama dan harga, bukan ukuran kartu.
- **Badge**: kotak 2px dengan label sans. Varian `brass` hanya untuk status demo.
- **FAQ**: `details`/`summary` dengan garis pemisah, pertanyaan serif, ikon plus
  kuningan yang berputar.
- **Galeri**: dialog penuh hijau gelap dengan fokus terperangkap, Escape
  menutup, dan fokus kembali ke gambar pemicu. Setiap bingkai punya label
  "Perbesar" agar affordance klik terlihat.
- **WhatsApp tanpa nomor**: tampil sebagai `span` dengan `aria-disabled`, bukan
  tautan palsu.
- **Peta tanpa URL**: placeholder bergaris dengan keterangan jujur, bukan peta
  palsu. Garis silang menandakan titik yang belum diverifikasi.

## Gerak

- Transisi warna dan garis: 200ms.
- Zoom gambar kartu: 500ms dengan easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- `prefers-reduced-motion: reduce` mematikan animasi dan smooth scroll.
- Tidak ada parallax, autoplay, atau animasi masuk yang menunda konten.

## Aturan konten

- Bahasa Indonesia, kalimat pendek, tanpa em dash.
- Jangan mengarang fasilitas, harga, alamat, testimoni, atau angka.
- Selama `isDemo: true`, situs memakai banner contoh, label demo pada foto, dan
  `noindex`.
- Foto Unsplash selalu diberi alt yang menyebut "Ilustrasi".
- Harga contoh selalu disertai catatan untuk konfirmasi ke pengelola.

## Alasan keputusan utama

- **Ivory, hijau botol, kuningan**: tiga material yang lazim pada interior
  kediaman lama, bukan gradien biru-ungu atau hitam-emas yang generik.
- **Cormorant Garamond**: kontras tinggi dan ritme huruf yang tenang, cocok
  untuk judul besar tanpa terasa seperti katalog properti massal.
- **Bidang hijau gelap**: memberi jeda dan bobot pada fasilitas, CTA, dan
  footer, sehingga halaman tidak rata seperti template.
- **Tanpa bayangan**: kedalaman dibangun dengan garis dan bidang, sesuai
  karakter cetak yang tenang.
- **Kartu kamar sama besar**: perbandingan yang adil lebih penting daripada
  variasi kartu yang dibuat-buat.
- **Garis silang pada placeholder peta**: menjelaskan bahwa titik lokasi belum
  diverifikasi, bukan hiasan latar.

## Checklist sebelum merge

1. `npm run typecheck`, `npm run lint`, `npm run build` lulus.
2. Tidak ada horizontal overflow pada 375, 768, 1024, dan 1440px.
3. Semua kontrol minimal 44px dan fokus keyboard terlihat.
4. Kontras teks minimal 4.5:1.
5. Tidak ada em dash di teks yang tampil.
6. Label demo tetap muncul selama konten belum final.
