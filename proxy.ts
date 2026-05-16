import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "";
if (!JWT_SECRET) {
  console.warn("JWT_SECRET is not defined in environment variables.");
}

const secret = new TextEncoder().encode(JWT_SECRET);

const protectedPaths = ["/admin"];
const publicPaths = ["/", "/login", "/signup", "/forgot-password"];


export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );
  const isPublicPath = publicPaths.some((path) => pathname === path);

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (isProtectedPath) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const { payload } = await jwtVerify(token, secret);

      if (pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/login", request.url));
      }

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
