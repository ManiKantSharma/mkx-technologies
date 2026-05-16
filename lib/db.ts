import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const CLUSTER_HOST = process.env.MONGODB_CLUSTER_HOST
const DIRECT_SHARDS = process.env.MONGODB_DIRECT_SHARDS
const REPLICA_SET = process.env.MONGODB_REPLICA_SET
const DB_NAME = process.env.MONGODB_DB_NAME || 'saas'

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not defined in environment variables.')
}

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
    lastAttempt: 0
  }
}

/**
 * Connects to the MongoDB database using mongoose.
 * Implements a connection caching mechanism for Next.js serverless environment.
 * Includes a fallback to direct shard connection if SRV connection fails.
 * 
 * @returns {Promise<mongoose.Mongoose>} The mongoose connection instance.
 * @throws {Error} If connection fails or MONGODB_URI is missing.
 */
async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    }

    cached.lastAttempt = Date.now()
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      console.log('MongoDB connected successfully via SRV')
      cached.conn = mongooseInstance
      return mongooseInstance
    }).catch(async (err: any) => {
      console.warn('SRV Connection failed:', err.message)
      if (CLUSTER_HOST && DIRECT_SHARDS && REPLICA_SET) {
        const baseUri = MONGODB_URI!.replace('mongodb+srv://', 'mongodb://').split('?')[0].replace(/\/$/, '')
        const directUri = baseUri
          .replace(`@${CLUSTER_HOST}`, `@${DIRECT_SHARDS}`)
          + `/${DB_NAME}?replicaSet=${REPLICA_SET}&ssl=true&authSource=admin&retryWrites=true&w=majority`

        try {
          console.log('Attempting direct connection to shards...')
          const directInstance = await mongoose.connect(directUri, opts)
          console.log('MongoDB connected successfully via Direct Shards')
          cached.conn = directInstance
          return directInstance
        } catch (fallbackErr: any) {
          console.error('Direct Connection failed:', fallbackErr.message)
          cached.promise = null
          throw fallbackErr
        }
      } else {
        console.error('Fallback configuration missing.')
        cached.promise = null
        throw err
      }
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}


export default connectDB


export type { IProduct as Product, IPricingPlan as PricingPlan, IUser as User, ISubscription as Subscription, IBlogPost as BlogPost } from './models'

import type { ISubscription, IUser, IProduct, IPricingPlan } from './models'

export type SubscriptionWithDetails = ISubscription & {
  userName: string;
  userEmail: string;
  productName: string;
  planName: string;
  planPrice: number;
};
