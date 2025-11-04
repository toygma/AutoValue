import { Review } from "@/lib/generated/prisma/client";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Car id is required" }, { status: 400 });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { carId: id },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { error: "Yorumlar yüklenemedi" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: Review = await req.json();
    const { carId, userId, comment, rating } = body;

    if (!carId || !userId || !comment || !rating) {
      return NextResponse.json(
        { error: "carId, userId , comment, rating alanları zorunludur" },
        { status: 400 }
      );
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        userId: userId,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          error: "Bir tane yorum yapabilirsin.",
        },
        { status: 409 }
      );
    }

    const newReview = await prisma.review.create({
      data: {
        carId,
        userId,
        comment,
        rating,
      },
      include: {
        user: true,
      },
    });

    const car = await prisma.car.findUnique({
      where: { id: carId },
      include: { reviews: true },
    });

    if (car) {
      const totalRating =
        car.reviews.reduce((sum, r) => sum + r.rating, 0) + rating;
      const reviewCount = car.reviews.length + 1;
      const averageRating = totalRating / reviewCount;

      await prisma.car.update({
        where: { id: carId },
        data: { totalRating, averageRating },
      });
    }
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { error: "Yorum oluşturulamadı." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { comment, rating } = body;

    if (rating === undefined && !comment) {
      return NextResponse.json(
        { error: "comment veya rating alanlarından en az biri gereklidir." },
        { status: 400 }
      );
    }

    const existingReview = await prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return NextResponse.json({ error: "Yorum bulunamadı." }, { status: 404 });
    }

    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        comment: comment ?? existingReview.comment,
        rating: rating ?? existingReview.rating,
      },
      include: { user: true },
    });

    const car = await prisma.car.findUnique({
      where: { id: existingReview.carId },
      include: { reviews: true },
    });

    if (car) {
      const totalRating = car.reviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating =
        car.reviews.length > 0 ? totalRating / car.reviews.length : 0;

      await prisma.car.update({
        where: { id: car.id },
        data: { totalRating, averageRating },
      });
    }

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("error:", error);
    return NextResponse.json(
      { error: "Yorum güncellenmedi." },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Yorum bulunamadı." },
        { status: 404 }
      );
    }

    await prisma.review.delete({
      where: { id },
    });

    const car = await prisma.car.findUnique({
      where: { id: review.carId },
      include: { reviews: true },
    });

    if (car) {
      const totalRating = car.reviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating =
        car.reviews.length > 0 ? totalRating / car.reviews.length : 0;

      await prisma.car.update({
        where: { id: car.id },
        data: {
          totalRating,
          averageRating,
        },
      });
    }

    return NextResponse.json(
      { message: "Yorum başarıyla silindi." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /reviews error:", error);
    return NextResponse.json(
      { error: error?.message || "Yorum silinemedi." },
      { status: 500 }
    );
  }
}
