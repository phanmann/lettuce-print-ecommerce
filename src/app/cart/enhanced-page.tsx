'use client'

import { useState, useEffect } from 'react'
import { useCartStore, useCartItemCount, useCartTotal } from '@/stores/cartStore'
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import { productCatalog, getProductById } from '@/data/products'
import { Trash2, Plus, Minus, Package, Truck, DollarSign, Info, Calculator } from 'lucide-react'
import Link from 'next/link'

export default function EnhancedCartPage() {
  const { cart, updateQuantity, removeFromCart, updateItemSpecifications, calculateTotals } = useCartStore()
  const itemCount = useCartItemCount()
  const cartTotal = useCartTotal()
  const [loading, setLoading] = useState(false)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState<{ [key: string]: boolean }>({})
  const [recalculatingItems, setRecalculatingItems] = useState<{ [key: string]: boolean }>({})

  // Recalculate cart totals when items change
  useEffect(() => {
    calculateTotals()
  }, [cart.items, calculateTotals])

  // Recalculate individual item prices with enhanced calculator
  const recalculateItemPrice = async (item: any) => {
    const product = getProductById(item.productId)
    if (!product) return

    setRecalculatingItems(prev => ({ ...prev, [item.id]: true }))

    try {
      const calculatorInputs = {
        productId: item.productId,
        productType: item.productId,
        quantity: item.quantity,
        size: item.specifications.size,
        paperType: item.specifications.paperType,
        finish: item.specifications.finish,
        turnaroundTime: item.specifications.turnaroundTime,
      }

      const result = EnhancedPricingCalculator.calculate(calculatorInputs, product)
      
      // Update the item with new pricing
      const updatedItem = {
        ...item,
        unitPrice: result.unitPrice,
        totalPrice: result.totalPrice,
        enhancedPricing: result, // Store enhanced pricing data
      }

      // This would typically update the store, but for now we'll just show the enhanced pricing
      console.log('Updated item pricing:', updatedItem)
      
    } catch (error) {
      console.error('Error recalculating item price:', error)
    } finally {
      setRecalculatingItems(prev => ({ ...prev, [item.id]: false }))
    }
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateQuantity(itemId, newQuantity)
    }
  }

  const togglePriceBreakdown = (itemId: string) => {
    setShowPriceBreakdown(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }))
  }

  if (cart.items.length === 0) {
    return (
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
              <p className="text-gray-600 mb-6">
                Start shopping to add items to your cart and see real-time pricing calculations.
              </p>
              <Link href="/products" className="btn-primary px-6 py-3">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
                <span className="text-sm text-gray-500">{itemCount} items</span>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cart.items.map((item) => {
                  const product = getProductById(item.productId)
                  if (!product) return null

                  return (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      {/* Item Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.productName}</h3>
                          <p className="text-sm text-gray-600">{item.productDescription}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Specifications */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Size:</span>
                          <span className="ml-2 font-medium">
                            {product.specifications.sizes.find(s => s.id === item.specifications.size)?.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Paper:</span>
                          <span className="ml-2 font-medium">
                            {product.specifications.paperTypes.find(p => p.id === item.specifications.paperType)?.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Finish:</span>
                          <span className="ml-2 font-medium">
                            {product.specifications.finishes.find(f => f.id === item.specifications.finish)?.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Turnaround:</span>
                          <span className="ml-2 font-medium">
                            {product.specifications.turnaroundTimes.find(t => t.id === item.specifications.turnaroundTime)?.name}
                          </span>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">Quantity:</span>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 50)}
                              disabled={item.quantity <= 50}
                              className="p-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-16 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 50)}
                              className="p-1 rounded border border-gray-300 hover:bg-gray-50"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-gray-800">${item.totalPrice.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.unitPrice.toFixed(2)} each</p>
                        </div>
                      </div>

                      {/* Enhanced Price Breakdown */}
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => togglePriceBreakdown(item.id)}
                          className="flex items-center space-x-2 text-lettuce-green hover:text-lettuce-green-dark text-sm"
                          disabled={recalculatingItems[item.id]}
                        >
                          <Calculator className="h-3 w-3" />
                          <span>Price Details</span>
                          {recalculatingItems[item.id] && (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-lettuce-green"></div>
                          )}
                          <span className="text-xs">{showPriceBreakdown[item.id] ? '▼' : '▶'}</span>
                        </button>

                        {showPriceBreakdown[item.id] && (
                          <div className="mt-3 space-y-2 text-xs text-gray-600">
                            <div className="flex justify-between">
                              <span>Base Price ({item.quantity} × ${item.unitPrice.toFixed(2)}):</span>
                              <span>${(item.quantity * item.unitPrice).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Specifications:</span>
                              <span>Included</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Turnaround:</span>
                              <span>Included</span>
                            </div>
                            {item.quantity >= 250 && (
                              <div className="flex justify-between text-green-600">
                                <span>Volume Discount:</span>
                                <span>-${((item.quantity * item.unitPrice) * 0.05).toFixed(2)}</span>
                              </div>
                            )}
                            <div className="border-t pt-2 flex justify-between font-medium">
                              <span>Item Total:</span>
                              <span>${item.totalPrice.toFixed(2)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Custom Files */}
                      {item.customizations?.uploadedFiles && item.customizations.uploadedFiles.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">Uploaded Files:</p>
                          <div className="space-y-1">
                            {item.customizations.uploadedFiles.map((file: string, index: number) => (
                              <div key={index} className="text-xs text-gray-500 flex items-center space-x-2">
                                <span>📎</span>
                                <span>Design file {index + 1}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Special Instructions */}
                      {item.customizations?.specialInstructions && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-1">Special Instructions:</p>
                          <p className="text-xs text-gray-500">{item.customizations.specialInstructions}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Continue Shopping */}
            <Link href="/products" className="block">
              <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Continue Shopping
              </button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>

              {/* Subtotal Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cart.items.length} items):</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping:</span>
                  <span>${cart.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-lettuce-green">${cart.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Enhanced Pricing Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Pricing Information</span>
                </div>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Prices include volume discounts where applicable</li>
                  <li>• Shipping calculated based on location and quantity</li>
                  <li>• Tax calculated for NY/NYC delivery addresses</li>
                  <li>• Rush orders may incur additional fees</li>
                </ul>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block">
                <button className="w-full py-4 px-6 bg-lettuce-green text-white rounded-lg font-semibold hover:bg-lettuce-green-dark transition-colors mb-3">
                  Proceed to Checkout
                </button>
              </Link>

              {/* Continue Shopping */}
              <Link href="/products" className="block">
                <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Continue Shopping
                </button>
              </Link>

              {/* Shipping Note */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-2 text-xs text-gray-500">
                  <Truck className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>
                    Shipping costs and delivery estimates will be finalized during checkout based on your delivery address.
                  </span>
                </div>
              </div>
            </div>

            {/* Volume Discount Info */}
            {cart.items.some(item => item.quantity >= 250) && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Volume Discount Applied!</span>
                </div>
                <p className="text-xs text-green-700">
                  You're receiving volume discounts on your order. Higher quantities provide greater savings per unit.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}