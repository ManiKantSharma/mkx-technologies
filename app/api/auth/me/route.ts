import connectDB from '@/lib/db';
import { User } from '@/lib/models';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Fetches the current user's information based on the auth-token cookie.
 * Verifies the JWT token and returns user details and role.
 * 
 * @param {NextRequest} request - The incoming request containing cookies.
 * @returns {Promise<NextResponse>} JSON response with user data or error if unauthorized.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.");
      return NextResponse.json({ error: 'Authentication configuration error' }, { status: 500 })
    }
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }
    const decoded = jwt.verify(token, JWT_SECRET!) as any
    if (decoded.type === 'admin') {
      return NextResponse.json({
        user: {
          email: decoded.email,
          role: 'admin',
          type: 'admin'
        }
      })
    } else if (decoded.type === 'customer') {
      await connectDB();
      const user = await User.findById(decoded.userId);
      const createdAt = user?.createdAt || new Date();
      const trialDurationMs = 15 * 24 * 60 * 60 * 1000;
      const elapsedMs = Date.now() - new Date(createdAt).getTime();
      const msLeft = trialDurationMs - elapsedMs;
      const trialDaysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));

      return NextResponse.json({
        user: {
          userId: decoded.userId,
          email: decoded.email,
          role: 'user',
          type: 'customer',
          name: user?.name || 'HR Manager',
          company: user?.company || 'MKX Technologies',
          trialDaysLeft
        }
      })
    }

    return NextResponse.json({ error: 'Invalid token type' }, { status: 401 })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
