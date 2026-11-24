import type { PricePeriod } from "./types";

/** Gabungkan className secara kondisional. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(" ");
}

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export const pricePeriodLabels: Record<PricePeriod, string> = {
  hari: "per hari",
  minggu: "per minggu",
  bulan: "per bulan",
  tahun: "per tahun",
  lainnya: "periode khusus",
};

export function formatPriceLabel(
  amount: number | null,
  period: PricePeriod,
  note?: string | null,
): string {
  if (amount === null || Number.isNaN(amount)) {
    return note?.trim() ? note : "Harga belum tersedia";
  }
  const base = `${formatCurrency(amount)} ${pricePeriodLabels[period]}`;
  return note?.trim() ? `${base} · ${note.trim()}` : base;
}

/** Slug SEO-friendly: huruf kecil, angka, dan tanda hubung. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
