// Database types and interfaces for e-commerce functionality

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  basePrice: number;
  images: string[];
  specifications: {
    sizes: {
      id: string;
      name: string;
      dimensions: string;
      priceMultiplier: number;
    }[];
    paperTypes: {
      id: string;
      name: string;
      description: string;
      priceMultiplier: number;
    }[];
    finishes: {
      id: string;
      name: string;
      description: string;
      priceMultiplier: number;
    }[];
    turnaroundTimes: {
      id: string;
      name: string;
      days: number;
      priceMultiplier: number;
    }[];
  };
  quantityPricing: {
    min: number;
    max: number;
    priceMultiplier: number;
  }[];
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productDescription: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  specifications: {
    size: string;
    paperType: string;
    finish: string;
    turnaroundTime: string;
  };
  customizations: {
    uploadedFiles?: string[];
    specialInstructions?: string;
  };
  addedAt: Date;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  billingAddress: Address;
  shippingAddress: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'bank_transfer' | 'check';
  paymentIntentId?: string;
  shippingMethod: string;
  trackingNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentIntent {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  clientSecret?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Form interfaces
export interface CheckoutFormData {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    company?: string;
    phone?: string;
  };
  billingAddress: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingAddress: {
    sameAsBilling: boolean;
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  shippingMethod: string;
  paymentMethod: 'stripe' | 'bank_transfer' | 'check';
  notes?: string;
}

export interface ProductFilter {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
  sortBy?: 'name' | 'price' | 'category' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}