'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/stores/cartStore'
import { productCatalog, getProductById } from '@/data/products'
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import { Upload, Plus, Minus, ShoppingCart, Check, Calculator, Info, Truck, DollarSign, Clock } from 'lucide-react'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [priceLoading, setPriceLoading] = useState(false)
  
  // Product configuration state
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedPaperType, setSelectedPaperType] = useState('')
  const [selectedFinish, setSelectedFinish] = useState('')
  const [selectedTurnaround, setSelectedTurnaround] = useState('')
  const [quantity, setQuantity] = useState(100)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [shippingZipCode, setShippingZipCode] = useState('11201')
  
  // Pricing state
  const [calculatedPrice, setCalculatedPrice] = useState<any>(null)
  const [quantitySuggestions, setQuantitySuggestions] = useState<any[]>([])
  const [priceValidations, setPriceValidations] = useState<any>(null)
  
  // UI state
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [showQuantitySavings, setShowQuantitySavings] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  
  const addToCart = useCartStore((state) => state.addToCart)

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

  useEffect(() => {
    if (product && selectedSize && selectedPaperType && selectedFinish && selectedTurnaround) {
      calculatePricing()
    }
  }, [product, selectedSize, selectedPaperType, selectedFinish, selectedTurnaround, quantity, shippingZipCode])

  const calculatePricing = async () => {
    if (!product) return

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
      const suggestions = EnhancedPricingCalculator.suggestQuantities(product.id, quantity, {
        size: selectedSize,
        paperType: selectedPaperType,
        finish: selectedFinish,
        turnaroundTime: selectedTurnaround,
      })
      setQuantitySuggestions(suggestions)
      
    } catch (error) {
      console.error('Error calculating pricing:', error)
      setPriceValidations({ isValid: false, reason: 'Error calculating price' })
    } finally {
      setPriceLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    setAddingToCart(true)
    
    try {
      // Simulate file upload (in real implementation, upload to server)
      const fileUrls = uploadedFiles.map(file => URL.createObjectURL(file))
      
      const cartItem = {
        productId: product.id,
        productName: product.name,
        productDescription: product.description,
        quantity,
        unitPrice: calculatedPrice.unitPrice,
        specifications: {
          size: selectedSize,
          paperType: selectedPaperType,
          finish: selectedFinish,
          turnaroundTime: selectedTurnaround,
        },
        customizations: {
          uploadedFiles: fileUrls,
          specialInstructions,
        },
        addedAt: new Date(),
      }
      
      addToCart(cartItem)
      
      // Show success state
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setAddingToCart(false)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lettuce-green"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <a href="/products" className="btn-primary px-6 py-3">
              Back to Products
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-96 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🖨️</div>
                  <p className="text-gray-500">{product.name} Image</p>
                </div>
              </div>
            </div>
            
            {/* Additional images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image: string, index: number) => (
                <div key={index} className="bg-gray-200 rounded-lg h-20 flex items-center justify-center">
                  <span className="text-2xl">🖨️</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Product Header */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-lettuce-green font-medium bg-lettuce-green bg-opacity-10 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Pricing Display */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Price</p>
                  <p className="text-3xl font-bold text-lettuce-green">
                    ${calculatedPrice?.finalTotal.toFixed(2) || '0.00'}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${calculatedPrice?.unitPrice.toFixed(2) || '0.00'} per unit
                  </p>
                </div>
                <button
                  onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
                  className="flex items-center space-x-2 text-lettuce-green hover:text-lettuce-green-dark"
                >
                  <Calculator className="h-4 w-4" />
                  <span className="text-sm">Price Breakdown</span>
                </button>
              </div>

              {/* Price Breakdown */}
              {showPriceBreakdown && calculatedPrice && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
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
                    <div className="flex justify-between text-sm text-green-600">
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

              {/* Savings Display */}
              {calculatedPrice?.savings.amount > 0 && (
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
              {calculatedPrice && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Estimated delivery: <strong>{calculatedPrice.deliveryInfo.estimatedDelivery}</strong>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Production: {calculatedPrice.deliveryInfo.productionTime} days + 
                    Shipping: {calculatedPrice.deliveryInfo.shippingTime} days
                  </p>
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 50))}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 text-center border border-gray-300 rounded-lg px-3 py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 50)}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Quantity Suggestions */}
              {showQuantitySavings && quantitySuggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Save more with higher quantities:</p>
                    <button
                      onClick={() => setShowQuantitySavings(!showQuantitySavings)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      {showQuantitySavings ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {showQuantitySavings && quantitySuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setQuantity(suggestion.quantity)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-lettuce-green hover:bg-lettuce-green hover:bg-opacity-5 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{suggestion.quantity} units</span>
                          <span className="text-sm text-gray-500 ml-2">${suggestion.unitPrice.toFixed(2)}/each</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-green-600 font-medium">
                            Save {suggestion.savingsPercentage.toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">
                            ${suggestion.totalPrice.toFixed(2)} total
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Specifications */}
            <div className="space-y-4">
              {/* Size Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Size</label>
                <div className="grid grid-cols-1 gap-3">
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
                        <p className="font-medium">{size.name}</p>
                        <p className="text-sm text-gray-500">{size.dimensions}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {size.priceMultiplier > 1 && `+${Math.round((size.priceMultiplier - 1) * 100)}%`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Paper Type Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Paper Type</label>
                <div className="grid grid-cols-1 gap-3">
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
                        <p className="font-medium">{paper.name}</p>
                        <p className="text-sm text-gray-500">{paper.description}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {paper.priceMultiplier > 1 && `+${Math.round((paper.priceMultiplier - 1) * 100)}%`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Finish Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Finish</label>
                <div className="grid grid-cols-1 gap-3">
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
                        <p className="font-medium">{finish.name}</p>
                        <p className="text-sm text-gray-500">{finish.description}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {finish.priceMultiplier > 1 && `+${Math.round((finish.priceMultiplier - 1) * 100)}%`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Turnaround Time Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Turnaround Time</label>
                <div className="grid grid-cols-1 gap-3">
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
                        <p className="font-medium">{turnaround.name}</p>
                        <p className="text-sm text-gray-500">{turnaround.days} days</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {turnaround.priceMultiplier > 1 && `+${Math.round((turnaround.priceMultiplier - 1) * 100)}%`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Shipping Location */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Shipping ZIP Code
                </label>
                <input
                  type="text"
                  value={shippingZipCode}
                  onChange={(e) => setShippingZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                  placeholder="11201"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Enter your ZIP code for accurate shipping costs and delivery estimates
                </p>
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Upload Design Files (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-lettuce-green transition-colors">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop your files here, or{' '}
                  <label className="text-lettuce-green hover:text-lettuce-green-dark cursor-pointer">
                    browse
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.ai,.psd,.eps"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </p>
                <p className="text-xs text-gray-500">
                  Supported formats: PDF, JPG, PNG, AI, PSD, EPS
                </p>
              </div>
              
              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(1)} MB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Special Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Special Instructions (Optional)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                placeholder="Any special requirements, delivery instructions, or notes..."
              />
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || addedToCart || !calculatedPrice || !priceValidations?.isValid}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-colors flex items-center justify-center space-x-2 ${
                addedToCart
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-lettuce-green hover:bg-lettuce-green-dark'
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

            {/* Price Validation Error */}
            {!priceValidations?.isValid && priceValidations?.reason && (
              <div className="mt-3 text-sm text-red-600 bg-red-50 p-3 rounded">
                {priceValidations.reason}
              </div>
            )}

            {/* Price Validation Warnings */}
            {priceValidations?.warnings && priceValidations.warnings.length > 0 && (
              <div className="mt-3 space-y-2">
                {priceValidations.warnings.map((warning: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}