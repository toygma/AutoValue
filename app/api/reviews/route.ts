import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET - Fetch reviews for a specific car
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const carId = searchParams.get("carId");

    if (!carId) {
      return NextResponse.json(
        { error: "carId parametresi gereklidir" },
        { status: 400 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: { carId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Yorumlar alınırken hata:", error);
    return NextResponse.json(
      { error: "Yorumlar alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Create a new review
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yorum yapmak için giriş yapmalısınız" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { carId, comment, rating } = body;

    // Validation
    if (!carId || !comment || !rating) {
      return NextResponse.json(
        { error: "carId, comment ve rating alanları gereklidir" },
        { status: 400 }
      );
    }

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "rating 1 ile 5 arasında bir sayı olmalıdır" },
        { status: 400 }
      );
    }

    if (comment.trim().length < 10) {
      return NextResponse.json(
        { error: "Yorum en az 10 karakter olmalıdır" },
        { status: 400 }
      );
    }

    if (comment.length > 500) {
      return NextResponse.json(
        { error: "Yorum en fazla 500 karakter olabilir" },
        { status: 400 }
      );
    }

    // Check if car exists
    const carExists = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!carExists) {
      return NextResponse.json(
        { error: "Belirtilen araç bulunamadı" },
        { status: 404 }
      );
    }

    // Check if user already reviewed this car
    const existingReview = await prisma.review.findFirst({
      where: {
        carId,
        userId: session.user.id,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        { error: "Bu araç için zaten yorum yaptınız" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        carId,
        userId: session.user.id,
        comment: comment.trim(),
        rating,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Yorum oluşturulurken hata:", error);
    return NextResponse.json(
      { error: "Yorum oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}