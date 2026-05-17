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

const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen']
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin']
const companySuffixes = ['Solutions', 'Systems', 'Technologies', 'Group', 'Consulting', 'Partners', 'Corp', 'Inc', 'Global', 'Digital']
const companyPrefixes = ['Apex', 'BlueSky', 'Cloud9', 'Delta', 'Elite', 'Fusion', 'Genesis', 'Horizon', 'Infinity', 'Jupiter']

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
      {
        name: 'MKX HRMS Ultimate',
        description: 'Premium HRMS suite designed for modern enterprises to scale effortlessly in the cloud.',
        icon: 'Users',
        isActive: true
      }
    ])

    console.log('Seeding Pricing Plans...')
    const plans = await PricingPlan.create([
      { name: 'Trial', price: 0, productId: products[0]._id, features: ['15-day sandbox trial', 'Core HRMS modules', 'Email support'], interval: 'month' },
      { name: 'Premium', price: 99, productId: products[0]._id, features: ['Unlimited active employees', 'Full HRMS/CRMS modules', 'Priority support', 'API access'], isPopular: true, interval: 'month' }
    ])

    console.log('Seeding Users...')
    const users = []

    console.log('Seeding Subscriptions...')
    const subscriptionData = []

    console.log('Seeding Blog Posts...')
    const blogTopics = [
      'The Evolution of Cloud Infrastructure in 2026',
      'Scaling SaaS Products for Global Audiences',
      'Leveraging AI for Better Customer Retention',
      'Why Real-time Analytics is the Future of Business',
      'Standardizing API Responses for Scalable Dashboards',
      'The Impact of Cybersecurity on Enterprise Growth',
      'Optimizing Remote Team Productivity with Hub Tools',
      'Mastering Inventory Management in a Digital World',
      'The Role of CRM in Modern Sales Strategies',
      'Building Resilient Platforms with MongoDB and Next.js'
    ]
    const blogData = []
    for (let i = 0; i < 55; i++) {
      const topic = blogTopics[i % blogTopics.length]
      blogData.push({
        title: `${topic} - Volume ${Math.floor(i/10) + 1}`,
        description: `An in-depth analysis of ${topic.toLowerCase()} and its implications for modern businesses.`,
        slug: `${topic.toLowerCase().replace(/ /g, '-')}-${i}`,
        date: new Date(Date.now() - i * 172800000).toISOString().split('T')[0],
        author: 'Mani Kant Sharma',
        category: ['Technology', 'Business', 'Strategy', 'Infrastructure'][i % 4],
        published: true,
        content: `As we look towards the future of technology, ${topic.toLowerCase()} stands at the forefront of innovation...`
      })
    }
    await BlogPost.create(blogData)

    console.log('Seeding completed successfully!')
    console.log(`Generated: ${products.length} Products, ${plans.length} Plans, ${users.length} Users, ${subscriptionData.length} Subscriptions, ${blogData.length} Blog Posts.`)
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

seed()
