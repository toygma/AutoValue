"use client";

import React, { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { Upload, X, AlertCircle, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { MAX_IMAGE_SIZE, MAX_IMAGES } from "@/constants/carListing.constants";
import { StepProps } from "@/types/index";
import { CarListingInput } from "@/schemas/car.schema";

export const Step2Images: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { setValue, watch, trigger, formState: { errors } } = useFormContext<CarListingInput>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  
  const images = watch("images") || [];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    if (images.length + newFiles.length > MAX_IMAGES) {
      toast.error(`En fazla ${MAX_IMAGES} resim yükleyebilirsiniz.`);
      return;
    }

    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    for (const file of newFiles) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name} 4MB'dan büyük olamaz.`);
        continue;
      }

      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    const updatedImages = [...images, ...validFiles];
    setValue("images", updatedImages, { shouldValidate: true });
    setPreviewImages((prev) => [...prev, ...newPreviews]);

    if (e.target) {
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(previewImages[index]);

    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);

    setValue("images", updatedImages, { shouldValidate: true });
    setPreviewImages(updatedPreviews);
  };

  const handleNext = async () => {
    const isValid = await trigger("images");
    if (isValid) onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Fotoğraflar</h2>
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
            veya sürükleyip bırakın (PNG, JPG - Max 4MB)
          </p>
        </label>
      </div>

      {errors.images && (
        <p className="text-red-500 text-sm">{errors.images.message}</p>
      )}

      {previewImages.length > 0 && (
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
                type="button"
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