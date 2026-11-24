import type { Metadata } from "next";
import Link from "next/link";
import { getSiteData } from "@/lib/data/site";
import { RoomCatalog } from "@/components/site/room-catalog";
import { Badge, SectionHeading } from "@/components/ui/misc";

export const metadata: Metadata = {
  title: "Katalog Tipe Kamar",
  description:
    "Telusuri tipe kamar Kost Graha Dhewa, kos putra di Kramas, Tembalang, Semarang. Lihat fasilitas, harga, dan detail setiap kamar.",
  alternates: { canonical: "/kamar" },
};

export default async function CatalogPage() {
  const data = await getSiteData();
  const { settings, rooms, facilities } = data;

  return (
    <>
      <section className="border-b border-brass-500/40 bg-forest-900 text-paper-50">
        <div className="container-page py-10 lg:py-14">
          <nav aria-label="Breadcrumb" className="label text-[10px] text-paper-300">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="inline-flex min-h-11 min-w-11 items-center transition-colors hover:text-brass-300"
                >
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-paper-50" aria-current="page">
                Katalog kamar
              </li>
            </ol>
          </nav>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <SectionHeading
              eyebrow="Katalog"
              title="Semua tipe kamar"
              tone="onDark"
              as="h1"
              className="lg:col-span-7"
            />
            <div className="lg:col-span-5">
              <p className="max-w-[44ch] text-[13.5px] leading-relaxed text-paper-200">
                Harga ditampilkan bersama periodenya. Perhatikan perbedaan periode sebelum
                membandingkan nominal antar kamar.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="label text-[10px] text-brass-300">
                  {rooms.length} tipe tercatat
                </span>
                {data.isFallback ? <Badge tone="brass">Data contoh (demo)</Badge> : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <RoomCatalog
        rooms={rooms}
        facilities={facilities}
        siteName={settings.site_name}
        whatsappNumber={settings.whatsapp_number}
        whatsappMessage={settings.whatsapp_message}
      />
    </>
  );
}
