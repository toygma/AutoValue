import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


function middlewareHandler(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup");

  const token = (req as any).nextauth?.token;
  const isAuthenticated = !!token;

  if (isAuthenticated && isAuthPage) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  const isAdminPage = pathname.startsWith("/admin");
  const isAdmin = token?.role === "admin";

  if (isAdminPage && !isAdmin) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export default withAuth(middlewareHandler, {
  callbacks: {
    authorized: ({ token }) => {
      return !!token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/((?!_next|static|api|favicon.ico).*)"],
};