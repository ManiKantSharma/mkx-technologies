import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Fetches the current user's information based on the auth-token cookie.
 * Verifies the JWT token and returns user details and role.
 * 
 * @param {NextRequest} request - The incoming request containing cookies.
 * @returns {Promise<NextResponse>} JSON response with user data or error if unauthorized.
 */
export async function GET(request: NextRequest) {
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
      return NextResponse.json({
        user: {
          userId: decoded.userId,
          email: decoded.email,
          role: 'user',
          type: 'customer'
        }
      })
    }

    return NextResponse.json({ error: 'Invalid token type' }, { status: 401 })
  } catch (error) {
    console.error('Auth me error:', error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}
