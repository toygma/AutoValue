import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";
import { AuthSchema } from "@/schemas/auth.schema";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Form verisini doğrula
        const parsed = AuthSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        try {
          let user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            const hashed = await bcrypt.hash(password, 10);
            user = await prisma.user.create({
              data: {
                email,
                password: hashed,
              },
            });
          }

          const isValid = await bcrypt.compare(password, user.password!);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt", 
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;
