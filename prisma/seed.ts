import { Prisma, PrismaClient } from "@/lib/generated/prisma/client";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    password: "securepassword123",
  },
  {
    name: "Bob",
    email: "bob@prisma.io",
    password: "securepassword123",
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
