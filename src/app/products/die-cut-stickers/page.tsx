'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import CustomCursor from '@/components/CustomCursor'
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
  { qty: 5000, discount: 0.75, popular: false }
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
    id: 'paper',
    name: 'Paper Stock',
    description: 'Cost-effective for indoor use',
    features: ['Indoor Use', 'Eco-Friendly', 'Budget Option', 'Smooth Finish'],
    priceMultiplier: 0.8,
    popular: false
  }
]

export default function DieCutStickersPage() {
  const [step, setStep] = useState(1)
  const [config, setConfig] = useState<StickerConfig>({
    size: { width: 2, height: 2, name: '2" × 2"' },
    quantity: 100,
    material: 'vinyl',
    cutting: 'die-cut',
    finish: 'gloss'
  })
  
  const [selectedSizeId, setSelectedSizeId] = useState('2x2')
  const [customSize, setCustomSize] = useState({ width: '', height: '' })

  // Reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('in'), i * 60)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.rv').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [step])

  // Calculate pricing
  const calculatePrice = (qty: number, sizeWidth: number, sizeHeight: number) => {
    const basePrice = 0.35
    const sizeMultiplier = (sizeWidth * sizeHeight) / 4
    const materialMultiplier = MATERIALS.find(m => m.id === config.material)?.priceMultiplier || 1
    
    const quantityOption = QUANTITY_OPTIONS.find(q => q.qty === qty)
    const discount = quantityOption?.discount || 0
    
    const unitPrice = basePrice * sizeMultiplier * materialMultiplier
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
    if (sizeId !== 'custom') {
      const size = PRESET_SIZES.find(s => s.id === sizeId)!
      setConfig(prev => ({
        ...prev,
        size: { width: size.width, height: size.height, name: size.name }
      }))
    }
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

  useEffect(() => {
    if (selectedSizeId === 'custom' && customSize.width && customSize.height) {
      handleCustomSizeUpdate()
    }
  }, [customSize])

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-white text-[#0d0d0d] overflow-x-hidden" style={{fontFamily: '"DM Sans", sans-serif'}}>
        
        {/* Brooklyn Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 h-17 bg-white/95 backdrop-blur-sm border-b border-[#ebebeb]">
          <Link href="/" className="font-bold text-lg text-black no-underline flex items-center gap-2 tracking-tight">
            🥬 Lettuce Print
          </Link>
          <ul className="hidden md:flex gap-8 list-none">
            <li><Link href="/products" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Products</Link></li>
            <li><Link href="/#services" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Services</Link></li>
            <li><Link href="/#work" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Work</Link></li>
            <li><Link href="/#about" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">About</Link></li>
            <li><Link href="/#contact" className="text-sm font-medium text-[#666] no-underline hover:text-black transition-colors">Contact</Link></li>
          </ul>
          <Link href="/quote" className="bg-black text-white text-xs font-semibold px-6 py-3 rounded-full no-underline hover:bg-[#2e6b38] hover:translate-y-[-1px] transition-all">
            Get a Free Quote →
          </Link>
        </nav>

        {/* Page Header */}
        <header className="pt-17 px-10 py-16 border-b border-[#ebebeb]">
          <div className="rv max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-[#e6f4e8] text-[#2e6b38] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
              ✂️ AI-Powered Design Tools
            </div>
            <h1 className="text-6xl lg:text-7xl leading-[0.92] font-normal tracking-tight mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
              Die-Cut Stickers<br/>
              <em className="italic text-[#2e6b38]">with AI magic.</em>
            </h1>
            <p className="text-lg text-[#666] leading-8 max-w-2xl">
              Professional die-cut stickers with our revolutionary AI background removal and cutline generation. 
              Upload your logo, watch the magic happen, get perfect stickers delivered to Brooklyn and beyond.
            </p>
          </div>
        </header>

        {/* Step 1: Size & Quantity */}
        {step === 1 && (
          <section className="py-20 px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              
              {/* Left Side - Product Showcase */}
              <div className="rv">
                <div className="bg-gradient-to-br from-[#f5e642] via-[#f5a8c8] to-[#a8d4f5] rounded-3xl p-12 h-96 flex items-center justify-center relative overflow-hidden">
                  {/* Floating Stickers */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="w-16 h-16 bg-[#2e6b38] rounded-xl shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300 flex items-center justify-center">
                        <span className="text-white text-2xl">🥬</span>
                      </div>
                      <div className="w-16 h-16 bg-white rounded-full shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
                        <span className="text-[#2e6b38] text-2xl">✂️</span>
                      </div>
                      <div className="w-16 h-16 bg-[#f5e642] rounded-lg shadow-lg transform rotate-3 hover:-rotate-3 transition-transform duration-300 flex items-center justify-center">
                        <span className="text-black text-xs font-bold">NYC</span>
                      </div>
                      <div className="w-16 h-16 bg-[#3dba52] rounded-xl shadow-lg transform -rotate-12 hover:-rotate-6 transition-transform duration-300 flex items-center justify-center">
                        <span className="text-white text-2xl">★</span>
                      </div>
                      <div className="w-16 h-16 bg-[#f5a8c8] rounded-full shadow-lg transform rotate-6 hover:rotate-12 transition-transform duration-300 flex items-center justify-center">
                        <span className="text-white text-2xl">❤️</span>
                      </div>
                      <div className="w-16 h-16 bg-black rounded-lg shadow-lg transform -rotate-3 hover:rotate-6 transition-transform duration-300 flex items-center justify-center">
                        <span className="text-white text-2xl">🚀</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-12 h-12 bg-[#e6f4e8] text-[#2e6b38] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      🤖
                    </div>
                    <h3 className="font-semibold text-black mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>AI Background Removal</h3>
                    <p className="text-sm text-[#666]">Upload any image, watch backgrounds disappear instantly</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#e6f4e8] text-[#2e6b38] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      ✂️
                    </div>
                    <h3 className="font-semibold text-black mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>Smart Cutlines</h3>
                    <p className="text-sm text-[#666]">Perfect die-cut shapes generated automatically</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#e6f4e8] text-[#2e6b38] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      🚗
                    </div>
                    <h3 className="font-semibold text-black mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>NYC Delivery</h3>
                    <p className="text-sm text-[#666]">Uber delivery to all five boroughs, same-day available</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Configuration */}
              <div className="rv">
                <div className="bg-white border border-[#ebebeb] rounded-3xl p-8 shadow-sm">
                  
                  {/* Size Selection */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
                      Choose your size
                    </h3>
                    
                    <div className="space-y-3">
                      {PRESET_SIZES.map((size) => (
                        <label key={size.id} className="block cursor-none">
                          <input
                            type="radio"
                            name="size"
                            value={size.id}
                            checked={selectedSizeId === size.id}
                            onChange={() => handleSizeSelect(size.id)}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-2xl border-2 transition-all hover:translate-y-[-2px] ${
                            selectedSizeId === size.id
                              ? 'border-[#2e6b38] bg-[#e6f4e8]'
                              : 'border-[#ebebeb] hover:border-[#2e6b38]'
                          }`}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-lg">{size.name}</span>
                              {size.popular && (
                                <span className="text-xs bg-[#2e6b38] text-white px-3 py-1 rounded-full font-semibold">
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Custom Size */}
                    {selectedSizeId === 'custom' && (
                      <div className="mt-4 p-4 bg-[#faf8f4] rounded-2xl">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">Width (")</label>
                            <input
                              type="number"
                              step="0.1"
                              min="0.5"
                              max="12"
                              value={customSize.width}
                              onChange={(e) => setCustomSize(prev => ({ ...prev, width: e.target.value }))}
                              className="w-full p-3 border-2 border-[#ebebeb] rounded-xl focus:border-[#2e6b38] outline-none transition-colors"
                              placeholder="2.0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-black mb-2">Height (")</label>
                            <input
                              type="number"
                              step="0.1"
                              min="0.5"
                              max="12"
                              value={customSize.height}
                              onChange={(e) => setCustomSize(prev => ({ ...prev, height: e.target.value }))}
                              className="w-full p-3 border-2 border-[#ebebeb] rounded-xl focus:border-[#2e6b38] outline-none transition-colors"
                              placeholder="2.0"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity Selection */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
                      How many stickers?
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {QUANTITY_OPTIONS.map((option) => (
                        <label key={option.qty} className="block cursor-none">
                          <input
                            type="radio"
                            name="quantity"
                            value={option.qty}
                            checked={config.quantity === option.qty}
                            onChange={() => setConfig(prev => ({ ...prev, quantity: option.qty }))}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-2xl border-2 text-center transition-all hover:translate-y-[-2px] ${
                            config.quantity === option.qty
                              ? 'border-[#2e6b38] bg-[#e6f4e8]'
                              : 'border-[#ebebeb] hover:border-[#2e6b38]'
                          }`}>
                            <div className="font-semibold text-lg">{option.qty.toLocaleString()}</div>
                            <div className="text-sm font-bold text-[#2e6b38]">
                              ${calculatePrice(option.qty, config.size.width, config.size.height).totalPrice.toFixed(0)}
                            </div>
                            {option.discount > 0 && (
                              <div className="text-xs text-[#2e6b38] mt-1">
                                Save {Math.round(option.discount * 100)}%
                              </div>
                            )}
                            {option.popular && (
                              <div className="text-xs bg-[#f5e642] text-black px-2 py-1 rounded-full mt-2 inline-block font-semibold">
                                Popular
                              </div>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8 p-6 bg-[#faf8f4] rounded-2xl">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-4xl font-bold text-black" style={{fontFamily: '"Instrument Serif", serif'}}>
                        ${currentPrice.totalPrice.toFixed(0)}
                      </span>
                      <span className="text-[#666]">
                        ${currentPrice.unitPrice.toFixed(3)} each
                      </span>
                    </div>
                    {currentPrice.savings > 0 && (
                      <div className="text-[#2e6b38] font-semibold">
                        You save ${currentPrice.savings} ({currentPrice.savingsPercent}% off)
                      </div>
                    )}
                  </div>

                  {/* Continue */}
                  <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-[#2e6b38] hover:bg-[#1f4526] text-white font-semibold py-5 px-8 rounded-2xl transition-all hover:translate-y-[-2px] text-lg"
                  >
                    Choose Material & Finish →
                  </button>

                  <div className="mt-4 text-center text-sm text-[#666]">
                    {config.size.name} × {config.quantity.toLocaleString()} stickers
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 2: Material Selection */}
        {step === 2 && (
          <section className="py-20 px-10">
            <div className="max-w-6xl mx-auto">
              
              {/* Back Button & Header */}
              <div className="rv mb-12">
                <button 
                  onClick={() => setStep(1)}
                  className="text-[#2e6b38] hover:text-[#1f4526] text-sm mb-4 flex items-center font-medium"
                >
                  ← Back to size & quantity
                </button>
                <h2 className="text-5xl font-normal text-black mb-4" style={{fontFamily: '"Instrument Serif", serif'}}>
                  Choose your <em className="italic text-[#2e6b38]">material.</em>
                </h2>
                <p className="text-lg text-[#666]">
                  {config.size.name} × {config.quantity.toLocaleString()} stickers
                </p>
              </div>

              {/* Materials Grid */}
              <div className="rv grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {MATERIALS.map((material) => (
                  <div
                    key={material.id}
                    onClick={() => setConfig(prev => ({ ...prev, material: material.id as any }))}
                    className={`p-8 rounded-3xl border-2 cursor-none transition-all hover:translate-y-[-4px] ${
                      config.material === material.id
                        ? 'border-[#2e6b38] bg-[#e6f4e8]'
                        : 'border-[#ebebeb] hover:border-[#2e6b38]'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-normal text-black mb-2 flex items-center" style={{fontFamily: '"Instrument Serif", serif'}}>
                          {material.name}
                          {material.popular && (
                            <span className="ml-3 text-xs bg-[#2e6b38] text-white px-3 py-1 rounded-full font-semibold">
                              Popular
                            </span>
                          )}
                        </h4>
                        <p className="text-[#666] mb-4">{material.description}</p>
                      </div>
                      {config.material === material.id && (
                        <div className="w-6 h-6 bg-[#2e6b38] text-white rounded-full flex items-center justify-center text-sm">
                          ✓
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {material.features.map((feature, index) => (
                        <span key={index} className="text-xs bg-white text-[#666] px-3 py-1 rounded-full border border-[#ebebeb]">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-sm font-semibold">
                      {material.priceMultiplier === 1 ? (
                        <span className="text-black">Standard pricing</span>
                      ) : material.priceMultiplier < 1 ? (
                        <span className="text-[#2e6b38]">
                          {Math.round((1 - material.priceMultiplier) * 100)}% off
                        </span>
                      ) : (
                        <span className="text-[#f5a86e]">
                          +{Math.round((material.priceMultiplier - 1) * 100)}% premium
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Finish Selection */}
              <div className="rv mb-12">
                <h3 className="text-3xl font-normal text-black mb-8" style={{fontFamily: '"Instrument Serif", serif'}}>
                  Choose finish
                </h3>
                
                <div className="grid grid-cols-2 gap-6 max-w-2xl">
                  {(['matte', 'gloss'] as const).map((finish) => (
                    <div
                      key={finish}
                      onClick={() => setConfig(prev => ({ ...prev, finish }))}
                      className={`p-6 rounded-2xl border-2 cursor-none transition-all hover:translate-y-[-2px] ${
                        config.finish === finish
                          ? 'border-[#2e6b38] bg-[#e6f4e8]'
                          : 'border-[#ebebeb] hover:border-[#2e6b38]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg capitalize">{finish}</span>
                        {config.finish === finish && (
                          <div className="w-5 h-5 bg-[#2e6b38] text-white rounded-full flex items-center justify-center text-sm">
                            ✓
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary & Continue */}
              <div className="rv bg-white border border-[#ebebeb] rounded-3xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-[#666]">Size:</span>
                    <span className="font-medium">{config.size.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Quantity:</span>
                    <span className="font-medium">{config.quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Material:</span>
                    <span className="font-medium">{MATERIALS.find(m => m.id === config.material)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Finish:</span>
                    <span className="font-medium capitalize">{config.finish}</span>
                  </div>
                </div>

                <div className="border-t border-[#ebebeb] pt-6 mb-8">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-bold text-black" style={{fontFamily: '"Instrument Serif", serif'}}>
                      ${currentPrice.totalPrice.toFixed(0)}
                    </span>
                    <span className="text-[#666]">
                      ${currentPrice.unitPrice.toFixed(3)} each
                    </span>
                  </div>
                  {currentPrice.savings > 0 && (
                    <div className="text-[#2e6b38] font-semibold mt-2">
                      You save ${currentPrice.savings} ({currentPrice.savingsPercent}% off)
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-[#2e6b38] hover:bg-[#1f4526] text-white font-semibold py-5 px-8 rounded-2xl transition-all hover:translate-y-[-2px] text-lg"
                >
                  Start Designing with AI →
                </button>

                <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-[#666]">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🛡️</span>
                    <span>5+ year life</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🚚</span>
                    <span>2-3 day delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: AI Design Tools */}
        {step === 3 && (
          <section className="py-20 px-10">
            <div className="max-w-7xl mx-auto">
              
              {/* Header */}
              <div className="rv mb-12">
                <button 
                  onClick={() => setStep(2)}
                  className="text-[#2e6b38] hover:text-[#1f4526] text-sm mb-4 flex items-center font-medium"
                >
                  ← Back to materials
                </button>
                <h2 className="text-5xl lg:text-6xl font-normal text-black mb-4" style={{fontFamily: '"Instrument Serif", serif'}}>
                  Design your <em className="italic text-[#2e6b38]">perfect stickers.</em>
                </h2>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-lg text-[#666] mb-4">
                      {config.size.name} × {config.quantity.toLocaleString()} {MATERIALS.find(m => m.id === config.material)?.name} stickers
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-[#666]">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#2e6b38] rounded-full"></div>
                        <span>🤖 AI Background Removal</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#3dba52] rounded-full"></div>
                        <span>✂️ Auto Cutline Generation</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#f5e642] rounded-full"></div>
                        <span>🎨 Professional Preview</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-black" style={{fontFamily: '"Instrument Serif", serif'}}>
                      ${currentPrice.totalPrice.toFixed(0)}
                    </div>
                    <div className="text-sm text-[#666]">
                      ${currentPrice.unitPrice.toFixed(3)} per sticker
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Design Tools */}
              <div className="rv bg-white border border-[#ebebeb] rounded-3xl p-8 shadow-sm">
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2e6b38] to-[#3dba52] text-white text-sm font-bold tracking-wide uppercase px-6 py-3 rounded-full mb-4">
                    <span className="text-lg">🤖</span>
                    AI-Powered Design Studio
                    <span className="text-lg">✨</span>
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
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-[#2e6b38] hover:bg-[#1f4526] text-white px-12 py-5 rounded-2xl text-lg font-semibold hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3 shadow-lg">
                    <span className="text-xl">🛒</span>
                    <span>Add to Cart - ${currentPrice.totalPrice.toFixed(0)}</span>
                  </button>
                  
                  <button className="bg-white text-[#2e6b38] border-2 border-[#2e6b38] px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-[#e6f4e8] hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3">
                    <span className="text-xl">💾</span>
                    <span>Save Design</span>
                  </button>
                </div>

                {/* Final Order Summary */}
                <div className="mt-12 p-8 bg-[#faf8f4] rounded-2xl">
                  <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>Final Order Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-[#666] mb-1">Size</div>
                      <div className="font-semibold text-lg">{config.size.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#666] mb-1">Quantity</div>
                      <div className="font-semibold text-lg">{config.quantity.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#666] mb-1">Material</div>
                      <div className="font-semibold text-lg">{MATERIALS.find(m => m.id === config.material)?.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#666] mb-1">Turnaround</div>
                      <div className="font-semibold text-lg text-[#2e6b38]">2-3 business days</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-[#ebebeb] flex items-center justify-between">
                    <div className="flex items-center space-x-8 text-sm text-[#666]">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🚚</span>
                        <span>Free shipping to Brooklyn</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🛡️</span>
                        <span>Satisfaction guaranteed</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#2e6b38]" style={{fontFamily: '"Instrument Serif", serif'}}>
                        Total: ${currentPrice.totalPrice.toFixed(0)}
                      </div>
                      {currentPrice.savings > 0 && (
                        <div className="text-sm text-[#2e6b38] font-semibold">
                          You saved ${currentPrice.savings}!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Brooklyn Footer */}
        <footer className="bg-black text-[#888] py-18 px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
            <div>
              <Link href="/" className="text-white font-bold text-xl no-underline flex items-center gap-2 mb-4">
                🥬 Lettuce Print
              </Link>
              <p className="text-sm leading-7 max-w-70 mb-6">
                Brooklyn's print shop and graphic design studio. Serving businesses, restaurants, and brands across all five NYC boroughs.
              </p>
            </div>
            
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[#555] mb-4">Products</div>
              <ul className="list-none space-y-3">
                <li><Link href="/products/die-cut-stickers" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Die-Cut Stickers</Link></li>
                <li><Link href="/products/roll-labels" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Roll Labels</Link></li>
                <li><Link href="/products/business-cards" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Business Cards</Link></li>
                <li><Link href="/products/banners" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Banners & Signs</Link></li>
              </ul>
            </div>
            
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[#555] mb-4">Company</div>
              <ul className="list-none space-y-3">
                <li><Link href="/about" className="text-sm text-[#444] no-underline hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/products" className="text-sm text-[#444] no-underline hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/quote" className="text-sm text-[#444] no-underline hover:text-white transition-colors">Get Quote</Link></li>
              </ul>
            </div>
            
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-[#555] mb-4">Brooklyn Studio</div>
              <ul className="list-none space-y-3">
                <li><span className="text-sm text-[#444]">361 Stagg St</span></li>
                <li><span className="text-sm text-[#444]">Brooklyn, NY 11206</span></li>
                <li><span className="text-sm text-[#444]">Mon–Fri: 9am–6pm</span></li>
                <li><span className="text-sm text-[#444]">🚗 Uber Delivery Available</span></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-7 border-t border-[#1a1a1a] gap-3">
            <span className="text-xs text-[#333]">
              © 2025 Lettuce Print · Brooklyn's AI-Powered Print Shop
            </span>
            <div className="flex gap-6">
              <a href="tel:3476030557" className="text-xs text-[#444] no-underline flex items-center gap-2 hover:text-[#3dba52] transition-colors">
                <span className="text-[#3dba52]">☎</span> (347) 603-0557
              </a>
              <a href="mailto:info@lettuceprint.com" className="text-xs text-[#444] no-underline flex items-center gap-2 hover:text-[#3dba52] transition-colors">
                <span className="text-[#3dba52]">✉</span> info@lettuceprint.com
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}