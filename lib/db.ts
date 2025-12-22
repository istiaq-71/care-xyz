import { MongoClient } from 'mongodb'

// Only check for MONGODB_URI at runtime, not during build
const uri: string = process.env.MONGODB_URI || ''

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Check if we're in build phase
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || 
                     process.env.NEXT_PHASE === 'phase-development-build'

if (!isBuildPhase && !process.env.MONGODB_URI) {
  // Only throw error if not in build phase and URI is missing
  throw new Error('Please add your Mongo URI to environment variables')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise && uri) {
    client = new MongoClient(uri)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise || Promise.reject(new Error('MongoDB URI not configured'))
} else {
  // In production mode, it's best to not use a global variable.
  if (uri) {
    client = new MongoClient(uri)
    clientPromise = client.connect()
  } else {
    // Create a rejected promise that will fail when accessed
    clientPromise = Promise.reject(new Error('Please add your Mongo URI to environment variables'))
  }
}

export default clientPromise

