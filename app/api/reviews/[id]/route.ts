import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yorum silmek için giriş yapmalısınız" },
        { status: 401 }
      );
    }

   const  id  = (await params).id; 

    if (!id) {
      return NextResponse.json(
        { error: "Review ID gereklidir" },
        { status: 400 }
      );
    }

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json({ error: "Yorum bulunamadı" }, { status: 404 });
    }

    // Check if user owns the review
    if (review.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Bu yorumu silme yetkiniz yok" },
        { status: 403 }
      );
    }

    // Delete review
    await prisma.review.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Yorum başarıyla silindi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Yorum silinirken hata:", error);
    return NextResponse.json(
      { error: "Yorum silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// GET - Get a specific review (optional)
export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }> }) {
  try {
   const  id  = (await params).id; 

    if (!id) {
      return NextResponse.json(
        { error: "Review ID gereklidir" },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!review) {
      return NextResponse.json({ error: "Yorum bulunamadı" }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("Yorum alınırken hata:", error);
    return NextResponse.json(
      { error: "Yorum alınırken bir hata oluştu" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yorum güncellemek için giriş yapmalısınız" },
        { status: 401 }
      );
    }

   const  id  = (await params).id; 
    const body = await req.json();
    const { comment, rating } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Review ID gereklidir" },
        { status: 400 }
      );
    }

    // Validation
    if (!comment || !rating) {
      return NextResponse.json(
        { error: "comment ve rating alanları gereklidir" },
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

    // Check if review exists
    const review = await prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return NextResponse.json(
        { error: "Yorum bulunamadı" },
        { status: 404 }
      );
    }

    // Check if user owns the review
    if (review.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Bu yorumu güncelleme yetkiniz yok" },
        { status: 403 }
      );
    }

    // Update review
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        comment: comment.trim(),
        rating: rating,
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

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    console.error("Yorum güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Yorum güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}