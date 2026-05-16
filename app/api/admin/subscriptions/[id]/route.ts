import connectDB, { isMockMode } from '@/lib/db'
import { Subscription } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    
    if (isMockMode()) {
      return NextResponse.json({ error: 'Mock Mode' }, { status: 503 })
    }

    const body = await request.json()
    const subscription = await Subscription.findByIdAndUpdate(id, body, { new: true })
    
    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }
    return NextResponse.json(subscription)
  } catch (error) {
    console.error('Failed to update subscription:', error)
    return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params
    
    if (isMockMode()) {
      return NextResponse.json({ error: 'Mock Mode' }, { status: 503 })
    }

    await Subscription.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete subscription:', error)
    return NextResponse.json({ error: 'Failed to delete subscription' }, { status: 500 })
  }
}
