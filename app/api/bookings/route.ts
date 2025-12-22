import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createBooking, getServiceById } from '@/lib/models'
import { sendBookingInvoice } from '@/lib/email'
import { getUserByEmail } from '@/lib/models'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await getUserByEmail(session.user.email)
    if (!user || !user._id) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const { getBookingsByUserId } = await import('@/lib/models')
    const bookings = await getBookingsByUserId(user._id.toString())

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const user = await getUserByEmail(session.user.email)
    if (!user || !user._id) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { serviceId, serviceName, duration, durationType, location, totalCost } = body

    if (!serviceId || !serviceName || !duration || !durationType || !location || !totalCost) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify service exists
    const service = await getServiceById(serviceId)
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      )
    }

    // Create booking
    const booking = await createBooking({
      userId: user._id.toString(),
      serviceId,
      serviceName,
      duration,
      durationType,
      location,
      totalCost,
      status: 'pending',
    })

    // Send email invoice
    try {
      await sendBookingInvoice(
        user.email,
        user.name,
        booking,
        service
      )
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json(
      { message: 'Booking created successfully', booking },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

