import connectDB from '@/lib/db'
import { Subscription } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    const body = await request.json()
    const subscription = await Subscription.findByIdAndUpdate(id, body, { new: true })

    if (!subscription) {
      return ApiResponse.error('Subscription not found', 404)
    }
    return ApiResponse.success(subscription, 'Subscription updated successfully')
  } catch (error) {
    console.error('Failed to update subscription:', error)
    return ApiResponse.error('Failed to update subscription')
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB()
    const { id } = await params

    await Subscription.findByIdAndDelete(id)
    return ApiResponse.success({ success: true }, 'Subscription deleted successfully')
  } catch (error) {
    console.error('Failed to delete subscription:', error)
    return ApiResponse.error('Failed to delete subscription')
  }
}
