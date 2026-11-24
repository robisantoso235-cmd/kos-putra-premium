"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { buttonClasses } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/site/whatsapp";
import { siteNav } from "@/lib/site";
import { cn } from "@/lib/utils";

interface NavbarProps {
  siteName: string;
  logoUrl: string | null;
  logoAlt: string | null;
  location: string;
  whatsappHref: string | null;
}

export function Navbar({ siteName, logoUrl, logoAlt, location, whatsappHref }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isRoomPage = pathname?.startsWith("/kamar");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper-50">
      <div className="container-page flex h-[5rem] items-center justify-between gap-6 lg:h-[5.5rem]">
        <Logo
          siteName={siteName}
          logoUrl={logoUrl}
          logoAlt={logoAlt}
          location={location}
        />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 lg:flex">
          {siteNav.map((item) => {
            const active = item.href === "/#kamar" && isRoomPage;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "label group inline-flex min-h-11 items-center text-[10px] tracking-[0.16em] transition-colors",
                  active ? "text-ink-900" : "text-ink-600 hover:text-ink-900",
                )}
              >
                <span
                  className={cn(
                    "border-b pb-1.5 transition-colors",
                    active
                      ? "border-brass-500"
                      : "border-transparent group-hover:border-brass-500/60",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <WhatsAppButton href={whatsappHref} label="Tanya pengelola" size="sm" />
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-brass-500/50 text-ink-800 transition-colors hover:border-brass-600 hover:bg-brass-100/40 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-line bg-paper-50 lg:hidden"
        >
          <nav aria-label="Navigasi seluler" className="container-page py-3">
            {siteNav.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-line/70 py-4 font-serif text-[1.45rem] leading-tight text-ink-900 transition-colors last:border-none hover:text-brass-700"
              >
                <span className="label-mono w-5 shrink-0 text-[10px] text-brass-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
            <div className="space-y-3 py-5" onClick={() => setOpen(false)}>
              <WhatsAppButton href={whatsappHref} label="Tanya pengelola" className="w-full" />
              {!whatsappHref ? (
                <p className="text-xs leading-relaxed text-ink-500">
                  Nomor WhatsApp belum diatur oleh pengelola.
                </p>
              ) : (
                <Link href="/kamar" className={buttonClasses("ghost", "sm", "px-0")}>
                  Lihat semua tipe kamar
                </Link>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
