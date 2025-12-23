'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import AdminRoute from '@/components/AdminRoute'
import Link from 'next/link'
import toast from 'react-hot-toast'

interface Booking {
  _id: string
  userId: string | { _id: string; name: string; email: string }
  serviceId: string
  serviceName: string
  duration: number
  durationType: 'hours' | 'days'
  location: {
    division: string
    district: string
    city: string
    area: string
    address: string
  }
  totalCost: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt?: string
}

export default function AdminDashboard() {
  return (
    <AdminRoute>
      <AdminDashboardContent />
    </AdminRoute>
  )
}

function AdminDashboardContent() {
  const { data: session } = useSession()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
  })

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/admin/bookings')
      if (response.ok) {
        const data = await response.json()
        setBookings(data.bookings || [])
        
        // Calculate stats
        const totalRevenue = data.bookings?.reduce((sum: number, b: Booking) => {
          if (b.status === 'completed' || b.status === 'confirmed') {
            return sum + b.totalCost
          }
          return sum
        }, 0) || 0

        setStats({
          totalBookings: data.bookings?.length || 0,
          totalRevenue,
          pendingBookings: data.bookings?.filter((b: Booking) => b.status === 'pending').length || 0,
          confirmedBookings: data.bookings?.filter((b: Booking) => b.status === 'confirmed').length || 0,
          completedBookings: data.bookings?.filter((b: Booking) => b.status === 'completed').length || 0,
        })
      }
    } catch (error) {
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: Booking['status']) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success('Booking status updated')
        fetchBookings()
      } else {
        toast.error('Failed to update status')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage bookings and view payment history</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-primary-600">
            <div className="text-gray-600 text-sm font-medium mb-1">Total Bookings</div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalBookings}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="text-gray-600 text-sm font-medium mb-1">Total Revenue</div>
            <div className="text-3xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-600">
            <div className="text-gray-600 text-sm font-medium mb-1">Pending</div>
            <div className="text-3xl font-bold text-gray-900">{stats.pendingBookings}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="text-gray-600 text-sm font-medium mb-1">Confirmed</div>
            <div className="text-3xl font-bold text-gray-900">{stats.confirmedBookings}</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="text-gray-600 text-sm font-medium mb-1">Completed</div>
            <div className="text-3xl font-bold text-gray-900">{stats.completedBookings}</div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                        {booking._id.slice(-8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.serviceName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {typeof booking.userId === 'object' && booking.userId.name
                          ? booking.userId.name
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="max-w-xs truncate">
                          {booking.location.division}, {booking.location.district}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {booking.duration} {booking.durationType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        ৳{booking.totalCost.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => updateBookingStatus(booking._id, 'completed')}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition text-xs"
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

