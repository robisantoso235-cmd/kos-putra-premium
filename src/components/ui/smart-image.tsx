"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SmartImageProps {
  src?: string | null;
  alt: string;
  /** Kelas aspect ratio untuk wrapper, contoh "aspect-[4/3]". */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Label kecil di placeholder bila gambar tidak tersedia. */
  placeholderLabel?: string;
}

/**
 * Gambar dengan fallback datar bergaya lembar kertas: bidang polos, garis
 * rambut, dan keterangan monospace. Tidak ada gradasi dekoratif.
 */
export function SmartImage({
  src,
  alt,
  ratio = "aspect-[4/3]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  className,
  imageClassName,
  placeholderLabel = "Foto belum tersedia",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  // Ganti gambar (mis. galeri kamar) harus mencoba memuat ulang, bukan
  // mewarisi status gagal dari gambar sebelumnya.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden bg-paper-200", ratio, className)}>
      {showPlaceholder ? (
        <div className="absolute inset-3 flex flex-col justify-between border border-brass-500/40 p-3">
          <span className="label text-ink-500">Belum ada foto</span>
          <span className="label text-right text-ink-500">{placeholderLabel}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          fetchPriority={priority ? "high" : undefined}
          className={cn("object-cover", imageClassName)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
