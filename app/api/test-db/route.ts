import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Check environment variables
    const hasMongoUri = !!process.env.MONGODB_URI
    const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET
    
    // Try to connect to MongoDB
    let mongoStatus = 'Not tested'
    let mongoError = null
    
    if (hasMongoUri) {
      try {
        const { default: clientPromise } = await import('@/lib/db')
        const client = await clientPromise
        await client.db('admin').command({ ping: 1 })
        mongoStatus = 'Connected successfully'
      } catch (error: any) {
        mongoStatus = 'Connection failed'
        mongoError = error.message || String(error)
      }
    } else {
      mongoStatus = 'MONGODB_URI not configured'
    }
    
    return NextResponse.json({
      environment: {
        nodeEnv: process.env.NODE_ENV,
        hasMongoUri,
        hasNextAuthSecret,
        mongoUriLength: process.env.MONGODB_URI?.length || 0,
      },
      mongodb: {
        status: mongoStatus,
        error: mongoError,
      },
      message: 'Database connection test',
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Test failed',
      message: error.message || String(error),
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    }, { status: 500 })
  }
}

