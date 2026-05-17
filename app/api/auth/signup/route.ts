import connectDB from "@/lib/db";
import { User } from "@/lib/models";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Handles user signup requests.
 * Validates user input, checks for existing users, creates a new user,
 * and sets an authentication cookie with a JWT token.
 * 
 * @param {NextRequest} request - The incoming signup request.
 * @returns {Promise<NextResponse>} JSON response with success status and user data, or error message.
 */
export async function POST(request: NextRequest) {
  try {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return NextResponse.json(
        { error: "Authentication configuration error" },
        { status: 500 }
      );
    }
    await connectDB();

    const { firstName, lastName, email, company, companySize, password } = await request.json();

    if (!firstName || !lastName || !email || !company || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 },
      );
    }

    const user = await User.create({
      email,
      name: `${firstName} ${lastName}`,
      company,
      companySize,
      password,
    });
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: "user",
        type: "customer",
      },
      JWT_SECRET!,
      { expiresIn: "7d" },
    );
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
      maxAge: 7 * 24 * 60 * 60,
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
