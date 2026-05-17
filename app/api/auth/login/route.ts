import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Handles unified authentication POST requests.
 * Supports Admin login using environment variables, and Customer login using the SaaS MongoDB database.
 * Sets the secure HttpOnly cookie and returns the user role/type for front-end routing.
 *
 * @param {NextRequest} request - The incoming HTTP login request.
 * @returns {Promise<NextResponse>} JSON response with login success and token cookies.
 */
export async function POST(request: NextRequest) {
  try {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not configured in .env");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // 1. Check Admin Credentials
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
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
          type: "admin",
        },
      });

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
      });

      return response;
    }

    // 2. Check Customer Credentials in SaaS Database
    await connectDB();
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
      role: "user",
      type: "customer",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: "user",
        type: "customer",
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Unified login error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
