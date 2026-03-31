export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: 'Business Cards',
      description: 'Premium business cards with glossy finish',
      quantity: 500,
      price: 75.00,
      image: '/images/business-cards.jpg'
    },
    {
      id: 2,
      name: 'Flyers',
      description: 'Marketing flyers, full color',
      quantity: 1000,
      price: 150.00,
      image: '/images/flyers.jpg'
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
            <p className="text-gray-600">Review your items and proceed to checkout</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                  <a href="/products" className="btn-primary px-6 py-3">
                    Continue Shopping
                  </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🖨️</span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>

                        {/* Price and Actions */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-lettuce-green">${item.price.toFixed(2)}</p>
                          <button className="text-red-500 hover:text-red-700 text-sm mt-2">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-lettuce-green">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full btn-primary mt-6 py-3">
                  Proceed to Checkout
                </button>
              </div>

              {/* Continue Shopping */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Need more items?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Browse our full range of printing services and products.
                </p>
                <a href="/products" className="w-full btn-secondary py-2 px-4 block text-center">
                  Continue Shopping
                </a>
              </div>

              {/* Help */}
              <div className="bg-lettuce-green text-white rounded-lg p-6">
                <h4 className="font-bold mb-3">Need Help?</h4>
                <p className="text-sm mb-3">
                  Have questions about your order or need assistance?
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <span className="mr-2">📞</span>
                    <a href="tel:+15551234567" className="hover:underline">
                      (555) 123-4567
                    </a>
                  </p>
                  <p className="flex items-center">
                    <span className="mr-2">✉️</span>
                    <a href="mailto:info@lettuceprint.com" className="hover:underline">
                      info@lettuceprint.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}