import { MongoClient, MongoClientOptions } from 'mongodb'

// Only check for MONGODB_URI at runtime, not during build
const uri: string = process.env.MONGODB_URI || ''

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Check if we're in build phase
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || 
                     process.env.NEXT_PHASE === 'phase-development-build' ||
                     process.env.VERCEL === '1'

// Don't throw error during build - just create a rejected promise
if (!isBuildPhase && !process.env.MONGODB_URI) {
  // Only log warning if not in build phase and URI is missing
  console.warn('MongoDB URI not configured - will fail at runtime')
}

// MongoDB connection options to handle SSL/TLS issues
const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // SSL/TLS options for MongoDB Atlas
  tls: true,
  tlsAllowInvalidCertificates: false,
  retryWrites: true,
}

function createMongoClient() {
  if (!uri) {
    throw new Error('MongoDB URI is not configured')
  }
  
  // Ensure the URI has proper SSL parameters
  let connectionUri = uri
  if (connectionUri.includes('mongodb+srv://')) {
    // Add SSL parameters if not present (avoid duplicates)
    const hasQuery = connectionUri.includes('?')
    const params: string[] = []
    
    if (!connectionUri.includes('tls=true') && !connectionUri.includes('&tls=')) {
      params.push('tls=true')
    }
    if (!connectionUri.includes('retryWrites=')) {
      params.push('retryWrites=true')
    }
    if (!connectionUri.includes('w=majority') && !connectionUri.includes('&w=')) {
      params.push('w=majority')
    }
    
    if (params.length > 0) {
      const separator = hasQuery ? '&' : '?'
      connectionUri = `${connectionUri}${separator}${params.join('&')}`
    }
  }
  
  return new MongoClient(connectionUri, options)
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise && uri) {
    try {
      client = createMongoClient()
      globalWithMongo._mongoClientPromise = client.connect()
    } catch (error) {
      console.error('Failed to create MongoDB client:', error)
      globalWithMongo._mongoClientPromise = Promise.reject(error)
    }
  }
  clientPromise = globalWithMongo._mongoClientPromise || Promise.reject(new Error('MongoDB URI not configured'))
} else {
  // In production mode, it's best to not use a global variable.
  if (uri) {
    try {
      client = createMongoClient()
      clientPromise = client.connect()
    } catch (error) {
      console.error('Failed to create MongoDB client:', error)
      clientPromise = Promise.reject(error)
    }
  } else {
    // Create a rejected promise that will fail when accessed
    clientPromise = Promise.reject(new Error('Please add your Mongo URI to environment variables'))
  }
}

export default clientPromise

