"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SmartImage } from "@/components/ui/smart-image";
import { Badge, SectionHeading } from "@/components/ui/misc";
import { galleryCategoryLabels } from "@/lib/site";
import type { GalleryItem } from "@/lib/types";

/**
 * Galeri disusun seperti lembar kontak foto: bidang gambar seragam, keterangan
 * selalu terlihat di bawah tiap bingkai, bukan overlay yang hanya muncul saat
 * kursor lewat.
 */
export function GallerySection({
  items,
  isDemo,
}: {
  items: GalleryItem[];
  isDemo: boolean;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setActiveIndex(null);
    // Kembalikan fokus ke bingkai yang membuka dialog.
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const next = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % items.length,
    );
  }, [items.length]);
  const previous = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + items.length) % items.length,
    );
  }, [items.length]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") previous();

      if (event.key === "Tab") {
        const root = dialogRef.current;
        if (!root) return;

        const focusable = Array.from(
          root.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        if (focusable.length === 0) return;

        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, next, previous]);

  if (items.length === 0) return null;

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <section id="galeri" className="border-b border-line bg-paper-100 py-16 lg:py-20">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <SectionHeading
            eyebrow="Galeri"
            title="Foto kamar dan area bersama"
            className="lg:col-span-7"
          />
          <div className="flex flex-wrap items-end justify-between gap-4 lg:col-span-5">
            <p className="max-w-[42ch] text-[13.5px] leading-relaxed text-ink-600">
              {items.length} bingkai. Seluruh foto adalah dokumentasi Kost Graha Dhewa.
            </p>
            {isDemo ? (
              <Badge tone="brass">
                {items.every((item) => item.is_demo) ? "Ilustrasi demo" : "Sebagian ilustrasi"}
              </Badge>
            ) : null}
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-8">
          {items.map((item, index) => (
            <li
              key={item.id}
              className="w-[calc(50%_-_0.625rem)] shrink-0 sm:w-[calc(33.333%_-_0.8333rem)]"
            >
              <button
                type="button"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setActiveIndex(index);
                }}
                className="group relative block w-full text-left"
                aria-label={`Perbesar gambar: ${item.title ?? item.alt_text}`}
              >
                <SmartImage
                  src={item.image_url}
                  alt={item.alt_text}
                  ratio="aspect-[4/3]"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="border border-line transition-colors duration-200 group-hover:border-brass-500"
                  imageClassName="transition-transform duration-500 group-hover:scale-[1.03]"
                  placeholderLabel="Gambar belum tersedia"
                />
                <span className="label-mono absolute left-2 top-2 bg-paper-50/95 px-2 py-1 text-[10px] text-ink-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-3 flex items-baseline justify-between gap-3">
                  <span className="text-[12.5px] leading-snug text-ink-700">
                    {item.title ?? galleryCategoryLabels[item.category]}
                  </span>
                  <span className="label shrink-0 text-[9px] text-brass-700">Perbesar</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && activeItem ? (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-caption"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-forest-950 p-4 sm:p-8"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            autoFocus
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-paper-50/25 bg-forest-950 text-paper-50 transition-colors hover:border-brass-300 sm:right-6 sm:top-6"
            aria-label="Tutup galeri"
          >
            <X className="h-4 w-4" />
          </button>

          {items.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previous();
                }}
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-paper-50/30 bg-forest-950 text-paper-50 transition-colors hover:border-brass-300 hover:text-brass-300 sm:left-6"
                aria-label="Gambar sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  next();
                }}
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-paper-50/30 bg-forest-950 text-paper-50 transition-colors hover:border-brass-300 hover:text-brass-300 sm:right-6"
                aria-label="Gambar berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          ) : null}

          <figure className="w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <SmartImage
              src={activeItem.image_url}
              alt={activeItem.alt_text}
              ratio="aspect-[4/3]"
              sizes="90vw"
              className="max-h-[72vh] border border-brass-300/40"
              placeholderLabel="Gambar belum tersedia"
            />
            <figcaption
              id="gallery-caption"
              className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-paper-100"
            >
              <span className="text-sm">
                {activeItem.title ?? galleryCategoryLabels[activeItem.category]}
              </span>
              <span className="label-mono text-[10px] text-brass-300">
                {activeItem.is_demo ? "Ilustrasi (demo)" : "Foto asli"}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
