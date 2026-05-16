import connectDB from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    return NextResponse.json({ status: 'live' })
  } catch (error) {
    return NextResponse.json({ status: 'demo' })
  }
}
