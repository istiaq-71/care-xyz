'use client'

import Link from 'next/link'
import { Service } from '@/lib/models'
import { useState } from 'react'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const serviceId = service._id?.toString() || '1'
  const [isHovered, setIsHovered] = useState(false)
  
  const categoryIcons: Record<string, string> = {
    'baby-care': '👶',
    'elderly-care': '👴',
    'sick-care': '🏥',
  }

  const categoryGradients: Record<string, string> = {
    'baby-care': 'from-pink-400 via-purple-400 to-indigo-500',
    'elderly-care': 'from-blue-400 via-cyan-400 to-teal-500',
    'sick-care': 'from-green-400 via-emerald-400 to-teal-500',
  }

  const categoryHoverGradients: Record<string, string> = {
    'baby-care': 'from-pink-500 via-purple-500 to-indigo-600',
    'elderly-care': 'from-blue-500 via-cyan-500 to-teal-600',
    'sick-care': 'from-green-500 via-emerald-500 to-teal-600',
  }

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover-lift animate-fadeIn"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${Math.random() * 0.3}s`,
      }}
    >
      <div className={`h-56 bg-gradient-to-br ${isHovered ? categoryHoverGradients[service.category] : categoryGradients[service.category]} flex items-center justify-center relative overflow-hidden transition-all duration-500`}>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
        <span 
          className={`text-7xl z-10 transition-transform duration-500 ${isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'} animate-float`}
          style={{ animationDelay: '0.2s' }}
        >
          {categoryIcons[service.category] || '💚'}
        </span>
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-semibold">
          {service.category === 'baby-care' ? 'Baby Care' : service.category === 'elderly-care' ? 'Elderly Care' : 'Special Care'}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {service.name}
        </h3>
        <p className="text-gray-600 mb-6 line-clamp-2 min-h-[3rem]">
          {service.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              ৳{service.serviceCharge}
            </span>
            <span className="text-gray-500 ml-2">/hour</span>
          </div>
        </div>
        <Link
          href={`/service/${serviceId}`}
          className="block w-full text-center bg-gradient-to-r from-primary-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group/btn"
        >
          <span className="relative z-10">View Details</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
        </Link>
      </div>
    </div>
  )
}
