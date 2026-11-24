import Link from "next/link";
import { SectionHeading } from "@/components/ui/misc";
import { RoomCard } from "@/components/site/room-card";
import type { RoomTypeWithRelations } from "@/lib/types";

export function RoomsPreview({
  rooms,
  buildWhatsAppHref,
}: {
  rooms: RoomTypeWithRelations[];
  buildWhatsAppHref: (roomName: string) => string | null;
}) {
  if (rooms.length === 0) return null;

  const featured = rooms.slice(0, 3);

  return (
    <section id="kamar" className="border-b border-line bg-paper-50 py-20 lg:py-24">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <SectionHeading
            eyebrow="Tipe kamar"
            title="Tipe kamar dan rentang harga"
            className="lg:col-span-7"
          />
          <div className="lg:col-span-5">
            <p className="max-w-[44ch] text-[13.5px] leading-relaxed text-ink-600">
              Harga ditampilkan bersama periodenya. Perhatikan keterangan periode pada setiap
              kartu sebelum membandingkan nominal.
            </p>
            <Link
              href="/kamar"
              className="label mt-4 inline-flex min-h-11 items-center border-b border-brass-500/60 text-brass-700 transition-colors hover:border-brass-700 hover:text-ink-900"
            >
              Lihat katalog lengkap
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((room) => (
            <RoomCard key={room.id} room={room} whatsappHref={buildWhatsAppHref(room.name)} />
          ))}
        </div>
      </div>
    </section>
  );
}
