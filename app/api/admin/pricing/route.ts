import connectDB, { isMockMode } from '@/lib/db'
import { PricingPlan } from '@/lib/models'
import { MOCK_PRICING_PLANS } from '@/lib/mock-data'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    
    if (isMockMode()) {
      return NextResponse.json(MOCK_PRICING_PLANS)
    }

    // Join with products
    const plans = await PricingPlan.find()
      .populate('productId', 'name')
      .sort({ price: 1 })
    
    // Transform to match the expected frontend format
    const formattedPlans = plans.map(plan => {
      const p = plan.toObject()
      return {
        ...p,
        productName: p.productId?.name || 'Unknown Product'
      }
    })

    return NextResponse.json(formattedPlans)
  } catch (error) {
    console.error('Failed to fetch pricing plans:', error)
    return NextResponse.json(MOCK_PRICING_PLANS)
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    
    if (isMockMode()) {
      return NextResponse.json({ error: 'Database is in Mock Mode (Read-only)' }, { status: 503 })
    }

    const body = await request.json()
    const plan = await PricingPlan.create(body)
    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('Failed to create pricing plan:', error)
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 })
  }
}
