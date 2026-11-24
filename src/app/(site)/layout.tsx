import { getSiteData } from "@/lib/data/site";
import { generalWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { FloatingWhatsApp } from "@/components/site/whatsapp";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const data = await getSiteData();
  const { settings } = data;

  const whatsappHref = buildWhatsAppUrl(
    settings.whatsapp_number,
    generalWhatsAppMessage({
      siteName: settings.site_name,
      baseMessage: settings.whatsapp_message,
    }),
  );
  const location = [settings.district, settings.city].filter(Boolean).join(" · ");

  return (
    <>
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-paper-50 focus:bg-forest-900 focus:px-4 focus:py-2.5 focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.14em] focus:text-paper-50"
      >
        Lewati ke konten utama
      </a>

      <Navbar
        siteName={settings.site_name}
        logoUrl={settings.logo_url}
        logoAlt={settings.logo_alt}
        location={location}
        whatsappHref={whatsappHref}
      />

      <main id="konten">{children}</main>

      <Footer settings={settings} whatsappHref={whatsappHref} />
      <FloatingWhatsApp href={whatsappHref} siteName={settings.site_name} />
    </>
  );
}
