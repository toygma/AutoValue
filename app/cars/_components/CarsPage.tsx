"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { Car } from "@/lib/generated/prisma/client";
import toast from "react-hot-toast";

const CarsPage = () => {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  console.log("🚀 ~ CarsPage ~ cars:", cars)

  useEffect(() => {
    fetchCars();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-16">
     
    </div>
  );
};

export default CarsPage;
