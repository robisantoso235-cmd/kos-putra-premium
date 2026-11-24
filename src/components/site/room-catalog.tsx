"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { RoomCard } from "@/components/site/room-card";
import { WhatsAppButton } from "@/components/site/whatsapp";
import { ActionBar } from "@/components/site/action-bar";
import { buttonClasses } from "@/components/ui/button";
import {
  checkboxClasses,
  hintClasses,
  inputClasses,
  labelClasses,
  selectClasses,
} from "@/components/ui/form-styles";
import { buildWhatsAppUrl, generalWhatsAppMessage, roomWhatsAppMessage } from "@/lib/whatsapp";
import { cn, formatCurrency } from "@/lib/utils";
import type { Facility, RoomTypeWithRelations } from "@/lib/types";

type SortOption = "default" | "price-asc" | "price-desc";

interface Filters {
  q: string;
  min: string;
  max: string;
  facilities: string[];
  sort: SortOption;
}

const emptyFilters: Filters = { q: "", min: "", max: "", facilities: [], sort: "default" };

interface RoomCatalogProps {
  rooms: RoomTypeWithRelations[];
  facilities: Facility[];
  siteName: string;
  whatsappNumber: string | null;
  whatsappMessage: string;
}

function parseSort(value: string | null): SortOption {
  return value === "price-asc" || value === "price-desc" ? value : "default";
}

function parsePrice(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(/\s/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function filterRooms(
  rooms: RoomTypeWithRelations[],
  options: { q: string; min: number | null; max: number | null; facilityIds: string[]; sort: SortOption },
): RoomTypeWithRelations[] {
  const query = options.q.toLowerCase();

  const filtered = rooms.filter((room) => {
    if (query) {
      const haystack = `${room.name} ${room.slug} ${room.short_description ?? ""}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    if (options.min !== null) {
      if (room.price_amount === null || room.price_amount < options.min) return false;
    }
    if (options.max !== null) {
      if (room.price_amount === null || room.price_amount > options.max) return false;
    }

    if (options.facilityIds.length > 0) {
      const owned = new Set(room.facilities.map((facility) => facility.id));
      if (!options.facilityIds.every((id) => owned.has(id))) return false;
    }

    return true;
  });

  if (options.sort === "price-asc") {
    return [...filtered].sort((a, b) => (a.price_amount ?? Infinity) - (b.price_amount ?? Infinity));
  }
  if (options.sort === "price-desc") {
    return [...filtered].sort((a, b) => (b.price_amount ?? -1) - (a.price_amount ?? -1));
  }
  return filtered;
}

/**
 * Katalog kamar dengan filter di sisi browser.
 * Tanpa server, seluruh kamar tetap ikut ter-render saat build (baik untuk SEO),
 * lalu filter bekerja di browser dan tersimpan di URL agar bisa dibagikan.
 */
export function RoomCatalog({
  rooms,
  facilities,
  siteName,
  whatsappNumber,
  whatsappMessage,
}: RoomCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [hydrated, setHydrated] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Baca filter dari URL setelah halaman tampil (tidak mengganggu HTML statis).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      q: params.get("q") ?? "",
      min: params.get("min") ?? "",
      max: params.get("max") ?? "",
      facilities: params.getAll("f").filter((id) => facilities.some((item) => item.id === id)),
      sort: parseSort(params.get("sort")),
    });
    // Tautan yang sudah membawa filter langsung menampilkan panelnya di ponsel.
    if (params.toString()) setFiltersOpen(true);
    setHydrated(true);
  }, [facilities]);

  // Hasil sudah menyaring langsung; URL ikut disinkronkan agar tautan bisa
  // dibagikan tanpa tombol "terapkan" yang menyesatkan.
  useEffect(() => {
    if (!hydrated) return;

    const timer = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (filters.q.trim()) params.set("q", filters.q.trim());
      if (filters.min.trim()) params.set("min", filters.min.trim());
      if (filters.max.trim()) params.set("max", filters.max.trim());
      for (const id of filters.facilities) params.append("f", id);
      if (filters.sort !== "default") params.set("sort", filters.sort);

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    }, 350);

    return () => window.clearTimeout(timer);
  }, [filters, hydrated, pathname, router]);

  const q = filters.q.trim().slice(0, 80);
  const min = parsePrice(filters.min);
  const max = parsePrice(filters.max);

  const results = filterRooms(rooms, {
    q,
    min,
    max,
    facilityIds: filters.facilities,
    sort: filters.sort,
  });

  const hasFilters =
    Boolean(q) ||
    min !== null ||
    max !== null ||
    filters.facilities.length > 0 ||
    filters.sort !== "default";

  const activeFilterCount =
    (q ? 1 : 0) +
    (min !== null ? 1 : 0) +
    (max !== null ? 1 : 0) +
    filters.facilities.length +
    (filters.sort !== "default" ? 1 : 0);

  const context = { siteName, baseMessage: whatsappMessage };
  const generalHref = buildWhatsAppUrl(whatsappNumber, generalWhatsAppMessage(context));

  const relevantFacilities = facilities.filter((facility) =>
    rooms.some((room) => room.facilities.some((item) => item.id === facility.id)),
  );

  function toggleFacility(id: string) {
    setFilters((current) => ({
      ...current,
      facilities: current.facilities.includes(id)
        ? current.facilities.filter((item) => item !== id)
        : [...current.facilities, id],
    }));
  }

  function resetFilters() {
    setFilters(emptyFilters);
  }

  return (
    <>
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[18rem_1fr] lg:gap-10 lg:py-14">
        <aside aria-label="Filter kamar">
          <button
            type="button"
            onClick={() => setFiltersOpen((value) => !value)}
            aria-expanded={filtersOpen}
            aria-controls="filter-form"
            className="mb-4 flex min-h-11 w-full items-center justify-between gap-3 border border-line bg-card px-4 py-3 transition-colors hover:border-brass-500 lg:hidden"
          >
            <span className="label text-ink-600">Filter kamar</span>
            <span className="label flex items-center gap-2 text-brass-700">
              {hasFilters ? `${activeFilterCount} aktif` : "Semua"}
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </button>

          <form
            id="filter-form"
            onSubmit={(event) => event.preventDefault()}
            className={cn(
              "border border-line border-t-2 border-t-brass-500 bg-card p-5 lg:sticky lg:top-32 lg:block",
              filtersOpen ? "block" : "hidden",
            )}
          >
            <div className="flex items-center justify-between gap-2 border-b border-line pb-3">
              <h2 className="label text-brass-700">Filter</h2>
              <SlidersHorizontal className="h-3.5 w-3.5 text-brass-600" aria-hidden="true" />
            </div>

            <div>
              <label htmlFor="q" className={labelClasses}>
                Cari kamar
              </label>
              <input
                id="q"
                name="q"
                type="search"
                value={filters.q}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, q: event.target.value }))
                }
                placeholder="Nama atau tipe kamar"
                className={inputClasses}
              />
            </div>

            <fieldset>
              <legend className={labelClasses}>Rentang harga (nominal)</legend>
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  name="min"
                  type="number"
                  min={0}
                  step={50000}
                  inputMode="numeric"
                  value={filters.min}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, min: event.target.value }))
                  }
                  placeholder="Min"
                  aria-label="Harga minimum"
                  className={inputClasses}
                />
                <input
                  name="max"
                  type="number"
                  min={0}
                  step={50000}
                  inputMode="numeric"
                  value={filters.max}
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, max: event.target.value }))
                  }
                  placeholder="Maks"
                  aria-label="Harga maksimum"
                  className={inputClasses}
                />
              </div>
              <p className={hintClasses}>
                Nominal dibandingkan apa adanya. Periode sewa tiap kamar bisa berbeda
                (per bulan/tahun). Contoh: {formatCurrency(1_500_000)}.
              </p>
            </fieldset>

            {relevantFacilities.length > 0 ? (
              <fieldset>
                <legend className={labelClasses}>Fasilitas</legend>
                <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
                  {relevantFacilities.map((facility) => (
                    <label
                      key={facility.id}
                      className="flex min-h-11 cursor-pointer items-center gap-2.5 text-[13px] text-ink-700"
                    >
                      <input
                        type="checkbox"
                        name="f"
                        value={facility.id}
                        checked={filters.facilities.includes(facility.id)}
                        onChange={() => toggleFacility(facility.id)}
                        className={checkboxClasses}
                      />
                      {facility.name}
                    </label>
                  ))}
                </div>
                <p className={hintClasses}>Kamar harus memiliki semua fasilitas yang dipilih.</p>
              </fieldset>
            ) : null}

            <div>
              <label htmlFor="sort" className={labelClasses}>
                Urutkan
              </label>
              <select
                id="sort"
                name="sort"
                value={filters.sort}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    sort: parseSort(event.target.value),
                  }))
                }
                className={selectClasses}
              >
                <option value="default">Default</option>
                <option value="price-asc">Harga terendah</option>
                <option value="price-desc">Harga tertinggi</option>
              </select>
            </div>

            <div className="space-y-2 pt-1">
              <p className={hintClasses}>
                Hasil menyesuaikan langsung saat filter diubah; tautan halaman ikut
                diperbarui.
              </p>
              {hasFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className={buttonClasses("outline", "sm", "w-full")}
                >
                  Reset filter
                </button>
              ) : null}
            </div>
          </form>
        </aside>

        <section aria-label="Hasil pencarian kamar">
          <h2 className="sr-only">Hasil pencarian kamar</h2>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5">
            <p className="text-[13px] text-ink-600" aria-live="polite">
              Menampilkan{" "}
              <span className="font-mono text-ink-900">{results.length}</span> dari{" "}
              <span className="font-mono text-ink-900">{rooms.length}</span> tipe kamar
            </p>
            {q ? (
              <p className="text-[12px] text-ink-600">
                Kata kunci: <span className="text-ink-900">&ldquo;{q}&rdquo;</span>
              </p>
            ) : null}
          </div>

          {results.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
              {results.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  whatsappHref={buildWhatsAppUrl(
                    whatsappNumber,
                    roomWhatsAppMessage(room.name, context),
                  )}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 border border-line bg-card px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center border border-brass-500/50 text-brass-700">
                <SearchX className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-[1.8rem]">Tidak ada kamar yang cocok</h2>
                <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-ink-600">
                  Coba longgarkan filter harga atau kurangi fasilitas yang dipilih. Anda juga
                  dapat menanyakan ketersediaan langsung kepada pengelola.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  type="button"
                  onClick={resetFilters}
                  className={buttonClasses("outline", "sm")}
                >
                  Reset filter
                </button>
                <WhatsAppButton
                  href={generalHref}
                  label="Tanya pengelola"
                  size="sm"
                  variant="primary"
                />
              </div>
            </div>
          )}

          <p className="mt-8 text-[11.5px] leading-relaxed text-ink-500">
            Daftar ini menampilkan tipe kamar, bukan ketersediaan unit. Ketersediaan dan
            rincian biaya perlu dikonfirmasi langsung kepada pengelola.
          </p>
        </section>
      </div>

      <ActionBar
        title="Belum menemukan kamar yang pas?"
        description="Tanyakan ketersediaan dan rekomendasi tipe kamar langsung kepada pengelola."
        whatsappHref={generalHref}
      />
    </>
  );
}
