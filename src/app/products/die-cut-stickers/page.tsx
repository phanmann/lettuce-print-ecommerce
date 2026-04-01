'use client'

import React, { useState, useEffect } from 'react'
import { 
  Star, ArrowRight, Check, Sparkles, Scissors, Calculator,
  Award, Truck, Shield, Info, ChevronRight, Package
} from 'lucide-react'
import EnhancedLabelPreview from '@/components/EnhancedLabelPreview'

interface StickerConfig {
  size: {
    width: number
    height: number
    name: string
  }
  quantity: number
  material: 'vinyl' | 'paper' | 'clear' | 'holographic' | 'kraft'
  cutting: 'die-cut' | 'kiss-cut'
  finish: 'matte' | 'gloss'
}

const PRESET_SIZES = [
  { id: '2x2', name: '2" × 2"', width: 2, height: 2, popular: true },
  { id: '3x3', name: '3" × 3"', width: 3, height: 3, popular: true },
  { id: '4x4', name: '4" × 4"', width: 4, height: 4, popular: false },
  { id: '5x5', name: '5" × 5"', width: 5, height: 5, popular: false },
  { id: 'custom', name: 'Custom size', width: 0, height: 0, popular: false }
]

const QUANTITY_OPTIONS = [
  { qty: 50, discount: 0, popular: false },
  { qty: 100, discount: 0.15, popular: true },
  { qty: 200, discount: 0.25, popular: false },
  { qty: 300, discount: 0.35, popular: false },
  { qty: 500, discount: 0.45, popular: true },
  { qty: 1000, discount: 0.55, popular: false },
  { qty: 2000, discount: 0.65, popular: false },
  { qty: 3000, discount: 0.70, popular: false },
  { qty: 5000, discount: 0.75, popular: false },
  { qty: 10000, discount: 0.80, popular: false }
]

const MATERIALS = [
  {
    id: 'vinyl',
    name: 'Premium Vinyl',
    description: 'Waterproof, 5+ year outdoor life',
    features: ['Waterproof', 'UV Resistant', '5+ Year Life', 'Dishwasher Safe'],
    priceMultiplier: 1.0,
    popular: true
  },
  {
    id: 'paper',
    name: 'Paper Stock',
    description: 'Cost-effective for indoor use',
    features: ['Indoor Use', 'Eco-Friendly', 'Budget Option', 'Smooth Finish'],
    priceMultiplier: 0.8,
    popular: false
  },
  {
    id: 'clear',
    name: 'Clear Vinyl',
    description: 'Transparent with printed colors only',
    features: ['See-Through', 'Premium Look', 'Window Safe', 'No White Base'],
    priceMultiplier: 1.2,
    popular: false
  },
  {
    id: 'holographic',
    name: 'Holographic',
    description: 'Prismatic rainbow effect',
    features: ['Rainbow Effect', 'Eye-Catching', 'Premium Feel', 'Unique Look'],
    priceMultiplier: 1.5,
    popular: false
  },
  {
    id: 'kraft',
    name: 'Kraft Paper',
    description: 'Natural brown paper aesthetic',
    features: ['Natural Look', 'Eco-Friendly', 'Rustic Feel', 'Biodegradable'],
    priceMultiplier: 0.9,
    popular: false
  }
]

const CUTTING_METHODS = [
  {
    id: 'die-cut',
    name: 'Die-Cut',
    description: 'Cut completely through, individual stickers ready to peel',
    features: ['Individual stickers', 'Easy to peel', 'Professional finish', 'Custom shapes'],
    priceMultiplier: 1.0,
    recommended: true
  },
  {
    id: 'kiss-cut',
    name: 'Kiss-Cut',
    description: 'Cut through sticker only, leaves backing intact',
    features: ['Sheet format', 'Easy weeding', 'Multiple per sheet', 'Clean removal'],
    priceMultiplier: 0.9,
    recommended: false
  }
]

export default function DieCutStickersPage() {
  const [step, setStep] = useState(1) // 1: Size/Qty, 2: Material/Cutting, 3: Design
  const [config, setConfig] = useState<StickerConfig>({
    size: { width: 2, height: 2, name: '2" × 2"' },
    quantity: 100,
    material: 'vinyl',
    cutting: 'die-cut',
    finish: 'gloss'
  })
  
  const [selectedSizeId, setSelectedSizeId] = useState('2x2')
  const [customSize, setCustomSize] = useState({ width: '', height: '' })
  const [customQuantity, setCustomQuantity] = useState('')
  const [showCustomQuantity, setShowCustomQuantity] = useState(false)
  const [showCustomSize, setShowCustomSize] = useState(false)

  // Calculate pricing
  const calculatePrice = (qty: number, sizeWidth: number, sizeHeight: number) => {
    const basePrice = 0.35 // Base price per sticker
    const sizeMultiplier = (sizeWidth * sizeHeight) / 4 // Based on 2x2 baseline
    const materialMultiplier = MATERIALS.find(m => m.id === config.material)?.priceMultiplier || 1
    const cuttingMultiplier = CUTTING_METHODS.find(c => c.id === config.cutting)?.priceMultiplier || 1
    
    const quantityOption = QUANTITY_OPTIONS.find(q => q.qty === qty)
    const discount = quantityOption?.discount || 0
    
    const unitPrice = basePrice * sizeMultiplier * materialMultiplier * cuttingMultiplier
    const discountedPrice = unitPrice * (1 - discount)
    
    return {
      unitPrice: discountedPrice,
      totalPrice: discountedPrice * qty,
      savings: qty > 50 ? Math.round((unitPrice - discountedPrice) * qty) : 0,
      savingsPercent: Math.round(discount * 100)
    }
  }

  const currentPrice = calculatePrice(config.quantity, config.size.width, config.size.height)

  const handleSizeSelect = (sizeId: string) => {
    setSelectedSizeId(sizeId)
    if (sizeId === 'custom') {
      setShowCustomSize(true)
    } else {
      setShowCustomSize(false)
      const size = PRESET_SIZES.find(s => s.id === sizeId)!
      setConfig(prev => ({
        ...prev,
        size: { width: size.width, height: size.height, name: size.name }
      }))
    }
  }

  const handleQuantitySelect = (qty: number) => {
    setConfig(prev => ({ ...prev, quantity: qty }))
    setShowCustomQuantity(false)
  }

  const handleCustomSizeUpdate = () => {
    const width = parseFloat(customSize.width)
    const height = parseFloat(customSize.height)
    if (width > 0 && height > 0) {
      setConfig(prev => ({
        ...prev,
        size: { width, height, name: `${width}" × ${height}"` }
      }))
    }
  }

  const handleCustomQuantityUpdate = () => {
    const qty = parseInt(customQuantity)
    if (qty > 0) {
      setConfig(prev => ({ ...prev, quantity: qty }))
    }
  }

  useEffect(() => {
    if (showCustomSize && customSize.width && customSize.height) {
      handleCustomSizeUpdate()
    }
  }, [customSize])

  useEffect(() => {
    if (showCustomQuantity && customQuantity) {
      handleCustomQuantityUpdate()
    }
  }, [customQuantity])

  // Step 1: Size & Quantity Selection
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  Die-cut stickers
                  <div className="ml-3 flex items-center">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-blue-600">89,534 reviews</span>
                  </div>
                </h1>
                <p className="text-gray-600 mt-1 max-w-2xl">
                  Custom die cut stickers are a fast and easy way to promote your business, brand, or event. 
                  Perfect stickers for laptops, water bottles, and more. Thick, durable vinyl protects your 
                  stickers from scratches, water, and sunlight. They're even dishwasher safe.
                </p>
              </div>
              
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                Order samples
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side - Sticker Examples */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4">
                  {/* Sample stickers display */}
                  <div className="w-20 h-20 bg-teal-500 rounded-lg shadow-lg transform rotate-3 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 text-teal-500" />
                    </div>
                  </div>
                  <div className="w-20 h-20 bg-pink-400 rounded-lg shadow-lg transform -rotate-2 flex items-center justify-center">
                    <span className="text-white font-bold text-xs text-center">ADMIT<br/>ONE</span>
                  </div>
                  <div className="w-20 h-20 bg-yellow-400 rounded-full shadow-lg transform rotate-1 flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <div className="w-20 h-20 bg-blue-500 rounded-lg shadow-lg transform rotate-2 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-sm"></div>
                  </div>
                  <div className="w-20 h-20 bg-green-500 rounded-lg shadow-lg transform -rotate-3 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">$</span>
                  </div>
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-lg transform rotate-1 flex items-center justify-center">
                    <div className="w-10 h-6 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Premium Quality</h3>
                  <p className="text-sm text-gray-600">Thick, durable vinyl that lasts</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Scissors className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Precision Cut</h3>
                  <p className="text-sm text-gray-600">Perfect edges, any shape</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                  <p className="text-sm text-gray-600">2-3 day turnaround</p>
                </div>
              </div>
            </div>

            {/* Right Side - Configuration */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                
                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select a size
                  </h3>
                  
                  <div className="space-y-3">
                    {PRESET_SIZES.map((size) => (
                      <label key={size.id} className="block">
                        <input
                          type="radio"
                          name="size"
                          value={size.id}
                          checked={selectedSizeId === size.id}
                          onChange={() => handleSizeSelect(size.id)}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedSizeId === size.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{size.name}</span>
                            {size.popular && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Popular
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Custom Size Inputs */}
                  {showCustomSize && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Width (")
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="12"
                            value={customSize.width}
                            onChange={(e) => setCustomSize(prev => ({ ...prev, width: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="2.0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Height (")
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="12"
                            value={customSize.height}
                            onChange={(e) => setCustomSize(prev => ({ ...prev, height: e.target.value }))}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="2.0"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select a quantity
                  </h3>
                  
                  <div className="space-y-2">
                    {QUANTITY_OPTIONS.map((option) => (
                      <label key={option.qty} className="block">
                        <input
                          type="radio"
                          name="quantity"
                          value={option.qty}
                          checked={config.quantity === option.qty && !showCustomQuantity}
                          onChange={() => handleQuantitySelect(option.qty)}
                          className="sr-only"
                        />
                        <div className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          config.quantity === option.qty && !showCustomQuantity
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option.qty.toLocaleString()}</span>
                            <div className="text-right">
                              <div className="font-bold">
                                ${calculatePrice(option.qty, config.size.width, config.size.height).totalPrice.toFixed(0)}
                              </div>
                              {option.discount > 0 && (
                                <div className="text-xs text-green-600">
                                  Save {Math.round(option.discount * 100)}%
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                    
                    {/* Custom Quantity */}
                    <label className="block">
                      <input
                        type="radio"
                        name="quantity"
                        checked={showCustomQuantity}
                        onChange={() => setShowCustomQuantity(true)}
                        className="sr-only"
                      />
                      <div className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        showCustomQuantity
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <span className="font-medium">Custom quantity</span>
                        {showCustomQuantity && (
                          <input
                            type="number"
                            min="1"
                            value={customQuantity}
                            onChange={(e) => setCustomQuantity(e.target.value)}
                            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter quantity"
                          />
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Pricing Display */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${currentPrice.totalPrice.toFixed(0)}
                    </span>
                    <span className="text-gray-600">
                      ${currentPrice.unitPrice.toFixed(3)} / sticker
                    </span>
                  </div>
                  {currentPrice.savings > 0 && (
                    <div className="text-sm text-green-600">
                      You save ${currentPrice.savings} ({currentPrice.savingsPercent}% off)
                    </div>
                  )}
                </div>

                {/* Continue Button */}
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {/* Size Preview */}
                <div className="mt-4 text-center text-sm text-gray-600">
                  Selected: {config.size.name} × {config.quantity.toLocaleString()} stickers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 2: Material & Cutting Selection
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <button 
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-700 text-sm mb-2 flex items-center"
                >
                  ← Back to size & quantity
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  Material & Cutting Options
                </h1>
                <p className="text-gray-600 mt-1">
                  {config.size.name} × {config.quantity.toLocaleString()} stickers
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Side - Options */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Material Selection */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Choose Material
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MATERIALS.map((material) => (
                    <div
                      key={material.id}
                      onClick={() => setConfig(prev => ({ ...prev, material: material.id as any }))}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        config.material === material.id
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            {material.name}
                            {material.popular && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{material.description}</p>
                        </div>
                        {config.material === material.id && (
                          <Check className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {material.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium">
                        {material.priceMultiplier === 1 ? (
                          <span className="text-gray-900">Standard pricing</span>
                        ) : material.priceMultiplier < 1 ? (
                          <span className="text-green-600">
                            {Math.round((1 - material.priceMultiplier) * 100)}% off
                          </span>
                        ) : (
                          <span className="text-orange-600">
                            +{Math.round((material.priceMultiplier - 1) * 100)}% premium
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cutting Method Selection */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Cutting Method
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CUTTING_METHODS.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setConfig(prev => ({ ...prev, cutting: method.id as any }))}
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        config.cutting === method.id
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 flex items-center">
                            {method.name}
                            {method.recommended && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                Recommended
                              </span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                        </div>
                        {config.cutting === method.id && (
                          <Check className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {method.features.map((feature, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="text-sm font-medium">
                        {method.priceMultiplier === 1 ? (
                          <span className="text-gray-900">Standard pricing</span>
                        ) : (
                          <span className="text-green-600">
                            {Math.round((1 - method.priceMultiplier) * 100)}% off
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Finish Selection */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Finish
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {(['matte', 'gloss'] as const).map((finish) => (
                    <div
                      key={finish}
                      onClick={() => setConfig(prev => ({ ...prev, finish }))}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        config.finish === finish
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{finish}</span>
                        {config.finish === finish && (
                          <Check className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Summary & Continue */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{config.size.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{config.quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Material:</span>
                    <span className="font-medium capitalize">
                      {MATERIALS.find(m => m.id === config.material)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cutting:</span>
                    <span className="font-medium">{config.cutting === 'die-cut' ? 'Die-Cut' : 'Kiss-Cut'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Finish:</span>
                    <span className="font-medium capitalize">{config.finish}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${currentPrice.totalPrice.toFixed(0)}
                    </span>
                    <span className="text-gray-600">
                      ${currentPrice.unitPrice.toFixed(3)} each
                    </span>
                  </div>
                  {currentPrice.savings > 0 && (
                    <div className="text-sm text-green-600 mt-1">
                      You save ${currentPrice.savings} ({currentPrice.savingsPercent}% off)
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Start Designing</span>
                  <Sparkles className="h-4 w-4" />
                </button>

                <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>5+ year life</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Truck className="h-4 w-4" />
                    <span>2-3 day delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Step 3: Professional Design Tools
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <button 
                  onClick={() => setStep(2)}
                  className="text-blue-600 hover:text-blue-700 text-sm mb-2 flex items-center"
                >
                  ← Back to materials
                </button>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  Professional Sticker Designer
                  <span className="ml-3 px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-bold rounded-full">
                    AI POWERED
                  </span>
                </h1>
                <p className="text-gray-600 mt-1">
                  {config.size.name} × {config.quantity.toLocaleString()} {MATERIALS.find(m => m.id === config.material)?.name} stickers
                </p>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${currentPrice.totalPrice.toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">
                  ${currentPrice.unitPrice.toFixed(3)} per sticker
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Design Tools */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="mb-4 text-center">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>🤖 AI Background Removal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>✂️ Auto Cutline Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>🎨 Professional Tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>📁 Production Files</span>
                </div>
              </div>
            </div>

            <EnhancedLabelPreview
              shape={config.size.width === config.size.height ? 'square' : 'custom'}
              width={config.size.width}
              length={config.size.height}
              stock={config.material === 'paper' || config.material === 'kraft' ? 'standard' : 'bopp'}
              finish={config.finish}
              onFileUpload={(files) => {
                console.log('Files uploaded for sticker design:', files)
              }}
              onDesignChange={(design) => {
                console.log('Sticker design updated:', design)
              }}
              className="w-full"
            />

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2 shadow-lg">
                <Calculator className="h-5 w-5" />
                <span>Add to Cart - ${currentPrice.totalPrice.toFixed(0)}</span>
              </button>
              
              <button className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Save Design</span>
              </button>
            </div>

            {/* Order Summary */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Size</div>
                  <div className="font-medium">{config.size.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Quantity</div>
                  <div className="font-medium">{config.quantity.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Material</div>
                  <div className="font-medium">{MATERIALS.find(m => m.id === config.material)?.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Turnaround</div>
                  <div className="font-medium">2-3 business days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
