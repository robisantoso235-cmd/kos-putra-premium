import { SectionHeading } from "@/components/ui/misc";
import type { Testimonial } from "@/lib/types";

/**
 * Testimoni hanya tampil bila sudah ditandai terbit pada data konten.
 * Data demo default tidak dipublikasikan.
 */
export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimoni" className="border-b border-line bg-paper-100 py-16 lg:py-20">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <SectionHeading
            eyebrow="Testimoni"
            title="Catatan penghuni"
            className="lg:col-span-7"
          />
          <p className="max-w-[40ch] text-[13px] leading-relaxed text-ink-600 lg:col-span-5">
            Kutipan diambil dari ulasan publik Kost Graha Dhewa di Google Maps.
          </p>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <figure key={item.id} className="border-l-2 border-brass-400 pl-5">
              <span className="label-mono text-[10px] text-ink-500">
                {String(index + 1).padStart(2, "0")}
              </span>
              <blockquote className="mt-2 font-serif text-[1.35rem] leading-[1.45] text-ink-800">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4">
                <p className="text-[13px] font-medium text-ink-900">{item.author_name}</p>
                {item.author_detail ? (
                  <p className="label mt-1 text-[9px] text-ink-500">{item.author_detail}</p>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
