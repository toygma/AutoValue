import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { delete_file, upload_file } from "@/lib/cloudinary";

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
          include: { user: true },
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
  const uploadedImagePaths: { public_id: string; url: string }[] = [];

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı!" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Kullanıcı bulunamadı" },
        { status: 401 }
      );
    }

    const formData = await req.formData();

    const brand = formData.get("brand") as string;
    const model = formData.get("model") as string;
    const year = formData.get("year") as string;
    const fuel = formData.get("fuel") as string;
    const transmission = formData.get("transmission") as string;
    const km = formData.get("km") as string;
    const price = formData.get("price") as string;
    const city = formData.get("city") as string;
    const district = formData.get("district") as string;
    const title = formData.get("title") as string;
    const color = formData.get("color") as string | null;
    const engineSize = formData.get("engineSize") as string | null;
    const horsePower = formData.get("horsePower") as string | null;
    const description = formData.get("description") as string | null;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    // const email = formData.get("email") as string | null;

    if (
      !brand ||
      !model ||
      !year ||
      !fuel ||
      !transmission ||
      !km ||
      !price ||
      !city ||
      !district ||
      !title ||
      !name ||
      !phone
    ) {
      return NextResponse.json(
        { message: "Zorunlu alanlar eksik" },
        { status: 400 }
      );
    }

    const imageFiles = formData.getAll("images") as File[];

    // Resimleri yükle
    for (const imageFile of imageFiles) {
      if (imageFile.size === 0) continue;

      try {
        const upload = await upload_file(imageFile, "autoValue/cars");
        uploadedImagePaths.push(upload);
      } catch (uploadError) {
        for (const img of uploadedImagePaths) {
          await delete_file(img.public_id);
        }
        throw new Error("Resim yükleme hatası");
      }
    }
    const newCar = await prisma.car.create({
      data: {
        brand,
        model,
        year: parseInt(year),
        fuel: fuel as "Gaz" | "Dizel" | "Elektrik" | "Hybrid",
        transmission: transmission as "Otomatik" | "Manuel",
        km: parseInt(km),
        price: parseFloat(price),
        city,
        district,
        title,
        description: description || "",
        color: color || "",
        engineSize: engineSize || "",
        horsePower: horsePower ? parseInt(horsePower) : 0,
        images: uploadedImagePaths.map((img) => img.url),
        userId: user.id,
      },
    });

    return NextResponse.json(newCar, { status: 200 });
  } catch (error: any) {
    if (uploadedImagePaths.length > 0) {
      for (const img of uploadedImagePaths) {
        await delete_file(img.public_id);
      }
    }

    return NextResponse.json(
      { error: error.message || "Bir hata oluştu" },
      { status: 500 }
    );
  }
}
