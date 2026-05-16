import connectDB from '@/lib/db'
import { BlogPost } from '@/lib/models'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const post = await BlogPost.findById(id)
    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to fetch blog post:', error)
    return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const body = await request.json()
    const post = await BlogPost.findByIdAndUpdate(id, body, { new: true })

    if (!post) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('Failed to update blog post:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    await BlogPost.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
