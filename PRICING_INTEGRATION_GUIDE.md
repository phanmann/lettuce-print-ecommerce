# Pricing Calculator Integration Guide

This guide explains how to integrate the enhanced pricing calculator with the Lettuce Print e-commerce platform.

## Overview

The enhanced pricing calculator bridges the existing calculator logic (from https://phanmann.github.io/lettuce-print-calculator/) with the e-commerce platform, providing:

- **Real-time pricing calculations** based on product specifications
- **Volume discount calculations** with transparent savings display
- **Shipping cost estimation** based on location and quantity
- **Tax calculations** for Brooklyn/NYC area
- **Delivery time estimates** based on production and shipping schedules

## Components Created

### 1. Enhanced Pricing Calculator (`/src/utils/enhancedPricingCalculator.ts`)
- **Purpose**: Core pricing logic that integrates existing calculator with e-commerce
- **Key Features**:
  - Extracts pricing logic from existing calculator
  - Adds shipping, tax, and delivery calculations
  - Provides volume discount calculations
  - Validates pricing against business rules

### 2. Pricing Calculator Component (`/src/components/PricingCalculator.tsx`)
- **Purpose**: Reusable pricing calculator widget
- **Key Features**:
  - Real-time price updates as users customize
  - Quantity suggestions with savings display
  - Price breakdown with detailed cost analysis
  - Mobile-responsive design

### 3. Enhanced Product Detail Page (`/src/app/products/[id]/enhanced-page.tsx`)
- **Purpose**: Enhanced product page with integrated pricing
- **Key Features**:
  - Three-column layout optimized for pricing display
  - Real-time price calculations
  - Quantity savings suggestions
  - Delivery time estimates
  - Price validation and warnings

### 4. Enhanced Cart Page (`/src/app/cart/enhanced-page.tsx`)
- **Purpose**: Enhanced cart with detailed pricing breakdown
- **Key Features**:
  - Individual item price breakdown
  - Volume discount display
  - Shipping and tax calculations
  - Price validation warnings

### 5. API Routes
- **Pricing Calculation API** (`/api/pricing/calculate`): Real-time pricing calculations
- **Quantity Suggestions API** (`/api/pricing/suggestions`): Smart quantity recommendations

## Integration Steps

### Step 1: Replace Existing Product Page

Update the product detail page route to use the enhanced version:

```typescript
// In /src/app/products/[id]/page.tsx
// Replace the existing content with the enhanced version
export { default } from './enhanced-page'
```

### Step 2: Replace Existing Cart Page

Update the cart page route to use the enhanced version:

```typescript
// In /src/app/cart/page.tsx
// Replace the existing content with the enhanced version
export { default } from './enhanced-page'
```

### Step 3: Update Cart Store Integration

The enhanced pricing calculator integrates with the existing cart store. Ensure your cart items include:

```typescript
interface CartItem {
  id: string
  productId: string
  productName: string
  productDescription: string
  quantity: number
  unitPrice: number
  totalPrice: number
  specifications: {
    size: string
    paperType: string
    finish: string
    turnaroundTime: string
  }
  customizations: {
    uploadedFiles?: string[]
    specialInstructions?: string
  }
  addedAt: Date
}
```

### Step 4: Configure Business Rules

Update the business rules in `enhancedPricingCalculator.ts`:

```typescript
const NY_TAX_RATES = {
  'brooklyn': 0.08875, // Update with your actual tax rates
  'manhattan': 0.08875,
  // Add more locations as needed
}

const SHIPPING_COSTS = {
  local: { /* Your shipping costs */ },
  regional: { /* Your shipping costs */ },
  national: { /* Your shipping costs */ },
}

const PRODUCTION_TIMES = {
  'standard': 5, // Update with your actual production times
  'expedited': 3,
  'rush': 1,
  'same-day': 0,
}
```

## Pricing Logic

### Base Pricing
The calculator uses the existing pricing logic from the original calculator:

```javascript
const EXISTING_CALCULATOR_PRICING = {
  base: {
    'business-card': 0.15,
    'postcard-4x6': 0.25,
    // ... other base prices
  },
  paper: {
    '14pt': 0,
    '16pt': 0.10,
    // ... paper type premiums
  },
  // ... other pricing categories
}
```

### Volume Discounts
Volume discounts are calculated as:
- 1000+ units: 5% discount
- 2500+ units: 10% discount  
- 5000+ units: 15% discount

### Shipping Costs
Shipping costs are based on:
- **Local** (NYC area): Lower rates
- **Regional** (Northeast): Medium rates
- **National** (Rest of US): Higher rates

### Tax Calculations
Tax is calculated based on shipping location:
- Brooklyn/NYC: 8.875%
- NY State: 8.0% (default)

## Usage Examples

### Basic Pricing Calculation

```typescript
import { EnhancedPricingCalculator } from '@/utils/enhancedPricingCalculator'
import { getProductById } from '@/data/products'

const product = getProductById('business-cards')
const inputs = {
  productId: 'business-cards',
  productType: 'business-cards',
  quantity: 500,
  size: 'standard',
  paperType: '16pt',
  finish: 'uv',
  turnaroundTime: 'standard',
  shippingZipCode: '11201'
}

const result = EnhancedPricingCalculator.calculate(inputs, product)
console.log(`Total Price: $${result.finalTotal}`)
console.log(`Unit Price: $${result.unitPrice}`)
console.log(`Delivery: ${result.deliveryInfo.estimatedDelivery}`)
```

### Quantity Suggestions

```typescript
const suggestions = EnhancedPricingCalculator.suggestQuantities(
  'business-cards',
  100,
  {
    size: 'standard',
    paperType: '16pt',
    finish: 'uv',
    turnaroundTime: 'standard'
  }
)

suggestions.forEach(suggestion => {
  console.log(`${suggestion.quantity} units: $${suggestion.unitPrice} each (Save ${suggestion.savingsPercentage}%)`)
})
```

### Price Validation

```typescript
const validation = EnhancedPricingCalculator.validate(inputs, calculatedPrice)
if (!validation.isValid) {
  console.log(`Price adjusted: ${validation.reason}`)
}
if (validation.warnings) {
  validation.warnings.forEach(warning => console.warn(warning))
}
```

## Customization Options

### Adding New Products

1. Add product to `productCatalog` in `/src/data/products.ts`
2. Add pricing mappings in `enhancedPricingCalculator.ts`
3. Update product specifications (sizes, paper types, finishes)

### Modifying Pricing Rules

1. Update base pricing in `EXISTING_CALCULATOR_PRICING`
2. Adjust volume discount tiers
3. Modify shipping cost calculations
4. Update tax rates for different locations

### Customizing UI Components

1. Modify `PricingCalculator.tsx` for calculator appearance
2. Update `EnhancedProductDetailPage` for product page layout
3. Customize `EnhancedCartPage` for cart display

## Testing

### Manual Testing Checklist

- [ ] Price calculations update in real-time
- [ ] Volume discounts apply correctly
- [ ] Shipping costs vary by location
- [ ] Tax calculations are accurate
- [ ] Delivery estimates are reasonable
- [ ] Quantity suggestions show savings
- [ ] Price validation works correctly
- [ ] Mobile responsiveness is maintained

### API Testing

Test the pricing API endpoints:

```bash
# GET request
curl "http://localhost:3000/api/pricing/calculate?productId=business-cards&quantity=500&size=standard&paperType=16pt&finish=uv&turnaroundTime=standard&shippingZipCode=11201"

# POST request
curl -X POST http://localhost:3000/api/pricing/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "business-cards",
    "quantity": 500,
    "size": "standard",
    "paperType": "16pt",
    "finish": "uv",
    "turnaroundTime": "standard",
    "shippingZipCode": "11201"
  }'
```

## Performance Considerations

- **Debouncing**: Price calculations are debounced by 300ms to prevent excessive API calls
- **Caching**: Consider implementing Redis caching for frequently requested pricing combinations
- **Optimization**: Use React.memo for pricing components to prevent unnecessary re-renders

## Error Handling

The system includes comprehensive error handling:

- **Validation Errors**: Invalid inputs return clear error messages
- **API Errors**: Failed calculations show user-friendly messages
- **Network Errors**: Retry logic for failed API requests
- **Business Rule Errors**: Minimum/maximum order validations

## Future Enhancements

1. **Dynamic Pricing**: Integration with ERP system for real-time inventory pricing
2. **Promotional Pricing**: Support for coupons, seasonal discounts, and bulk promotions
3. **Advanced Shipping**: Integration with shipping carriers for real-time rates
4. **International Pricing**: Support for international shipping and customs calculations
5. **Price History**: Track pricing changes and show price trends
6. **Quote Generation**: PDF quote generation with detailed breakdowns

## Support

For questions or issues with the pricing calculator integration:

1. Check the browser console for error messages
2. Verify API endpoints are responding correctly
3. Ensure all required parameters are being passed
4. Review business rules configuration
5. Test with different product combinations