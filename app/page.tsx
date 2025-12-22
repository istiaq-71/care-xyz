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

export default async function Home() {
  const services = await getAllServices()

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trusted Care Services for Your Family
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Making caregiving easy, secure, and accessible for everyone
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#services"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition"
              >
                Explore Services
              </Link>
              <Link
                href="/register"
                className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-400 transition border-2 border-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Care.xyz
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Care.xyz is a web application that helps users find and book reliable and trusted care services 
              for children, elderly, or sick family members. Our platform makes caregiving easy, secure, and 
              accessible for everyone. Book services based on your required duration and location with just a few clicks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-600">All our caretakers are verified and trusted professionals</p>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and quick booking process in just a few steps</p>
            </div>
            <div className="text-center p-6 bg-primary-50 rounded-lg">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Location Based</h3>
              <p className="text-gray-600">Find services in your area with precise location selection</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our range of professional care services
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard key={service._id?.toString()} service={service} />
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-2xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4">
                "Care.xyz made it so easy to find a reliable babysitter for my kids. The booking process was smooth and the service was excellent!"
              </p>
              <p className="font-semibold">- Sarah Ahmed</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-2xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4">
                "I needed urgent care for my elderly mother. Care.xyz connected me with a professional caregiver within hours. Highly recommended!"
              </p>
              <p className="font-semibold">- Mohammad Rahman</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 text-2xl">★★★★★</div>
              </div>
              <p className="text-gray-600 mb-4">
                "The platform is user-friendly and the caretakers are well-trained. Great service for busy families!"
              </p>
              <p className="font-semibold">- Fatima Khan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-200">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-200">Verified Caretakers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5000+</div>
              <div className="text-primary-200">Bookings Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

