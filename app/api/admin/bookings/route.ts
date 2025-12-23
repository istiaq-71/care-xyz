import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAllBookings, getUserById } from '@/lib/models'

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

    // Check if user is admin
    const userRole = (session.user as any)?.role || 'user'
    if (userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    const bookings = await getAllBookings()
    
    // Populate user information
    const bookingsWithUsers = await Promise.all(
      bookings.map(async (booking) => {
        const user = await getUserById(booking.userId.toString())
        return {
          ...booking,
          userId: user
            ? { _id: user._id?.toString(), name: user.name, email: user.email }
            : booking.userId,
        }
      })
    )

    return NextResponse.json(
      { bookings: bookingsWithUsers },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}


