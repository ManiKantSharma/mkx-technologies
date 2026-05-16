import connectDB from '@/lib/db'
import { Subscription } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [subscriptions, total] = await Promise.all([
      Subscription.find()
        .populate('userId', 'name email')
        .populate('productId', 'name')
        .populate('pricingPlanId', 'name price')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Subscription.countDocuments()
    ])

    const formatted = subscriptions.map(s => {
      const obj = s.toObject()
      return {
        ...obj,
        userName: obj.userId?.name || 'Unknown',
        userEmail: obj.userId?.email || 'Unknown',
        productName: obj.productId?.name || 'Unknown',
        planName: obj.pricingPlanId?.name || 'Unknown',
        planPrice: obj.pricingPlanId?.price || 0
      }
    })

    return ApiResponse.success(formatted, 'Subscriptions fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error)
    return ApiResponse.error('Failed to fetch subscriptions')
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const subscription = await Subscription.create(body)
    return ApiResponse.success(subscription, 'Subscription created successfully', 201)
  } catch (error) {
    console.error('Failed to create subscription:', error)
    return ApiResponse.error('Failed to create subscription')
  }
}
