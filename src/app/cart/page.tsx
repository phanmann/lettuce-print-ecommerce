'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/stores/cartStore'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, calculateTotals } = useCartStore()
  
  useEffect(() => {
    calculateTotals()
  }, [calculateTotals])

  const handleQuantityUpdate = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
  }

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
              {cart.items.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                  <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                  <Link href="/products" className="btn-primary px-6 py-3">
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">🖨️</span>
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.productDescription}</p>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p>Quantity: {item.quantity}</p>
                            {item.specifications.size && (
                              <p>Size: {item.specifications.size}</p>
                            )}
                            {item.specifications.paperType && (
                              <p>Paper: {item.specifications.paperType}</p>
                            )}
                            {item.specifications.finish && (
                              <p>Finish: {item.specifications.finish}</p>
                            )}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2 mt-3">
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}
                              className="p-1 rounded border border-gray-300 hover:bg-gray-50"
                            >
                              -
                            </button>
                            <span className="px-2">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}
                              className="p-1 rounded border border-gray-300 hover:bg-gray-50"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-lettuce-green">${item.totalPrice.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.unitPrice.toFixed(2)} each</p>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm mt-2"
                          >
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
                    <span className="font-semibold">${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${cart.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${cart.shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-lettuce-green">${cart.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href={cart.items.length > 0 ? "/checkout" : "#"}
                  className={`w-full btn-primary mt-6 py-3 block text-center ${
                    cart.items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Proceed to Checkout
                </Link>
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