// components/steps/Step1BasicInfo.tsx
"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { AlertCircle, ChevronRight } from "lucide-react";
import { BRANDS, FUEL_TYPES, TRANSMISSION_TYPES, COLORS, generateYears } from "@/constants/carListing.constants";
import { StepProps } from "@/types/index";
import { CarListingInput } from "@/schemas/car.schema";

export const Step1BasicInfo: React.FC<StepProps> = ({ onNext, isFirstStep }) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<CarListingInput>();

  const handleNext = async () => {
    const isValid = await trigger([
      "brand",
      "model",
      "year",
      "fuel",
      "transmission",
      "km",
    ]);
    if (isValid) onNext();
  };

  return (
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
            {...register("brand")}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Marka Seçin</option>
            {BRANDS.map((brand) => (
              <option key={brand.value} value={brand.value}>
                {brand.label}
              </option>
            ))}
          </select>
          {errors.brand && (
            <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Model <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("model")}
            placeholder="Örn: 320i"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.model && (
            <p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Yıl <span className="text-red-500">*</span>
          </label>
          <select
            {...register("year")}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Yıl Seçin</option>
            {generateYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Yakıt Tipi <span className="text-red-500">*</span>
          </label>
          <select
            {...register("fuel")}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Yakıt Tipi Seçin</option>
            {FUEL_TYPES.map((fuel) => (
              <option key={fuel.value} value={fuel.value}>
                {fuel.label}
              </option>
            ))}
          </select>
          {errors.fuel && (
            <p className="text-red-500 text-sm mt-1">{errors.fuel.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Vites <span className="text-red-500">*</span>
          </label>
          <select
            {...register("transmission")}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Vites Tipi Seçin</option>
            {TRANSMISSION_TYPES.map((transmission) => (
              <option key={transmission.value} value={transmission.value}>
                {transmission.label}
              </option>
            ))}
          </select>
          {errors.transmission && (
            <p className="text-red-500 text-sm mt-1">
              {errors.transmission.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Kilometre <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("km")}
            placeholder="Örn: 45000"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          {errors.km && (
            <p className="text-red-500 text-sm mt-1">{errors.km.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Renk
          </label>
          <select
            {...register("color")}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Renk Seçin</option>
            {COLORS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Motor Hacmi (cc)
          </label>
          <input
            type="number"
            {...register("engineSize")}
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
            {...register("horsePower")}
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

      <div className="flex items-center justify-end mt-8 pt-6 border-t border-slate-200">
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