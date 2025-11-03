"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { carListingSchema, CarListingInput } from "@/schemas/car.schema";
import { Step1BasicInfo } from "./step1BasicInfo";
import { Step2Images } from "./step2Images";
import { Step3PriceLocation } from "./step3PriceLocation";
import { Step4Contact } from "./step4Contact";

const STEPS = [
  { id: 1, title: "Araç Bilgileri" },
  { id: 2, title: "Fotoğraflar" },
  { id: 3, title: "Fiyat & Konum" },
  { id: 4, title: "İletişim" },
];

export const CarListingForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<CarListingInput>({
    resolver: zodResolver(carListingSchema),
    mode: "onChange",
    defaultValues: {
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
      images: [],
    },
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: CarListingInput) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Temel bilgiler
      formData.append("brand", data.brand);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("fuel", data.fuel);
      formData.append("transmission", data.transmission);
      formData.append("km", data.km);
      formData.append("price", data.price);
      formData.append("city", data.city);
      formData.append("district", data.district);
      formData.append("title", data.title);

      if (data.color) formData.append("color", data.color);
      if (data.engineSize) formData.append("engineSize", data.engineSize);
      if (data.horsePower) formData.append("horsePower", data.horsePower);
      if (data.description) formData.append("description", data.description);
      if (data.email) formData.append("email", data.email);

      formData.append("name", data.name);
      formData.append("phone", data.phone);

      data.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch("/api/cars", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "İlan oluşturulurken bir hata oluştu");
      }

      toast.success("İlan başarıyla yayınlandı!");
      methods.reset();
      setCurrentStep(1);
    } catch (error) {
      console.error("Form gönderim hatası:", error);
      toast.error(
        error instanceof Error ? error.message : "Bir hata oluştu"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = () => {
    methods.handleSubmit(onSubmit)();
  };

  const renderStep = () => {
    const stepProps = {
      onNext: handleNext,
      onBack: handleBack,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === STEPS.length,
    };

    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...stepProps} />;
      case 2:
        return <Step2Images {...stepProps} />;
      case 3:
        return <Step3PriceLocation {...stepProps} />;
      case 4:
        return (
          <Step4Contact
            {...stepProps}
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                      currentStep >= step.id
                        ? "bg-blue-600 text-white"
                        : "bg-slate-300 text-slate-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  <p
                    className={`text-xs mt-2 font-medium ${
                      currentStep >= step.id
                        ? "text-blue-600"
                        : "text-slate-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition ${
                      currentStep > step.id ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <FormProvider {...methods}>{renderStep()}</FormProvider>
        </div>
      </div>
    </div>
  );
};