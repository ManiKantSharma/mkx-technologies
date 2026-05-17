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

import { getActivityLogModel } from './app-models';

/**
 * Audit trail helper: asynchronously logs operations directly to the partitioned database.
 */
export async function logActivity(request: NextRequest, action: string, details: string) {
  try {
    const orgId = getTenantIdFromToken(request);
    if (!orgId) return;

    const token = request.cookies.get('auth-token')?.value;
    let userEmail = 'system@mkx.com';
    if (token && JWT_SECRET) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (decoded.email) {
          userEmail = decoded.email;
        }
      } catch {}
    }

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;

    const ActivityLog = await getActivityLogModel(orgId);
    await ActivityLog.create({
      organizationId: orgId,
      userEmail,
      action,
      details,
      ipAddress
    });
  } catch (err: any) {
    console.error('Failed to save activity log:', err.message);
  }
}

/**
 * Route handler decorator that automatically logs incoming requests asynchronously.
 */
export function withActivityLog(action: string, handler: (request: NextRequest, ...args: any[]) => Promise<Response>) {
  return async (request: NextRequest, ...args: any[]) => {
    const response = await handler(request, ...args);
    try {
      const method = request.method;
      const path = request.nextUrl.pathname;
      const status = response.status;
      logActivity(request, action, `${method} ${path} (Response: ${status})`);
    } catch {}
    return response;
  };
}
