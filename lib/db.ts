import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const CLUSTER_HOST = process.env.MONGODB_CLUSTER_HOST
const DIRECT_SHARDS = process.env.MONGODB_DIRECT_SHARDS
const REPLICA_SET = process.env.MONGODB_REPLICA_SET
const DB_NAME = process.env.MONGODB_DB_NAME || 'saas'

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not defined. Falling back to Mock Mode.')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { 
    conn: null, 
    promise: null, 
    isMock: false,
    lastAttempt: 0
  }
}

const COOLDOWN_PERIOD = 10000 

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (cached.isMock && (Date.now() - cached.lastAttempt < COOLDOWN_PERIOD)) {
    return null
  }

  if (!MONGODB_URI) {
    cached.isMock = true
    return null
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, 
      connectTimeoutMS: 10000,
    }

    cached.lastAttempt = Date.now()
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('MongoDB connected successfully via SRV')
      cached.isMock = false
      cached.conn = mongooseInstance
      return mongooseInstance
    }).catch(async (err: any) => {
      console.warn('SRV Connection failed:', err.message)
      
      // Attempt Direct Shard Fallback if configuration is available
      if (CLUSTER_HOST && DIRECT_SHARDS && REPLICA_SET) {
        const baseUri = MONGODB_URI.replace('mongodb+srv://', 'mongodb://').split('?')[0].replace(/\/$/, '')
        const directUri = baseUri
          .replace(`@${CLUSTER_HOST}`, `@${DIRECT_SHARDS}`)
          + `/${DB_NAME}?replicaSet=${REPLICA_SET}&ssl=true&authSource=admin&retryWrites=true&w=majority`
        
        try {
          console.log('Attempting direct connection to shards...')
          const directInstance = await mongoose.connect(directUri, opts)
          console.log('MongoDB connected successfully via Direct Shards')
          cached.isMock = false
          cached.conn = directInstance
          return directInstance
        } catch (fallbackErr: any) {
          console.error('Direct Connection failed:', fallbackErr.message)
          cached.isMock = true
          cached.promise = null 
          return null
        }
      } else {
        console.error('Fallback configuration missing. Entering Mock Mode.')
        cached.isMock = true
        cached.promise = null
        return null
      }
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    cached.isMock = true
  }

  return cached.conn
}

export default connectDB


export type { IProduct as Product, IPricingPlan as PricingPlan, IUser as User, ISubscription as Subscription, IBlogPost as BlogPost } from './models'
