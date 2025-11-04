import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    if (token && (pathname.startsWith("/login") || pathname.startsWith("/signup"))) {
      return NextResponse.redirect(new URL("/", req.url)); 
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, 
    },
  }
);

export const config = {
  matcher: ["/login", "/signup"], 
};
