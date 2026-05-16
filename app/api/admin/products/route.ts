import connectDB from '@/lib/db'
import { Product } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments()
    ])

    return ApiResponse.success(products, 'Products fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch products:', error)
    return ApiResponse.error('Failed to fetch products')
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const product = await Product.create(body)
    return ApiResponse.success(product, 'Product created successfully', 201)
  } catch (error) {
    console.error('Failed to create product:', error)
    return ApiResponse.error('Failed to create product')
  }
}
