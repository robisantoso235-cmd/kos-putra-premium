/**
 * Utilitas WhatsApp.
 * Nomor diambil dari konfigurasi CMS (site_settings.whatsapp_number).
 */

export function normalizeWhatsAppNumber(input: string | null | undefined): string | null {
  if (!input) return null;

  const digits = input.replace(/\D/g, "");
  if (!digits) return null;

  let normalized = digits;
  if (normalized.startsWith("0")) {
    normalized = `62${normalized.slice(1)}`;
  } else if (normalized.startsWith("8")) {
    normalized = `62${normalized}`;
  }

  if (!/^62\d{8,14}$/.test(normalized)) return null;
  return normalized;
}

export function buildWhatsAppUrl(
  number: string | null | undefined,
  message: string,
): string | null {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return null;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export interface WhatsAppContext {
  siteName: string;
  baseMessage?: string | null;
}

export function generalWhatsAppMessage({ siteName, baseMessage }: WhatsAppContext): string {
  if (baseMessage?.trim()) return baseMessage.trim();
  return `Halo, saya ingin bertanya mengenai ${siteName}.`;
}

export function roomWhatsAppMessage(roomName: string, { siteName, baseMessage }: WhatsAppContext): string {
  const intro = baseMessage?.trim();
  const context = `Halo, saya ingin bertanya mengenai tipe kamar ${roomName} di ${siteName}. Apakah saya bisa mendapatkan informasi lebih lanjut?`;
  return intro ? `${intro}\n\n${context}` : context;
}
