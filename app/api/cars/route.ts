import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { upload_file } from "@/lib/cloudinary";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const brand = searchParams.get("brand") || undefined;
    const model = searchParams.get("model") || undefined;
    const yearStr = searchParams.get("year");
    const year = yearStr ? Number(yearStr) : undefined;

    const filters: any = {};

    if (brand) filters.brand = { contains: brand, mode: "insensitive" };
    if (model) filters.model = { contains: model, mode: "insensitive" };
    if (year) filters.year = year;

    const cars = await prisma.car.findMany({
      where: filters,
      include: {
        user: true,
        reviews: {
          include: { user: true ,},
        },
      },
    });

    const carWithRating = cars.map((car) => {
      const totalReviews = car.reviews.length;
      const averageRating =
        totalReviews > 0
          ? car.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          : 0;

      return {
        ...car,
        averageRating,
      };
    });

    return NextResponse.json(carWithRating, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    if (!formData) {
      return NextResponse.json({ error: "Missing form data" }, { status: 400 });
    }

    const body: { [key: string | number]: any } = {};
    const imageFiles: File[] = [];

    for (const [key, value] of formData.entries()) {
      if (key === "images") {
        if (value instanceof File) {
          imageFiles.push(value);
        }
      } else {
        body[key] = value as string;
      }
    }

    const uploadPromises = imageFiles.map((image: any) =>
      upload_file(image, "autoValue/cars")
    );
    const uploadedResults = await Promise.all(uploadPromises);

    const imageUrls: string[] = uploadedResults.map((result) => result.url);

    const dataToCreate = {
      brand: body.brand,
      model: body.model,
      fuel: body.fuel,
      transmission: body.transmission,
      color: body.color,
      engineSize: body.engineSize,
      title: body.title,
      description: body.description,
      city: body.city,
      district: body.district,

      images: imageUrls,

      km: parseInt(body.km as string, 10),
      price: parseFloat(body.price as string),
      horsePower: parseInt(body.horsePower as string, 10),
      year: parseInt(body.year as string, 10),

      userId: session.user.id,
    };

    const car = await prisma.car.create({
      data: dataToCreate,
      include: { user: true },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("İlan oluşturma hatası:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
