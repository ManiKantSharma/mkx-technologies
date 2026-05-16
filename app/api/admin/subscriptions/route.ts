import connectDB, { isMockMode } from '@/lib/db'
import { Subscription } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    
    if (isMockMode()) {
      return NextResponse.json([])
    }

    const subscriptions = await Subscription.find()
      .populate('userId', 'name email')
      .populate('productId', 'name')
      .populate('pricingPlanId', 'name price')
      .sort({ createdAt: -1 })
    
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

    return NextResponse.json(formatted)
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    
    if (isMockMode()) {
      return NextResponse.json({ error: 'Mock Mode' }, { status: 503 })
    }

    const body = await request.json()
    const subscription = await Subscription.create(body)
    return NextResponse.json(subscription, { status: 201 })
  } catch (error) {
    console.error('Failed to create subscription:', error)
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
