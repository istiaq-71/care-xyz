'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Preserve the current path as callbackUrl
      const callbackUrl = encodeURIComponent(pathname || '/')
      router.push(`/login?callbackUrl=${callbackUrl}`)
    }
  }, [status, router, pathname])

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

  if (status === 'authenticated' && session) {
    return <>{children}</>
  }

  // If unauthenticated, the useEffect will redirect, but show loading while redirecting
  if (status === 'unauthenticated') {
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

