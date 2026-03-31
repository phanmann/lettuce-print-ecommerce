import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lettuce-light to-lettuce-green text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Lettuce Print
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Brooklyn's trusted printing partner for businesses. Professional quality, local expertise, fast turnaround.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary text-lg px-8 py-3">
              Browse Products
            </Link>
            <Link href="/quote" className="btn-secondary text-lg px-8 py-3">
              Get Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Our Printing Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Business Cards',
                description: 'Professional business cards that make a lasting impression',
                icon: '💼'
              },
              {
                title: 'Flyers & Brochures',
                description: 'Eye-catching marketing materials for your business',
                icon: '📄'
              },
              {
                title: 'Banners & Signs',
                description: 'Large format printing for events and promotions',
                icon: '🎯'
              },
              {
                title: 'Posters',
                description: 'High-quality posters for advertising and decoration',
                icon: '🖼️'
              },
              {
                title: 'Stickers & Labels',
                description: 'Custom stickers and labels for branding',
                icon: '🏷️'
              },
              {
                title: 'Stationery',
                description: 'Professional letterheads, envelopes, and more',
                icon: '📝'
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Choose Lettuce Print?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Local Brooklyn Expertise',
                description: 'We understand Brooklyn businesses and their unique needs',
                icon: '🏢'
              },
              {
                title: 'Fast Turnaround',
                description: 'Quick delivery times without compromising quality',
                icon: '⚡'
              },
              {
                title: 'Competitive Pricing',
                description: 'Fair prices with transparent pricing calculator',
                icon: '💰'
              },
              {
                title: 'Premium Quality',
                description: 'High-quality printing on premium materials',
                icon: '⭐'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-lettuce-green text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Printing Project?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a quote in minutes and see why Brooklyn businesses trust Lettuce Print.
          </p>
          <Link href="/quote" className="btn-secondary text-lg px-8 py-3 inline-block">
            Get Free Quote
          </Link>
        </div>
      </section>
    </div>
  )
}