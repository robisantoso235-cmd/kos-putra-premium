import { WhatsAppButton } from "@/components/site/whatsapp";
import { initials } from "@/components/ui/logo";
import type { ContentBlock } from "@/lib/types";

export function CtaSection({
  block,
  whatsappHref,
  siteName,
}: {
  block: ContentBlock | undefined;
  whatsappHref: string | null;
  siteName: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-brass-500/50 bg-forest-900 text-paper-50">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[18rem] leading-none text-brass-300/[0.06] sm:text-[24rem]"
      >
        {initials(siteName)}
      </span>

      <div className="container-page relative grid gap-10 py-16 lg:grid-cols-12 lg:items-end lg:gap-16 lg:py-24">
        <div className="lg:col-span-7">
          <p className="label flex items-center gap-3 text-brass-300">
            <span aria-hidden="true" className="h-px w-8 bg-brass-300/70" />
            <span aria-hidden="true" className="h-1 w-1 bg-brass-300" />
            <span>Hubungi pengelola</span>
          </p>

          <h2 className="mt-6 max-w-[24ch] text-[2.4rem] leading-[1.02] text-paper-50 sm:text-[3.1rem] lg:text-[3.6rem]">
            {block?.title || "Tertarik tinggal di sini?"}
          </h2>

          {block?.subtitle ? (
            <p className="mt-5 max-w-[52ch] text-[14.5px] leading-relaxed text-paper-200">
              {block.subtitle}
            </p>
          ) : null}
          {block?.body ? (
            <p className="mt-2 max-w-[52ch] text-[12.5px] leading-relaxed text-paper-300">
              {block.body}
            </p>
          ) : null}
        </div>

        <div className="lg:col-span-5 lg:justify-self-end">
          <div className="border border-paper-50/20 bg-forest-800 p-7">
            <span aria-hidden="true" className="block h-px w-12 bg-brass-400" />
            <p className="label mt-5 text-[10px] text-brass-300">WhatsApp pengelola</p>
            <p className="mt-3 font-serif text-[1.5rem] leading-snug text-paper-50">
              Tanyakan ketersediaan kamar dan rincian biaya.
            </p>
            <div className="mt-6">
              <WhatsAppButton
                href={whatsappHref}
                label="Mulai percakapan"
                size="lg"
                variant="light"
                className="w-full"
              />
            </div>
            {!whatsappHref ? (
              <p className="mt-3 text-[11.5px] leading-relaxed text-paper-300">
                Nomor WhatsApp belum diatur oleh pengelola.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
