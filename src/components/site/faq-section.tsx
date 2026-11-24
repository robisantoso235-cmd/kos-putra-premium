import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/misc";
import type { Faq } from "@/lib/types";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="border-b border-line bg-paper-100 py-20 lg:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" />
          <p className="mt-5 max-w-[34ch] text-[13px] leading-relaxed text-ink-600">
            Belum terjawab? Tanyakan langsung kepada pengelola melalui WhatsApp.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="border-t border-line">
            {faqs.map((faq, index) => (
              <details key={faq.id} className="group border-b border-line" open={index === 0}>
                <summary className="flex list-none items-start justify-between gap-5 py-5 transition-colors hover:text-brass-700 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-baseline gap-4">
                    <span className="label-mono w-5 shrink-0 text-[10px] text-brass-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-[1.25rem] leading-snug text-ink-900 transition-colors group-hover:text-brass-700">
                      {faq.question}
                    </span>
                  </span>
                  <Plus
                    className="mt-1 h-4 w-4 shrink-0 text-brass-600 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <div className="pb-6 pl-9 pr-8 text-[13.5px] leading-relaxed text-ink-600">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
