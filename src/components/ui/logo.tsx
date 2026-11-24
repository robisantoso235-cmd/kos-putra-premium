import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  siteName: string;
  logoUrl: string | null;
  logoAlt: string | null;
  /** Baris kecil di bawah nama, mis. "Tembalang · Semarang". */
  location?: string | null;
  href?: string;
  variant?: "dark" | "light";
  className?: string;
}

export function initials(name: string): string {
  const words = name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "K";
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return `${words[0]![0]}${words[1]![0]}`.toUpperCase();
}

/**
 * Logo dari CMS. Bila belum ada file logo, tampil monogram dalam bingkai
 * persegi sebagai placeholder, bukan nama merek palsu.
 */
export function Logo({
  siteName,
  logoUrl,
  logoAlt,
  location,
  href = "/#beranda",
  variant = "dark",
  className,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn("group inline-flex min-h-11 items-center gap-3", className)}
      aria-label={`${siteName}, beranda`}
    >
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={logoAlt ?? `Logo ${siteName}`}
          className="h-10 w-10 border border-brass-500/60 object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "relative flex h-10 w-10 items-center justify-center border font-serif text-[17px] tracking-[0.04em] transition-colors",
            variant === "dark"
              ? "border-brass-500 text-ink-900 group-hover:border-brass-600"
              : "border-brass-300/60 text-paper-50 group-hover:border-brass-300",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-[3px] border",
              variant === "dark" ? "border-brass-500/25" : "border-paper-50/20",
            )}
          />
          {initials(siteName)}
        </span>
      )}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[18px] tracking-[-0.005em]",
            variant === "dark" ? "text-ink-900" : "text-paper-50",
          )}
        >
          {siteName}
        </span>
        <span
          className={cn(
            "label mt-1.5 text-[9px] tracking-[0.2em]",
            variant === "dark" ? "text-ink-500" : "text-brass-300",
          )}
        >
          {location || "Kos putra"}
        </span>
      </span>
    </Link>
  );
}
