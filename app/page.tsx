import Link from 'next/link'
import { getAllServices } from '@/lib/models'
import ServiceCard from '@/components/ServiceCard'

export const metadata = {
  title: 'Care.xyz - Trusted Care Services for Your Family',
  description: 'Find and book reliable care services for children, elderly, and special care needs. Easy, secure, and accessible caregiving platform.',
  openGraph: {
    title: 'Care.xyz - Trusted Care Services',
    description: 'Find and book reliable care services for your loved ones',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  let services: Awaited<ReturnType<typeof getAllServices>> = []
  try {
    services = await getAllServices()
  } catch (error) {
    console.error('Error fetching services:', error)
  }

  return (
    <div className="overflow-x-hidden">
      <section className="relative bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-700 text-white py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block mb-2">Trusted Care Services</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                for Your Family
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Making caregiving easy, secure, and accessible for everyone. 
              <span className="block mt-2">Book professional care services with just a few clicks.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scaleIn" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/#services"
                className="group bg-white text-primary-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-primary-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
              >
                <span className="relative z-10">Explore Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="/register"
                className="group bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-primary-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Care.xyz</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Care.xyz is a web application that helps users find and book reliable and trusted care services 
              for children, elderly, or sick family members. Our platform makes caregiving easy, secure, and 
              accessible for everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: '🔒', title: 'Secure', desc: 'All our caretakers are verified and trusted professionals', gradient: 'from-blue-500 to-cyan-500' },
              { icon: '⚡', title: 'Easy Booking', desc: 'Simple and quick booking process in just a few steps', gradient: 'from-purple-500 to-pink-500' },
              { icon: '📍', title: 'Location Based', desc: 'Find services in your area with precise location selection', gradient: 'from-green-500 to-emerald-500' },
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift group animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 bg-gradient-to-br ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our range of professional care services designed to meet your family's needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={service._id?.toString()} style={{ animationDelay: `${index * 0.1}s` }}>
                  <ServiceCard service={service} />
                </div>
              ))
            ) : (
              <>
                <ServiceCard
                  service={{
                    _id: undefined,
                    name: 'Baby Care',
                    description: 'Professional babysitting services for your children. Experienced and caring babysitters available.',
                    serviceCharge: 500,
                    category: 'baby-care',
                  }}
                />
                <ServiceCard
                  service={{
                    _id: undefined,
                    name: 'Elderly Care',
                    description: 'Compassionate care services for elderly family members. Trained caregivers for daily assistance.',
                    serviceCharge: 800,
                    category: 'elderly-care',
                  }}
                />
                <ServiceCard
                  service={{
                    _id: undefined,
                    name: 'Special Care',
                    description: 'Specialized care services for sick or disabled family members. Medical assistance available.',
                    serviceCharge: 1000,
                    category: 'sick-care',
                  }}
                />
              </>
            )}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary-50 via-purple-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">Customers</span> Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                rating: '★★★★★', 
                text: '"Care.xyz made it so easy to find a reliable babysitter for my kids. The booking process was smooth and the service was excellent!"', 
                author: 'Sarah Ahmed',
                gradient: 'from-pink-500 to-rose-500'
              },
              { 
                rating: '★★★★★', 
                text: '"I needed urgent care for my elderly mother. Care.xyz connected me with a professional caregiver within hours. Highly recommended!"', 
                author: 'Mohammad Rahman',
                gradient: 'from-blue-500 to-cyan-500'
              },
              { 
                rating: '★★★★★', 
                text: '"The platform is user-friendly and the caretakers are well-trained. Great service for busy families!"', 
                author: 'Fatima Khan',
                gradient: 'from-purple-500 to-indigo-500'
              },
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover-lift group animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className="text-yellow-400 text-2xl">{testimonial.rating}</div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  {testimonial.text}
                </p>
                <div className={`flex items-center bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-purple-400 mr-3 flex items-center justify-center text-white font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-pattern"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1000+', label: 'Happy Families', delay: '0s' },
              { number: '500+', label: 'Verified Caretakers', delay: '0.1s' },
              { number: '5000+', label: 'Bookings Completed', delay: '0.2s' },
              { number: '98%', label: 'Satisfaction Rate', delay: '0.3s' },
            ].map((metric, index) => (
              <div 
                key={index}
                className="animate-scaleIn"
                style={{ animationDelay: metric.delay }}
              >
                <div className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                  {metric.number}
                </div>
                <div className="text-xl text-white/90 font-medium">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
