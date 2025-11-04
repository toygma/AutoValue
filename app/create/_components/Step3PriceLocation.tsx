// components/steps/Step3PriceLocation.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import { CITIES, DISTRICTS } from "@/constants/carListing.constants";
import { CarListingInput } from "@/schemas/car.schema";
import { StepProps } from "@/types";

export const Step3PriceLocation: React.FC<StepProps> = ({ onNext, onBack }) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<CarListingInput>();

  const selectedCity = watch("city");
  const districts = selectedCity ? DISTRICTS[selectedCity] || [] : [];

  const handleNext = async () => {
    const isValid = await trigger([
      "price",
      "city",
      "district",
      "title",
      "description",
    ]);
    if (isValid) onNext();
  };

  return (
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
          {...register("price")}
          placeholder="Örn: 1850000"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg font-semibold"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            İl <span className="text-red-500">*</span>
          </label>
          <select
            {...register("city")}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">İl Seçin</option>
            {CITIES.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            İlçe <span className="text-red-500">*</span>
          </label>
          <select
            {...register("district")}
            disabled={!selectedCity}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-100 disabled:cursor-not-allowed"
          >
            <option value="">İlçe Seçin</option>
            {districts.map((district) => (
              <option key={district.value} value={district.value}>
                {district.label}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">
              {errors.district.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          İlan Başlığı <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("title")}
          placeholder="Örn: BMW 320i M Sport Paket"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Açıklama <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register("description")}
          rows={6}
          placeholder="Aracınız hakkında detaylı bilgi verin..."
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
        <p className="text-xs text-slate-500 mt-2">
          Minimum 50 karakter önerilir
        </p>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition"
        >
          ← Geri
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 transition font-medium flex items-center gap-2"
        >
          Devam Et <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};