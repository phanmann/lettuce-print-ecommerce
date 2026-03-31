export default function QuotePage() {
  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Get a Free Quote
            </h1>
            <p className="text-xl text-gray-600">
              Tell us about your printing project and we'll provide you with a competitive quote within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>
                <form className="space-y-6">
                  {/* Product Type */}
                  <div>
                    <label htmlFor="productType" className="block text-sm font-medium text-gray-700 mb-2">
                      What would you like to print?
                    </label>
                    <select
                      id="productType"
                      name="productType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                      required
                    >
                      <option value="">Select a product</option>
                      <option value="business-cards">Business Cards</option>
                      <option value="flyers">Flyers</option>
                      <option value="brochures">Brochures</option>
                      <option value="posters">Posters</option>
                      <option value="banners">Banners</option>
                      <option value="stickers">Stickers</option>
                      <option value="letterhead">Letterhead</option>
                      <option value="envelopes">Envelopes</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                      placeholder="e.g., 500"
                      required
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                      Size
                    </label>
                    <select
                      id="size"
                      name="size"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                    >
                      <option value="">Select size</option>
                      <option value="standard">Standard</option>
                      <option value="custom">Custom Size</option>
                    </select>
                  </div>

                  {/* Paper Type */}
                  <div>
                    <label htmlFor="paperType" className="block text-sm font-medium text-gray-700 mb-2">
                      Paper Type
                    </label>
                    <select
                      id="paperType"
                      name="paperType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                    >
                      <option value="">Select paper type</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                      <option value="recycled">Recycled</option>
                      <option value="glossy">Glossy</option>
                      <option value="matte">Matte</option>
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <select
                      id="color"
                      name="color"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                    >
                      <option value="">Select color option</option>
                      <option value="black-white">Black & White</option>
                      <option value="one-color">One Color</option>
                      <option value="full-color">Full Color</option>
                    </select>
                  </div>

                  {/* Delivery Date */}
                  <div>
                    <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      When do you need it?
                    </label>
                    <input
                      type="date"
                      id="deliveryDate"
                      name="deliveryDate"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lettuce-green focus:border-transparent"
                      placeholder="Tell us more about your project, special requirements, or questions..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary py-3"
                  >
                    Request Quote
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Why Get a Quote from Us?</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-lettuce-green mr-2 mt-1">✓</span>
                    <span>Free, no-obligation quotes within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lettuce-green mr-2 mt-1">✓</span>
                    <span>Competitive pricing with no hidden fees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lettuce-green mr-2 mt-1">✓</span>
                    <span>Expert advice on materials and finishes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lettuce-green mr-2 mt-1">✓</span>
                    <span>Fast turnaround times</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lettuce-green mr-2 mt-1">✓</span>
                    <span>Local Brooklyn service and support</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Need Help?</h3>
                <div className="space-y-3 text-gray-600">
                  <p className="flex items-center">
                    <span className="text-lettuce-green mr-2">📞</span>
                    <a href="tel:+15551234567" className="hover:text-lettuce-green transition-colors">
                      (555) 123-4567
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="text-lettuce-green mr-2">✉️</span>
                    <a href="mailto:info@lettuceprint.com" className="hover:text-lettuce-green transition-colors">
                      info@lettuceprint.com
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="text-lettuce-green mr-2">🕒</span>
                    Mon-Fri: 9AM-6PM, Sat: 10AM-4PM
                  </p>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-lettuce-green text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">What Our Customers Say</h3>
                <blockquote className="mb-4">
                  <p className="italic">
                    "Lettuce Print has been our go-to printing partner for over a year. Their quality is consistently excellent, and their turnaround times are incredible."
                  </p>
                </blockquote>
                <cite className="text-sm">— Sarah Johnson, Brooklyn Café</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}