import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Allow access to the route
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is trying to access a protected route
        if (req.nextUrl.pathname.startsWith('/booking') || 
            req.nextUrl.pathname.startsWith('/my-bookings')) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/booking/:path*', '/my-bookings/:path*'],
}

