"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Check,
  ChevronRight,
  AlertCircle,
  Phone,
  Mail,
  User,
} from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}
const MAX_SIZE = 4 * 1024 * 1024;
const MAX_IMAGES = 10;
const CarInformation = ({ currentStep, setCurrentStep }: Props) => {
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    km: "",
    color: "",
    engineSize: "",
    horsePower: "",

    price: "",
    city: "",
    district: "",

    title: "",
    description: "",

    name: "",
    phone: "",
    email: "",
  });
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files) as File[];

    if (images.length + newFiles.length > MAX_IMAGES) {
      return toast.error(`En fazla ${MAX_IMAGES} resim yükleyebilirsiniz.`);
    }

    const validNewFiles: File[] = [];
    const newPreviewUrls: string[] = [];

    newFiles.forEach((file) => {
      if (file.size > MAX_SIZE) {
        toast.error("4MB'dan büyük resimler yükleyemezsiniz.");
        return;
      }

      validNewFiles.push(file);
      newPreviewUrls.push(URL.createObjectURL(file));
    });

    setImages((prev) => [...prev, ...validNewFiles]);
    setPreviewImages((oldPreviews) => [...oldPreviews, ...newPreviewUrls]);

    if (e.target) {
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);

    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviewImages((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("brand", "BMW");
    formData.append("model", "320i");
    formData.append("fuel", "Elektrik");
    formData.append("transmission", "Manuel");
    formData.append("color", "beyaz");
    formData.append("engineSize", "1998");
    formData.append("title", "BMW 320i sport paket");
    formData.append("description", "Aracım temizdir...");
    formData.append("city", "izmir");
    formData.append("district", "besiktas");
    formData.append("km", "4500");
    formData.append("price", "1850000");
    formData.append("horsePower", "184");
    formData.append("year", "2007");

    // images: File[]
    for (const image of images) {
      formData.append("images", image);
    }

    // fetch ile gönder
    const res = await fetch("/api/cars", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("API hatası:", err);
      setLoading(false);
    } else {
      console.log("İlan başarıyla gönderildi");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        {/* Step 1: Araç Bilgileri */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Araç Bilgileri
              </h2>
              <p className="text-slate-600">
                Aracınızın temel özelliklerini girin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Marka <span className="text-red-500">*</span>
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Marka Seçin</option>
                  <option value="bmw">BMW</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                  <option value="volkswagen">Volkswagen</option>
                  <option value="ford">Ford</option>
                  <option value="toyota">Toyota</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Örn: 320i"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Yıl <span className="text-red-500">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Yıl Seçin</option>
                  {Array.from({ length: 30 }, (_, i) => 2024 - i).map(
                    (year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Yakıt Tipi <span className="text-red-500">*</span>
                </label>
                <select
                  name="fuel"
                  value={formData.fuel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Yakıt Tipi Seçin</option>
                  <option value="benzin">Gaz</option>
                  <option value="dizel">Dizel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="elektrik">Elektrik</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vites <span className="text-red-500">*</span>
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Vites Tipi Seçin</option>
                  <option value="manuel">Manuel</option>
                  <option value="otomatik">Otomatik</option>
                  <option value="yariototomatik">Yarı Otomatik</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kilometre <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="km"
                  value={formData.km}
                  onChange={handleInputChange}
                  placeholder="Örn: 45000"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Renk
                </label>
                <select
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Renk Seçin</option>
                  <option value="beyaz">Beyaz</option>
                  <option value="siyah">Siyah</option>
                  <option value="gri">Gri</option>
                  <option value="mavi">Mavi</option>
                  <option value="kirmizi">Kırmızı</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Motor Hacmi (cc)
                </label>
                <input
                  type="number"
                  name="engineSize"
                  value={formData.engineSize}
                  onChange={handleInputChange}
                  placeholder="Örn: 1998"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Beygir Gücü (HP)
                </label>
                <input
                  type="number"
                  name="horsePower"
                  value={formData.horsePower}
                  onChange={handleInputChange}
                  placeholder="Örn: 184"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                Daha detaylı bilgi girdiğiniz takdirde ilanınız daha fazla
                görüntülenecektir.
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Fotoğraflar */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Fotoğraflar
              </h2>
              <p className="text-slate-600">
                Aracınızın fotoğraflarını yükleyin (En fazla 10 adet)
              </p>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-500 transition">
              <input
                type="file"
                id="image-upload"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <p className="text-lg font-medium text-slate-700 mb-2">
                  Fotoğraf Yükle
                </p>
                <p className="text-sm text-slate-500">
                  veya sürükleyip bırakın (PNG, JPG - Max 5MB)
                </p>
              </label>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={image}
                      alt={`Preview ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-32 object-cover rounded-lg border border-slate-200"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Kapak
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">İpucu:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>İlk fotoğraf kapak fotoğrafı olacaktır</li>
                  <li>Aracı farklı açılardan çekin</li>
                  <li>Gün ışığında net fotoğraflar çekin</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Fiyat & Konum */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Fiyat ve Konum
              </h2>
              <p className="text-slate-600">Fiyat ve konum bilgilerini girin</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Fiyat (TL) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Örn: 1850000"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  İl <span className="text-red-500">*</span>
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">İl Seçin</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="ankara">Ankara</option>
                  <option value="izmir">İzmir</option>
                  <option value="bursa">Bursa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  İlçe <span className="text-red-500">*</span>
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">İlçe Seçin</option>
                  <option value="kadikoy">Kadıköy</option>
                  <option value="besiktas">Beşiktaş</option>
                  <option value="sisli">Şişli</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                İlan Başlığı <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Örn: BMW 320i M Sport Paket"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Açıklama
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                placeholder="Aracınız hakkında detaylı bilgi verin..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
              <p className="text-xs text-slate-500 mt-2">
                Minimum 50 karakter önerilir
              </p>
            </div>
          </div>
        )}

        {/* Step 4: İletişim */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                İletişim Bilgileri
              </h2>
              <p className="text-slate-600">İletişim bilgilerinizi girin</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Ad Soyad <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Adınızı ve soyadınızı girin"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Telefon <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0555 555 55 55"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  E-posta
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ornek@email.com"
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-blue-600" />
                İlan Özeti
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Araç:</span>
                  <span className="font-medium text-slate-800">
                    {formData.brand || "-"} {formData.model || "-"} (
                    {formData.year || "-"})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Fiyat:</span>
                  <span className="font-bold text-blue-600">
                    {formData.price
                      ? `${parseInt(formData.price).toLocaleString("tr-TR")} ₺`
                      : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Konum:</span>
                  <span className="font-medium text-slate-800">
                    {formData.district || "-"}, {formData.city || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Fotoğraf:</span>
                  <span className="font-medium text-slate-800">
                    {images.length} adet
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
              <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">Bilgileriniz Güvende</p>
                <p>
                  İletişim bilgileriniz sadece ilgili kişilerle paylaşılacaktır.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition"
            >
              ← Geri
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 transition font-medium flex items-center gap-2"
            >
              Devam Et <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              disabled={loading}
              className={`px-8 py-3  text-white rounded-lg   transition font-medium flex items-center gap-2 ${
                loading
                  ? "cursor-not-allowed bg-gray-200"
                  : "bg-linear-to-r from-green-600 to-green-700 hover:shadow-lg hover:scale-105"
              }`}
            >
              <Check className="w-5 h-5" />
              {loading ? "Yayınlanıyor..." : "İlanı Yayınla"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default CarInformation;
