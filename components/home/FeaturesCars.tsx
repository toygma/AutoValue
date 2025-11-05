"use client";

import Image from "next/image";
import { Calendar, ChevronRight, Fuel, Gauge, Star } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Car } from "@/lib/generated/prisma/client";
import { formatPrice } from "@/utils/helper";
import Skeleton from "../ui/skeleton";
import Link from "next/link";

interface CarWithReviews extends Car {
  reviews: {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    carId: string;
  }[];
  averageRating: number;
}

interface Categories {
  brands: string[];
}

const FeaturesCars = ({ categories }: { categories: Categories }) => {
  const [cars, setCars] = useState<CarWithReviews[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCars = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/api/cars`);

      if (res.status !== 200) throw new Error(res.data?.error || "Hata oluştu");

      const data = res.data;

      const filter = categories.brands.length > 0
        ? (data as CarWithReviews[]).filter((item) =>
            categories.brands.some(
              (brand) => brand.toLowerCase() === item.brand.toLowerCase()
            )
          )
        : data;
      
      setCars(filter);
    } catch (err: unknown) {
      console.error("Araç yükleme hatası:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [categories]); 

  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-bold text-slate-800">Öne Çıkan İlanlar</h3>
        <button className="flex items-center gap-2 text-blue-600 font-medium hover:gap-3 transition-all">
          Tümünü Gör <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-sm">
                    {car?.averageRating || "0.0"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">
                      {car.brand} {car.model}
                    </h4>
                    <p className="text-slate-600">{car?.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatPrice(car.price)}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Fuel className="w-4 h-4" />
                    {car.fuel}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Gauge className="w-4 h-4" />
                    {car.km} km
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    {car.transmission}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {car?.reviews?.length || 0} değerlendirme
                  </div>
                  <Link
                    href={`/cars/${car.id}`}
                    className="text-blue-600 font-medium hover:gap-2 transition-all flex items-center gap-1"
                  >
                    Detay <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 text-lg">Bu kategoride araç bulunamadı.</p>
        </div>
      )}
    </section>
  );
};

export default FeaturesCars;