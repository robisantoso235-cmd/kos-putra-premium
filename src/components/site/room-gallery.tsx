"use client";

import { useState } from "react";
import { SmartImage } from "@/components/ui/smart-image";
import { cn } from "@/lib/utils";

export interface GalleryImage {
  url: string;
  alt: string;
}

export function RoomGallery({
  name,
  images,
  isDemo,
}: {
  name: string;
  images: GalleryImage[];
  isDemo: boolean;
}) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="space-y-2.5">
      <div className="relative border border-line-strong">
        <SmartImage
          src={current?.url ?? null}
          alt={current?.alt ?? `Foto ${name}`}
          ratio="aspect-[4/5]"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
          placeholderLabel="Foto kamar belum tersedia"
        />
        <span className="label absolute left-0 top-0 bg-paper-50 px-2.5 py-1.5 text-[10px] text-brass-700">
          {isDemo ? "Ilustrasi (demo)" : "Foto kamar"}
        </span>
        <span className="label-mono absolute bottom-0 right-0 bg-paper-50 px-2.5 py-1.5 text-[10px] text-ink-500">
          {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
      </div>

      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-2 sm:grid-cols-5">
          {images.map((image, index) => (
            <li key={`${image.url}-${index}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Tampilkan gambar ${index + 1}: ${image.alt}`}
                aria-pressed={index === active}
                className={cn(
                  "block w-full border p-0.5 transition-colors",
                  index === active
                    ? "border-brass-500"
                    : "border-line opacity-70 hover:border-brass-500 hover:opacity-100",
                )}
              >
                <SmartImage
                  src={image.url}
                  alt=""
                  ratio="aspect-square"
                  sizes="120px"
                  placeholderLabel=""
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
