import { Product } from '@/types/ecommerce'

export const productCatalog: Product[] = [
  // Business Essentials
  {
    id: 'business-cards',
    name: 'Business Cards',
    description: 'Professional business cards that make lasting first impressions with premium finishes and custom designs',
    category: 'Business Essentials',
    basePrice: 25.00,
    images: ['/images/products/business-cards-1.jpg', '/images/products/business-cards-2.jpg'],
    specifications: {
      sizes: [
        { id: 'standard', name: 'Standard (3.5" x 2")', dimensions: '3.5" x 2"', priceMultiplier: 1.0 },
        { id: 'square', name: 'Square (2" x 2")', dimensions: '2" x 2"', priceMultiplier: 1.1 },
        { id: 'mini', name: 'Mini (3" x 1")', dimensions: '3" x 1"', priceMultiplier: 0.9 },
      ],
      paperTypes: [
        { id: '14pt', name: '14pt Premium Matte', description: 'Thick, smooth finish', priceMultiplier: 1.0 },
        { id: '16pt', name: '16pt Premium Matte', description: 'Extra thick, luxurious feel', priceMultiplier: 1.2 },
        { id: 'glossy', name: '14pt Glossy', description: 'High-gloss finish', priceMultiplier: 1.1 },
        { id: 'linen', name: 'Linen Texture', description: 'Elegant textured finish', priceMultiplier: 1.3 },
      ],
      finishes: [
        { id: 'none', name: 'No Finish', description: 'Standard printing', priceMultiplier: 1.0 },
        { id: 'uv', name: 'UV Coating', description: 'High-gloss protection', priceMultiplier: 1.15 },
        { id: 'spot-uv', name: 'Spot UV', description: 'Selective glossy accents', priceMultiplier: 1.25 },
        { id: 'foil', name: 'Foil Stamping', description: 'Metallic accents', priceMultiplier: 1.4 },
        { id: 'embossed', name: 'Embossing', description: 'Raised texture', priceMultiplier: 1.35 },
      ],
      turnaroundTimes: [
        { id: 'standard', name: 'Standard (5-7 days)', days: 7, priceMultiplier: 1.0 },
        { id: 'expedited', name: 'Expedited (3-4 days)', days: 4, priceMultiplier: 1.25 },
        { id: 'rush', name: 'Rush (1-2 days)', days: 2, priceMultiplier: 1.5 },
      ],
    },
    quantityPricing: [
      { min: 100, max: 249, priceMultiplier: 1.0 },
      { min: 250, max: 499, priceMultiplier: 0.8 },
      { min: 500, max: 999, priceMultiplier: 0.6 },
      { min: 1000, max: 2499, priceMultiplier: 0.4 },
      { min: 2500, max: 4999, priceMultiplier: 0.3 },
      { min: 5000, max: 10000, priceMultiplier: 0.25 },
    ],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  
  {
    id: 'letterhead',
    name: 'Letterhead',
    description: 'Professional letterhead for business correspondence with custom branding and premium paper',
    category: 'Business Essentials',
    basePrice: 40.00,
    images: ['/images/products/letterhead-1.jpg', '/images/products/letterhead-2.jpg'],
    specifications: {
      sizes: [
        { id: 'letter', name: 'Letter (8.5" x 11")', dimensions: '8.5" x 11"', priceMultiplier: 1.0 },
        { id: 'legal', name: 'Legal (8.5" x 14")', dimensions: '8.5" x 14"', priceMultiplier: 1.1 },
      ],
      paperTypes: [
        { id: '24lb', name: '24lb Premium Bond', description: 'Professional weight', priceMultiplier: 1.0 },
        { id: '28lb', name: '28lb Premium Bond', description: 'Heavier weight', priceMultiplier: 1.2 },
        { id: '32lb', name: '32lb Premium Bond', description: 'Luxury weight', priceMultiplier: 1.4 },
        { id: 'linen', name: 'Linen Finish', description: 'Textured elegance', priceMultiplier: 1.3 },
      ],
      finishes: [
        { id: 'none', name: 'No Finish', description: 'Standard printing', priceMultiplier: 1.0 },
        { id: 'watermark', name: 'Custom Watermark', description: 'Subtle branding', priceMultiplier: 1.2 },
      ],
      turnaroundTimes: [
        { id: 'standard', name: 'Standard (5-7 days)', days: 7, priceMultiplier: 1.0 },
        { id: 'expedited', name: 'Expedited (3-4 days)', days: 4, priceMultiplier: 1.25 },
      ],
    },
    quantityPricing: [
      { min: 100, max: 249, priceMultiplier: 1.0 },
      { min: 250, max: 499, priceMultiplier: 0.9 },
      { min: 500, max: 999, priceMultiplier: 0.7 },
      { min: 1000, max: 2499, priceMultiplier: 0.5 },
    ],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },

  {
    id: 'flyers',
    name: 'Flyers',
    description: 'High-quality flyers for marketing and promotional campaigns with vibrant colors',
    category: 'Marketing Materials',
    basePrice: 50.00,
    images: ['/images/products/flyers-1.jpg', '/images/products/flyers-2.jpg'],
    specifications: {
      sizes: [
        { id: 'letter', name: 'Letter (8.5" x 11")', dimensions: '8.5" x 11"', priceMultiplier: 1.0 },
        { id: 'half', name: 'Half Letter (5.5" x 8.5")', dimensions: '5.5" x 8.5"', priceMultiplier: 0.7 },
        { id: 'quarter', name: 'Quarter Letter (4.25" x 5.5")', dimensions: '4.25" x 5.5"', priceMultiplier: 0.5 },
      ],
      paperTypes: [
        { id: '20lb', name: '20lb Bond', description: 'Economy option', priceMultiplier: 1.0 },
        { id: '24lb', name: '24lb Premium', description: 'Better quality', priceMultiplier: 1.15 },
        { id: '28lb', name: '28lb Premium', description: 'High quality', priceMultiplier: 1.3 },
        { id: '100lb', name: '100lb Gloss Text', description: 'Glossy finish', priceMultiplier: 1.4 },
      ],
      finishes: [
        { id: 'none', name: 'No Finish', description: 'Standard printing', priceMultiplier: 1.0 },
        { id: 'uv', name: 'UV Coating', description: 'High-gloss protection', priceMultiplier: 1.2 },
        { id: 'matte', name: 'Matte Finish', description: 'Non-glare finish', priceMultiplier: 1.15 },
      ],
      turnaroundTimes: [
        { id: 'standard', name: 'Standard (5-7 days)', days: 7, priceMultiplier: 1.0 },
        { id: 'expedited', name: 'Expedited (3-4 days)', days: 4, priceMultiplier: 1.25 },
        { id: 'rush', name: 'Rush (1-2 days)', days: 2, priceMultiplier: 1.5 },
      ],
    },
    quantityPricing: [
      { min: 100, max: 249, priceMultiplier: 1.0 },
      { min: 250, max: 499, priceMultiplier: 0.7 },
      { min: 500, max: 999, priceMultiplier: 0.5 },
      { min: 1000, max: 2499, priceMultiplier: 0.35 },
      { min: 2500, max: 4999, priceMultiplier: 0.25 },
      { min: 5000, max: 10000, priceMultiplier: 0.2 },
    ],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },

  {
    id: 'roll-labels',
    name: 'Roll Labels',
    description: 'Custom roll labels for products and packaging with various materials and finishes',
    category: 'Labels & Stickers',
    basePrice: 35.00,
    images: ['/images/products/roll-labels-1.jpg', '/images/products/roll-labels-2.jpg'],
    specifications: {
      sizes: [
        { id: '1x2', name: '1" x 2"', dimensions: '1" x 2"', priceMultiplier: 1.0 },
        { id: '2x3', name: '2" x 3"', dimensions: '2" x 3"', priceMultiplier: 1.5 },
        { id: '3x4', name: '3" x 4"', dimensions: '3" x 4"', priceMultiplier: 2.0 },
      ],
      paperTypes: [
        { id: 'paper', name: 'Paper Labels', description: 'Standard paper', priceMultiplier: 1.0 },
        { id: 'bopp', name: 'BOPP (Plastic)', description: 'Waterproof plastic', priceMultiplier: 1.5 },
        { id: 'clear', name: 'Clear BOPP', description: 'Transparent', priceMultiplier: 1.6 },
      ],
      finishes: [
        { id: 'none', name: 'No Finish', description: 'Standard printing', priceMultiplier: 1.0 },
        { id: 'gloss', name: 'Gloss Lamination', description: 'High gloss', priceMultiplier: 1.2 },
        { id: 'matte', name: 'Matte Lamination', description: 'Non-glare', priceMultiplier: 1.15 },
      ],
      turnaroundTimes: [
        { id: 'standard', name: 'Standard (5-7 days)', days: 7, priceMultiplier: 1.0 },
        { id: 'expedited', name: 'Expedited (3-4 days)', days: 4, priceMultiplier: 1.25 },
        { id: 'rush', name: 'Rush (1-2 days)', days: 2, priceMultiplier: 1.5 },
      ],
    },
    quantityPricing: [
      { min: 100, max: 249, priceMultiplier: 1.0 },
      { min: 250, max: 499, priceMultiplier: 0.8 },
      { min: 500, max: 999, priceMultiplier: 0.6 },
      { min: 1000, max: 2499, priceMultiplier: 0.4 },
      { min: 2500, max: 4999, priceMultiplier: 0.3 },
      { min: 5000, max: 10000, priceMultiplier: 0.25 },
    ],
    status: 'active',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Product categories for filtering and navigation
export const productCategories = [
  { id: 'business-essentials', name: 'Business Essentials', count: 4 },
  { id: 'marketing-materials', name: 'Marketing Materials', count: 6 },
  { id: 'large-format', name: 'Large Format', count: 3 },
  { id: 'labels-stickers', name: 'Labels & Stickers', count: 4 },
  { id: 'packaging', name: 'Packaging', count: 3 },
  { id: 'signage', name: 'Signage', count: 2 },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return productCatalog.find(product => product.id === id);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return productCatalog.filter(product => product.category.toLowerCase().replace(' ', '-') === category.toLowerCase());
};

// Helper function to calculate product price
export const calculateProductPrice = (
  product: Product,
  quantity: number,
  sizeId: string,
  paperTypeId: string,
  finishId: string,
  turnaroundTimeId: string
): number => {
  // Get multipliers
  const sizeMultiplier = product.specifications.sizes.find(s => s.id === sizeId)?.priceMultiplier || 1.0;
  const paperMultiplier = product.specifications.paperTypes.find(p => p.id === paperTypeId)?.priceMultiplier || 1.0;
  const finishMultiplier = product.specifications.finishes.find(f => f.id === finishId)?.priceMultiplier || 1.0;
  const turnaroundMultiplier = product.specifications.turnaroundTimes.find(t => t.id === turnaroundTimeId)?.priceMultiplier || 1.0;
  
  // Get quantity multiplier
  const quantityPricing = product.quantityPricing.find(q => quantity >= q.min && quantity <= q.max);
  const quantityMultiplier = quantityPricing?.priceMultiplier || 1.0;
  
  // Calculate final price
  const basePrice = product.basePrice * quantity;
  const specificationMultiplier = sizeMultiplier * paperMultiplier * finishMultiplier * turnaroundMultiplier;
  
  return basePrice * specificationMultiplier * quantityMultiplier;
};