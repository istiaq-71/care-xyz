'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (status === 'unauthenticated' && !isRedirecting) {
      setIsRedirecting(true)
      // Preserve the current path as callbackUrl (including search params from window.location)
      const searchParams = typeof window !== 'undefined' ? window.location.search : ''
      const currentPath = pathname + searchParams
      const callbackUrl = encodeURIComponent(currentPath || '/')
      router.push(`/login?callbackUrl=${callbackUrl}`)
    }
  }, [status, router, pathname, isRedirecting])

  // Show loading while checking session
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  // If authenticated and session exists, show content
  if (status === 'authenticated' && session) {
    return <>{children}</>
  }

  // If unauthenticated, show loading while redirecting
  if (status === 'unauthenticated' || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-4"></div>
          <p className="text-primary-600 font-medium">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return null
}

