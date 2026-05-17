import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_APPLICATION_URI = process.env.MONGODB_APPLICATION_URI
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

let cachedApp = (global as any).mongooseApp
if (!cachedApp) {
  cachedApp = (global as any).mongooseApp = {
    conn: null,
    promise: null
  }
}

async function connectDB(): Promise<mongoose.Mongoose> {
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
    let srvUri = MONGODB_URI!;
    if (srvUri.includes('.net/?') && DB_NAME) {
      srvUri = srvUri.replace('.net/?', `.net/${DB_NAME}?`);
    }
    
    cached.promise = mongoose.connect(srvUri, opts).then((mongooseInstance) => {
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

export async function connectApplicationDB(tenantId?: string) {
  if (cachedApp.conn) return cachedApp.conn

  if (!cachedApp.promise) {
    if (!MONGODB_APPLICATION_URI) {
      console.warn("MONGODB_APPLICATION_URI is missing. Application DB (HRMS/CRM) won't connect.")
      return null
    }

    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
    }
    
    console.log('Attempting connection to Application DB (hrms)...')
    cachedApp.promise = mongoose.createConnection(MONGODB_APPLICATION_URI, opts).asPromise()
      .then((conn) => {
        console.log('Application DB connected successfully to hrms')
        cachedApp.conn = conn
        return conn
      }).catch(async (err: any) => {
        console.error('Application DB connection failed:', err.message)
        if (CLUSTER_HOST && DIRECT_SHARDS && REPLICA_SET) {
          console.log('Attempting resilient direct connection to shards for Application DB (hrms)...')
          try {
            const baseUri = MONGODB_URI!.replace('mongodb+srv://', 'mongodb://').split('?')[0].replace(/\/$/, '')
            const directAppUri = baseUri
              .replace(`@${CLUSTER_HOST}`, `@${DIRECT_SHARDS}`)
              + `/hrms?replicaSet=${REPLICA_SET}&ssl=true&authSource=admin&retryWrites=true&w=majority`

            const directConn = mongoose.createConnection(directAppUri, opts);
            await directConn.asPromise();
            console.log('Application DB connected successfully to hrms database via Direct Shards fallback');
            cachedApp.conn = directConn;
            return directConn;
          } catch (fallbackErr: any) {
            console.error('Resilient Direct Shards fallback for hrms failed:', fallbackErr.message)
            cachedApp.promise = null
            throw err
          }
        } else {
          cachedApp.promise = null
          throw err
        }
      })
  }

  try {
    cachedApp.conn = await cachedApp.promise
  } catch (e) {
    cachedApp.promise = null
    throw e
  }

  return cachedApp.conn
}

export type { IBlogPost as BlogPost, IPricingPlan as PricingPlan, IProduct as Product, ISubscription as Subscription, IUser as User } from './models'

import type { ISubscription } from './models'

export type SubscriptionWithDetails = ISubscription & {
  userName: string;
  userEmail: string;
  productName: string;
  planName: string;
  planPrice: number;
};
