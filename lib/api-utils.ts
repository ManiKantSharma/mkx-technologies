import { NextResponse } from 'next/server'

/**
 * Standardized API response structure:
 * {
 *   success: boolean,
 *   message: string,
 *   data: any,
 *   meta?: {
 *     pagination?: {
 *       total: number,
 *       page: number,
 *       limit: number,
 *       totalPages: number
 *     }
 *   }
 * }
 */

export const ApiResponse = {
  success: (data: any, message: string = 'Operation successful', status: number = 200, meta?: any) => {
    return NextResponse.json(
      { 
        success: true,
        message,
        data,
        meta 
      }, 
      { status }
    )
  },

  error: (message: string, status: number = 500) => {
    return NextResponse.json(
      { 
        success: false,
        message,
        data: null
      }, 
      { status }
    )
  }
}

import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Centralized utility to extract the organization ID from the secure HttpOnly auth cookie.
 * Prevents code duplication across SaaS API routes.
 */
export function getTenantIdFromToken(request: NextRequest): string | null {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token || !JWT_SECRET) {
      return process.env.NODE_ENV === 'development' ? 'demo-org-123' : null;
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    
    if (decoded.type === 'customer' && decoded.userId) {
      return decoded.userId;
    }
    
    if (decoded.type === 'admin') {
      const { searchParams } = new URL(request.url);
      return searchParams.get('orgId') || (process.env.NODE_ENV === 'development' ? 'demo-org-123' : null);
    }
    
    return process.env.NODE_ENV === 'development' ? 'demo-org-123' : null;
  } catch (error) {
    return process.env.NODE_ENV === 'development' ? 'demo-org-123' : null;
  }
}
