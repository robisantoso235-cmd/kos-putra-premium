import { WhatsAppButton } from "@/components/site/whatsapp";

/** Strip ajakan WhatsApp di bawah halaman katalog / detail. */
export function ActionBar({
  title,
  description,
  whatsappHref,
}: {
  title: string;
  description: string;
  whatsappHref: string | null;
}) {
  return (
    <section className="border-t border-brass-500/40 bg-paper-100 py-10">
      <div className="container-page flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="label text-[10px] text-brass-700">Masih ada pertanyaan</p>
          <h2 className="mt-2 text-[1.6rem] leading-tight">{title}</h2>
          <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-ink-600">
            {description}
          </p>
        </div>
        <WhatsAppButton href={whatsappHref} label="Chat WhatsApp" size="lg" variant="primary" />
      </div>
    </section>
  );
}
