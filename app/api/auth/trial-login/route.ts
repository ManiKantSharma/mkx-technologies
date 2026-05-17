import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Handles instant one-click login for customer trial accounts.
 * Validates the token query parameter, sets the secure HttpOnly cookie,
 * and redirects the user immediately to their pre-seeded HRMS dashboard.
 *
 * @param {NextRequest} request - The incoming HTTP request containing the magic token.
 * @returns {Promise<NextResponse>} Redirect response to /hrms, or error if invalid.
 */
export async function GET(request: NextRequest) {
  try {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return NextResponse.json(
        { error: "Authentication configuration error" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Magic token is missing" }, { status: 400 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Magic link has expired or is invalid" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User profile not found" }, { status: 404 });
    }

    const response = NextResponse.redirect(new URL("/hrms", request.url));
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error("Trial login error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
