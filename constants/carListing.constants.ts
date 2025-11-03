
export const MAX_IMAGE_SIZE = 4 * 1024 * 1024;
export const MAX_IMAGES = 10;

export const BRANDS = [
  { value: "bmw", label: "BMW" },
  { value: "mercedes", label: "Mercedes" },
  { value: "audi", label: "Audi" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "ford", label: "Ford" },
  { value: "toyota", label: "Toyota" },
] as const;

export const FUEL_TYPES = [
  { value: "Gaz", label: "Gaz" },
  { value: "Dizel", label: "Dizel" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Elektrik", label: "Elektrik" },
] as const;

export const TRANSMISSION_TYPES = [
  { value: "Manuel", label: "Manuel" },
  { value: "Otomatik", label: "Otomatik" },
] as const;

export const COLORS = [
  { value: "beyaz", label: "Beyaz" },
  { value: "siyah", label: "Siyah" },
  { value: "gri", label: "Gri" },
  { value: "mavi", label: "Mavi" },
  { value: "kirmizi", label: "Kırmızı" },
] as const;

export const CITIES = [
  { value: "istanbul", label: "İstanbul" },
  { value: "ankara", label: "Ankara" },
  { value: "izmir", label: "İzmir" },
  { value: "bursa", label: "Bursa" },
] as const;

export const DISTRICTS: Record<string, { value: string; label: string }[]> = {
  istanbul: [
    { value: "kadikoy", label: "Kadıköy" },
    { value: "besiktas", label: "Beşiktaş" },
    { value: "sisli", label: "Şişli" },
  ],
  ankara: [
    { value: "cankaya", label: "Çankaya" },
    { value: "kecioren", label: "Keçiören" },
  ],
  izmir: [
    { value: "bornova", label: "Bornova" },
    { value: "konak", label: "Konak" },
  ],
  bursa: [
    { value: "osmangazi", label: "Osmangazi" },
    { value: "nilufer", label: "Nilüfer" },
  ],
};

export const generateYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 30 }, (_, i) => currentYear - i);
};