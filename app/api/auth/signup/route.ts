import prisma from "@/lib/prisma";
import { AuthSchema } from "@/schemas/auth.schema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AuthSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(parsed.password, 10);
    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created",
      user: { id: user.id, email: user.email },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
