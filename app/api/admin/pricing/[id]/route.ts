import connectDB from '@/lib/db'
import { PricingPlan } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const body = await request.json()
    const plan = await PricingPlan.findByIdAndUpdate(id, body, { new: true })

    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }
    return NextResponse.json(plan)
  } catch (error) {
    console.error('Failed to update pricing plan:', error)
    return NextResponse.json({ error: 'Failed to update pricing plan' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    await PricingPlan.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete pricing plan:', error)
    return NextResponse.json({ error: 'Failed to delete pricing plan' }, { status: 500 })
  }
}
