import { NextRequest, NextResponse } from 'next/server'
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import { productCatalog, getProductById } from '@/data/products'

// GET /api/pricing/calculate - Calculate pricing for a product
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    // Extract parameters
    const productId = searchParams.get('productId')
    const quantity = parseInt(searchParams.get('quantity') || '100')
    const size = searchParams.get('size') || 'standard'
    const paperType = searchParams.get('paperType') || '14pt'
    const finish = searchParams.get('finish') || 'none'
    const turnaroundTime = searchParams.get('turnaroundTime') || 'standard'
    const shippingZipCode = searchParams.get('shippingZipCode') || '11201'

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const calculatorInputs = {
      productId,
      productType: productId,
      quantity,
      size,
      paperType,
      finish,
      turnaroundTime,
      shippingZipCode,
    }

    const result = EnhancedPricingCalculator.calculate(calculatorInputs, product)
    const validation = EnhancedPricingCalculator.validate(calculatorInputs, result.finalTotal)

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        validation,
      },
    })
  } catch (error) {
    console.error('Error calculating pricing:', error)
    return NextResponse.json(
      { error: 'Failed to calculate pricing' },
      { status: 500 }
    )
  }
}

// POST /api/pricing/calculate - Calculate pricing with detailed inputs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      productId,
      quantity,
      size,
      paperType,
      finish,
      turnaroundTime,
      shippingZipCode,
    } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const product = getProductById(productId)
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const calculatorInputs = {
      productId,
      productType: productId,
      quantity: quantity || 100,
      size: size || 'standard',
      paperType: paperType || '14pt',
      finish: finish || 'none',
      turnaroundTime: turnaroundTime || 'standard',
      shippingZipCode: shippingZipCode || '11201',
    }

    const result = EnhancedPricingCalculator.calculate(calculatorInputs, product)
    const validation = EnhancedPricingCalculator.validate(calculatorInputs, result.finalTotal)

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        validation,
      },
    })
  } catch (error) {
    console.error('Error calculating pricing:', error)
    return NextResponse.json(
      { error: 'Failed to calculate pricing' },
      { status: 500 }
    )
  }
}