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
