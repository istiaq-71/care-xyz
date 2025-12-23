'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import PrivateRoute from '@/components/PrivateRoute'
import { divisions, districts, cities } from '@/lib/locations'
import toast from 'react-hot-toast'

interface Service {
  _id: string
  name: string
  serviceCharge: number
}

export default function BookingPage() {
  return (
    <PrivateRoute>
      <BookingPageContent />
    </PrivateRoute>
  )
}

function BookingPageContent() {
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    duration: 1,
    durationType: 'hours' as 'hours' | 'days',
    division: '',
    district: '',
    city: '',
    area: '',
    address: '',
  })

  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
  const [availableCities, setAvailableCities] = useState<string[]>([])

  useEffect(() => {
    fetchService()
  }, [serviceId])

  useEffect(() => {
    if (formData.division) {
      setAvailableDistricts(districts[formData.division] || [])
      setFormData(prev => ({ ...prev, district: '', city: '' }))
    }
  }, [formData.division])

  useEffect(() => {
    if (formData.district) {
      setAvailableCities(cities[formData.district] || [])
      setFormData(prev => ({ ...prev, city: '' }))
    }
  }, [formData.district])

  const fetchService = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}`)
      if (response.ok) {
        const data = await response.json()
        setService(data)
      } else {
        toast.error('Service not found')
        router.push('/')
      }
    } catch (error) {
      toast.error('Failed to load service')
      router.push('/')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalCost = () => {
    if (!service) return 0
    const multiplier = formData.durationType === 'hours' ? formData.duration : formData.duration * 24
    return service.serviceCharge * multiplier
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.division || !formData.district || !formData.city || !formData.area || !formData.address) {
      toast.error('Please fill in all location fields')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          serviceName: service?.name,
          duration: formData.duration,
          durationType: formData.durationType,
          location: {
            division: formData.division,
            district: formData.district,
            city: formData.city,
            area: formData.area,
            address: formData.address,
          },
          totalCost: calculateTotalCost(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Booking created successfully! Check your email for invoice.')
        router.push('/my-bookings')
      } else {
        toast.error(data.error || 'Failed to create booking')
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!service) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Book Service: {service.name}</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Duration
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 1 })}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                  required
                />
                <select
                  value={formData.durationType}
                  onChange={(e) => setFormData({ ...formData, durationType: e.target.value as 'hours' | 'days' })}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>

            {/* Location Selection */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Division *
                </label>
                <select
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900"
                  required
                >
                  <option value="">Select Division</option>
                  {divisions.map((div) => (
                    <option key={div} value={div}>{div}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
                  required
                  disabled={!formData.division}
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:text-gray-500"
                  required
                  disabled={!formData.district}
                >
                  <option value="">Select City</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Area *
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder:text-gray-400"
                  placeholder="Enter area name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Address *
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white text-gray-900 placeholder:text-gray-400"
                rows={3}
                placeholder="Enter your full address"
                required
              />
            </div>

            {/* Cost Summary */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 p-6 rounded-lg border border-primary-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Service:</span>
                  <span className="font-semibold text-gray-900">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Duration:</span>
                  <span className="font-semibold text-gray-900">
                    {formData.duration} {formData.durationType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 font-medium">Service Charge:</span>
                  <span className="font-semibold text-gray-900">৳{service.serviceCharge}/{formData.durationType === 'hours' ? 'hour' : 'day'}</span>
                </div>
                <div className="border-t border-primary-300 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Cost:</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">৳{calculateTotalCost()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition disabled:opacity-50"
              >
                {submitting ? 'Confirming...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

