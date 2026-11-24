import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "brass",
  className,
}: {
  children: ReactNode;
  tone?: "brass" | "forest" | "cream" | "outline" | "onDark";
  className?: string;
}) {
  const tones = {
    brass: "border border-brass-500/60 bg-brass-100 text-brass-700",
    forest: "border border-forest-800 bg-forest-800 text-paper-50",
    cream: "border border-line bg-paper-100 text-ink-600",
    outline: "border border-line-strong text-ink-700",
    onDark: "border border-paper-50/30 bg-transparent text-paper-100",
  } as const;

  return (
    <span
      className={cn(
        "label inline-flex items-center rounded-[2px] px-2 py-1 text-[10px] tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Judul seksi: garis kuningan dan kotak kecil, lalu judul serif.
 * Tanpa nomor bab dekoratif; urutan seksi bisa berubah saat konten kosong.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  as = "h2",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string | null;
  tone?: "light" | "onDark";
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}) {
  const onDark = tone === "onDark";
  const Heading = as;

  return (
    <div className={cn("flex flex-col", className)}>
      {eyebrow ? (
        <div
          className={cn(
            "label flex flex-wrap items-center gap-x-3 gap-y-1",
            onDark ? "text-brass-300" : "text-brass-700",
          )}
        >
          <span
            aria-hidden="true"
            className={cn("h-px w-6", onDark ? "bg-brass-300/70" : "bg-brass-500")}
          />
          <span
            aria-hidden="true"
            className={cn("h-1 w-1", onDark ? "bg-brass-300" : "bg-brass-500")}
          />
          <span>{eyebrow}</span>
        </div>
      ) : null}

      <Heading
        className={cn(
          "mt-4 max-w-[30ch] text-[2rem] leading-[1.05] sm:text-[2.45rem] lg:text-[2.75rem]",
          onDark ? "text-paper-50" : "text-ink-900",
        )}
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={cn(
            "mt-4 max-w-[58ch] text-[14.5px]",
            onDark ? "leading-relaxed text-paper-200" : "prose-copy",
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
}
