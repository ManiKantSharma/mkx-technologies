import connectDB from '@/lib/db'
import { BlogPost } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const post = await BlogPost.findById(id)
    if (!post) {
      return ApiResponse.error('Blog post not found', 404)
    }
    return ApiResponse.success(post)
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return ApiResponse.error('Failed to fetch blog post')
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
    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true })

    if (!post) {
      return ApiResponse.error('Blog post not found', 404)
    }
    return ApiResponse.success(post, 'Blog post updated successfully')
  } catch (error) {
    console.error('Failed to update blog post:', error)
    return ApiResponse.error('Failed to update blog post')
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    await BlogPost.findByIdAndDelete(id)
    return ApiResponse.success({ success: true }, 'Blog post deleted successfully')
  } catch (error) {
    console.error('Failed to delete blog post:', error)
    return ApiResponse.error('Failed to delete blog post')
  }
}
