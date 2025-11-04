import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Car id is required" },
        { status: 400 }
      );
    }

    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        user: true,
        reviews: { include: { user: true } },
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    const totalReviews = car.reviews.length;
    const averageRating =
      totalReviews > 0
        ? car.reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;

    const carWithRating = {
      ...car,
      averageRating,
      totalReviews,
    };

    return NextResponse.json(carWithRating, { status: 200 });
  } catch (error: any) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
