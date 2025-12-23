'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">Care.xyz</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-primary-600 transition">
              Services
            </Link>
            {status === 'authenticated' ? (
              <>
                <Link href="/my-bookings" className="text-gray-700 hover:text-primary-600 transition">
                  My Bookings
                </Link>
                {(session?.user as any)?.role === 'admin' && (
                  <Link href="/admin" className="text-gray-700 hover:text-primary-600 transition font-semibold">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hello, {session?.user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-primary-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/" className="block text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/#services" className="block text-gray-700 hover:text-primary-600">
              Services
            </Link>
            {status === 'authenticated' ? (
              <>
                {(session?.user as any)?.role === 'admin' && (
                  <Link href="/admin" className="block text-gray-700 hover:text-primary-600 font-semibold">
                    Admin Panel
                  </Link>
                )}
                <Link href="/my-bookings" className="block text-gray-700 hover:text-primary-600">
                  My Bookings
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block w-full text-left bg-primary-600 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link href="/register" className="block bg-primary-600 text-white px-4 py-2 rounded-lg text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

