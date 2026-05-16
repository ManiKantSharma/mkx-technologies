import connectDB, { isMockMode } from '@/lib/db'
import { Product } from '@/lib/models'
import { MOCK_PRODUCTS } from '@/lib/mock-data'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    
    if (isMockMode()) {
      return NextResponse.json(MOCK_PRODUCTS)
    }

    const products = await Product.find().sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    // Fallback to mock data on error as well to ensure UI doesn't break
    return NextResponse.json(MOCK_PRODUCTS)
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    
    if (isMockMode()) {
      return NextResponse.json({ error: 'Database is in Mock Mode (Read-only)' }, { status: 503 })
    }

    const body = await request.json()
    const product = await Product.create(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Failed to create product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
