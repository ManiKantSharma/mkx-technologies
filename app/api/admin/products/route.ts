import connectDB from '@/lib/db'
import { Product } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()

    const products = await Product.find().sort({ createdAt: -1 })
    return NextResponse.json(products)
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()



    const body = await request.json()
    const product = await Product.create(body)
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Failed to create product:', error)
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
