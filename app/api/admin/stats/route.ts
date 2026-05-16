import connectDB from '@/lib/db'
import { Product, Subscription, User } from '@/lib/models'
import { NextResponse } from 'next/server'

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

    return NextResponse.json({
      totalProducts: productsCount,
      totalUsers: usersCount,
      activeSubscriptions: activeSubscriptionsCount,
      monthlyRevenue: totalRevenue
    })
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return NextResponse.json({
      totalProducts: 0,
      totalUsers: 0,
      activeSubscriptions: 0,
      monthlyRevenue: 0
    })
  }
}
