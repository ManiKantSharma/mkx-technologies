import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const {
  MONGODB_URI,
  MONGODB_CLUSTER_HOST: CLUSTER_HOST,
  MONGODB_DIRECT_SHARDS: DIRECT_SHARDS,
  MONGODB_REPLICA_SET: REPLICA_SET,
  MONGODB_DB_NAME: DB_NAME = 'saas'
} = process.env

async function connectDB() {
  
  const opts = {
    bufferCommands: false,
    serverSelectionTimeoutMS: 30000,
    connectTimeoutMS: 30000,
  }

  try {
    console.log('Attempting SRV connection...')
    let srvUri = MONGODB_URI!;
    if (srvUri.includes('.net/?') && DB_NAME) {
      srvUri = srvUri.replace('.net/?', `.net/${DB_NAME}?`);
    }
    await mongoose.connect(srvUri, opts)
    console.log('Connected via SRV')
  } catch (error: any) {
    if (CLUSTER_HOST && DIRECT_SHARDS && REPLICA_SET) {
      console.warn(' SRV failed, trying direct shards...')
      const baseUri = MONGODB_URI!.replace('mongodb+srv://', 'mongodb://').split('?')[0].replace(/\/$/, '')
      const directUri = baseUri
        .replace(`@${CLUSTER_HOST}`, `@${DIRECT_SHARDS}`)
        + `/${DB_NAME}?replicaSet=${REPLICA_SET}&ssl=true&authSource=admin&retryWrites=true&w=majority`

      await mongoose.connect(directUri, opts)
      console.log('Connected via Direct Shards')
    } else {
      throw new Error('Connection failed and fallback config is missing')
    }
  }
}
const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true }))

const PricingPlan = mongoose.models.PricingPlan || mongoose.model('PricingPlan', new mongoose.Schema({
  name: String,
  price: Number,
  interval: String,
  features: [String],
  isPopular: Boolean,
  isActive: { type: Boolean, default: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, { timestamps: true }))

const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  email: String,
  name: String,
  company: String,
  companySize: String
}, { timestamps: true }))

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  pricingPlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'PricingPlan' },
  status: String,
  startDate: { type: Date, default: Date.now }
}, { timestamps: true }))

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', new mongoose.Schema({
  title: String,
  description: String,
  slug: String,
  date: String,
  author: String,
  category: String,
  content: String,
  image: String,
  published: Boolean
}, { timestamps: true }))

async function seed() {
  try {
    await connectDB()

    console.log('Clearing old data...')
    await Promise.all([
      Product.deleteMany({}),
      PricingPlan.deleteMany({}),
      User.deleteMany({}),
      Subscription.deleteMany({}),
      BlogPost.deleteMany({})
    ])

    console.log('Seeding Products...')
    const products = await Product.create([
      { name: 'MKX Analytics', description: 'Advanced real-time analytics.', icon: 'ChartBarIcon' },
      { name: 'MKX CRM', description: 'Strategic customer management.', icon: 'UsersIcon' },
      { name: 'MKX Cloud Connect', description: 'Multi-cloud orchestration.', icon: 'CloudIcon' }
    ])

    console.log('Seeding Pricing Plans...')
    const plans = []
    for (const product of products) {
      const p = await PricingPlan.create([
        { name: 'Starter', price: 49, productId: product._id, features: ['Basic'] },
        { name: 'Professional', price: 149, productId: product._id, features: ['Advanced'], isPopular: true },
        { name: 'Enterprise', price: 499, productId: product._id, features: ['Unlimited'] }
      ])
      plans.push(...p)
    }

    console.log('Seeding Users...')
    const users = await User.create([
      { email: 'john@example.com', name: 'John Doe', company: 'TechCorp' },
      { email: 'jane@acme.org', name: 'Jane Smith', company: 'Acme Org' }
    ])

    console.log('Seeding Subscriptions...')
    await Subscription.create([
      {
        userId: users[0]._id,
        productId: products[0]._id,
        pricingPlanId: plans.find(p => (p as any).productId?.toString() === products[0]._id.toString() && p.name === 'Professional')?._id,
        status: 'ACTIVE'
      }
    ])

    console.log('Seeding Blog Posts...')
    await BlogPost.create([
      {
        title: 'Scaling Your SaaS Infrastructure',
        description: 'Best practices for handling rapid growth in the cloud.',
        slug: 'scaling-saas-infrastructure',
        date: '2026-05-12',
        author: 'Mani Kant Sharma',
        category: 'Infrastructure',
        image: '/blog/infrastructure.png',
        published: true,
        content: 'Infrastructure scaling is critical for any growing SaaS business...'
      },
      {
        title: 'The Future of Enterprise Analytics',
        description: 'How AI is transforming the way businesses look at data.',
        slug: 'future-enterprise-analytics',
        date: '2026-05-10',
        author: 'Mani Kant Sharma',
        category: 'Technology',
        image: '/blog/analytics.png',
        published: true,
        content: 'Analytics has come a long way from simple spreadsheets...'
      }
    ])

    console.log('Seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seed()
