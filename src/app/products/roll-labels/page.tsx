'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/stores/cartStore'
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import CustomCursor from '@/components/CustomCursor'
import EnhancedLabelPreview from '@/components/EnhancedLabelPreview'

export default function RollLabelsProductPage() {
  const [selectedShape, setSelectedShape] = useState<'circle' | 'square' | 'custom'>('circle')
  const [selectedStock, setSelectedStock] = useState<'standard' | 'bopp'>('standard')
  const [selectedFinish, setSelectedFinish] = useState<'matte' | 'gloss'>('matte')
  const [labelSize, setLabelSize] = useState({ width: '2', length: '2' })
  const [quantity, setQuantity] = useState(100)
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null)
  const [step, setStep] = useState(1) // 1: Size/Shape, 2: Material/Finish, 3: Design

  const addToCart = useCartStore((state) => state.addToCart)

  // Roll labels shapes and materials
  const SHAPES = [
    { 
      id: 'circle', 
      name: 'Circle', 
      description: 'Perfect for branding and logos', 
      emoji: '⭕',
      priceMultiplier: 1.0,
      popular: true
    },
    { 
      id: 'square', 
      name: 'Square', 
      description: 'Modern, clean aesthetic', 
      emoji: '⬜',
      priceMultiplier: 1.1,
      popular: false
    },
    { 
      id: 'custom', 
      name: 'Custom Shape', 
      description: 'Any shape you need', 
      emoji: '🔷',
      priceMultiplier: 1.3,
      popular: false
    }
  ]

  const MATERIALS = [
    {
      id: 'standard',
      name: 'Standard Paper',
      description: 'Great for indoor use and short-term applications',
      features: ['Cost-effective', 'Easy to write on', 'Good adhesion', 'Eco-friendly'],
      priceMultiplier: 1.0,
      popular: true
    },
    {
      id: 'bopp',
      name: 'BOPP Synthetic',
      description: 'Waterproof and tear-resistant for professional applications',
      features: ['Waterproof', 'Tear-resistant', 'Chemical resistant', 'Professional finish'],
      priceMultiplier: 1.4,
      popular: false
    }
  ]

  const QUANTITY_OPTIONS = [50, 100, 250, 500, 1000, 2500, 5000, 10000]

  // Pricing calculation
  const calculatePrice = () => {
    const basePrice = 0.15 // Base price per label
    const sizeMultiplier = (parseFloat(labelSize.width) * parseFloat(labelSize.length)) / 4
    const shapeMultiplier = SHAPES.find(s => s.id === selectedShape)?.priceMultiplier || 1
    const materialMultiplier = MATERIALS.find(m => m.id === selectedStock)?.priceMultiplier || 1
    
    // Quantity discounts
    let quantityDiscount = 0
    if (quantity >= 1000) quantityDiscount = 0.3
    else if (quantity >= 500) quantityDiscount = 0.2
    else if (quantity >= 250) quantityDiscount = 0.15
    else if (quantity >= 100) quantityDiscount = 0.1

    const unitPrice = basePrice * sizeMultiplier * shapeMultiplier * materialMultiplier * (1 - quantityDiscount)
    const totalPrice = unitPrice * quantity

    return {
      unitPrice,
      totalPrice,
      savings: quantity > 50 ? Math.round((basePrice * sizeMultiplier * shapeMultiplier * materialMultiplier - unitPrice) * quantity) : 0,
      savingsPercent: Math.round(quantityDiscount * 100)
    }
  }

  const currentPrice = calculatePrice()

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
              🏷️ Smart Cutline Generator
            </div>
            <h1 className="text-6xl lg:text-7xl leading-[0.92] font-normal tracking-tight mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
              Roll Labels<br/>
              <em className="italic text-[#2e6b38]">made simple.</em>
            </h1>
            <p className="text-lg text-[#666] leading-8 max-w-2xl">
              Professional roll labels with AI-powered design tools. Upload your artwork, get perfect cutlines automatically, 
              and receive production-ready labels delivered to your door across NYC.
            </p>
          </div>
        </header>

        {/* Step 1: Shape & Size Selection */}
        {step === 1 && (
          <section className="py-20 px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              
              {/* Left Side - Product Showcase */}
              <div className="rv">
                <div className="bg-gradient-to-br from-[#a8d4f5] via-[#f5a8c8] to-[#f5e642] rounded-3xl p-12 h-96 flex items-center justify-center relative overflow-hidden">
                  {/* Label Roll Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      {/* Roll Core */}
                      <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🏷️</span>
                        </div>
                      </div>
                      
                      {/* Unrolled Labels */}
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 flex space-x-2">
                        <div className="w-12 h-12 bg-[#2e6b38] rounded-full shadow-lg animate-bounce [animation-delay:0s] flex items-center justify-center">
                          <span className="text-white text-xs font-bold">🥬</span>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-lg shadow-lg animate-bounce [animation-delay:0.2s] flex items-center justify-center">
                          <span className="text-[#2e6b38] text-xs font-bold">NYC</span>
                        </div>
                        <div className="w-12 h-12 bg-[#f5e642] rounded-full shadow-lg animate-bounce [animation-delay:0.4s] flex items-center justify-center">
                          <span className="text-black text-xs">★</span>
                        </div>
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
                    <h3 className="font-semibold text-black mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>Smart Cutlines</h3>
                    <p className="text-sm text-[#666]">AI generates perfect die-cut lines automatically</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#e6f4e8] text-[#2e6b38] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      💧
                    </div>
                    <h3 className="font-semibold text-black mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>Waterproof Options</h3>
                    <p className="text-sm text-[#666]">BOPP synthetic materials for demanding environments</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-[#e6f4e8] text-[#2e6b38] rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                      📦
                    </div>
                    <h3 className="font-semibold text-black mb-2" style={{fontFamily: '"Instrument Serif", serif'}}>Roll Format</h3>
                    <p className="text-sm text-[#666]">Easy dispensing for high-volume applications</p>
                  </div>
                </div>
              </div>

              {/* Right Side - Configuration */}
              <div className="rv">
                <div className="bg-white border border-[#ebebeb] rounded-3xl p-8 shadow-sm">
                  
                  {/* Shape Selection */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
                      Choose your shape
                    </h3>
                    
                    <div className="space-y-3">
                      {SHAPES.map((shape) => (
                        <label key={shape.id} className="block cursor-none">
                          <input
                            type="radio"
                            name="shape"
                            value={shape.id}
                            checked={selectedShape === shape.id}
                            onChange={(e) => setSelectedShape(e.target.value as any)}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-2xl border-2 transition-all hover:translate-y-[-2px] ${
                            selectedShape === shape.id
                              ? 'border-[#2e6b38] bg-[#e6f4e8]'
                              : 'border-[#ebebeb] hover:border-[#2e6b38]'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <span className="text-2xl">{shape.emoji}</span>
                                <div>
                                  <div className="font-medium text-lg">{shape.name}</div>
                                  <div className="text-sm text-[#666]">
                      ${currentPrice.unitPrice.toFixed(3)} per label
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Label Designer */}
              <div className="rv bg-white border border-[#ebebeb] rounded-3xl p-8 shadow-sm">
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#2e6b38] to-[#3dba52] text-white text-sm font-bold tracking-wide uppercase px-6 py-3 rounded-full mb-4">
                    <span className="text-lg">🎨</span>
                    AI-Powered Label Designer
                    <span className="text-lg">✨</span>
                  </div>
                </div>

                <EnhancedLabelPreview
                  shape={selectedShape}
                  width={parseFloat(labelSize.width)}
                  length={selectedShape === 'circle' ? parseFloat(labelSize.width) : parseFloat(labelSize.length)}
                  stock={selectedStock}
                  finish={selectedFinish}
                  onFileUpload={(files) => {
                    console.log('Files uploaded for label design:', files)
                  }}
                  onDesignChange={(design) => {
                    console.log('Label design updated:', design)
                  }}
                  className="w-full"
                />

                {/* Action Buttons */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      const product = {
                        id: 'roll-labels-custom',
                        name: `Custom Roll Labels - ${selectedShape === 'circle' ? labelSize.width + '"' : labelSize.width + '" × ' + labelSize.length + '"'}`,
                        price: currentPrice.totalPrice,
                        quantity: 1,
                        image: '/images/roll-labels-preview.jpg',
                        specifications: {
                          shape: selectedShape,
                          size: selectedShape === 'circle' ? labelSize.width + '"' : labelSize.width + '" × ' + labelSize.length + '"',
                          quantity: quantity,
                          material: selectedStock,
                          finish: selectedFinish
                        }
                      }
                      addToCart(product)
                    }}
                    className="bg-[#2e6b38] hover:bg-[#1f4526] text-white px-12 py-5 rounded-2xl text-lg font-semibold hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3 shadow-lg"
                  >
                    <span className="text-xl">🛒</span>
                    <span>Add to Cart - ${currentPrice.totalPrice.toFixed(0)}</span>
                  </button>
                  
                  <button className="bg-white text-[#2e6b38] border-2 border-[#2e6b38] px-12 py-5 rounded-2xl text-lg font-semibold hover:bg-[#e6f4e8] hover:translate-y-[-2px] transition-all flex items-center justify-center space-x-3">
                    <span className="text-xl">💾</span>
                    <span>Save Design</span>
                  </button>
                </div>

                {/* Final Summary */}
                <div className="mt-12 p-8 bg-[#faf8f4] rounded-2xl">
                  <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>Final Order Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <div>
                      <div className="text-sm text-[#666] mb-1">Shape</div>
                      <div className="font-semibold text-lg capitalize">{SHAPES.find(s => s.id === selectedShape)?.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#666] mb-1">Size</div>
                      <div className="font-semibold text-lg">
                        {selectedShape === 'circle' ? labelSize.width + '"' : labelSize.width + '" × ' + labelSize.length + '"'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-[#666] mb-1">Quantity</div>
                      <div className="font-semibold text-lg">{quantity.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#666] mb-1">Material</div>
                      <div className="font-semibold text-lg">{MATERIALS.find(m => m.id === selectedStock)?.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#666] mb-1">Turnaround</div>
                      <div className="font-semibold text-lg text-[#2e6b38]">3-5 business days</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-[#ebebeb] flex items-center justify-between">
                    <div className="flex items-center space-x-8 text-sm text-[#666]">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🚚</span>
                        <span>Roll format for easy dispensing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">🛡️</span>
                        <span>Quality guaranteed</span>
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
}666]">{shape.description}</div>
                                </div>
                              </div>
                              {shape.popular && (
                                <span className="text-xs bg-[#2e6b38] text-white px-3 py-1 rounded-full font-semibold">
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
                      Label dimensions
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Width (inches)
                        </label>
                        <select
                          value={labelSize.width}
                          onChange={(e) => setLabelSize(prev => ({ ...prev, width: e.target.value }))}
                          className="w-full p-3 border-2 border-[#ebebeb] rounded-xl focus:border-[#2e6b38] outline-none transition-colors"
                        >
                          <option value="1">1"</option>
                          <option value="1.5">1.5"</option>
                          <option value="2">2"</option>
                          <option value="2.5">2.5"</option>
                          <option value="3">3"</option>
                          <option value="4">4"</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          {selectedShape === 'circle' ? 'Height (same as width)' : 'Height (inches)'}
                        </label>
                        {selectedShape === 'circle' ? (
                          <input
                            type="text"
                            value={`${labelSize.width}" (circle)`}
                            disabled
                            className="w-full p-3 border-2 border-[#ebebeb] rounded-xl bg-gray-50 text-[#666]"
                          />
                        ) : (
                          <select
                            value={labelSize.length}
                            onChange={(e) => setLabelSize(prev => ({ ...prev, length: e.target.value }))}
                            className="w-full p-3 border-2 border-[#ebebeb] rounded-xl focus:border-[#2e6b38] outline-none transition-colors"
                          >
                            <option value="1">1"</option>
                            <option value="1.5">1.5"</option>
                            <option value="2">2"</option>
                            <option value="2.5">2.5"</option>
                            <option value="3">3"</option>
                            <option value="4">4"</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selection */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-normal text-black mb-6" style={{fontFamily: '"Instrument Serif", serif'}}>
                      How many labels?
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {QUANTITY_OPTIONS.map((qty) => (
                        <label key={qty} className="block cursor-none">
                          <input
                            type="radio"
                            name="quantity"
                            value={qty}
                            checked={quantity === qty}
                            onChange={() => setQuantity(qty)}
                            className="sr-only"
                          />
                          <div className={`p-4 rounded-2xl border-2 text-center transition-all hover:translate-y-[-2px] ${
                            quantity === qty
                              ? 'border-[#2e6b38] bg-[#e6f4e8]'
                              : 'border-[#ebebeb] hover:border-[#2e6b38]'
                          }`}>
                            <div className="font-semibold text-lg">{qty.toLocaleString()}</div>
                            <div className="text-sm font-bold text-[#2e6b38]">
                              ${(calculatePrice().totalPrice / 100 * qty).toFixed(0)}
                            </div>
                            {qty >= 500 && (
                              <div className="text-xs text-[#2e6b38] mt-1">
                                Volume discount
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
                    {selectedShape === 'circle' ? labelSize.width : labelSize.width + '" × ' + labelSize.length}"} × {quantity.toLocaleString()} labels
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 2: Material & Finish */}
        {step === 2 && (
          <section className="py-20 px-10">
            <div className="max-w-6xl mx-auto">
              
              {/* Back Button & Header */}
              <div className="rv mb-12">
                <button 
                  onClick={() => setStep(1)}
                  className="text-[#2e6b38] hover:text-[#1f4526] text-sm mb-4 flex items-center font-medium"
                >
                  ← Back to shape & size
                </button>
                <h2 className="text-5xl font-normal text-black mb-4" style={{fontFamily: '"Instrument Serif", serif'}}>
                  Choose your <em className="italic text-[#2e6b38]">material.</em>
                </h2>
                <p className="text-lg text-[#666]">
                  {selectedShape === 'circle' ? labelSize.width + '"' : labelSize.width + '" × ' + labelSize.length + '"'} × {quantity.toLocaleString()} labels
                </p>
              </div>

              {/* Materials Grid */}
              <div className="rv grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {MATERIALS.map((material) => (
                  <div
                    key={material.id}
                    onClick={() => setSelectedStock(material.id as any)}
                    className={`p-8 rounded-3xl border-2 cursor-none transition-all hover:translate-y-[-4px] ${
                      selectedStock === material.id
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
                      {selectedStock === material.id && (
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
                      onClick={() => setSelectedFinish(finish)}
                      className={`p-6 rounded-2xl border-2 cursor-none transition-all hover:translate-y-[-2px] ${
                        selectedFinish === finish
                          ? 'border-[#2e6b38] bg-[#e6f4e8]'
                          : 'border-[#ebebeb] hover:border-[#2e6b38]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-lg capitalize">{finish}</span>
                        {selectedFinish === finish && (
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
                    <span className="text-[#666]">Shape:</span>
                    <span className="font-medium capitalize">{SHAPES.find(s => s.id === selectedShape)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Size:</span>
                    <span className="font-medium">
                      {selectedShape === 'circle' ? labelSize.width + '"' : labelSize.width + '" × ' + labelSize.length + '"'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Quantity:</span>
                    <span className="font-medium">{quantity.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Material:</span>
                    <span className="font-medium">{MATERIALS.find(m => m.id === selectedStock)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#666]">Finish:</span>
                    <span className="font-medium capitalize">{selectedFinish}</span>
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
                  Design Your Labels →
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: Label Designer */}
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
                  Design your <em className="italic text-[#2e6b38]">perfect labels.</em>
                </h2>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-lg text-[#666] mb-4">
                      {selectedShape === 'circle' ? labelSize.width + '"' : labelSize.width + '" × ' + labelSize.length + '"'} × {quantity.toLocaleString()} {MATERIALS.find(m => m.id === selectedStock)?.name} labels
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-[#666]">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#2e6b38] rounded-full"></div>
                        <span>🤖 Smart Cutlines</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#3dba52] rounded-full"></div>
                        <span>🎨 Real-time Preview</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#f5e642] rounded-full"></div>
                        <span>📁 Production Files</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-black" style={{fontFamily: '"Instrument Serif", serif'}}>
                      ${currentPrice.totalPrice.toFixed(0)}
                    </div>
                    <div className="text-sm text-[