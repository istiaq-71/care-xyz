import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail, createUser } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nid, name, email, contact, password } = body

    // Validation
    if (!nid || !name || !email || !contact || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check MongoDB connection
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not configured')
      return NextResponse.json(
        { error: 'Database configuration error. Please contact support.' },
        { status: 500 }
      )
    }

    // Check if user already exists
    let existingUser
    try {
      existingUser = await getUserByEmail(email)
    } catch (dbError: any) {
      console.error('Database connection error:', dbError)
      return NextResponse.json(
        { error: `Database connection failed: ${dbError.message || 'Please try again later.'}` },
        { status: 500 }
      )
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    let user
    try {
      user = await createUser({
        nid,
        name,
        email,
        contact,
        password: hashedPassword,
      })
    } catch (createError: any) {
      console.error('User creation error:', createError)
      return NextResponse.json(
        { error: `Failed to create user: ${createError.message || 'Please try again.'}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'User created successfully', userId: user._id?.toString() },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Registration error:', error)
    const errorMessage = error?.message || 'Internal server error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

