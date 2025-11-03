import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthSchema } from "@/schemas/auth.schema";
import bcrypt from "bcrypt"; 

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = AuthSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error("Invalid input");
        }

        const { email, password } = parsed.data;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      if (!user.password) {
        throw new Error("Invalid email or password");
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid email or password");

      return user;
      },
    }),
  ],

  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};
