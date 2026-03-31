// Pricing calculator functions that integrate with the existing calculator
// This provides a bridge between the external calculator and our e-commerce system

import { Product } from '@/types/ecommerce'

export interface CalculatorInputs {
  productType: string;
  quantity: number;
  size: string;
  paperType: string;
  finish: string;
  turnaroundTime: string;
  numColors?: number;
  doubleSided?: boolean;
}

export interface CalculatorResult {
  basePrice: number;
  unitPrice: number;
  totalPrice: number;
  priceBreakdown: {
    base: number;
    size: number;
    paper: number;
    finish: number;
    turnaround: number;
    quantity: number;
  };
  savings: {
    percentage: number;
    amount: number;
  };
}

// Mock pricing calculation based on the existing calculator logic
export const calculatePrice = (inputs: CalculatorInputs): CalculatorResult => {
  const {
    productType,
    quantity,
    size,
    paperType,
    finish,
    turnaroundTime,
    numColors = 4,
    doubleSided = false,
  } = inputs;

  // Base pricing matrix (similar to the existing calculator)
  const basePricing: Record<string, number> = {
    'business-cards': 0.15,
    'letterhead': 0.08,
    'envelopes': 0.12,
    'notepads': 0.25,
    'flyers': 0.18,
    'brochures': 0.35,
    'posters': 2.50,
    'banners': 8.00,
    'roll-labels': 0.08,
    'stickers': 0.12,
  };

  // Multiplier configurations
  const sizeMultipliers: Record<string, number> = {
    'standard': 1.0,
    'square': 1.1,
    'mini': 0.9,
    'letter': 1.0,
    'legal': 1.1,
    'half': 0.7,
    'quarter': 0.5,
    '11x17': 1.0,
    '18x24': 1.5,
    '24x36': 2.0,
    '2x4': 1.0,
    '3x6': 1.5,
    '4x8': 2.0,
    '1x2': 1.0,
    '2x3': 1.5,
    '3x4': 2.0,
  };

  const paperMultipliers: Record<string, number> = {
    '14pt': 1.0,
    '16pt': 1.2,
    'glossy': 1.1,
    'linen': 1.3,
    '24lb': 1.0,
    '28lb': 1.2,
    '32lb': 1.4,
    '20lb': 1.0,
    '100lb': 1.4,
    '80lb': 1.0,
    'paper': 1.0,
    'bopp': 1.5,
    'clear': 1.6,
    'vinyl': 1.4,
  };

  const finishMultipliers: Record<string, number> = {
    'none': 1.0,
    'uv': 1.15,
    'spot-uv': 1.25,
    'foil': 1.4,
    'embossed': 1.35,
    'watermark': 1.2,
    'peel': 1.1,
    'chipboard': 1.2,
    'matte': 1.15,
    'gloss': 1.2,
    'laminate': 1.5,
  };

  const turnaroundMultipliers: Record<string, number> = {
    'standard': 1.0,
    'expedited': 1.25,
    'rush': 1.5,
    'same-day': 2.0,
  };

  // Quantity discount tiers
  const getQuantityMultiplier = (qty: number): number => {
    if (qty >= 5000) return 0.25;
    if (qty >= 2500) return 0.3;
    if (qty >= 1000) return 0.4;
    if (qty >= 500) return 0.6;
    if (qty >= 250) return 0.8;
    if (qty >= 100) return 1.0;
    return 1.2; // Small quantity surcharge
  };

  // Calculate base price
  const baseUnitPrice = basePricing[productType] || 0.50;
  const sizeMultiplier = sizeMultipliers[size] || 1.0;
  const paperMultiplier = paperMultipliers[paperType] || 1.0;
  const finishMultiplier = finishMultipliers[finish] || 1.0;
  const turnaroundMultiplier = turnaroundMultipliers[turnaroundTime] || 1.0;
  const quantityMultiplier = getQuantityMultiplier(quantity);

  // Color and double-sided adjustments
  const colorMultiplier = numColors === 1 ? 0.8 : numColors === 2 ? 0.9 : 1.0;
  const doubleSidedMultiplier = doubleSided ? 1.6 : 1.0;

  // Calculate final unit price
  const unitPrice = baseUnitPrice * 
    sizeMultiplier * 
    paperMultiplier * 
    finishMultiplier * 
    turnaroundMultiplier * 
    quantityMultiplier * 
    colorMultiplier * 
    doubleSidedMultiplier;

  // Calculate total price with setup fees
  const setupFee = quantity < 100 ? 25 : 0; // Setup fee for small quantities
  const totalPrice = (unitPrice * quantity) + setupFee;

  // Calculate price breakdown
  const base = baseUnitPrice * quantity;
  const sizeCost = base * (sizeMultiplier - 1);
  const paperCost = base * (paperMultiplier - 1);
  const finishCost = base * (finishMultiplier - 1);
  const turnaroundCost = base * (turnaroundMultiplier - 1);
  const quantitySavings = base * (1 - quantityMultiplier);

  return {
    basePrice: baseUnitPrice,
    unitPrice,
    totalPrice,
    priceBreakdown: {
      base,
      size: sizeCost,
      paper: paperCost,
      finish: finishCost,
      turnaround: turnaroundCost,
      quantity: -quantitySavings, // Negative because it's savings
    },
    savings: {
      percentage: Math.round((1 - quantityMultiplier) * 100),
      amount: quantitySavings,
    },
  };
};

// Real-time price validation and adjustment
export const validateAndAdjustPrice = (
  inputs: CalculatorInputs,
  currentPrice: number
): { isValid: boolean; adjustedPrice?: number; reason?: string } => {
  // Minimum price validation
  const minimumPrice = 15.00;
  if (currentPrice < minimumPrice) {
    return {
      isValid: false,
      adjustedPrice: minimumPrice,
      reason: `Minimum order value is $${minimumPrice.toFixed(2)}`,
    };
  }

  // Maximum price validation (to prevent abuse)
  const maximumPrice = 10000.00;
  if (currentPrice > maximumPrice) {
    return {
      isValid: false,
      adjustedPrice: maximumPrice,
      reason: `Maximum order value is $${maximumPrice.toFixed(2)}. Please contact us for larger orders.`,
    };
  }

  return { isValid: true };
};

// Price comparison utility
export const comparePrices = (
  inputs1: CalculatorInputs,
  inputs2: CalculatorInputs
): { difference: number; percentage: number; savings: number } => {
  const result1 = calculatePrice(inputs1);
  const result2 = calculatePrice(inputs2);
  
  const difference = result1.totalPrice - result2.totalPrice;
  const percentage = (difference / result1.totalPrice) * 100;
  
  return {
    difference,
    percentage,
    savings: Math.abs(difference),
  };
};

// Dynamic pricing suggestions based on quantity
export const getQuantitySuggestions = (
  productType: string,
  currentQuantity: number
): Array<{
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  savings: number;
  savingsPercentage: number;
}> => {
  const suggestions = [];
  const nextTiers = [100, 250, 500, 1000, 2500, 5000].filter(q => q > currentQuantity);
  
  for (const quantity of nextTiers.slice(0, 3)) { // Show top 3 suggestions
    const currentInputs: CalculatorInputs = {
      productType,
      quantity: currentQuantity,
      size: 'standard',
      paperType: '14pt',
      finish: 'none',
      turnaroundTime: 'standard',
    };
    
    const suggestedInputs: CalculatorInputs = {
      ...currentInputs,
      quantity,
    };
    
    const currentResult = calculatePrice(currentInputs);
    const suggestedResult = calculatePrice(suggestedInputs);
    
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
    });
  }
  
  return suggestions;
};

// Export for use in components
export const PricingCalculator = {
  calculate: calculatePrice,
  validate: validateAndAdjustPrice,
  compare: comparePrices,
  suggestQuantities: getQuantitySuggestions,
};