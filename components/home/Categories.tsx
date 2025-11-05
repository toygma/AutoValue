"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import FeaturesCars from "./FeaturesCars";

interface Categories {
  brands: string[];
}

const Categories = () => {
  const [categories, setCategories] = useState<Categories | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | number>("all");

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axiosInstance.get("/api/filters");
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilters();
  }, []);

  const getSelectedBrands = () => {
    if (!categories?.brands) return { brands: [] };
    
    if (selectedCategoryId === "all") {
      return { brands: categories.brands };
    }
    
    return { brands: [categories.brands[selectedCategoryId as number]] };
  };

  return (
    <section className="container mx-auto px-4 mb-16">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategoryId("all")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
            selectedCategoryId === "all"
              ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg"
              : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
          }`}
        >
          Hepsi
        </button>

        {categories?.brands?.map((cat: string, index: number) => (
          <button
            key={index}
            onClick={() => setSelectedCategoryId(index)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              selectedCategoryId === index
                ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>
      
      {categories && <FeaturesCars categories={getSelectedBrands()} />}
    </section>
  );
};

export default Categories;