import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      select: {
        brand: true,
        model: true,
        year: true,
      },
    });

    const brands = [...new Set(cars.map((car) => car.brand))].sort();

    const modelsByBrand: Record<string, string[]> = {};
    brands.forEach((brand) => {
      const models = [
        ...new Set(
          cars.filter((car) => car.brand === brand).map((car) => car.model)
        ),
      ].sort();
      modelsByBrand[brand] = models;
    });

    const years = [...new Set(cars.map((car) => car.year))].sort(
      (a, b) => b - a
    );

    return NextResponse.json({
      brands,
      modelsByBrand,
      years,
    });
  } catch (error) {
    console.error("Filter fetch error:", error);
    return NextResponse.json(
      { error: "Filtreler yüklenemedi" },
      { status: 500 }
    );
  }
}
