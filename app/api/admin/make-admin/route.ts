import { NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/models'
import clientPromise from '@/lib/db'

export const dynamic = 'force-dynamic'

// This route allows you to make a user admin
// Protected with admin password
export async function POST(request: Request) {
  try {
    const { email, adminPassword } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Verify admin password
    const requiredPassword = process.env.ADMIN_PASSWORD || 'admin123'
    if (!adminPassword || adminPassword !== requiredPassword) {
      return NextResponse.json(
        { error: 'Invalid admin password' },
        { status: 401 }
      )
    }

    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const client = await clientPromise
    const db = client.db('care')
    await db.collection('users').updateOne(
      { email },
      { $set: { role: 'admin' } }
    )

    return NextResponse.json(
      { message: 'User is now admin', email },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error making user admin:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


