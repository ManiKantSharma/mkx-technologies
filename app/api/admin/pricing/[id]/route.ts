import connectDB from '@/lib/db'
import { PricingPlan } from '@/lib/models'
import { ApiResponse } from '@/lib/api-utils'

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
      return ApiResponse.error('Plan not found', 404)
    }
    return ApiResponse.success(plan, 'Pricing plan updated successfully')
  } catch (error) {
    console.error('Failed to update pricing plan:', error)
    return ApiResponse.error('Failed to update pricing plan')
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
    return ApiResponse.success({ success: true }, 'Pricing plan deleted successfully')
  } catch (error) {
    console.error('Failed to delete pricing plan:', error)
    return ApiResponse.error('Failed to delete pricing plan')
  }
}
