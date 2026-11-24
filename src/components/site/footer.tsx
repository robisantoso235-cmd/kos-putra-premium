import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { siteNav } from "@/lib/site";
import type { SiteSettings } from "@/lib/types";

export function Footer({
  settings,
  whatsappHref,
}: {
  settings: SiteSettings;
  whatsappHref: string | null;
}) {
  const region = [settings.district, settings.city, settings.province].filter(Boolean).join(", ");
  const location = [settings.district, settings.city].filter(Boolean).join(" · ");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-paper-100">
      <div className="container-page grid gap-10 border-t border-brass-500/40 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-12 lg:py-16">
        <div className="lg:col-span-5">
          <Logo
            siteName={settings.site_name}
            logoUrl={settings.logo_url}
            logoAlt={settings.logo_alt}
            location={location}
            variant="light"
          />
          <p className="mt-5 max-w-[36ch] text-[13.5px] leading-relaxed text-paper-200">
            {settings.tagline || "Informasi kos putra di Tembalang, Semarang."}
          </p>
          {settings.footer_note ? (
            <p className="mt-3 max-w-[36ch] text-[11.5px] leading-relaxed text-paper-300">
              {settings.footer_note}
            </p>
          ) : null}
        </div>

        <nav aria-label="Navigasi footer" className="lg:col-span-3">
          <h2 className="label text-[10px] text-brass-300">Indeks halaman</h2>
          <ul className="mt-2">
            {[...siteNav, { href: "/kamar", label: "Katalog kamar" }].map((item, index) => (
              <li key={item.href} className="flex items-center gap-3">
                <span className="label-mono w-4 text-[10px] text-brass-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <Link
                  href={item.href}
                  className="link-rule inline-flex min-h-11 min-w-11 items-center text-[13px] text-paper-200 hover:text-paper-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="label text-[10px] text-brass-300">Kontak &amp; lokasi</h2>
          <ul className="mt-4 space-y-1 text-[13px] text-paper-200">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brass-400" aria-hidden="true" />
              <span className="leading-relaxed">
                {settings.address_line ? `${settings.address_line}, ` : ""}
                {region}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brass-400"
                aria-hidden="true"
              />
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-rule inline-flex min-h-11 items-center text-paper-100"
                >
                  WhatsApp pengelola
                </a>
              ) : (
                <span className="text-paper-300">Nomor WhatsApp belum diatur</span>
              )}
            </li>
            {settings.email ? (
              <li className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 shrink-0 text-brass-400" aria-hidden="true" />
                <a
                  href={`mailto:${settings.email}`}
                  className="link-rule inline-flex min-h-11 items-center text-paper-100"
                >
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings.instagram_url ? (
              <li className="flex items-center gap-2.5">
                <InstagramIcon className="h-3.5 w-3.5 shrink-0 text-brass-400" />
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-rule inline-flex min-h-11 items-center text-paper-100"
                >
                  Instagram
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-paper-50/12">
        <div className="container-page flex flex-col gap-2 pt-5 pb-20 sm:flex-row sm:items-center sm:justify-between sm:pb-5">
          <p className="label-mono text-[10px] text-paper-300">
            © {year} {settings.site_name}
          </p>
          {settings.privacy_note ? (
            <p className="max-w-xl text-[11px] leading-relaxed text-paper-300 sm:text-right">
              {settings.privacy_note}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
