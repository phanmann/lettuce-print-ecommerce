import { NextRequest, NextResponse } from 'next/server'
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import { productCatalog, getProductById } from '@/data/products'

// GET /api/pricing/suggestions - Get quantity suggestions for a product
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    
    const productId = searchParams.get('productId')
    const currentQuantity = parseInt(searchParams.get('currentQuantity') || '100')
    const size = searchParams.get('size') || 'standard'
    const paperType = searchParams.get('paperType') || '14pt'
    const finish = searchParams.get('finish') || 'none'
    const turnaroundTime = searchParams.get('turnaroundTime') || 'standard'

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

    const suggestions = EnhancedPricingCalculator.suggestQuantities(productId, currentQuantity, {
      size,
      paperType,
      finish,
      turnaroundTime,
    })

    return NextResponse.json({
      success: true,
      data: suggestions,
    })
  } catch (error) {
    console.error('Error getting quantity suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to get quantity suggestions' },
      { status: 500 }
    )
  }
}

// POST /api/pricing/suggestions - Get quantity suggestions with detailed inputs
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      productId,
      currentQuantity,
      size,
      paperType,
      finish,
      turnaroundTime,
    } = body

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const suggestions = EnhancedPricingCalculator.suggestQuantities(productId, currentQuantity || 100, {
      size: size || 'standard',
      paperType: paperType || '14pt',
      finish: finish || 'none',
      turnaroundTime: turnaroundTime || 'standard',
    })

    return NextResponse.json({
      success: true,
      data: suggestions,
    })
  } catch (error) {
    console.error('Error getting quantity suggestions:', error)
    return NextResponse.json(
      { error: 'Failed to get quantity suggestions' },
      { status: 500 }
    )
  }
}