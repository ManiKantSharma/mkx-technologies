import connectDB from '@/lib/db'
import { Product } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const product = await Product.findById(id)
    if (!product) {
      return ApiResponse.error('Product not found', 404)
    }
    return ApiResponse.success(product)
  } catch (error) {
    console.error('Failed to fetch product:', error)
    return ApiResponse.error('Failed to fetch product')
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const body = await request.json()
    const product = await Product.findByIdAndUpdate(id, body, { new: true })

    if (!product) {
      return ApiResponse.error('Product not found', 404)
    }
    return ApiResponse.success(product, 'Product updated successfully')
  } catch (error) {
    console.error('Failed to update product:', error)
    return ApiResponse.error('Failed to update product')
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    await Product.findByIdAndDelete(id)
    return ApiResponse.success({ success: true }, 'Product deleted successfully')
  } catch (error) {
    console.error('Failed to delete product:', error)
    return ApiResponse.error('Failed to delete product')
  }
}
