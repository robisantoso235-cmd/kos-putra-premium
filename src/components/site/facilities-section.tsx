import { Badge, SectionHeading } from "@/components/ui/misc";
import { facilityCategoryLabels } from "@/lib/site";
import type { Facility } from "@/lib/types";

const categoryOrder = ["room", "shared", "building"] as const;

/**
 * Fasilitas dibaca sebagai daftar inventaris: kategori sebagai judul kolom,
 * setiap item satu baris dengan garis rambut. Tidak ada kartu berbingkai.
 */
export function FacilitiesSection({
  facilities,
  isDemo,
}: {
  facilities: Facility[];
  isDemo: boolean;
}) {
  if (facilities.length === 0) return null;

  const grouped = categoryOrder
    .map((category) => ({
      category,
      items: facilities.filter((facility) => facility.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section
      id="fasilitas"
      className="border-y border-brass-500/30 bg-forest-900 py-16 text-paper-50 lg:py-20"
    >
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <SectionHeading
            eyebrow="Fasilitas"
            title="Fasilitas kamar dan area bersama"
            tone="onDark"
            className="lg:col-span-7"
          />
          <div className="lg:col-span-5">
            <p className="max-w-[46ch] text-[13.5px] leading-relaxed text-paper-200">
              Daftar ini menggambarkan isi kamar dan area bersama. Rincian per tipe kamar bisa
              berbeda. Periksa kembali pada halaman tipe kamar yang Anda pilih.
            </p>
            {isDemo ? (
              <Badge tone="brass" className="mt-4">
                Daftar contoh (demo)
              </Badge>
            ) : null}
          </div>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-9 border-t border-paper-50/20 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group) => (
            <div key={group.category}>
              <dt className="label flex items-baseline justify-between gap-3 border-b border-paper-50/25 pb-3 text-brass-300">
                <span>{facilityCategoryLabels[group.category]}</span>
                <span className="text-paper-300">{group.items.length}</span>
              </dt>
              <dd>
                <ul>
                  {group.items.map((facility, index) => (
                    <li
                      key={facility.id}
                      className="flex items-baseline gap-3 border-b border-paper-50/12 py-3"
                    >
                      <span className="label-mono w-5 shrink-0 text-[10px] text-brass-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[14px] leading-snug text-paper-100">
                        {facility.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
