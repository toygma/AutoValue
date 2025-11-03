import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const isAuthenticated = !!token;
        const isAdmin = token?.role === "admin";
        const isAccessingAdminPath = req.nextUrl.pathname.startsWith("/admin");

        if (isAccessingAdminPath && !isAdmin) {
          return false;
        }
        return isAuthenticated;
      },
    },
    pages: {
      signIn: "/", 
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"], 
};
