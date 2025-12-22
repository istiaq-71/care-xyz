import { notFound } from 'next/navigation'
import { getServiceById } from '@/lib/models'
import Link from 'next/link'
import { Metadata } from 'next'

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getServiceById(params.id)
  
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
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = await getServiceById(params.id)

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center p-12">
              <span className="text-9xl">{categoryIcons[service.category] || '💚'}</span>
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="mb-4">
                <span className="inline-block bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full">
                  {categoryNames[service.category]}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{service.name}</h1>
              <p className="text-lg text-gray-600 mb-6">{service.description}</p>
              
              <div className="mb-8">
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-primary-600">৳{service.serviceCharge}</span>
                  <span className="text-gray-500 ml-2">per hour</span>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Verified and trusted caretakers</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Background checked professionals</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Flexible duration options</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Location-based service</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/booking/${params.id}`}
                className="block w-full text-center bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 transition"
              >
                Book Service Now
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

