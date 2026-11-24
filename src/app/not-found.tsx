import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSiteData } from "@/lib/data/site";
import { Logo } from "@/components/ui/logo";
import { buttonClasses } from "@/components/ui/button";

export default async function NotFound() {
  const data = await getSiteData();
  const { settings } = data;
  const location = [settings.district, settings.city].filter(Boolean).join(" · ");
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-dvh flex-col bg-paper-50">
      <header className="border-b border-line">
        <div className="container-page flex h-[5rem] items-center justify-between gap-6 lg:h-[5.5rem]">
          <Logo
            siteName={settings.site_name}
            logoUrl={settings.logo_url}
            logoAlt={settings.logo_alt}
            location={location}
          />
          <span className="label-mono text-ink-400">404</span>
        </div>
      </header>

      <main className="container-page flex flex-1 flex-col justify-center py-20 lg:py-28">
        <p className="label flex items-center gap-3 text-brass-700">
          <span>404</span>
          <span aria-hidden="true" className="h-px w-6 bg-brass-500" />
          <span>Halaman tidak ditemukan</span>
        </p>

        <h1 className="mt-6 max-w-[22ch] text-[2.8rem] leading-[0.98] sm:text-[3.6rem]">
          Alamat ini tidak mengarah ke halaman mana pun.
        </h1>

        <p className="mt-5 max-w-[48ch] text-[14.5px] leading-relaxed text-ink-600">
          Periksa kembali tautan yang Anda buka, atau kembali ke beranda untuk melihat tipe
          kamar dan informasi hunian.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/" className={buttonClasses("primary", "md")}>
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Kembali ke beranda
          </Link>
          <Link href="/kamar" className={buttonClasses("outline", "md")}>
            Lihat katalog kamar
          </Link>
        </div>
      </main>

      <footer className="border-t border-brass-500/40 bg-forest-950">
        <div className="container-page py-5">
          <p className="label-mono text-[10px] text-paper-300">
            © {year} {settings.site_name}
          </p>
        </div>
      </footer>
    </div>
  );
}
