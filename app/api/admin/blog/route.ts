import connectDB from '@/lib/db'
import { BlogPost } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()

    const posts = await BlogPost.find().sort({ createdAt: -1 })
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return NextResponse.json([], { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()

    const body = await request.json()
    const post = await BlogPost.create(body)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Failed to create blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
