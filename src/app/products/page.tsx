import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: 1,
    name: 'Business Cards',
    description: 'Professional business cards with premium finishes',
    price: 'Starting at $25',
    image: '/images/business-cards.jpg',
    category: 'Business Essentials'
  },
  {
    id: 2,
    name: 'Flyers',
    description: 'High-quality flyers for marketing and promotions',
    price: 'Starting at $50',
    image: '/images/flyers.jpg',
    category: 'Marketing Materials'
  },
  {
    id: 3,
    name: 'Brochures',
    description: 'Tri-fold and bi-fold brochures with custom designs',
    price: 'Starting at $75',
    image: '/images/brochures.jpg',
    category: 'Marketing Materials'
  },
  {
    id: 4,
    name: 'Posters',
    description: 'Large format posters for events and advertising',
    price: 'Starting at $30',
    image: '/images/posters.jpg',
    category: 'Large Format'
  },
  {
    id: 5,
    name: 'Banners',
    description: 'Vinyl banners for indoor and outdoor use',
    price: 'Starting at $80',
    image: '/images/banners.jpg',
    category: 'Large Format'
  },
  {
    id: 6,
    name: 'Stickers',
    description: 'Custom stickers in various shapes and sizes',
    price: 'Starting at $15',
    image: '/images/stickers.jpg',
    category: 'Labels & Stickers'
  },
  {
    id: 7,
    name: 'Letterhead',
    description: 'Professional letterhead for business correspondence',
    price: 'Starting at $40',
    image: '/images/letterhead.jpg',
    category: 'Business Essentials'
  },
  {
    id: 8,
    name: 'Envelopes',
    description: 'Custom printed envelopes with your branding',
    price: 'Starting at $35',
    image: '/images/envelopes.jpg',
    category: 'Business Essentials'
  },
  {
    id: 9,
    name: 'Notepads',
    description: 'Custom notepads with your company logo',
    price: 'Starting at $45',
    image: '/images/notepads.jpg',
    category: 'Business Essentials'
  }
]

export default function ProductsPage() {
  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide range of professional printing services. From business cards to large format banners, we have everything your business needs.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🖨️</div>
                  <p className="text-gray-500">Product Image</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <span className="text-sm text-lettuce-green font-medium bg-lettuce-green bg-opacity-10 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-lettuce-green">{product.price}</span>
                  <Link 
                    href={`/products/${product.id}`}
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-lettuce-green text-white rounded-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Need Something Custom?
          </h2>
          <p className="text-lg mb-6">
            We can handle custom printing projects of any size. Contact us for a personalized quote.
          </p>
          <Link href="/quote" className="btn-secondary text-lg px-8 py-3 inline-block">
            Request Custom Quote
          </Link>
        </div>
      </div>
    </div>
  )
}