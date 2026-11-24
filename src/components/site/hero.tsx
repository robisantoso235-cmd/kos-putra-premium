import { ButtonLink } from "@/components/ui/button";
import { SmartImage } from "@/components/ui/smart-image";
import { WhatsAppButton } from "@/components/site/whatsapp";
import { formatCurrency, pricePeriodLabels } from "@/lib/utils";
import type { ContentBlock, RoomTypeWithRelations, SiteSettings } from "@/lib/types";

export function Hero({
  settings,
  block,
  whatsappHref,
  imageUrl,
  imageAlt,
  isDemo,
  rooms,
}: {
  settings: SiteSettings;
  block: ContentBlock | undefined;
  whatsappHref: string | null;
  imageUrl: string | null;
  imageAlt: string;
  isDemo: boolean;
  rooms: RoomTypeWithRelations[];
}) {
  const title = block?.title || "Hunian mahasiswa putra di Tembalang";
  const subtitle =
    block?.subtitle ||
    "Informasi tipe kamar, fasilitas, dan suasana hunian. Telusuri dulu, lalu hubungi pengelola saat sudah siap.";

  const priced = rooms.filter((room) => room.price_amount !== null);
  const cheapest = priced.reduce<RoomTypeWithRelations | null>((current, room) => {
    if (!current) return room;
    return (room.price_amount ?? Infinity) < (current.price_amount ?? Infinity) ? room : current;
  }, null);

  const facts = [
    {
      label: "Tarif mulai",
      value: cheapest
        ? formatCurrency(cheapest.price_amount as number)
        : "Belum diatur",
      note: cheapest ? pricePeriodLabels[cheapest.price_period] : "Hubungi pengelola",
      mono: true,
    },
    {
      label: "Tipe kamar",
      value: `${rooms.length} tipe`,
      note: "Bandingkan di katalog",
      mono: false,
    },
    {
      label: "Wilayah",
      value: settings.district || "Tembalang",
      note: [settings.city, settings.province].filter(Boolean).join(", "),
      mono: false,
    },
  ];

  return (
    <section id="beranda" className="bg-paper-50">
      <div className="container-page">
        <div className="grid gap-12 py-12 lg:grid-cols-12 lg:gap-16 lg:py-20">
          <div className="lg:col-span-7 lg:pt-4">
            <p className="label flex flex-wrap items-center gap-3 text-brass-700">
              <span aria-hidden="true" className="h-px w-8 bg-brass-500" />
              <span aria-hidden="true" className="h-1 w-1 bg-brass-500" />
              <span>
                Kos putra · {settings.district}, {settings.city}
              </span>
            </p>

            <h1 className="mt-8 max-w-[15ch] text-[3.15rem] leading-[0.96] tracking-[-0.015em] sm:text-[4.2rem] lg:text-[5.1rem]">
              {title}
            </h1>

            <p className="mt-7 max-w-[46ch] text-[15px] leading-[1.75] text-ink-600">
              {subtitle}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink href="#kamar" size="lg">
                Lihat tipe kamar
              </ButtonLink>
              <WhatsAppButton
                href={whatsappHref}
                label="Tanya pengelola"
                variant="ghost"
                size="lg"
                showIcon={false}
              />
            </div>

            {!whatsappHref ? (
              <p className="mt-3 text-[11.5px] leading-relaxed text-ink-500">
                Nomor WhatsApp belum diatur oleh pengelola.
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-5">
            <figure className="border border-line-strong bg-card">
              <SmartImage
                src={imageUrl}
                alt={imageAlt}
                ratio="aspect-[4/5]"
                sizes="(max-width: 1024px) 92vw, 38vw"
                priority
                placeholderLabel="Visual utama belum tersedia"
              />
              <figcaption className="flex items-baseline justify-between gap-3 border-t border-line px-3 py-3">
                <span className="label-mono text-[10px] text-ink-400">01 / Kediaman</span>
                <span className="label text-[10px] text-brass-700">
                  {isDemo ? "Ilustrasi (demo)" : "Foto hunian"}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      <div className="border-y border-brass-500/30 bg-forest-900 text-paper-50">
        <dl className="container-page grid sm:grid-cols-3 sm:divide-x sm:divide-paper-50/15">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-paper-50/12 py-6 last:border-b-0 sm:border-b-0 sm:px-7 sm:first:pl-0 sm:last:pr-0"
            >
              <dt className="label text-brass-300">{fact.label}</dt>
              <dd
                className={
                  fact.mono
                    ? "tnum mt-2 font-mono text-[1.35rem] leading-tight text-paper-50"
                    : "mt-2 font-serif text-[1.6rem] leading-tight text-paper-50"
                }
              >
                {fact.value}
              </dd>
              <dd className="mt-1 text-[12px] leading-relaxed text-paper-300">{fact.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
