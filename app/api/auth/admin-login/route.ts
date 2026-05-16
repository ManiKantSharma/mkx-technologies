import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: NextRequest) {
  try {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
      console.error("Admin credentials or JWT_SECRET not configured in .env");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }
    const token = await new SignJWT({
      email: ADMIN_EMAIL,
      role: "admin",
      type: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);
    const response = NextResponse.json({
      success: true,
      user: {
        email: ADMIN_EMAIL,
        role: "admin",
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
