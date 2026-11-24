import { ExternalLink, Navigation } from "lucide-react";
import { SectionHeading } from "@/components/ui/misc";
import { buttonClasses } from "@/components/ui/button";
import type { ContentBlock, SiteSettings } from "@/lib/types";

export function LocationSection({
  settings,
  block,
}: {
  settings: SiteSettings;
  block: ContentBlock | undefined;
}) {
  const region = [settings.district, settings.city, settings.province].filter(Boolean).join(", ");
  const hasAddress = Boolean(settings.address_line?.trim());
  const embedUrl = settings.maps_embed_url;
  const hasCoordinates =
    typeof settings.latitude === "number" && typeof settings.longitude === "number";

  return (
    <section id="lokasi" className="border-b border-line bg-paper-50 py-20 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow={block?.subtitle || "Lokasi"}
            title={block?.title || "Lokasi kos"}
            description={block?.body}
          />

          <dl className="mt-9 divide-y divide-line border-y border-line">
            <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
              <dt className="label pt-0.5 text-[10px] text-ink-500">Wilayah</dt>
              <dd className="text-[13.5px] leading-relaxed text-ink-700">{region}</dd>
            </div>
            <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
              <dt className="label pt-0.5 text-[10px] text-ink-500">Alamat</dt>
              <dd className="text-[13.5px] leading-relaxed text-ink-700">
                {hasAddress ? (
                  settings.address_line
                ) : (
                  <span className="text-ink-500">Alamat lengkap belum diisi pengelola.</span>
                )}
              </dd>
            </div>
            {hasCoordinates ? (
              <div className="grid grid-cols-[6.5rem_1fr] gap-4 py-4">
                <dt className="label pt-0.5 text-[10px] text-ink-500">Koordinat</dt>
                <dd className="tnum font-mono text-[12.5px] text-ink-700">
                  {settings.latitude}, {settings.longitude}
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-7">
            {settings.maps_url ? (
              <a
                href={settings.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses("outline", "md")}
              >
                <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                Buka petunjuk lokasi
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            ) : (
              <p className="text-[12px] leading-relaxed text-ink-500">
                Tautan peta belum tersedia. Hubungi pengelola untuk petunjuk arah.
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-7">
          <figure>
            <div className="border border-line bg-paper-100">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={`Peta lokasi ${settings.site_name}`}
                  width={800}
                  height={600}
                  className="h-[22rem] w-full lg:h-[27rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="relative flex h-[22rem] items-center justify-center overflow-hidden px-6 text-center lg:h-[27rem]">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-8 top-1/2 h-px bg-brass-500/25"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-8 left-1/2 w-px bg-brass-500/25"
                  />
                  <div className="relative border border-brass-500/50 bg-paper-50 px-6 py-5">
                    <p className="label text-brass-700">Peta belum tersedia</p>
                    <p className="mx-auto mt-2 max-w-xs text-[12.5px] leading-relaxed text-ink-600">
                      Titik lokasi belum diverifikasi. Isi URL sematan peta pada pengaturan
                      situs untuk menampilkannya.
                    </p>
                  </div>
                  <span className="label-mono absolute left-5 top-5 text-[10px] text-ink-400">
                    Tembalang
                  </span>
                  <span className="label-mono absolute bottom-5 right-5 text-[10px] text-ink-400">
                    Skala tidak diukur
                  </span>
                </div>
              )}
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-3">
              <span className="label-mono text-[10px] text-ink-400">{settings.site_name}</span>
              <span className="label text-[10px] text-brass-700">
                {hasCoordinates ? "Titik terverifikasi" : "Belum diverifikasi"}
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
