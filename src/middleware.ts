import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const token = request.cookies.get("token")?.value;
  // const token = localStorage.getItem("token");

  const isAuthPage = request.nextUrl.pathname.startsWith("/login");
  const isProtectedPage = request.nextUrl.pathname.startsWith("/products");

  // Redirect to login if accessing protected page without token
  // if (isProtectedPage && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Redirect to products if accessing login with valid token
  if (isAuthPage) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/login"],
};
