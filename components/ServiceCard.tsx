import Link from 'next/link'
import { Service } from '@/lib/models'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const serviceId = service._id?.toString() || '1'
  const categoryIcons: Record<string, string> = {
    'baby-care': '👶',
    'elderly-care': '👴',
    'sick-care': '🏥',
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
        <span className="text-6xl">{categoryIcons[service.category] || '💚'}</span>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">৳{service.serviceCharge}</span>
            <span className="text-gray-500">/hour</span>
          </div>
          <Link
            href={`/service/${serviceId}`}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

