// Enhanced pricing calculator that integrates the existing calculator logic with e-commerce system
// This creates a bridge between the external calculator and our product catalog

import { Product } from '@/types/ecommerce'
import { CalculatorInputs, CalculatorResult } from '@/utils/pricingCalculator'

// Extracted pricing logic from the existing calculator
const EXISTING_CALCULATOR_PRICING = {
  base: {
    'business-card': 0.15,
    'postcard-4x6': 0.25,
    'postcard-5x7': 0.35,
    'flyer-8.5x11': 0.45,
    'poster-11x17': 1.20,
    'poster-24x36': 3.50,
    'letterhead-standard': 0.08,
    'roll-labels': 0.08,
    'stickers': 0.12,
  },
  paper: {
    '14pt': 0, // Standard business card
    '16pt': 0.10,
    'glossy': 0.15,
    'linen': 0.12,
    'premium': 0.10,
    '24lb': 0,
    '28lb': 0.08,
    '32lb': 0.16,
    '100lb': 0.20,
    'paper': 0,
    'bopp': 0.25,
    'clear': 0.30,
    'vinyl': 0.20,
  },
  color: {
    'bw': 0,
    'color': 0.25,
  },
  finish: {
    'none': 0,
    'uv': 0.08,
    'spot-uv': 0.15,
    'foil': 0.25,
    'embossed': 0.20,
    'watermark': 0.15,
    'gloss': 0.10,
    'matte': 0.08,
    'laminate': 0.25,
  },
  turnaround: {
    'standard': 0,
    'expedited': 0.25,
    'rush': 0.50,
    'same-day': 1.00,
  },
};

// Enhanced calculator inputs that work with both systems
export interface EnhancedCalculatorInputs {
  productId: string;
  productType: string;
  quantity: number;
  size: string;
  paperType: string;
  finish: string;
  turnaroundTime: string;
  colorOption?: 'bw' | 'color';
  numColors?: number;
  doubleSided?: boolean;
  shippingZipCode?: string;
  rushOrder?: boolean;
}

// Enhanced result with detailed breakdown
export interface EnhancedCalculatorResult extends CalculatorResult {
  productId: string;
  shippingCost: number;
  taxAmount: number;
  rushFee: number;
  volumeDiscount: number;
  finalTotal: number;
  savings: {
    percentage: number;
    amount: number;
    fromBasePrice: number;
  };
  priceDetails: {
    baseUnitPrice: number;
    paperUnitPrice: number;
    finishUnitPrice: number;
    turnaroundUnitPrice: number;
    volumeDiscountPerUnit: number;
    finalUnitPrice: number;
  };
  deliveryInfo: {
    estimatedDelivery: string;
    productionTime: number;
    shippingTime: number;
  };
}

// New York tax rates by location
const NY_TAX_RATES = {
  'brooklyn': 0.08875, // 8.875%
  'manhattan': 0.08875,
  'queens': 0.08875,
  'bronx': 0.08875,
  'staten-island': 0.08875,
  'nyc': 0.08875,
  'new-york': 0.08875,
  'default': 0.08, // Default NY state rate
};

// Shipping costs based on quantity and location
const SHIPPING_COSTS = {
  local: {
    1: 15.00,
    100: 25.00,
    500: 35.00,
    1000: 50.00,
    2500: 75.00,
    5000: 100.00,
  },
  regional: {
    1: 20.00,
    100: 30.00,
    500: 45.00,
    1000: 65.00,
    2500: 95.00,
    5000: 125.00,
  },
  national: {
    1: 25.00,
    100: 40.00,
    500: 60.00,
    1000: 85.00,
    2500: 125.00,
    5000: 165.00,
  },
};

// Production times in days
const PRODUCTION_TIMES = {
  'standard': 5,
  'expedited': 3,
  'rush': 1,
  'same-day': 0,
};

// Enhanced pricing calculation that integrates both calculators
export const calculateEnhancedPrice = (
  inputs: EnhancedCalculatorInputs,
  product: Product
): EnhancedCalculatorResult => {
  const {
    productId,
    quantity,
    size,
    paperType,
    finish,
    turnaroundTime,
    colorOption = 'color',
    shippingZipCode = '11201', // Default to Brooklyn
    rushOrder = false,
  } = inputs;

  if (quantity === 0) {
    return {
      productId,
      basePrice: 0,
      unitPrice: 0,
      totalPrice: 0,
      priceBreakdown: {
        base: 0,
        size: 0,
        paper: 0,
        finish: 0,
        turnaround: 0,
        quantity: 0,
      },
      shippingCost: 0,
      taxAmount: 0,
      rushFee: 0,
      volumeDiscount: 0,
      finalTotal: 0,
      savings: { percentage: 0, amount: 0, fromBasePrice: 0 },
      priceDetails: {
        baseUnitPrice: 0,
        paperUnitPrice: 0,
        finishUnitPrice: 0,
        turnaroundUnitPrice: 0,
        volumeDiscountPerUnit: 0,
        finalUnitPrice: 0,
      },
      deliveryInfo: {
        estimatedDelivery: '',
        productionTime: 0,
        shippingTime: 0,
      },
    };
  }

  // Map product types to existing calculator types
  const getCalculatorProductType = (productId: string): string => {
    const mappings: Record<string, string> = {
      'business-cards': 'business-card',
      'letterhead': 'letterhead-standard',
      'flyers': 'flyer-8.5x11',
      'roll-labels': 'roll-labels',
      'stickers': 'stickers',
    };
    return mappings[productId] || 'business-card';
  };

  // Calculate base pricing using existing calculator logic
  const calculatorProductType = getCalculatorProductType(productId);
  const baseUnitPrice = EXISTING_CALCULATOR_PRICING.base[calculatorProductType as keyof typeof EXISTING_CALCULATOR_PRICING.base] || 0.15;
  const paperUnitPrice = EXISTING_CALCULATOR_PRICING.paper[paperType as keyof typeof EXISTING_CALCULATOR_PRICING.paper] || 0;
  const finishUnitPrice = EXISTING_CALCULATOR_PRICING.finish[finish as keyof typeof EXISTING_CALCULATOR_PRICING.finish] || 0;
  const turnaroundMultiplier = EXISTING_CALCULATOR_PRICING.turnaround[turnaroundTime as keyof typeof EXISTING_CALCULATOR_PRICING.turnaround] || 0;

  // Calculate individual components
  let baseSubtotal = baseUnitPrice * quantity;
  let paperSubtotal = paperUnitPrice * quantity;
  let finishSubtotal = finishUnitPrice * quantity;

  // Calculate turnaround fee (percentage of subtotal)
  let subtotalBeforeTurnaround = baseSubtotal + paperSubtotal + finishSubtotal;
  let turnaroundFee = subtotalBeforeTurnaround * turnaroundMultiplier;

  // Calculate total before volume discounts
  let totalBeforeVolume = subtotalBeforeTurnaround + turnaroundFee;

  // Apply volume discounts (matching existing calculator)
  let volumeDiscount = 0;
  let finalTotal = totalBeforeVolume;
  
  if (quantity >= 5000) {
    volumeDiscount = totalBeforeVolume * 0.15; // 15% discount
    finalTotal = totalBeforeVolume * 0.85;
  } else if (quantity >= 2500) {
    volumeDiscount = totalBeforeVolume * 0.10; // 10% discount
    finalTotal = totalBeforeVolume * 0.90;
  } else if (quantity >= 1000) {
    volumeDiscount = totalBeforeVolume * 0.05; // 5% discount
    finalTotal = totalBeforeVolume * 0.95;
  }

  const perUnitPrice = finalTotal / quantity;

  // Calculate shipping cost
  const shippingCost = calculateShippingCost(quantity, shippingZipCode);

  // Calculate tax (based on shipping location)
  const taxRate = getTaxRate(shippingZipCode);
  const taxAmount = (finalTotal + shippingCost) * taxRate;

  // Calculate final total
  const finalTotalWithTaxAndShipping = finalTotal + shippingCost + taxAmount;

  // Calculate delivery information
  const deliveryInfo = calculateDeliveryInfo(turnaroundTime, quantity);

  // Calculate savings information
  const basePriceNoDiscounts = totalBeforeVolume;
  const savingsAmount = basePriceNoDiscounts - finalTotal;
  const savingsPercentage = (savingsAmount / basePriceNoDiscounts) * 100;

  return {
    productId,
    basePrice: baseUnitPrice,
    unitPrice: perUnitPrice,
    totalPrice: finalTotal,
    priceBreakdown: {
      base: baseSubtotal,
      size: 0, // Size is included in base for now
      paper: paperSubtotal,
      finish: finishSubtotal,
      turnaround: turnaroundFee,
      quantity: -volumeDiscount, // Negative because it's savings
    },
    shippingCost,
    taxAmount,
    rushFee: turnaroundFee,
    volumeDiscount,
    finalTotal: finalTotalWithTaxAndShipping,
    savings: {
      percentage: Math.round(savingsPercentage),
      amount: savingsAmount,
      fromBasePrice: basePriceNoDiscounts,
    },
    priceDetails: {
      baseUnitPrice,
      paperUnitPrice,
      finishUnitPrice,
      turnaroundUnitPrice: turnaroundFee / quantity,
      volumeDiscountPerUnit: volumeDiscount / quantity,
      finalUnitPrice: perUnitPrice,
    },
    deliveryInfo,
  };
};

// Calculate shipping cost based on quantity and location
const calculateShippingCost = (quantity: number, zipCode: string): number => {
  // Determine shipping zone based on zip code
  const isLocal = zipCode.startsWith('10') || zipCode.startsWith('11') || zipCode.startsWith('07');
  const isRegional = zipCode.startsWith('0') || zipCode.startsWith('1') || zipCode.startsWith('2') || zipCode.startsWith('3');
  
  const shippingZone = isLocal ? 'local' : isRegional ? 'regional' : 'national';
  const shippingCosts = SHIPPING_COSTS[shippingZone];
  
  // Find appropriate shipping cost tier
  const tiers = Object.keys(shippingCosts).map(Number).sort((a, b) => a - b);
  const applicableTier = tiers.reverse().find(tier => quantity >= tier) || tiers[tiers.length - 1];
  
  return shippingCosts[applicableTier as keyof typeof shippingCosts];
};

// Get tax rate based on location
const getTaxRate = (zipCode: string): number => {
  // Simple mapping for Brooklyn/NYC area
  if (zipCode.startsWith('112') || zipCode.startsWith('11')) {
    return NY_TAX_RATES.brooklyn;
  }
  if (zipCode.startsWith('10') || zipCode.startsWith('07')) {
    return NY_TAX_RATES.nyc;
  }
  return NY_TAX_RATES.default;
};

// Calculate delivery information
const calculateDeliveryInfo = (turnaroundTime: string, quantity: number): {
  estimatedDelivery: string;
  productionTime: number;
  shippingTime: number;
} => {
  const productionTime = PRODUCTION_TIMES[turnaroundTime as keyof typeof PRODUCTION_TIMES] || 5;
  const shippingTime = quantity > 1000 ? 3 : 2; // Larger orders take longer to ship
  const totalDays = productionTime + shippingTime;
  
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + totalDays);
  
  return {
    estimatedDelivery: estimatedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    productionTime,
    shippingTime,
  };
};

// Real-time price validation
export const validateEnhancedPrice = (
  inputs: EnhancedCalculatorInputs,
  calculatedPrice: number
): { 
  isValid: boolean; 
  adjustedPrice?: number; 
  reason?: string;
  warnings?: string[];
} => {
  const warnings: string[] = [];
  
  // Minimum order validation
  const minimumOrder = 25.00;
  if (calculatedPrice < minimumOrder) {
    return {
      isValid: false,
      adjustedPrice: minimumOrder,
      reason: `Minimum order value is $${minimumOrder.toFixed(2)}`,
      warnings,
    };
  }

  // Maximum order validation
  const maximumOrder = 15000.00;
  if (calculatedPrice > maximumOrder) {
    return {
      isValid: false,
      adjustedPrice: maximumOrder,
      reason: `Maximum order value is $${maximumOrder.toFixed(2)}. Please contact us for larger orders.`,
      warnings,
    };
  }

  // Quantity warnings
  if (inputs.quantity < 50) {
    warnings.push('Small quantities may have higher per-unit costs');
  }
  
  if (inputs.quantity > 10000) {
    warnings.push('Large quantities may require additional processing time');
  }

  // Rush order warnings
  if (inputs.turnaroundTime === 'rush' || inputs.turnaroundTime === 'same-day') {
    warnings.push('Rush orders are subject to availability and may incur additional fees');
  }

  return { isValid: true, warnings };
};

// Get dynamic pricing suggestions
export const getEnhancedQuantitySuggestions = (
  productId: string,
  currentQuantity: number,
  inputs: Partial<EnhancedCalculatorInputs>
): Array<{
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  savings: number;
  savingsPercentage: number;
  deliveryTime: string;
}> => {
  const suggestions = [];
  const nextTiers = [100, 250, 500, 1000, 2500, 5000].filter(q => q > currentQuantity);
  
  for (const quantity of nextTiers.slice(0, 3)) {
    const currentInputs: EnhancedCalculatorInputs = {
      productId,
      productType: inputs.productType || 'business-cards',
      quantity: currentQuantity,
      size: inputs.size || 'standard',
      paperType: inputs.paperType || '14pt',
      finish: inputs.finish || 'none',
      turnaroundTime: inputs.turnaroundTime || 'standard',
      ...inputs,
    };
    
    const suggestedInputs: EnhancedCalculatorInputs = {
      ...currentInputs,
      quantity,
    };
    
    // Mock product for calculation
    const mockProduct = {
      id: productId,
      basePrice: 25,
      specifications: {
        sizes: [{ id: 'standard', priceMultiplier: 1 }],
        paperTypes: [{ id: '14pt', priceMultiplier: 1 }],
        finishes: [{ id: 'none', priceMultiplier: 1 }],
        turnaroundTimes: [{ id: 'standard', priceMultiplier: 1 }],
      },
    } as Product;
    
    const currentResult = calculateEnhancedPrice(currentInputs, mockProduct);
    const suggestedResult = calculateEnhancedPrice(suggestedInputs, mockProduct);
    
    // Calculate savings per unit
    const currentUnitPrice = currentResult.unitPrice;
    const suggestedUnitPrice = suggestedResult.unitPrice;
    const unitSavings = currentUnitPrice - suggestedUnitPrice;
    const totalSavings = unitSavings * currentQuantity;
    const savingsPercentage = (unitSavings / currentUnitPrice) * 100;
    
    suggestions.push({
      quantity,
      unitPrice: suggestedUnitPrice,
      totalPrice: suggestedResult.totalPrice,
      savings: totalSavings,
      savingsPercentage,
      deliveryTime: suggestedResult.deliveryInfo.estimatedDelivery,
    });
  }
  
  return suggestions;
};

// Export enhanced calculator
export const EnhancedPricingCalculator = {
  calculate: calculateEnhancedPrice,
  validate: validateEnhancedPrice,
  suggestQuantities: getEnhancedQuantitySuggestions,
};