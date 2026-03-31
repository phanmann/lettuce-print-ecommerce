export default function ServicesPage() {
  const services = [
    {
      title: 'Business Printing',
      description: 'Professional business materials including cards, letterheads, and envelopes.',
      items: ['Business Cards', 'Letterheads', 'Envelopes', 'Notepads', 'Presentation Folders']
    },
    {
      title: 'Marketing Materials',
      description: 'Eye-catching promotional materials to boost your marketing campaigns.',
      items: ['Flyers', 'Brochures', 'Postcards', 'Door Hangers', 'Rack Cards']
    },
    {
      title: 'Large Format Printing',
      description: 'High-impact large format prints for events, trade shows, and outdoor advertising.',
      items: ['Banners', 'Posters', 'Signs', 'Trade Show Displays', 'Window Graphics']
    },
    {
      title: 'Specialty Printing',
      description: 'Unique printing solutions for special occasions and premium presentations.',
      items: ['Invitations', 'Greeting Cards', 'Stickers & Labels', 'Booklets', 'Calendars']
    }
  ]

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive printing solutions tailored to meet your business needs. From business essentials to large format displays.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h2>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-700">
                    <span className="text-lettuce-green mr-2">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Consultation', description: 'Discuss your printing needs and requirements' },
              { step: '2', title: 'Design', description: 'Create or review your design specifications' },
              { step: '3', title: 'Production', description: 'High-quality printing with premium materials' },
              { step: '4', title: 'Delivery', description: 'Fast delivery to your location in Brooklyn' }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-lettuce-green rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{process.title}</h3>
                <p className="text-gray-600 text-sm">{process.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-lettuce-green text-white rounded-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-6">
            Contact us today to discuss your printing project and get a free quote.
          </p>
          <a href="/quote" className="btn-secondary text-lg px-8 py-3 inline-block">
            Request Quote
          </a>
        </div>
      </div>
    </div>
  )
}