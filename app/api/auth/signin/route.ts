import prisma from "@/lib/prisma";
import { AuthSchema } from "@/schemas/auth.schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AuthSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: parsed.email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Böyle bir kullanıcı yok" },
        { status: 401 }
      );
    }

    if (!user.password) {
      return NextResponse.json(
        { error: "Şifre Geçersiz." },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      parsed.password,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Şifre Yanlış." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Signed in",
      user: { id: user.id, email: user.email },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
