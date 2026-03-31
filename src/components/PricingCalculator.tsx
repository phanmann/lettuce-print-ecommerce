'use client'

import { useState, useEffect, useCallback } from 'react'
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import { productCatalog, getProductById } from '@/data/products'
import { Plus, Minus, Calculator, DollarSign, Truck, Clock, Info, Check } from 'lucide-react'

interface PricingCalculatorProps {
  productId: string
  onPriceChange?: (price: number) => void
  className?: string
}

export default function PricingCalculator({ productId, onPriceChange, className = '' }: PricingCalculatorProps) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [priceLoading, setPriceLoading] = useState(false)
  
  // Configuration state
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedPaperType, setSelectedPaperType] = useState('')
  const [selectedFinish, setSelectedFinish] = useState('')
  const [selectedTurnaround, setSelectedTurnaround] = useState('')
  const [quantity, setQuantity] = useState(100)
  const [shippingZipCode, setShippingZipCode] = useState('11201')
  
  // Pricing state
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null)
  const [quantitySuggestions, setQuantitySuggestions] = useState<any[]>([])
  const [priceValidations, setPriceValidations] = useState<any>(null)
  
  // UI state
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [showQuantitySavings, setShowQuantitySavings] = useState(true)

  useEffect(() => {
    const foundProduct = getProductById(productId)
    if (foundProduct) {
      setProduct(foundProduct)
      // Set default selections
      setSelectedSize(foundProduct.specifications.sizes[0]?.id || '')
      setSelectedPaperType(foundProduct.specifications.paperTypes[0]?.id || '')
      setSelectedFinish(foundProduct.specifications.finishes[0]?.id || '')
      setSelectedTurnaround(foundProduct.specifications.turnaroundTimes[0]?.id || '')
    }
    setLoading(false)
  }, [productId])

  // Real-time price calculation
  const calculatePricing = useCallback(async () => {
    if (!product || !selectedSize || !selectedPaperType || !selectedFinish || !selectedTurnaround) return

    setPriceLoading(true)
    
    try {
      const calculatorInputs = {
        productId: product.id,
        productType: product.id,
        quantity,
        size: selectedSize,
        paperType: selectedPaperType,
        finish: selectedFinish,
        turnaroundTime: selectedTurnaround,
        shippingZipCode,
      }

      const result = EnhancedPricingCalculator.calculate(calculatorInputs, product)
      const validation = EnhancedPricingCalculator.validate(calculatorInputs, result.finalTotal)
      
      setCalculatedPrice(result)
      setPriceValidations(validation)
      
      // Get quantity suggestions
      const suggestions = EnhancedPricingCalculator.suggestQuantities(productId, quantity, {
        size: selectedSize,
        paperType: selectedPaperType,
        finish: selectedFinish,
        turnaroundTime: selectedTurnaround,
      })
      setQuantitySuggestions(suggestions)
      
      // Notify parent component of price change
      if (onPriceChange) {
        onPriceChange(result.finalTotal)
      }
      
    } catch (error) {
      console.error('Error calculating pricing:', error)
      setPriceValidations({ isValid: false, reason: 'Error calculating price' })
    } finally {
      setPriceLoading(false)
    }
  }, [product, selectedSize, selectedPaperType, selectedFinish, selectedTurnaround, quantity, shippingZipCode, productId, onPriceChange])

  // Trigger price calculation when inputs change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      calculatePricing()
    }, 300) // Debounce to prevent excessive calculations

    return () => clearTimeout(debounceTimer)
  }, [calculatePricing])

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lettuce-green"></div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Price Calculator</h3>
        {priceLoading && (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-lettuce-green"></div>
        )}
      </div>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 50))}
            disabled={quantity <= 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
          >
            <Minus className="h-4 w-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-24 text-center border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
          />
          <button
            onClick={() => setQuantity(quantity + 50)}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Size</label>
        <div className="grid grid-cols-1 gap-2">
          {product.specifications.sizes.map((size: any) => (
            <label key={size.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="size"
                value={size.id}
                checked={selectedSize === size.id}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="text-lettuce-green focus:ring-lettuce-green"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{size.name}</p>
                <p className="text-xs text-gray-500">{size.dimensions}</p>
              </div>
              {size.priceMultiplier > 1 && (
                <span className="text-xs text-gray-600">+{Math.round((size.priceMultiplier - 1) * 100)}%</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Paper Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Paper Type</label>
        <div className="grid grid-cols-1 gap-2">
          {product.specifications.paperTypes.map((paper: any) => (
            <label key={paper.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="paperType"
                value={paper.id}
                checked={selectedPaperType === paper.id}
                onChange={(e) => setSelectedPaperType(e.target.value)}
                className="text-lettuce-green focus:ring-lettuce-green"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{paper.name}</p>
                <p className="text-xs text-gray-500">{paper.description}</p>
              </div>
              {paper.priceMultiplier > 1 && (
                <span className="text-xs text-gray-600">+{Math.round((paper.priceMultiplier - 1) * 100)}%</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Finish Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Finish</label>
        <div className="grid grid-cols-1 gap-2">
          {product.specifications.finishes.map((finish: any) => (
            <label key={finish.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="finish"
                value={finish.id}
                checked={selectedFinish === finish.id}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="text-lettuce-green focus:ring-lettuce-green"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{finish.name}</p>
                <p className="text-xs text-gray-500">{finish.description}</p>
              </div>
              {finish.priceMultiplier > 1 && (
                <span className="text-xs text-gray-600">+{Math.round((finish.priceMultiplier - 1) * 100)}%</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Turnaround Time Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Turnaround Time</label>
        <div className="grid grid-cols-1 gap-2">
          {product.specifications.turnaroundTimes.map((turnaround: any) => (
            <label key={turnaround.id} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="turnaround"
                value={turnaround.id}
                checked={selectedTurnaround === turnaround.id}
                onChange={(e) => setSelectedTurnaround(e.target.value)}
                className="text-lettuce-green focus:ring-lettuce-green"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{turnaround.name}</p>
                <p className="text-xs text-gray-500">{turnaround.days} days</p>
              </div>
              {turnaround.priceMultiplier > 1 && (
                <span className="text-xs text-gray-600">+{Math.round((turnaround.priceMultiplier - 1) * 100)}%</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Shipping Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Shipping ZIP Code
        </label>
        <input
          type="text"
          value={shippingZipCode}
          onChange={(e) => setShippingZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
          placeholder="11201"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-lettuce-green focus:border-lettuce-green"
        />
      </div>

      {/* Pricing Display */}
      {calculatedPrice && (
        <div className="border-t pt-6">
          {/* Total Price */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Price</span>
              {priceLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-lettuce-green"></div>
              )}
            </div>
            <p className="text-3xl font-bold text-lettuce-green">
              ${calculatedPrice.finalTotal.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              ${calculatedPrice.unitPrice.toFixed(2)} per unit
            </p>
          </div>

          {/* Price Breakdown Toggle */}
          <div className="mb-4">
            <button
              onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
              className="flex items-center space-x-2 text-lettuce-green hover:text-lettuce-green-dark text-sm w-full"
            >
              <Calculator className="h-4 w-4" />
              <span>Price Breakdown</span>
              <span className="text-xs ml-auto">{showPriceBreakdown ? '▼' : '▶'}</span>
            </button>
            
            {showPriceBreakdown && (
              <div className="mt-3 space-y-2 text-sm border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${calculatedPrice.totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${calculatedPrice.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${calculatedPrice.taxAmount.toFixed(2)}</span>
                </div>
                {calculatedPrice.volumeDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Volume Discount:</span>
                    <span>-${calculatedPrice.volumeDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${calculatedPrice.finalTotal.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Savings Display */}
          {calculatedPrice.savings.amount > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-green-800 font-medium text-sm">
                  You save {calculatedPrice.savings.percentage}% (${calculatedPrice.savings.amount.toFixed(2)})
                </span>
              </div>
            </div>
          )}

          {/* Delivery Information */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Truck className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Delivery</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">
                <strong>{calculatedPrice.deliveryInfo.estimatedDelivery}</strong>
              </p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{calculatedPrice.deliveryInfo.productionTime} days production</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Truck className="h-3 w-3" />
                  <span>{calculatedPrice.deliveryInfo.shippingTime} days shipping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity Suggestions */}
          {showQuantitySavings && quantitySuggestions.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Save More</span>
                <button
                  onClick={() => setShowQuantitySavings(!showQuantitySavings)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  {showQuantitySavings ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="space-y-2">
                {quantitySuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => setQuantity(suggestion.quantity)}
                    className="w-full text-left p-2 rounded border border-gray-200 hover:border-lettuce-green hover:bg-lettuce-green hover:bg-opacity-5 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-sm">{suggestion.quantity} units</span>
                        <span className="text-xs text-gray-500 ml-2">${suggestion.unitPrice.toFixed(2)}/each</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-green-600 font-medium">
                          Save {suggestion.savingsPercentage.toFixed(0)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          ${suggestion.totalPrice.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Validation */}
          {priceValidations?.warnings && priceValidations.warnings.length > 0 && (
            <div className="mb-4 space-y-1">
              {priceValidations.warnings.map((warning: string, index: number) => (
                <div key={index} className="flex items-start space-x-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                  <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          )}

          {/* Validation Error */}
          {!priceValidations?.isValid && priceValidations?.reason && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">
              {priceValidations.reason}
            </div>
          )}
        </div>
      )}
    </div>
  )
}