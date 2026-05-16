import connectDB from '@/lib/db'
import { PricingPlan } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [plans, total] = await Promise.all([
      PricingPlan.find()
        .populate('productId', 'name')
        .sort({ price: 1 })
        .skip(skip)
        .limit(limit),
      PricingPlan.countDocuments()
    ])

    const formattedPlans = plans.map(plan => {
      const p = plan.toObject()
      return {
        ...p,
        productId: p.productId?._id?.toString() || p.productId?.toString() || p.productId,
        productName: (p.productId as any)?.name || 'Unknown Product'
      }
    })

    return ApiResponse.success(formattedPlans, 'Pricing plans fetched successfully', 200, {
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Failed to fetch pricing plans:', error)
    return ApiResponse.error('Failed to fetch pricing plans')
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const plan = await PricingPlan.create(body)
    return ApiResponse.success(plan, 'Pricing plan created successfully', 201)
  } catch (error) {
    console.error('Failed to create pricing plan:', error)
    return ApiResponse.error('Failed to create pricing plan')
  }
}
