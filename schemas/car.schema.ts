import { z } from "zod";

export const carBasicInfoSchema = z.object({
  brand: z.string().min(1, "Marka seçimi zorunludur"),
  model: z.string().min(1, "Model girişi zorunludur"),
  year: z.string().min(1, "Yıl seçimi zorunludur"),
  fuel: z.string().min(1, "Yakıt tipi seçimi zorunludur"),
  transmission: z.string().min(1, "Vites tipi seçimi zorunludur"),
  km: z.string()
    .min(1, "Kilometre girişi zorunludur")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Geçerli bir kilometre değeri girin",
    }),
  color: z.string().optional(),
  engineSize: z.string().optional(),
  horsePower: z.string().optional(),
});

export const carImagesSchema = z.object({
  images: z.array(z.instanceof(File))
    .min(1, "En az 1 fotoğraf yüklemelisiniz")
    .max(10, "En fazla 10 fotoğraf yükleyebilirsiniz"),
});

export const carPriceLocationSchema = z.object({
  price: z.string()
    .min(1, "Fiyat girişi zorunludur")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Geçerli bir fiyat girin",
    }),
  city: z.string().min(1, "İl seçimi zorunludur"),
  district: z.string().min(1, "İlçe seçimi zorunludur"),
  title: z.string()
    .min(10, "İlan başlığı en az 10 karakter olmalıdır")
    .max(100, "İlan başlığı en fazla 100 karakter olabilir"),
  description: z.string()
    .min(50, "Açıklama en az 50 karakter olmalıdır")
    .optional()
    .or(z.literal("")),
});

// Step 4: İletişim
export const carContactSchema = z.object({
  name: z.string()
    .min(3, "Ad soyad en az 3 karakter olmalıdır")
    .max(50, "Ad soyad en fazla 50 karakter olabilir"),
  phone: z.string()
    .min(10, "Telefon numarası en az 10 karakter olmalıdır")
    .regex(/^[0-9\s\-\(\)]+$/, "Geçerli bir telefon numarası girin"),
  email: z.string()
    .email("Geçerli bir e-posta adresi girin")
    .optional()
    .or(z.literal("")),
});

// Tüm form şeması
export const carListingSchema = carBasicInfoSchema
  .merge(carImagesSchema)
  .merge(carPriceLocationSchema)
  .merge(carContactSchema);

export type CarBasicInfoInput = z.infer<typeof carBasicInfoSchema>;
export type CarImagesInput = z.infer<typeof carImagesSchema>;
export type CarPriceLocationInput = z.infer<typeof carPriceLocationSchema>;
export type CarContactInput = z.infer<typeof carContactSchema>;
export type CarListingInput = z.infer<typeof carListingSchema>;