"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Car } from "@/lib/generated/prisma/client";
import toast from "react-hot-toast";
import {
  Fuel,
  Gauge,
  Calendar,
  MapPin,
  Settings,
  ChevronRight,
  Search,
  TrendingUp,
  Award,
  Zap,
  Eye,
} from "lucide-react";
import Image from "next/image";
import { formatPrice } from "@/utils/helper";
import Skeleton from "@/components/ui/skeleton";
const CarsPage = () => {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const brand = searchParams.get("brand");
  const model = searchParams.get("model");
  const year = searchParams.get("year");


  const fetchCars = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams(searchParams.toString());
      const res = await axiosInstance.get(`/api/cars?${params.toString()}`);

      if (res.status !== 200) throw new Error(res.data?.error || "Hata oluştu");
      setCars(res.data);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  
  const getSearchTitle = () => {
    const parts = [];
    if (brand) parts.push(brand.toUpperCase());
    if (model) parts.push(model);
    if (year) parts.push(year);
    return parts.length > 0 ? parts.join(" ") : "Tüm Araçlar";
  };

  useEffect(() => {
    fetchCars();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-blue-100 mb-4">
              <Search className="w-5 h-5" />
              <span className="text-sm font-medium">Arama Sonuçları</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {getSearchTitle()}
            </h1>
            <p className="text-xl text-blue-100">
              {loading
                ? "Araçlar yükleniyor..."
                : `${cars.length} araç bulundu`}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Toplam İlan</p>
                <p className="text-xl font-bold text-slate-800">{cars.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Doğrulanmış</p>
                <p className="text-xl font-bold text-slate-800">{cars.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Yeni İlanlar</p>
                <p className="text-xl font-bold text-slate-800">
                  {cars.filter(c => {
                    const daysDiff = Math.floor((Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24));
                    return daysDiff <= 7;
                  }).length}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Popüler</p>
                <p className="text-xl font-bold text-slate-800">
                  {Math.floor(cars.length * 0.3)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i}/>
            ))}
          </div>
        ) : cars.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-lg">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Araç Bulunamadı
              </h3>
              <p className="text-slate-600 mb-8 text-lg">
                <span className="font-semibold">{getSearchTitle()}</span> için
                araç bulunamadı.
                <br />
                Farklı kriterler ile tekrar arama yapabilirsiniz.
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-8 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg hover:scale-105 transition font-medium inline-flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Yeni Arama Yap
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                onClick={() => router.push(`/cars/${car.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-56 bg-linear-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {car.images && car.images.length > 0 ? (
                    <Image
                      src={car.images[0]}
                      alt={car.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <Search className="w-16 h-16" />
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {Math.floor((Date.now() - new Date(car.createdAt).getTime()) / (1000 * 60 * 60 * 24)) <= 7 && (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        YENİ
                      </span>
                    )}
                    {car.images && car.images.length > 1 && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        {car.images.length} Fotoğraf
                      </span>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                    <p className="text-xs text-slate-500 font-medium">Fiyat</p>
                    <p className="text-lg font-bold text-blue-600">
                      {formatPrice(car.price)}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition min-h-14">
                    {car.title}
                  </h3>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-2">
                      <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-medium">{car.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-2">
                      <Gauge className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="font-medium">{car.km.toLocaleString()} km</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-2">
                      <Fuel className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="capitalize font-medium truncate">{car.fuel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-2">
                      <Settings className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="capitalize font-medium truncate">{car.transmission}</span>
                    </div>
                  </div>

                  {/* Location & CTA */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span className="capitalize truncate">
                        {car.district}, {car.city}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsPage;
