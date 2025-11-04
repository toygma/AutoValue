"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Check, Phone, Mail, User } from "lucide-react";
import { CarListingInput } from "@/schemas/car.schema";
import { StepProps } from "@/types";
import { useSession } from "next-auth/react";

interface Step4ContactProps extends StepProps {
  onSubmit: () => void;
  isLoading: boolean;
}

export const Step4Contact: React.FC<Step4ContactProps> = ({
  onBack,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<CarListingInput>();
  const { data: session } = useSession();
  const formData = watch();

  const handleSubmit = async () => {
    const isValid = await trigger(["name", "phone", "email"]);
    if (isValid) {
      onSubmit();
    }
  };

  const formatPrice = (price: string) => {
    if (!price) return "-";
    return `${parseInt(price).toLocaleString("tr-TR")} ₺`;
  };

  return (
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
              {...register("name")}
              placeholder="Adınızı ve soyadınızı girin"
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Telefon <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="tel"
              {...register("phone")}
              placeholder="0555 555 55 55"
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            E-posta
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              readOnly
              value={session?.user?.email || ""}
              placeholder="ornek@email.com"
              className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
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
              {formatPrice(formData.price)}
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
              {formData.images?.length || 0} adet
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
        <div className="text-sm text-green-800">
          <p className="font-medium mb-1">Bilgileriniz Güvende</p>
          <p>İletişim bilgileriniz sadece ilgili kişilerle paylaşılacaktır.</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Geri
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isLoading}
          className={`px-8 py-3 text-white rounded-lg transition font-medium flex items-center gap-2 ${
            isLoading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-linear-to-r from-green-600 to-green-700 hover:shadow-lg hover:scale-105"
          }`}
        >
          <Check className="w-5 h-5" />
          {isLoading ? "Yayınlanıyor..." : "İlanı Yayınla"}
        </button>
      </div>
    </div>
  );
};
