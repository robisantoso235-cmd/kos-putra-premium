import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "soft"
  | "ghost"
  | "light"
  | "onDark"
  | "brass";
export type ButtonSize = "sm" | "md" | "lg";

/* Radius 2px dipakai untuk semua kontrol: bentuknya sengaja hampir siku,
   mengikuti bahasa kediaman cetak alih-alih tombol pil. */
const variants: Record<ButtonVariant, string> = {
  primary: "bg-forest-800 text-paper-50 hover:bg-forest-900 active:bg-forest-950",
  outline:
    "border border-brass-500/70 bg-transparent text-ink-800 hover:border-brass-600 hover:bg-brass-100/50",
  soft: "bg-paper-200 text-ink-800 hover:bg-paper-300",
  ghost:
    "text-ink-700 underline decoration-brass-500 decoration-1 underline-offset-4 hover:text-ink-900 hover:decoration-brass-700",
  light: "bg-paper-50 text-forest-900 hover:bg-brass-100",
  onDark:
    "border border-paper-50/30 bg-transparent text-paper-50 hover:border-brass-300 hover:bg-paper-50/10",
  brass: "bg-brass-400 text-forest-950 hover:bg-brass-300 active:bg-brass-300",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-3 py-2 text-[12.5px] gap-1.5",
  md: "min-h-11 px-4 py-2.5 text-[13.5px] gap-2",
  lg: "min-h-12 px-5 py-3 text-[14.5px] gap-2.5",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center rounded-[2px] font-medium tracking-[0.01em] transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brass-600",
    "disabled:cursor-not-allowed disabled:opacity-55",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({ variant = "primary", size = "md", className, ...props }: ButtonProps) {
  return <button className={buttonClasses(variant, size, className)} {...props} />;
}
