import Link from "next/link";
import { Badge } from "@/components/ui/misc";
import { SmartImage } from "@/components/ui/smart-image";
import { ButtonLink } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/site/whatsapp";
import { formatCurrency, pricePeriodLabels } from "@/lib/utils";
import type { RoomTypeWithRelations } from "@/lib/types";

export function RoomCard({
  room,
  whatsappHref,
}: {
  room: RoomTypeWithRelations;
  whatsappHref: string | null;
}) {
  const facilityNames = room.facilities.map((facility) => facility.name);
  const shownFacilities = facilityNames.slice(0, 3).join(" · ");
  const remaining = facilityNames.length - 3;

  return (
    <article className="group flex h-full flex-col border border-line bg-card transition-colors duration-200 hover:border-brass-500">
      <Link
        href={`/kamar/${room.slug}`}
        className="media-zoom relative block overflow-hidden"
        aria-label={`Lihat detail ${room.name}`}
      >
        <SmartImage
          src={room.cover_image_url}
          alt={room.cover_image_alt ?? `Foto ${room.name}`}
          ratio="aspect-[4/3]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholderLabel="Foto kamar belum tersedia"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="label-mono bg-paper-50/95 px-2 py-1 text-[10px] text-ink-600">
            {String(room.sort_order).padStart(2, "0")}
          </span>
          {room.is_demo ? <Badge tone="brass">Demo</Badge> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="label text-[10px] text-brass-700">Tipe kamar</p>
        <h3 className="mt-2 text-[1.65rem] leading-[1.05]">
          <Link
            href={`/kamar/${room.slug}`}
            className="inline-flex min-h-11 items-center transition-colors hover:text-brass-700"
          >
            {room.name}
          </Link>
        </h3>

        {room.short_description ? (
          <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-ink-500">
            {room.short_description}
          </p>
        ) : null}

        <div className="mt-5 border-t border-line pt-4">
          <p className="label text-[10px] text-ink-500">Tarif</p>
          <p className="tnum mt-1 font-mono text-[16px] tracking-[-0.01em] text-ink-900">
            {room.price_amount === null ? "Harga belum tersedia" : formatCurrency(room.price_amount)}
          </p>
          <p className="label-mono mt-1 text-[10px] text-ink-500">
            {pricePeriodLabels[room.price_period]}
          </p>
        </div>

        {room.price_note ? (
          <p className="mt-2 text-[11px] leading-relaxed text-ink-500">{room.price_note}</p>
        ) : null}

        {facilityNames.length > 0 ? (
          <p className="mt-4 text-[11.5px] leading-relaxed text-ink-500">
            {shownFacilities}
            {remaining > 0 ? ` · +${remaining} lainnya` : ""}
          </p>
        ) : null}

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
          <ButtonLink href={`/kamar/${room.slug}`} size="sm">
            Lihat detail
          </ButtonLink>
          <WhatsAppButton
            href={whatsappHref}
            label="Tanya"
            size="sm"
            variant="ghost"
            showIcon={false}
          />
        </div>
      </div>
    </article>
  );
}
