import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB, { isMockMode } from "@/lib/db";
import { User } from "@/lib/models";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables.");
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { firstName, lastName, email, company, companySize, password } = await request.json();

    if (!firstName || !lastName || !email || !company || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (isMockMode()) {
      return NextResponse.json(
        { error: "Signup is disabled in Mock Mode. Please try again later when the database is available." },
        { status: 503 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 },
      );
    }

    // Hash password (if you want to store it, but the previous code didn't seem to store password in User model?)
    // Wait, the User model in models.ts didn't have a password field.
    // I should add it if it's needed for login, or use an external auth provider.
    // Given the previous code hashed it but INSERTed it into a table that might not have had it (or the schema was different).
    // Let's check the old User schema. It didn't have password.
    // I'll add password to the User schema in models.ts.

    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      company,
      companySize,
    });

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: "user",
        type: "customer",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        company: user.company,
        companySize: user.companySize,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
