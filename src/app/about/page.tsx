export default function AboutPage() {
  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About Lettuce Print
            </h1>
            <p className="text-xl text-gray-600">
              Brooklyn's trusted printing partner, delivering quality and reliability since 2020.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                Founded in 2020, Lettuce Print was born from a simple observation: Brooklyn businesses needed a reliable, local printing partner who understood their unique needs and could deliver quality results with fast turnaround times.
              </p>
              <p className="mb-4">
                What started as a small operation in a Brooklyn storefront has grown into a comprehensive printing service serving hundreds of local businesses, from startups and restaurants to established corporations and non-profits.
              </p>
              <p>
                Our name, Lettuce Print, reflects our commitment to freshness and growth - just like lettuce in a garden, we believe in nurturing relationships with our clients and helping their businesses grow through effective printed materials.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To provide Brooklyn businesses with professional printing services that combine quality, speed, and local expertise, helping them communicate effectively and grow their brands.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the go-to printing partner for every Brooklyn business, known for our reliability, quality, and commitment to customer success.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quality First',
                  description: 'We never compromise on quality. Every print job meets our high standards before it reaches your hands.',
                  icon: '⭐'
                },
                {
                  title: 'Local Commitment',
                  description: 'We\'re proud to serve the Brooklyn community and understand the unique needs of local businesses.',
                  icon: '🏢'
                },
                {
                  title: 'Reliability',
                  description: 'When we say we\'ll deliver, we mean it. You can count on us to meet your deadlines.',
                  icon: '🤝'
                },
                {
                  title: 'Innovation',
                  description: 'We stay current with printing technology and trends to offer you the best solutions.',
                  icon: '💡'
                },
                {
                  title: 'Customer Focus',
                  description: 'Your success is our success. We go the extra mile to ensure you\'re satisfied.',
                  icon: '👥'
                },
                {
                  title: 'Sustainability',
                  description: 'We use eco-friendly materials and processes whenever possible.',
                  icon: '🌱'
                }
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-lettuce-green text-white rounded-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-center mb-8">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm">Happy Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-sm">Print Jobs</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4+</div>
                <div className="text-sm">Years in Business</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">22+</div>
                <div className="text-sm">Product Categories</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Experience the Lettuce Print Difference
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Join hundreds of Brooklyn businesses who trust us with their printing needs.
            </p>
            <a href="/quote" className="btn-primary text-lg px-8 py-3 inline-block">
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}