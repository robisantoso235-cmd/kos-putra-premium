"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button";

interface WhatsAppButtonProps {
  /** Null = nomor belum dikonfigurasi. Tidak ada tautan palsu yang dibuat. */
  href: string | null;
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  showIcon?: boolean;
  /** Tampilan ringkas untuk floating button. */
  compact?: boolean;
}

export function WhatsAppButton({
  href,
  label,
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
  compact = false,
}: WhatsAppButtonProps) {
  if (!href) {
    return (
      <span
        className={cn(
          buttonClasses(variant, size, "cursor-not-allowed opacity-60"),
          className,
        )}
        aria-disabled="true"
        title="Nomor WhatsApp belum diatur oleh pengelola."
      >
        {showIcon ? <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> : null}
        {compact ? "WhatsApp" : label}
        <span className="sr-only">: nomor WhatsApp belum diatur</span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonClasses(variant, size, className), "group")}
      aria-label={`${label} melalui WhatsApp`}
    >
      {showIcon ? <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> : null}
      {compact ? <span className="sr-only">{label}</span> : label}
    </a>
  );
}

/** Tombol WhatsApp mengambang: kotak siku dengan garis kuningan, bukan pil mengkilap. */
export function FloatingWhatsApp({ href, siteName }: { href: string | null; siteName: string }) {
  if (!href) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 print:hidden sm:hidden">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-11 items-center gap-2.5 border border-brass-400/60 bg-forest-800 py-2.5 pl-3 pr-4 text-paper-50 transition-colors hover:border-brass-300 hover:bg-forest-900 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-300"
        aria-label={`Hubungi ${siteName} melalui WhatsApp`}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <span className="label text-[10px]">WhatsApp</span>
      </a>
    </div>
  );
}
