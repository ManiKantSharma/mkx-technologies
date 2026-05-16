import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || "";
if (!JWT_SECRET) {
  console.warn("JWT_SECRET is not defined in environment variables.");
}

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'No token found' }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as any

    // Return user info based on token type
    if (decoded.type === 'admin') {
      return NextResponse.json({
        user: {
          email: decoded.email,
          role: 'admin',
          type: 'admin'
        }
      })
    } else if (decoded.type === 'customer') {
      // For customer users, you might want to fetch fresh data from database
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
