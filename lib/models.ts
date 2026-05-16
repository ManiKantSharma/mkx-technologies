import mongoose, { Schema, Document } from 'mongoose'

const commonTransform = {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id.toString();
    return ret;
  }
};

/**
 * Represents a Product in the system.
 * 
 * @interface IProduct
 * @extends Document
 */
export interface IProduct extends Document {
  id: string
  name: string
  description?: string
  icon?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String },
  icon: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform })

/**
 * Represents a Pricing Plan for a specific Product.
 * 
 * @interface IPricingPlan
 * @extends Document
 */
export interface IPricingPlan extends Document {
  id: string
  name: string
  price: number
  interval: 'MONTH' | 'YEAR'
  features: string[]
  isPopular: boolean
  isActive: boolean
  productId: string | mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const PricingPlanSchema = new Schema<IPricingPlan>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  interval: { type: String, enum: ['MONTH', 'YEAR'], default: 'MONTH' },
  features: { type: [String], default: [] },
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform })

/**
 * Represents a User in the system.
 * 
 * @interface IUser
 * @extends Document
 */
export interface IUser extends Document {
  id: string
  email: string
  password?: string
  name?: string
  company?: string
  companySize?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },
  company: { type: String },
  companySize: { type: String },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform })


/**
 * Represents a Subscription of a User to a Product/Plan.
 * 
 * @interface ISubscription
 * @extends Document
 */
export interface ISubscription extends Document {
  id: string
  userId: string | mongoose.Types.ObjectId
  productId: string | mongoose.Types.ObjectId
  pricingPlanId: string | mongoose.Types.ObjectId
  status: 'ACTIVE' | 'CANCELLED' | 'EXPIRED' | 'PENDING'
  startDate: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date
}

const SubscriptionSchema = new Schema<ISubscription>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  pricingPlanId: { type: Schema.Types.ObjectId, ref: 'PricingPlan', required: true },
  status: { type: String, enum: ['ACTIVE', 'CANCELLED', 'EXPIRED', 'PENDING'], default: 'ACTIVE' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform })

/**
 * Represents a Blog Post in the system.
 * 
 * @interface IBlogPost
 * @extends Document
 */
export interface IBlogPost extends Document {
  id: string
  title: string
  description: string
  slug: string
  date: string
  author: string
  category: string
  content: string
  image?: string
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  published: { type: Boolean, default: true },
}, { timestamps: true, toJSON: commonTransform, toObject: commonTransform })

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)
export const PricingPlan = mongoose.models.PricingPlan || mongoose.model<IPricingPlan>('PricingPlan', PricingPlanSchema)
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const Subscription = mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema)
export const BlogPost = mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)
