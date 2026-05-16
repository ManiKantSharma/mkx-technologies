import connectDB from '@/lib/db'
import { User, Subscription } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      User.countDocuments()
    ])

    const enrichedUsers = await Promise.all(users.map(async (u) => {
      const activeCount = await Subscription.countDocuments({
        userId: u._id,
        status: 'ACTIVE'
      })
      return {
        ...u.toObject(),
        activeSubscriptions: activeCount
      }
    }))

    return ApiResponse.success(enrichedUsers, 'Users fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return ApiResponse.error('Failed to fetch users')
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const user = await User.create(body)
    return ApiResponse.success(user, 'User created successfully', 201)
  } catch (error) {
    console.error('Failed to create user:', error)
    return ApiResponse.error('Failed to create user')
  }
}
