import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Allow access to the route if token exists
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Check if user is trying to access a protected route
        const pathname = req.nextUrl.pathname
        if (pathname.startsWith('/booking') || 
            pathname.startsWith('/my-bookings') ||
            pathname.startsWith('/admin')) {
          // If no token, redirect to login with callbackUrl
          if (!token) {
            const callbackUrl = encodeURIComponent(pathname + req.nextUrl.search)
            const loginUrl = new URL('/login', req.url)
            loginUrl.searchParams.set('callbackUrl', callbackUrl)
            return false // This will trigger redirect to signIn page
          }
          return true
        }
        return true
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: ['/booking/:path*', '/my-bookings/:path*', '/admin/:path*'],
}

