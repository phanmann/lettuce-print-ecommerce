import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmation } from '@/lib/emailService'
import { v4 as uuidv4 } from 'uuid'

// Mock order processing (in real implementation, integrate with Stripe and database)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customer, billingAddress, shippingAddress, shippingMethod, paymentMethod, notes, cart } = body

    // Generate order number
    const orderNumber = `LP${Date.now().toString().slice(-8)}`
    
    // Create order object
    const order = {
      id: uuidv4(),
      orderNumber,
      customer: {
        ...customer,
        billingAddress,
        shippingAddress: shippingAddress.sameAsBilling ? billingAddress : shippingAddress,
      },
      items: cart.items,
      subtotal: cart.subtotal,
      tax: cart.tax,
      shipping: cart.shipping,
      total: cart.total,
      status: 'pending',
      paymentStatus: paymentMethod === 'stripe' ? 'paid' : 'pending',
      paymentMethod,
      shippingMethod,
      notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Send confirmation email
    try {
      await sendOrderConfirmation(order)
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Continue with order processing even if email fails
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        total: order.total,
      },
    })

  } catch (error) {
    console.error('Order processing error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process order',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}