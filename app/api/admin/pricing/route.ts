import connectDB from '@/lib/db'
import { PricingPlan } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const plans = await PricingPlan.find()
      .populate('productId', 'name')
      .sort({ price: 1 })
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
    return NextResponse.json({ error: 'Failed to fetch pricing plans' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()


    const body = await request.json()
    const plan = await PricingPlan.create(body)
    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('Failed to create pricing plan:', error)
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 })
  }
}
