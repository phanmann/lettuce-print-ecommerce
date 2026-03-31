'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCartStore } from '@/stores/cartStore'
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import { Star, ShoppingCart, Check, Calculator, Info, Upload, Package, Clock, Circle, Square, Shapes } from 'lucide-react'

export default function RollLabelsProductPage() {
  const [selectedShape, setSelectedShape] = useState('circle')
  const [selectedStock, setSelectedStock] = useState('standard')
  const [selectedFinish, setSelectedFinish] = useState('matte')
  const [labelSize, setLabelSize] = useState({ width: '2', length: '2' })
  const [quantity, setQuantity] = useState(100)
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null)
  const [priceLoading, setPriceLoading] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [quantitySuggestions, setQuantitySuggestions] = useState<any[]>([])

  const addToCart = useCartStore((state) => state.addToCart)

  // Roll labels specific data
  const rollLabelsData = {
    id: 'roll-labels',
    name: 'Premium Roll Labels',
    description: 'Premium roll labels perfect for product packaging, branding, and promotional use. Available in various shapes, sizes, and finishes with custom printing options.',
    rating: 4.8,
    reviewCount: 127,
    category: 'Labels & Stickers',
    basePrice: 35.00,
    images: ['/images/products/roll-labels-hero.jpg'],
    specifications: {
      shapes: [
        { 
          id: 'circle', 
          name: 'Circle', 
          description: 'Round labels perfect for branding', 
          priceMultiplier: 1.0,
          icon: Circle 
        },
        { 
          id: 'square', 
          name: 'Square', 
          description: 'Square labels for modern packaging', 
          priceMultiplier: 1.1,
          icon: Square 
        },
        { 
          id: 'custom', 
          name: 'Custom Shape', 
          description: 'Any custom shape you need', 
          priceMultiplier: 1.5,
          icon: Shapes 
        },
      ],

      stockOptions: [
        { 
          id: 'standard', 
          name: 'Standard Paper', 
          description: 'White paper material - cost effective',
          priceMultiplier: 1.0 
        },
        { 
          id: 'bopp', 
          name: 'BOPP (Waterproof)', 
          description: 'Durable plastic material - waterproof',
          priceMultiplier: 1.4 
        },
      ],
      finishes: [
        { 
          id: 'matte', 
          name: 'Matte Laminate', 
          description: 'Non-glare matte laminate finish',
          priceMultiplier: 1.0 
        },
        { 
          id: 'gloss', 
          name: 'Gloss Laminate', 
          description: 'High-gloss laminate finish',
          priceMultiplier: 1.1 
        },
      ],
    },
    quantityPricing: [
      { min: 100, max: 249, unitPrice: 0.35, savings: 0 },
      { min: 250, max: 499, unitPrice: 0.28, savings: 20 },
      { min: 500, max: 999, unitPrice: 0.21, savings: 40 },
      { min: 1000, max: 2499, unitPrice: 0.14, savings: 60 },
      { min: 2500, max: 4999, unitPrice: 0.11, savings: 69 },
      { min: 5000, max: 10000, unitPrice: 0.09, savings: 74 },
    ],
  }

  // Calculate size multiplier based on area
  const calculateSizeMultiplier = () => {
    const width = parseFloat(labelSize.width) || 1
    const length = parseFloat(labelSize.length) || 1
    const area = width * length
    
    // Base pricing on area (square inches)
    if (area <= 1) return 1.0
    if (area <= 2.25) return 1.25  // 1.5" x 1.5"
    if (area <= 4) return 1.5      // 2" x 2"
    if (area <= 6.25) return 1.75  // 2.5" x 2.5"
    if (area <= 9) return 2.0      // 3" x 3"
    if (area <= 16) return 2.5     // 4" x 4"
    return Math.min(3.0, 1 + (area - 1) * 0.15) // Cap at 3x for very large sizes
  }

  // Calculate pricing based on selections
  const calculatePricing = async () => {
    setPriceLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 300))
    
    try {
      const calculatorInputs = {
        productId: rollLabelsData.id,
        productType: 'roll-labels',
        quantity,
        width: labelSize.width,
        length: labelSize.length,
        shape: selectedShape,
        paperType: selectedStock,
        finish: selectedFinish,
        turnaroundTime: 'standard',
        shippingZipCode: '11201',
      }

      const selectedShapeData = rollLabelsData.specifications.shapes.find(s => s.id === selectedShape)
      const sizeMultiplier = calculateSizeMultiplier()
      const selectedStockData = rollLabelsData.specifications.stockOptions.find(s => s.id === selectedStock)
      const selectedFinishData = rollLabelsData.specifications.finishes.find(f => f.id === selectedFinish)
      
      const totalMultiplier = (selectedShapeData?.priceMultiplier || 1) * 
                             sizeMultiplier * 
                             (selectedStockData?.priceMultiplier || 1) * 
                             (selectedFinishData?.priceMultiplier || 1)

      const mockProduct = {
        id: rollLabelsData.id,
        basePrice: rollLabelsData.basePrice * totalMultiplier,
        specifications: {
          sizes: [{ id: 'custom', priceMultiplier: 1 }],
          paperTypes: [{ id: selectedStock, priceMultiplier: 1 }],
          finishes: [{ id: selectedFinish, priceMultiplier: 1 }],
          turnaroundTimes: [{ id: 'standard', priceMultiplier: 1 }],
        },
      } as any

      const result = EnhancedPricingCalculator.calculate(calculatorInputs, mockProduct)
      setCalculatedPrice(result)
      
    } catch (error) {
      console.error('Error calculating pricing:', error)
    } finally {
      setPriceLoading(false)
    }
  }

  useEffect(() => {
    calculatePricing()
  }, [labelSize, selectedShape, selectedStock, selectedFinish, quantity])

  const handleAddToCart = async () => {
    setAddingToCart(true)
    
    try {
      const cartItem = {
        productId: rollLabelsData.id,
        productName: rollLabelsData.name,
        productDescription: rollLabelsData.description,
        quantity,
        unitPrice: calculatedPrice?.unitPrice || 0,
        specifications: {
          shape: selectedShape,
          width: labelSize.width,
          length: labelSize.length,
          paperType: selectedStock,
          finish: selectedFinish,
          turnaroundTime: 'standard',
        },
        customizations: {
          uploadedFiles: [],
          specialInstructions: `Size: ${labelSize.width}" W x ${labelSize.length}" L`,
        },
        addedAt: new Date(),
      }
      
      addToCart(cartItem)
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setAddingToCart(false)
    }
  }



  const getCurrentQuantityTier = () => {
    return rollLabelsData.quantityPricing.find(tier => quantity >= tier.min && quantity <= tier.max) || rollLabelsData.quantityPricing[0]
  }

  const currentTier = getCurrentQuantityTier()
  const selectedShapeData = rollLabelsData.specifications.shapes.find(s => s.id === selectedShape)
  const selectedStockData = rollLabelsData.specifications.stockOptions.find(s => s.id === selectedStock)
  const selectedFinishData = rollLabelsData.specifications.finishes.find(f => f.id === selectedFinish)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" className="hover:text-lettuce-green transition-colors">Home</a></li>
            <li>/</li>
            <li><a href="/products" className="hover:text-lettuce-green transition-colors">Products</a></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Roll Labels</li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Product Images and Info */}
          <div className="space-y-8">
            {/* Product Header */}
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-5xl font-bold text-gray-900">{rollLabelsData.name}</h1>
                <span className="bg-lettuce-pale text-lettuce-green text-xs font-medium px-3 py-1 rounded-full">
                  Best Seller
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(rollLabelsData.rating) ? 'text-lettuce-green fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {rollLabelsData.rating} ({rollLabelsData.reviewCount} reviews)
                </span>
              </div>
              
              <p className="text-lg text-gray-600 mb-6">
                {rollLabelsData.description}
              </p>
              
              <button className="bg-lettuce-pale text-lettuce-green px-6 py-3 rounded-lg font-medium hover:bg-lettuce-green hover:text-white transition-colors">
                Order Samples
              </button>
            </div>

            {/* Product Image */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-lettuce-pale to-white flex items-center justify-center">
                <div className="text-center animate-scale-in">
                  <Package className="h-32 w-32 text-lettuce-green mx-auto mb-6" />
                  <p className="text-gray-600 text-xl font-medium mb-2">{selectedShapeData?.name} Labels Preview</p>
                  <p className="text-gray-500 text-sm">{selectedStockData?.name} - {selectedFinishData?.name}</p>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-lettuce-green mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Multiple Shapes</p>
                    <p className="text-sm text-gray-600">Circle, square, and custom shapes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Premium Materials</p>
                    <p className="text-sm text-gray-600">Standard paper and waterproof BOPP</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Finish Options</p>
                    <p className="text-sm text-gray-600">Matte and gloss finishes available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Volume Discounts</p>
                    <p className="text-sm text-gray-600">Save up to 74% with larger quantities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Pricing Calculator */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 sticky top-8 shadow-lg animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pricing Calculator</h2>
            
            {/* Shape Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Label Shape</label>
              <div className="grid grid-cols-1 gap-2">
                {rollLabelsData.specifications.shapes.map((shape) => {
                  const IconComponent = shape.icon
                  return (
                    <label key={shape.id} className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <input
                        type="radio"
                        name="shape"
                        value={shape.id}
                        checked={selectedShape === shape.id}
                        onChange={() => setSelectedShape(shape.id)}
                        className="text-lettuce-green focus:ring-lettuce-green"
                      />
                      <div className="ml-3 flex-1 flex items-center space-x-3">
                        <IconComponent className="h-4 w-4 text-lettuce-green" />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">{shape.name}</p>
                          <p className="text-xs text-gray-500">{shape.description}</p>
                        </div>
                        {shape.priceMultiplier > 1 && (
                          <div className="text-xs text-gray-600">
                            +{Math.round((shape.priceMultiplier - 1) * 100)}%
                          </div>
                        )}
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Label Size</label>
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Width (inches)</label>
                    <input
                      type="number"
                      value={labelSize.width}
                      onChange={(e) => setLabelSize({...labelSize, width: e.target.value})}
                      placeholder="2.0"
                      min="0.5"
                      max="12"
                      step="0.1"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <span className="text-gray-500 text-lg font-medium">×</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Length (inches)</label>
                    <input
                      type="number"
                      value={labelSize.length}
                      onChange={(e) => setLabelSize({...labelSize, length: e.target.value})}
                      placeholder="2.0"
                      min="0.5"
                      max="12"
                      step="0.1"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-500">
                    Size: {labelSize.width}" × {labelSize.length}" 
                    ({(parseFloat(labelSize.width || '0') * parseFloat(labelSize.length || '0')).toFixed(1)} sq in)
                  </span>
                </div>
              </div>
            </div>

            {/* Stock Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Stock Material</label>
              <div className="space-y-2">
                {rollLabelsData.specifications.stockOptions.map((stock) => (
                  <label key={stock.id} className="flex items-start p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                    <input
                      type="radio"
                      name="stock"
                      value={stock.id}
                      checked={selectedStock === stock.id}
                      onChange={() => setSelectedStock(stock.id)}
                      className="text-lettuce-green focus:ring-lettuce-green mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-gray-900 text-sm">{stock.name}</p>
                        {stock.priceMultiplier > 1 && (
                          <span className="text-xs text-gray-600">+{Math.round((stock.priceMultiplier - 1) * 100)}%</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{stock.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Finish Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Finish</label>
              <div className="space-y-2">
                {rollLabelsData.specifications.finishes.map((finish) => (
                  <label key={finish.id} className="flex items-start p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-200">
                    <input
                      type="radio"
                      name="finish"
                      value={finish.id}
                      checked={selectedFinish === finish.id}
                      onChange={() => setSelectedFinish(finish.id)}
                      className="text-lettuce-green focus:ring-lettuce-green mt-1"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium text-gray-900 text-sm">{finish.name}</p>
                        {finish.priceMultiplier > 1 && (
                          <span className="text-xs text-gray-600">+{Math.round((finish.priceMultiplier - 1) * 100)}%</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{finish.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">Quantity</label>
              
              {/* Quantity Input */}
              <div className="flex items-center space-x-4 mb-6">
                <button
                  onClick={() => setQuantity(Math.max(100, quantity - 50))}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(100, parseInt(e.target.value) || 100))}
                  className="w-24 text-center border border-gray-300 rounded-lg px-3 py-2 font-medium"
                />
                <button
                  onClick={() => setQuantity(quantity + 50)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>

              {/* Quantity Tiers */}
              <div className="space-y-2">
                {rollLabelsData.quantityPricing.map((tier, index) => (
                  <button
                    key={index}
                    onClick={() => setQuantity(tier.min)}
                    className={`w-full p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-sm ${
                      quantity >= tier.min && quantity <= tier.max
                        ? 'border-lettuce-green bg-lettuce-pale'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          {tier.min === tier.max ? tier.min : `${tier.min}-${tier.max}`} labels
                        </p>
                        <p className="text-sm text-gray-600">${tier.unitPrice.toFixed(2)} per label</p>
                      </div>
                      {tier.savings > 0 && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-lettuce-green">Save {tier.savings}%</p>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl relative">
              {priceLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-lettuce-green"></div>
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Price</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-gray-900 transition-all duration-300">
                      ${calculatedPrice?.finalTotal.toFixed(2) || '0.00'}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${calculatedPrice?.unitPrice.toFixed(3) || '0.000'} per label
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="flex items-center space-x-2 text-lettuce-green hover:text-lettuce-dark"
                >
                  <Calculator className="h-4 w-4" />
                  <span className="text-sm">Details</span>
                </button>
              </div>

              {/* Price Breakdown */}
              {showPriceBreakdown && calculatedPrice && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Labels:</span>
                    <span>${calculatedPrice.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>${calculatedPrice.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax:</span>
                    <span>${calculatedPrice.taxAmount.toFixed(2)}</span>
                  </div>
                  {calculatedPrice.volumeDiscount > 0 && (
                    <div className="flex justify-between text-sm text-lettuce-green">
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

              {/* Current Savings */}
              {currentTier.savings > 0 && (
                <div className="mt-4 p-3 bg-lettuce-pale rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Info className="h-4 w-4 text-lettuce-green" />
                    <span className="text-lettuce-dark font-medium text-sm">
                      You're saving {currentTier.savings}% with this quantity!
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Info */}
            {calculatedPrice && (
              <div className="mb-8 p-4 bg-lettuce-pale rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-lettuce-green" />
                  <span className="text-sm font-medium text-lettuce-dark">Estimated Delivery</span>
                </div>
                <p className="text-sm text-lettuce-dark">
                  {calculatedPrice.deliveryInfo.estimatedDelivery}
                </p>
                <p className="text-xs text-lettuce-green mt-1">
                  Production: {calculatedPrice.deliveryInfo.productionTime} days + 
                  Shipping: {calculatedPrice.deliveryInfo.shippingTime} days
                </p>
              </div>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || addedToCart}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-colors flex items-center justify-center space-x-2 ${
                addedToCart
                  ? 'bg-lettuce-green hover:bg-lettuce-dark'
                  : 'bg-lettuce-green hover:bg-lettuce-dark'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {addingToCart ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Adding to Cart...</span>
                </>
              ) : addedToCart ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart - ${calculatedPrice?.finalTotal.toFixed(2)}</span>
                </>
              )}
            </button>

            {/* Next Step */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Next step: Upload your artwork</p>
              <div className="flex items-center justify-center space-x-2 text-lettuce-green">
                <Upload className="h-4 w-4" />
                <span className="text-sm font-medium">Upload Artwork →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
