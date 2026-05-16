import connectDB, { isMockMode } from '@/lib/db'
import { User, Subscription } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    
    if (isMockMode()) {
      return NextResponse.json([])
    }

    const users = await User.find().sort({ createdAt: -1 })
    
    // Enrich with active subscription counts
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

    return NextResponse.json(enrichedUsers)
  } catch (error) {
    console.error('Failed to fetch users:', error)
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
    const user = await User.create(body)
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Failed to create user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}
