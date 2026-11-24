import {
  BedDouble,
  Bike,
  BookOpen,
  Car,
  Cctv,
  Check,
  CookingPot,
  DoorClosed,
  Home,
  Leaf,
  MapPin,
  MessageCircle,
  Plug,
  Refrigerator,
  ShieldCheck,
  Shirt,
  ShowerHead,
  Snowflake,
  Sofa,
  Sparkles,
  TreePine,
  Tv,
  Utensils,
  WashingMachine,
  Wifi,
  type LucideIcon,
} from "lucide-react";

/**
 * Peta ikon yang boleh dipakai konten CMS.
 * Nama ikon disimpan sebagai teks di database, sehingga tidak ada import dinamis.
 */
const iconMap: Record<string, LucideIcon> = {
  wifi: Wifi,
  bed: BedDouble,
  snowflake: Snowflake,
  "book-open": BookOpen,
  shower: ShowerHead,
  "cooking-pot": CookingPot,
  "washing-machine": WashingMachine,
  bike: Bike,
  car: Car,
  cctv: Cctv,
  plug: Plug,
  sofa: Sofa,
  "tree-pine": TreePine,
  utensils: Utensils,
  shirt: Shirt,
  check: Check,
  "map-pin": MapPin,
  leaf: Leaf,
  home: Home,
  "message-circle": MessageCircle,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  tv: Tv,
  refrigerator: Refrigerator,
  wardrobe: DoorClosed,
};

export function ContentIcon({
  name,
  className = "h-5 w-5",
  strokeWidth = 1.6,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Component = iconMap[name] ?? Check;
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}
