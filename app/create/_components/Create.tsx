"use client";

import React, { useState } from "react";
import { Car, Check, ImageIcon, MapPin, User } from "lucide-react";
import CarInformation from "./CarInformation";

const steps = [
  { id: 1, name: "Araç Bilgileri", icon: Car },
  { id: 2, name: "Fotoğraflar", icon: ImageIcon },
  { id: 3, name: "Fiyat & Konum", icon: MapPin },
  { id: 4, name: "İletişim", icon: User },
];
export default function CreateListingPage() {
  const [currentStep, setCurrentStep] = useState(1);


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      currentStep === step.id
                        ? "bg-linear-to-br from-blue-600 to-blue-700 text-white shadow-lg scale-110"
                        : currentStep > step.id
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium hidden md:block ${
                      currentStep === step.id
                        ? "text-blue-600"
                        : "text-slate-500"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      currentStep > step.id ? "bg-green-500" : "bg-slate-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <CarInformation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
      </div>
    </div>
  );
}
