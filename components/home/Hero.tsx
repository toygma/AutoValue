"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { stats } from "./_components/data";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { FilterData } from "@/types";



const Hero = () => {
  // filter state
  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [filters, setFilters] = useState<FilterData>({
    brands: [],
    modelsByBrand: {},
    years: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axiosInstance.get("/api/filters");
        setFilters(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const onSearch = async () => {
    const params = new URLSearchParams();
    if (brand) params.set("brand", brand);
    if (model) params.set("model", model);
    if (year) params.set("year", year);

    router.push(`/cars?${params.toString()}`);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
          Hayalinizdeki Aracı
          <span className="block bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Güvenle Bulun
          </span>
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          Binlerce araç ilanı arasından size en uygun olanı bulun. Gerçek
          kullanıcı değerlendirmeleriyle doğru kararı verin.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value);
                setModel("");
              }}
              disabled={isLoading}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-50"
            >
              <option value="">Marka Seçin</option>
              {filters.brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              disabled={!brand || isLoading}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-50"
            >
              <option value="">Model Seçin</option>
              {brand &&
                (filters.modelsByBrand[brand] || []).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={isLoading}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:opacity-50"
            >
              <option value="">Yıl</option>
              {filters.years.map((y) => (
                <option key={y} value={y.toString()}>
                  {y}
                </option>
              ))}
            </select>

            <button
              onClick={onSearch}
              className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 transition font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Search className="w-5 h-5" />
              Ara
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 text-center shadow-lg border border-slate-200 hover:shadow-xl transition"
          >
            <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <div className="text-3xl font-bold text-slate-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
