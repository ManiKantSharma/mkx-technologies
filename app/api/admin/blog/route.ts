import connectDB from '@/lib/db'
import { BlogPost } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [posts, total] = await Promise.all([
      BlogPost.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      BlogPost.countDocuments()
    ])

    return ApiResponse.success(posts, 'Blog posts fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return ApiResponse.error('Failed to fetch blog posts')
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const post = await BlogPost.create(body)
    return ApiResponse.success(post, 'Blog post created successfully', 201)
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return ApiResponse.error('Failed to create blog post')
  }
}
