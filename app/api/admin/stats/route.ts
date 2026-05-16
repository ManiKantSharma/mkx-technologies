import connectDB from '@/lib/db'
import { Product, Subscription, User } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function GET() {
  try {
    await connectDB()

    const productsCount = await Product.countDocuments({ isActive: true })
    const usersCount = await User.countDocuments()
    const activeSubscriptionsCount = await Subscription.countDocuments({ status: 'ACTIVE' })
    const activeSubscriptions = await Subscription.find({ status: 'ACTIVE' })
      .populate('pricingPlanId', 'price')

    const totalRevenue = activeSubscriptions.reduce((acc, sub) => {
      const plan = sub.pricingPlanId as any
      return acc + (plan?.price || 0)
    }, 0)

    return ApiResponse.success({
      totalProducts: productsCount,
      totalUsers: usersCount,
      activeSubscriptions: activeSubscriptionsCount,
      monthlyRevenue: totalRevenue
    }, 'Dashboard statistics fetched successfully')
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return ApiResponse.error('Failed to fetch stats')
  }
}
