import { SmartImage } from "@/components/ui/smart-image";
import { SectionHeading } from "@/components/ui/misc";
import type { ContentBlock, Highlight } from "@/lib/types";

export function ProfileSection({
  block,
  highlights,
  imageUrl,
  imageAlt,
  isDemo,
}: {
  block: ContentBlock | undefined;
  highlights: Highlight[];
  imageUrl: string | null;
  imageAlt: string;
  isDemo: boolean;
}) {
  if (!block) return null;

  return (
    <section id="tentang" className="border-b border-line bg-card py-20 lg:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <figure className="border border-line-strong bg-card">
            <SmartImage
              src={imageUrl}
              alt={imageAlt}
              ratio="aspect-[4/5]"
              sizes="(max-width: 1024px) 92vw, 38vw"
              placeholderLabel="Foto profil kos belum tersedia"
            />
            <figcaption className="flex items-baseline justify-between gap-3 border-t border-line px-3 py-3">
              <span className="label-mono text-[10px] text-ink-400">02 / Hunian</span>
              <span className="label text-[10px] text-brass-700">
                {isDemo ? "Ilustrasi (demo)" : "Dokumentasi hunian"}
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-7 lg:pt-2">
          <SectionHeading
            eyebrow={block.subtitle || "Tentang kami"}
            title={block.title || "Tentang kos"}
            description={block.body}
          />

          {highlights.length > 0 ? (
            <ol className="mt-10 grid gap-x-8 gap-y-0 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <li key={item.id} className="border-t border-line py-5">
                  <div className="flex items-baseline gap-3">
                    <span className="label-mono shrink-0 text-[10px] text-brass-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-[1.35rem] leading-tight text-ink-900">
                      {item.title}
                    </h3>
                  </div>
                  {item.description ? (
                    <p className="mt-2 max-w-[46ch] pl-7 text-[13px] leading-relaxed text-ink-500">
                      {item.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </section>
  );
}
