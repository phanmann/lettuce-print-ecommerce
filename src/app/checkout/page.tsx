'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCartStore } from '@/stores/cartStore'
import { CheckoutFormData } from '@/types/ecommerce'
import { CreditCard, Truck, User, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// Form validation schema
const checkoutSchema = z.object({
  customer: z.object({
    email: z.string().email('Invalid email address'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    company: z.string().optional(),
    phone: z.string().optional(),
  }),
  billingAddress: z.object({
    street1: z.string().min(5, 'Street address is required'),
    street2: z.string().optional(),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zipCode: z.string().min(5, 'Valid ZIP code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
  shippingAddress: z.object({
    sameAsBilling: z.boolean(),
    street1: z.string().optional(),
    street2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
  }),
  shippingMethod: z.string().min(1, 'Shipping method is required'),
  paymentMethod: z.enum(['stripe', 'bank_transfer', 'check']),
  notes: z.string().optional(),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customer: {
        email: '',
        firstName: '',
        lastName: '',
        company: '',
        phone: '',
      },
      billingAddress: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
      },
      shippingAddress: {
        sameAsBilling: true,
      },
      shippingMethod: 'standard',
      paymentMethod: 'stripe',
      notes: '',
    },
  })

  const sameAsBilling = watch('shippingAddress.sameAsBilling')
  const paymentMethod = watch('paymentMethod')

  const onSubmit = async (data: CheckoutFormValues) => {
    setIsProcessing(true)
    
    try {
      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          cart,
        }),
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to create order')
      }

      const orderResult = await orderResponse.json()
      
      if (data.paymentMethod === 'stripe') {
        // Process payment
        const paymentResponse = await fetch('/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(cart.total * 100), // Convert to cents
            currency: 'usd',
            customerInfo: data.customer,
          }),
        })

        if (!paymentResponse.ok) {
          throw new Error('Payment processing failed')
        }
      }
      
      // Generate order number
      setOrderNumber(orderResult.order.orderNumber)
      setOrderComplete(true)
      
      // Clear cart
      clearCart()
      
    } catch (error) {
      console.error('Order processing error:', error)
      alert('There was an error processing your order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', description: '5-7 business days', price: 15.00 },
    { id: 'expedited', name: 'Expedited Shipping', description: '2-3 business days', price: 35.00 },
    { id: 'overnight', name: 'Overnight Shipping', description: 'Next business day', price: 65.00 },
  ]

  if (cart.items.length === 0 && !orderComplete) {
    return (
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
            <Link href="/products" className="btn-primary px-6 py-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="py-8 bg-gray-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="text-6xl mb-6">🎉</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Complete!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your order. We've sent a confirmation email to your email address.
              </p>
              <div className="bg-lettuce-green bg-opacity-10 rounded-lg p-4 mb-6">
                <p className="text-lg font-semibold text-lettuce-green mb-2">Order Number: {orderNumber}</p>
                <p className="text-sm text-gray-600">We'll send you shipping updates as your order progresses.</p>
              </div>
              <div className="space-y-3">
                <Link href="/products" className="btn-primary px-6 py-3 block">
                  Continue Shopping
                </Link>
                <Link href="/account/orders" className="btn-secondary px-6 py-3 block">
                  View Order Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your order by filling out the information below.</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {['Customer Info', 'Shipping', 'Payment'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep > index + 1
                        ? 'bg-lettuce-green text-white'
                        : currentStep === index + 1
                        ? 'bg-lettuce-green text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > index + 1 ? '✓' : index + 1}
                  </div>
                  <span className={`ml-2 ${currentStep >= index + 1 ? 'text-lettuce-green' : 'text-gray-500'}`}>
                    {step}
                  </span>
                  {index < 2 && <ChevronRight className="ml-4 h-4 w-4 text-gray-400" />}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <User className="h-5 w-5 text-lettuce-green mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      {...register('customer.firstName')}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                    {errors.customer?.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      {...register('customer.lastName')}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                    {errors.customer?.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer.lastName.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input
                      {...register('customer.email')}
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                    {errors.customer?.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      {...register('customer.company')}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      {...register('customer.phone')}
                      type="tel"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-lettuce-green mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Billing Address</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                    <input
                      {...register('billingAddress.street1')}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                    {errors.billingAddress?.street1 && (
                      <p className="text-red-500 text-sm mt-1">{errors.billingAddress.street1.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc.</label>
                    <input
                      {...register('billingAddress.street2')}
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                      <input
                        {...register('billingAddress.city')}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                      />
                      {errors.billingAddress?.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.billingAddress.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                      <input
                        {...register('billingAddress.state')}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                      />
                      {errors.billingAddress?.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.billingAddress.state.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code *</label>
                      <input
                        {...register('billingAddress.zipCode')}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                      />
                      {errors.billingAddress?.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.billingAddress.zipCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Truck className="h-5 w-5 text-lettuce-green mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
                </div>

                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register('shippingAddress.sameAsBilling')}
                      className="text-lettuce-green focus:ring-lettuce-green"
                    />
                    <span className="text-sm text-gray-700">Same as billing address</span>
                  </label>
                </div>

                {!sameAsBilling && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                      <input
                        {...register('shippingAddress.street1')}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc.</label>
                      <input
                        {...register('shippingAddress.street2')}
                        type="text"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          {...register('shippingAddress.city')}
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          {...register('shippingAddress.state')}
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                        <input
                          {...register('shippingAddress.zipCode')}
                          type="text"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Method</h2>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label key={method.id} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        {...register('shippingMethod')}
                        value={method.id}
                        className="text-lettuce-green focus:ring-lettuce-green"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${method.price.toFixed(2)}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.shippingMethod && (
                  <p className="text-red-500 text-sm mt-2">{errors.shippingMethod.message}</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-5 w-5 text-lettuce-green mr-2" />
                  <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      {...register('paymentMethod')}
                      value="stripe"
                      className="text-lettuce-green focus:ring-lettuce-green"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Credit Card</p>
                      <p className="text-sm text-gray-500">Secure payment via Stripe</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      {...register('paymentMethod')}
                      value="bank_transfer"
                      className="text-lettuce-green focus:ring-lettuce-green"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-gray-500">Wire transfer or ACH</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      {...register('paymentMethod')}
                      value="check"
                      className="text-lettuce-green focus:ring-lettuce-green"
                    />
                    <div className="flex-1">
                      <p className="font-medium">Business Check</p>
                      <p className="text-sm text-gray-500">Mail a check</p>
                    </div>
                  </label>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-2">{errors.paymentMethod.message}</p>
                )}
              </div>

              {/* Notes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Notes</h2>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-lettuce-green focus:border-lettuce-green"
                  placeholder="Any special instructions or notes about your order..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-lettuce-green hover:bg-lettuce-green-dark text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing Order...</span>
                  </div>
                ) : (
                  `Place Order - $${cart.total.toFixed(2)}`
                )}
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-500">
                          {item.quantity} × ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${cart.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${cart.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-lettuce-green">${cart.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-lettuce-green bg-opacity-10 rounded-lg">
                  <p className="text-sm text-lettuce-green">
                    🔒 Secure checkout powered by Stripe
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}