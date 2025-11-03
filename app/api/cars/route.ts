import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";


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
      include: { user: true }, 
    });

    return NextResponse.json(cars, { status: 200 });
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

    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: "Missing request body" },
        { status: 400 }
      );
    }

    const dataToCreate = {
      ...body,
      userId: session.user.id,
    };

    const car = await prisma.car.create({
      data: dataToCreate,
      include: { user: true },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
