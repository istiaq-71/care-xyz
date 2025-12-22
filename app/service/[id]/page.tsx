import { notFound } from 'next/navigation'
import { getServiceById } from '@/lib/models'
import Link from 'next/link'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params
    const service = await getServiceById(id)
    
    if (!service) {
      return {
        title: 'Service Not Found - Care.xyz',
      }
    }

    return {
      title: `${service.name} - Care.xyz`,
      description: service.description,
      openGraph: {
        title: `${service.name} - Care.xyz`,
        description: service.description,
        type: 'website',
      },
    }
  } catch (error) {
    return {
      title: 'Service - Care.xyz',
    }
  }
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params
  let service
  try {
    service = await getServiceById(id)
  } catch (error) {
    console.error('Error fetching service:', error)
    notFound()
  }

  if (!service) {
    notFound()
  }

  const categoryIcons: Record<string, string> = {
    'baby-care': '👶',
    'elderly-care': '👴',
    'sick-care': '🏥',
  }

  const categoryNames: Record<string, string> = {
    'baby-care': 'Baby Care Service',
    'elderly-care': 'Elderly Care Service',
    'sick-care': 'Special Care Service',
  }

  const categoryGradients: Record<string, string> = {
    'baby-care': 'from-pink-400 via-purple-400 to-indigo-500',
    'elderly-care': 'from-blue-400 via-cyan-400 to-teal-500',
    'sick-care': 'from-green-400 via-emerald-400 to-teal-500',
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500">
          <div className="md:flex">
            <div className={`md:w-1/2 bg-gradient-to-br ${categoryGradients[service.category]} flex items-center justify-center p-12 relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <span className="text-9xl z-10 transform group-hover:scale-125 transition-transform duration-500 animate-float">
                {categoryIcons[service.category] || '💚'}
              </span>
              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-semibold">
                {categoryNames[service.category]}
              </div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="mb-6 animate-slideInRight">
                <span className="inline-block bg-gradient-to-r from-primary-100 to-purple-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full">
                  {categoryNames[service.category]}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fadeIn">
                {service.name}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                {service.description}
              </p>
              
              <div className="mb-10 animate-scaleIn" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                    ৳{service.serviceCharge}
                  </span>
                  <span className="text-gray-500 ml-3 text-lg">per hour</span>
                </div>
                <div className="space-y-4 text-gray-700">
                  {[
                    'Verified and trusted caretakers',
                    'Background checked professionals',
                    'Flexible duration options',
                    'Location-based service',
                    '24/7 customer support',
                    'Instant booking confirmation',
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="flex items-center animate-slideInLeft"
                      style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                    >
                      <span className="text-green-500 mr-3 text-xl">✓</span>
                      <span className="text-lg">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href={`/booking/${id}`}
                className="block w-full text-center bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-5 rounded-xl font-semibold text-lg hover:from-primary-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group/btn animate-scaleIn"
                style={{ animationDelay: '0.4s' }}
              >
                <span className="relative z-10">Book Service Now</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors duration-300 group"
          >
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
