'use client'

import React, { useState, useEffect } from 'react'
import { 
  Scissors, Calculator, Truck, Award, Sparkles, Layers, 
  Grid3X3, Square, Circle, Star, Heart, Zap, 
  Package, Clock, DollarSign, Shield, Download,
  ArrowRight, CheckCircle, AlertCircle, Info
} from 'lucide-react'
import EnhancedLabelPreview from '@/components/EnhancedLabelPreview'

interface StickerSpecs {
  shape: 'circle' | 'square' | 'custom'
  size: {
    width: number
    height: number
  }
  material: 'vinyl' | 'paper' | 'clear' | 'holographic' | 'kraft'
  finish: 'matte' | 'gloss' | 'satin'
  adhesive: 'permanent' | 'removable' | 'static-cling'
  cutting: 'die-cut' | 'kiss-cut' | 'crack-and-peel'
}

interface SheetLayout {
  id: string
  name: string
  sheetSize: { width: number; height: number } // in inches
  maxStickerSize: { width: number; height: number }
  arrangements: Array<{
    stickers: number
    layout: { cols: number; rows: number }
    stickerSize: { width: number; height: number }
    spacing: { x: number; y: number }
  }>
}

const SHEET_LAYOUTS: SheetLayout[] = [
  {
    id: 'letter',
    name: '8.5" × 11" Letter Sheet',
    sheetSize: { width: 8.5, height: 11 },
    maxStickerSize: { width: 8, height: 10.5 },
    arrangements: [
      { stickers: 1, layout: { cols: 1, rows: 1 }, stickerSize: { width: 8, height: 10.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 2, layout: { cols: 1, rows: 2 }, stickerSize: { width: 8, height: 5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 4, layout: { cols: 2, rows: 2 }, stickerSize: { width: 4, height: 5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 6, layout: { cols: 2, rows: 3 }, stickerSize: { width: 4, height: 3.33 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 8, layout: { cols: 2, rows: 4 }, stickerSize: { width: 4, height: 2.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 9, layout: { cols: 3, rows: 3 }, stickerSize: { width: 2.67, height: 3.33 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 12, layout: { cols: 3, rows: 4 }, stickerSize: { width: 2.67, height: 2.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 15, layout: { cols: 3, rows: 5 }, stickerSize: { width: 2.67, height: 2 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 20, layout: { cols: 4, rows: 5 }, stickerSize: { width: 2, height: 2 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 30, layout: { cols: 5, rows: 6 }, stickerSize: { width: 1.6, height: 1.67 }, spacing: { x: 0.1, y: 0.1 } }
    ]
  },
  {
    id: 'a4',
    name: 'A4 Sheet (8.27" × 11.69")',
    sheetSize: { width: 8.27, height: 11.69 },
    maxStickerSize: { width: 7.77, height: 11.19 },
    arrangements: [
      { stickers: 1, layout: { cols: 1, rows: 1 }, stickerSize: { width: 7.77, height: 11.19 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 2, layout: { cols: 1, rows: 2 }, stickerSize: { width: 7.77, height: 5.47 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 4, layout: { cols: 2, rows: 2 }, stickerSize: { width: 3.76, height: 5.47 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 6, layout: { cols: 2, rows: 3 }, stickerSize: { width: 3.76, height: 3.56 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 9, layout: { cols: 3, rows: 3 }, stickerSize: { width: 2.42, height: 3.56 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 12, layout: { cols: 3, rows: 4 }, stickerSize: { width: 2.42, height: 2.6 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 21, layout: { cols: 3, rows: 7 }, stickerSize: { width: 2.42, height: 1.5 }, spacing: { x: 0.25, y: 0.12 } }
    ]
  },
  {
    id: '12x18',
    name: '12" × 18" Large Sheet',
    sheetSize: { width: 12, height: 18 },
    maxStickerSize: { width: 11.5, height: 17.5 },
    arrangements: [
      { stickers: 1, layout: { cols: 1, rows: 1 }, stickerSize: { width: 11.5, height: 17.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 2, layout: { cols: 1, rows: 2 }, stickerSize: { width: 11.5, height: 8.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 4, layout: { cols: 2, rows: 2 }, stickerSize: { width: 5.63, height: 8.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 6, layout: { cols: 2, rows: 3 }, stickerSize: { width: 5.63, height: 5.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 9, layout: { cols: 3, rows: 3 }, stickerSize: { width: 3.67, height: 5.5 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 12, layout: { cols: 3, rows: 4 }, stickerSize: { width: 3.67, height: 4 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 20, layout: { cols: 4, rows: 5 }, stickerSize: { width: 2.69, height: 3.3 }, spacing: { x: 0.25, y: 0.25 } },
      { stickers: 30, layout: { cols: 5, rows: 6 }, stickerSize: { width: 2.2, height: 2.75 }, spacing: { x: 0.2, y: 0.2 } }
    ]
  }
]

const MATERIALS = [
  {
    id: 'vinyl',
    name: 'Premium Vinyl',
    description: 'Durable, waterproof, 5+ year outdoor life',
    icon: '🛡️',
    features: ['Waterproof', 'UV Resistant', '5+ Year Life', 'Dishwasher Safe'],
    price: '+$0',
    popular: true
  },
  {
    id: 'paper',
    name: 'Paper Stock',
    description: 'Cost-effective for indoor use',
    icon: '📄',
    features: ['Indoor Use', 'Matte Finish', 'Eco-Friendly', 'Budget Option'],
    price: '-20%',
    popular: false
  },
  {
    id: 'clear',
    name: 'Clear Vinyl',
    description: 'Transparent with printed colors only',
    icon: '🔍',
    features: ['Transparent', 'See-Through', 'Premium Look', 'Window Safe'],
    price: '+15%',
    popular: false
  },
  {
    id: 'holographic',
    name: 'Holographic',
    description: 'Prismatic rainbow effect',
    icon: '🌈',
    features: ['Rainbow Effect', 'Eye-Catching', 'Premium Feel', 'Unique Look'],
    price: '+40%',
    popular: false
  },
  {
    id: 'kraft',
    name: 'Kraft Paper',
    description: 'Natural brown paper aesthetic',
    icon: '🍂',
    features: ['Natural Look', 'Eco-Friendly', 'Rustic Feel', 'Biodegradable'],
    price: '-10%',
    popular: false
  }
]

const CUTTING_OPTIONS = [
  {
    id: 'die-cut',
    name: 'Die-Cut',
    description: 'Cut completely through, individual stickers ready to peel',
    icon: '✂️',
    features: ['Individual stickers', 'Easy to peel', 'Professional finish', 'Custom shapes'],
    recommended: true
  },
  {
    id: 'kiss-cut',
    name: 'Kiss-Cut',
    description: 'Cut through sticker only, leaves backing intact',
    icon: '🔪',
    features: ['Sheet format', 'Easy weeding', 'Multiple per sheet', 'Clean removal'],
    recommended: false
  },
  {
    id: 'crack-and-peel',
    name: 'Crack & Peel',
    description: 'Perforated backing for easy separation',
    icon: '📋',
    features: ['Tear-off sheets', 'No tools needed', 'Bulk application', 'Fast deployment'],
    recommended: false
  }
]

export default function DieCutStickersPage() {
  // Main configuration state
  const [specs, setSpecs] = useState<StickerSpecs>({
    shape: 'square',
    size: { width: 3, height: 3 },
    material: 'vinyl',
    finish: 'gloss',
    adhesive: 'permanent',
    cutting: 'die-cut'
  })

  // Sheet layout state
  const [selectedSheet, setSelectedSheet] = useState<SheetLayout>(SHEET_LAYOUTS[0])
  const [selectedArrangement, setSelectedArrangement] = useState(0)
  const [quantity, setQuantity] = useState(100)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [processingTime, setProcessingTime] = useState('2-3 business days')

  // Calculate current sticker arrangement
  const currentArrangement = selectedSheet.arrangements[selectedArrangement]
  const stickersPerSheet = currentArrangement.stickers
  const sheetsNeeded = Math.ceil(quantity / stickersPerSheet)

  // Update sticker size when arrangement changes
  useEffect(() => {
    const arrangement = selectedSheet.arrangements[selectedArrangement]
    setSpecs(prev => ({
      ...prev,
      size: {
        width: arrangement.stickerSize.width,
        height: arrangement.stickerSize.height
      }
    }))
  }, [selectedSheet, selectedArrangement])

  // Calculate estimated pricing (simplified for frontend)
  useEffect(() => {
    const basePrice = 0.25 // Base price per sticker
    const materialMultiplier = specs.material === 'vinyl' ? 1 : 
                              specs.material === 'holographic' ? 1.4 :
                              specs.material === 'clear' ? 1.15 :
                              specs.material === 'paper' ? 0.8 : 0.9
    
    const sizeMultiplier = (specs.size.width * specs.size.height) / 9 // Based on 3x3 baseline
    const quantityDiscount = quantity >= 500 ? 0.8 : quantity >= 250 ? 0.9 : 1
    
    const price = basePrice * materialMultiplier * sizeMultiplier * quantity * quantityDiscount
    setEstimatedPrice(Math.round(price * 100) / 100)

    // Update processing time
    if (quantity >= 1000) {
      setProcessingTime('4-5 business days')
    } else if (quantity >= 500) {
      setProcessingTime('3-4 business days')
    } else {
      setProcessingTime('2-3 business days')
    }
  }, [specs, quantity])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Scissors className="h-8 w-8 text-cyan-300" />
                <span className="text-cyan-300 font-semibold">Professional Die-Cut</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight">
                Custom Die-Cut
                <span className="block bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
                  Stickers
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Professional-grade custom stickers with precision die-cutting. Any shape, 
                any size, premium vinyl and materials with Brooklyn quality you can trust.
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>AI Background Removal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Auto Cutline Generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>5+ Year Outdoor Life</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>Same-Day Rush Available</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Award className="h-10 w-10 text-yellow-300 mx-auto mb-3" />
                <div className="text-3xl font-bold">5★</div>
                <div className="text-blue-100">Customer Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Clock className="h-10 w-10 text-green-300 mx-auto mb-3" />
                <div className="text-3xl font-bold">2-3</div>
                <div className="text-blue-100">Day Turnaround</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Truck className="h-10 w-10 text-blue-300 mx-auto mb-3" />
                <div className="text-3xl font-bold">FREE</div>
                <div className="text-blue-100">NYC Delivery</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <Shield className="h-10 w-10 text-purple-300 mx-auto mb-3" />
                <div className="text-3xl font-bold">5+</div>
                <div className="text-blue-100">Year Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Configuration */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Sheet Size Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Grid3X3 className="h-5 w-5 mr-2 text-blue-500" />
                Sheet Size
              </h3>
              <div className="space-y-3">
                {SHEET_LAYOUTS.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedSheet(layout)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedSheet.id === layout.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{layout.name}</div>
                    <div className="text-sm text-gray-600">
                      {layout.sheetSize.width}" × {layout.sheetSize.height}"
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Stickers Per Sheet */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Layers className="h-5 w-5 mr-2 text-green-500" />
                Layout & Quantity
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stickers per Sheet
                </label>
                <select
                  value={selectedArrangement}
                  onChange={(e) => setSelectedArrangement(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {selectedSheet.arrangements.map((arrangement, index) => (
                    <option key={index} value={index}>
                      {arrangement.stickers} stickers ({arrangement.stickerSize.width.toFixed(1)}" × {arrangement.stickerSize.height.toFixed(1)}")
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stickers per sheet:</span>
                  <span className="font-medium">{stickersPerSheet}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sheets needed:</span>
                  <span className="font-medium">{sheetsNeeded}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Individual size:</span>
                  <span className="font-medium">
                    {currentArrangement.stickerSize.width.toFixed(1)}" × {currentArrangement.stickerSize.height.toFixed(1)}"
                  </span>
                </div>
              </div>
            </div>

            {/* Material Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                Material & Finish
              </h3>
              
              <div className="space-y-3 mb-4">
                {MATERIALS.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => setSpecs(prev => ({ ...prev, material: material.id as any }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      specs.material === material.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } relative`}
                  >
                    {material.popular && (
                      <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-lg">{material.icon}</span>
                          <span className="font-medium text-gray-900">{material.name}</span>
                          <span className="text-sm font-medium text-green-600">{material.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {material.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Finish</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['matte', 'gloss', 'satin'] as const).map((finish) => (
                      <button
                        key={finish}
                        onClick={() => setSpecs(prev => ({ ...prev, finish }))}
                        className={`p-2 text-sm rounded-lg border-2 transition-all ${
                          specs.finish === finish
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {finish.charAt(0).toUpperCase() + finish.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Adhesive</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['permanent', 'removable'] as const).map((adhesive) => (
                      <button
                        key={adhesive}
                        onClick={() => setSpecs(prev => ({ ...prev, adhesive }))}
                        className={`p-2 text-sm rounded-lg border-2 transition-all ${
                          specs.adhesive === adhesive
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {adhesive.charAt(0).toUpperCase() + adhesive.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Cutting Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Scissors className="h-5 w-5 mr-2 text-red-500" />
                Cutting Method
              </h3>
              
              <div className="space-y-3">
                {CUTTING_OPTIONS.map((cutting) => (
                  <button
                    key={cutting.id}
                    onClick={() => setSpecs(prev => ({ ...prev, cutting: cutting.id as any }))}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      specs.cutting === cutting.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } relative`}
                  >
                    {cutting.recommended && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                    <div className="flex items-start space-x-3">
                      <span className="text-xl">{cutting.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">{cutting.name}</div>
                        <p className="text-sm text-gray-600 mb-2">{cutting.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {cutting.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Estimate */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Pricing Estimate
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Quantity:</span>
                  <span className="font-bold">{quantity.toLocaleString()} stickers</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Price per sticker:</span>
                  <span className="font-bold">${(estimatedPrice / quantity).toFixed(3)}</span>
                </div>
                <div className="border-t border-green-400 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">Total Estimate:</span>
                    <span className="text-3xl font-bold">${estimatedPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-green-100 text-sm mt-1">
                    Processing time: {processingTime}
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-600/50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-green-200 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-100">
                    Final pricing may vary based on artwork complexity, rush orders, and additional services.
                    Get exact quote after uploading your design.
                  </p>
                </div>
              </div>

              <button className="w-full mt-4 bg-white text-green-600 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Get Exact Quote</span>
              </button>
            </div>
          </div>

          {/* Right Panel - Design Preview */}
          <div className="lg:col-span-2">
            {/* Enhanced Interactive Sticker Designer */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Professional Sticker Designer
                </span>
                <span className="ml-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs rounded-full font-bold">
                  PRO TOOLS
                </span>
              </h3>
              <div className="mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-4 flex-wrap">
                  <span className="flex items-center space-x-1">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>AI Background Removal</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Scissors className="h-4 w-4 text-red-500" />
                    <span>Auto Die-Cut Lines</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Layers className="h-4 w-4 text-blue-500" />
                    <span>Professional Tools</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Download className="h-4 w-4 text-green-500" />
                    <span>Production Files</span>
                  </span>
                </div>
              </div>
              <EnhancedLabelPreview
                shape={specs.shape}
                width={specs.size.width}
                length={specs.size.height}
                stock={specs.material === 'paper' ? 'standard' : 'bopp'}
                finish={specs.finish === 'satin' ? 'matte' : specs.finish}
                onFileUpload={(files) => setUploadedFiles(prev => [...prev, ...files])}
                onDesignChange={(design) => {
                  // Store design data for pricing and production
                  console.log('Sticker design updated:', design)
                }}
                className="w-full"
              />
            </div>

            {/* Sheet Layout Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Grid3X3 className="h-5 w-5 mr-2 text-blue-500" />
                Sheet Layout Preview
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({stickersPerSheet} stickers per sheet)
                </span>
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <div className="flex justify-center">
                  <div 
                    className="bg-white border-2 border-gray-300 shadow-lg relative"
                    style={{
                      width: `${Math.min(400, selectedSheet.sheetSize.width * 30)}px`,
                      height: `${Math.min(400, selectedSheet.sheetSize.width * 30) * (selectedSheet.sheetSize.height / selectedSheet.sheetSize.width)}px`
                    }}
                  >
                    {/* Sheet grid visualization */}
                    <div 
                      className="grid gap-1 h-full w-full p-2"
                      style={{ 
                        gridTemplateColumns: `repeat(${currentArrangement.layout.cols}, 1fr)`,
                        gridTemplateRows: `repeat(${currentArrangement.layout.rows}, 1fr)`
                      }}
                    >
                      {Array.from({ length: currentArrangement.stickers }).map((_, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-600"
                        >
                          {specs.shape === 'circle' && (
                            <div className="w-4/5 h-4/5 bg-blue-200 rounded-full flex items-center justify-center">
                              {index + 1}
                            </div>
                          )}
                          {specs.shape === 'square' && (
                            <div className="w-4/5 h-4/5 bg-blue-200 rounded flex items-center justify-center">
                              {index + 1}
                            </div>
                          )}
                          {specs.shape === 'custom' && (
                            <div className="w-4/5 h-4/5 bg-blue-200 rounded flex items-center justify-center">
                              {index + 1}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {/* Sheet size label */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                      {selectedSheet.sheetSize.width}" × {selectedSheet.sheetSize.height}" sheet
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-blue-600">{stickersPerSheet}</div>
                  <div className="text-sm text-gray-600">Per Sheet</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-green-600">{sheetsNeeded}</div>
                  <div className="text-sm text-gray-600">Sheets Total</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-purple-600">
                    {currentArrangement.stickerSize.width.toFixed(1)}"
                  </div>
                  <div className="text-sm text-gray-600">Width Each</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-2xl font-bold text-orange-600">
                    {currentArrangement.stickerSize.height.toFixed(1)}"
                  </div>
                  <div className="text-sm text-gray-600">Height Each</div>
                </div>
              </div>
            </div>

            {/* Material & Cutting Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                Material & Cutting Preview
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Material Preview */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    Material: {MATERIALS.find(m => m.id === specs.material)?.name}
                  </h4>
                  
                  <div className="relative">
                    <div 
                      className={`w-full h-32 rounded-lg border-2 ${
                        specs.material === 'vinyl' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200' :
                        specs.material === 'paper' ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200' :
                        specs.material === 'clear' ? 'bg-gradient-to-br from-transparent to-blue-50 border-blue-200' :
                        specs.material === 'holographic' ? 'bg-gradient-to-r from-pink-100 via-blue-100 to-purple-100 border-purple-200' :
                        'bg-gradient-to-br from-yellow-100 to-orange-100 border-orange-200'
                      }`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-16 h-16 rounded-full ${
                          specs.finish === 'gloss' ? 'bg-gradient-to-tr from-white/60 to-transparent' :
                          specs.finish === 'matte' ? 'bg-white/30' :
                          'bg-gradient-to-br from-white/40 to-transparent'
                        }`}>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 text-xs bg-black/20 text-white px-2 py-1 rounded">
                      {specs.finish.charAt(0).toUpperCase() + specs.finish.slice(1)} Finish
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Adhesive:</span>
                      <span className="font-medium">{specs.adhesive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Outdoor Life:</span>
                      <span className="font-medium">
                        {specs.material === 'vinyl' ? '5+ years' : 
                         specs.material === 'clear' ? '3+ years' :
                         specs.material === 'holographic' ? '3+ years' :
                         'Indoor use'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cutting Method Preview */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    Cutting: {CUTTING_OPTIONS.find(c => c.id === specs.cutting)?.name}
                  </h4>
                  
                  <div className="relative">
                    <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-gray-200 overflow-hidden">
                      {specs.cutting === 'die-cut' && (
                        <div className="h-full flex items-center justify-center">
                          <div className="grid grid-cols-2 gap-2 p-4">
                            <div className="w-12 h-12 bg-blue-200 rounded border-2 border-red-500 border-dashed"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded border-2 border-red-500 border-dashed"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded border-2 border-red-500 border-dashed"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded border-2 border-red-500 border-dashed"></div>
                          </div>
                        </div>
                      )}
                      {specs.cutting === 'kiss-cut' && (
                        <div className="h-full bg-gray-200 flex items-center justify-center">
                          <div className="grid grid-cols-2 gap-1 p-2 bg-white rounded">
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                          </div>
                        </div>
                      )}
                      {specs.cutting === 'crack-and-peel' && (
                        <div className="h-full bg-gray-200 flex items-center justify-center relative">
                          <div className="grid grid-cols-2 gap-1 p-2 bg-white rounded">
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                            <div className="w-12 h-12 bg-blue-200 rounded"></div>
                          </div>
                          <div className="absolute inset-0 border-2 border-dashed border-gray-400 rounded-lg"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>{CUTTING_OPTIONS.find(c => c.id === specs.cutting)?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg">
            <Calculator className="h-5 w-5" />
            <span>Get Detailed Quote</span>
          </button>
          <button className="bg-white text-gray-700 border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Save Design</span>
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Precision Die-Cutting</h3>
            <p className="text-gray-600">
              Professional-grade cutting equipment ensures perfect edges and shapes every time.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Materials</h3>
            <p className="text-gray-600">
              Choose from vinyl, paper, clear, holographic, and kraft materials for any application.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Brooklyn Quality</h3>
            <p className="text-gray-600">
              Local expertise with same-day rush options and personal service you can trust.
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Print Resolution</h3>
              <p className="text-gray-600">Up to 1440 DPI full-color printing</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Cut Accuracy</h3>
              <p className="text-gray-600">±0.1mm precision cutting tolerance</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Material Thickness</h3>
              <p className="text-gray-600">0.08mm - 0.25mm supported</p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibered text-gray-900 mb-2">Minimum Size</h3>
              <p className="text-gray-600">0.5" × 0.5" minimum dimensions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}