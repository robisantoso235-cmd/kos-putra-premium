import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Info, Wallet } from "lucide-react";
import { getRoomTypeBySlug, getSiteData } from "@/lib/data/site";
import { buildWhatsAppUrl, roomWhatsAppMessage } from "@/lib/whatsapp";
import { RoomGallery } from "@/components/site/room-gallery";
import { RoomCard } from "@/components/site/room-card";
import { WhatsAppButton } from "@/components/site/whatsapp";
import { ContentIcon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/misc";
import { buttonClasses } from "@/components/ui/button";
import { formatCurrency, pricePeriodLabels } from "@/lib/utils";
import { siteUrl } from "@/lib/config";

export async function generateStaticParams() {
  const data = await getSiteData();
  return data.rooms.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomTypeBySlug(slug);

  if (!room) {
    return { title: "Tipe kamar tidak ditemukan", robots: { index: false, follow: true } };
  }

  const description =
    room.short_description ??
    `Informasi ${room.name} di kos putra Tembalang, Semarang. Lihat fasilitas, harga, dan hubungi pengelola.`;

  return {
    title: room.name,
    description,
    alternates: { canonical: `/kamar/${room.slug}` },
    robots: room.is_demo ? { index: false, follow: true } : undefined,
    openGraph: {
      title: room.name,
      description,
      url: `${siteUrl}/kamar/${room.slug}`,
      images: room.cover_image_url
        ? [{ url: room.cover_image_url, alt: room.cover_image_alt ?? room.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: room.name,
      description,
      images: room.cover_image_url ? [room.cover_image_url] : undefined,
    },
  };
}

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const room = await getRoomTypeBySlug(slug);
  if (!room) notFound();

  const data = await getSiteData();
  const { settings } = data;
  const context = { siteName: settings.site_name, baseMessage: settings.whatsapp_message };

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsapp_number,
    roomWhatsAppMessage(room.name, context),
  );

  const images = [
    ...(room.cover_image_url
      ? [{ url: room.cover_image_url, alt: room.cover_image_alt ?? `Foto ${room.name}` }]
      : []),
    ...room.images.map((image) => ({
      url: image.image_url,
      alt: image.alt_text || `Foto ${room.name}`,
    })),
  ].filter(
    (image, index, list) => list.findIndex((item) => item.url === image.url) === index,
  );

  const roomFacilities = room.facilities.filter((facility) => facility.category === "room");
  const sharedFacilities = room.facilities.filter((facility) => facility.category !== "room");
  const otherRooms = data.rooms.filter((item) => item.id !== room.id).slice(0, 3);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Katalog kamar", item: `${siteUrl}/kamar` },
      {
        "@type": "ListItem",
        position: 3,
        name: room.name,
        item: `${siteUrl}/kamar/${room.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container-page py-8 lg:py-12">
        <nav aria-label="Breadcrumb" className="label mb-7 text-[10px] text-ink-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="inline-flex min-h-11 min-w-11 items-center hover:text-brass-700">
                Beranda
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/kamar" className="inline-flex min-h-11 min-w-11 items-center hover:text-brass-700">
                Katalog kamar
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-900" aria-current="page">
              {room.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
          <div className="order-1 lg:order-none">
            {room.is_demo ? (
              <div className="mb-5">
                <Badge tone="brass">Data demo</Badge>
              </div>
            ) : null}

            <h1 className="text-[3.2rem] leading-[0.98] sm:text-[4rem]">{room.name}</h1>
            {room.short_description ? (
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-600">
                {room.short_description}
              </p>
            ) : null}

            <div className="mt-8">
              <RoomGallery name={room.name} images={images} isDemo={room.is_demo} />
            </div>
          </div>

          <aside
            aria-label="Informasi harga dan kontak"
            className="order-2 lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1"
          >
            <div className="lg:sticky lg:top-32">
              <div className="border border-forest-700 border-t-2 border-t-brass-500 bg-forest-900 p-6 text-paper-50">
                <p className="label text-[10px] text-brass-300">Harga sewa</p>
                <p className="tnum mt-3 font-mono text-[1.5rem] leading-tight tracking-[-0.02em] text-paper-50">
                  {room.price_amount === null
                    ? "Harga belum tersedia"
                    : formatCurrency(room.price_amount)}
                </p>
                {room.price_amount !== null ? (
                  <p className="label-mono mt-1.5 text-[10px] text-brass-200">
                    {pricePeriodLabels[room.price_period]}
                  </p>
                ) : null}
                {room.price_note ? (
                  <p className="mt-2 flex items-start gap-2 text-[12px] leading-relaxed text-paper-200">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass-300" aria-hidden="true" />
                    {room.price_note}
                  </p>
                ) : null}

                <dl className="mt-5 divide-y divide-paper-50/15 border-y border-paper-50/15 text-[13px]">
                  <div className="flex items-center justify-between gap-3 py-2.5">
                    <dt className="text-paper-300">Fasilitas tercatat</dt>
                    <dd className="text-right font-medium text-paper-50">
                      {room.facilities.length} item
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3 py-2.5">
                    <dt className="text-paper-300">Ketersediaan</dt>
                    <dd className="text-right font-medium text-paper-50">
                      Konfirmasi pengelola
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 space-y-2">
                  <WhatsAppButton
                    href={whatsappHref}
                    label="Tanya kamar ini"
                    size="lg"
                    variant="light"
                    className="w-full"
                  />
                  {!whatsappHref ? (
                    <p className="text-[11.5px] leading-relaxed text-paper-300">
                      Nomor WhatsApp belum diatur oleh pengelola.
                    </p>
                  ) : (
                    <p className="text-[11.5px] leading-relaxed text-paper-300">
                      Pesan otomatis akan menyertakan nama tipe kamar ini.
                    </p>
                  )}
                </div>

                <Link
                  href="/kamar"
                  className={buttonClasses("onDark", "sm", "mt-2 w-full justify-center")}
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  Kembali ke katalog
                </Link>
              </div>

              <div className="mt-4 border border-line bg-paper-100 p-4">
                <p className="flex items-start gap-2 text-[12px] leading-relaxed text-ink-600">
                  <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-brass-700" aria-hidden="true" />
                  Harga dan ketersediaan dapat berubah. Konfirmasi rincian biaya (listrik, air,
                  dan biaya lain) langsung kepada pengelola sebelum memutuskan.
                </p>
              </div>
            </div>
          </aside>

          <div className="order-3 space-y-10 lg:order-none">
            {room.description ? (
              <section aria-labelledby="deskripsi-kamar">
                <h2 id="deskripsi-kamar" className="text-2xl">
                  Deskripsi kamar
                </h2>
                <div className="mt-3 whitespace-pre-line text-[14.5px] leading-relaxed text-ink-600">
                  {room.description}
                </div>
              </section>
            ) : null}

            {room.facilities.length > 0 ? (
              <section aria-labelledby="fasilitas-kamar">
                <h2 id="fasilitas-kamar" className="text-2xl">
                  Fasilitas
                </h2>

                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {roomFacilities.length > 0 ? (
                    <div>
                      <h3 className="label border-b border-line pb-2 text-brass-700">
                        Dalam kamar
                      </h3>
                      <ul className="mt-1">
                        {roomFacilities.map((facility) => (
                          <li
                            key={facility.id}
                            className="flex items-baseline gap-2.5 border-b border-line/70 py-2 text-[13.5px] text-ink-700"
                          >
                            <ContentIcon
                              name={facility.icon}
                              className="h-3.5 w-3.5 shrink-0 text-brass-600"
                            />
                            {facility.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {sharedFacilities.length > 0 ? (
                    <div>
                      <h3 className="label border-b border-line pb-2 text-brass-700">
                        Fasilitas bersama &amp; bangunan
                      </h3>
                      <ul className="mt-1">
                        {sharedFacilities.map((facility) => (
                          <li
                            key={facility.id}
                            className="flex items-baseline gap-2.5 border-b border-line/70 py-2 text-[13.5px] text-ink-700"
                          >
                            <ContentIcon
                              name={facility.icon}
                              className="h-3.5 w-3.5 shrink-0 text-brass-600"
                            />
                            {facility.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>

        {otherRooms.length > 0 ? (
          <section className="mt-16 border-t border-line pt-10" aria-labelledby="kamar-lain">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="kamar-lain" className="text-2xl">
                Tipe kamar lainnya
              </h2>
              <Link href="/kamar" className={buttonClasses("ghost", "sm")}>
                Lihat semua
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherRooms.map((other) => (
                <RoomCard
                  key={other.id}
                  room={other}
                  whatsappHref={buildWhatsAppUrl(
                    settings.whatsapp_number,
                    roomWhatsAppMessage(other.name, context),
                  )}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
