import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem } from '@/types/ecommerce'
import { v4 as uuidv4 } from 'uuid'

interface CartStore {
  cart: Cart;
  addToCart: (item: Omit<CartItem, 'id' | 'totalPrice'>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateItemSpecifications: (itemId: string, specifications: CartItem['specifications']) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  isLoading: boolean;
  error: string | null;
}

const TAX_RATE = 0.08; // 8% tax rate
const SHIPPING_COST = 15.00; // Base shipping cost

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        id: uuidv4(),
        items: [],
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      isLoading: false,
      error: null,

      addToCart: (itemData) => {
        const { cart } = get();
        
        // Generate unique ID for cart item
        const itemId = uuidv4();
        
        // Calculate total price for this item
        const totalPrice = itemData.unitPrice * itemData.quantity;
        
        // Create new cart item
        const newItem: CartItem = {
          ...itemData,
          id: itemId,
          totalPrice,
          addedAt: new Date(),
        };
        
        // Add to cart
        const updatedItems = [...cart.items, newItem];
        
        // Calculate new totals
        const subtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + SHIPPING_COST;
        
        set({
          cart: {
            ...cart,
            items: updatedItems,
            subtotal,
            tax,
            shipping: SHIPPING_COST,
            total,
            updatedAt: new Date(),
          },
        });
      },

      removeFromCart: (itemId) => {
        const { cart } = get();
        const updatedItems = cart.items.filter(item => item.id !== itemId);
        
        // Recalculate totals
        const subtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + (updatedItems.length > 0 ? SHIPPING_COST : 0);
        
        set({
          cart: {
            ...cart,
            items: updatedItems,
            subtotal,
            tax,
            shipping: updatedItems.length > 0 ? SHIPPING_COST : 0,
            total,
            updatedAt: new Date(),
          },
        });
      },

      updateQuantity: (itemId, quantity) => {
        const { cart } = get();
        
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          get().removeFromCart(itemId);
          return;
        }
        
        const updatedItems = cart.items.map(item => {
          if (item.id === itemId) {
            const newTotalPrice = item.unitPrice * quantity;
            return {
              ...item,
              quantity,
              totalPrice: newTotalPrice,
            };
          }
          return item;
        });
        
        // Recalculate totals
        const subtotal = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0);
        const tax = subtotal * TAX_RATE;
        const total = subtotal + tax + SHIPPING_COST;
        
        set({
          cart: {
            ...cart,
            items: updatedItems,
            subtotal,
            tax,
            total,
            updatedAt: new Date(),
          },
        });
      },

      updateItemSpecifications: (itemId, specifications) => {
        const { cart } = get();
        
        const updatedItems = cart.items.map(item => {
          if (item.id === itemId) {
            return {
              ...item,
              specifications,
            };
          }
          return item;
        });
        
        set({
          cart: {
            ...cart,
            items: updatedItems,
            updatedAt: new Date(),
          },
        });
      },

      clearCart: () => {
        set({
          cart: {
            id: uuidv4(),
            items: [],
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
      },

      calculateTotals: () => {
        const { cart } = get();
        const subtotal = cart.items.reduce((sum, item) => sum + item.totalPrice, 0);
        const tax = subtotal * TAX_RATE;
        const shipping = cart.items.length > 0 ? SHIPPING_COST : 0;
        const total = subtotal + tax + shipping;
        
        set({
          cart: {
            ...cart,
            subtotal,
            tax,
            shipping,
            total,
            updatedAt: new Date(),
          },
        });
      },
    }),
    {
      name: 'lettuce-print-cart', // Storage key
      partialize: (state) => ({ cart: state.cart }), // Only persist cart data
    }
  )
);

// Helper hooks
export const useCartItemCount = () => {
  const items = useCartStore((state) => state.cart.items);
  return items.reduce((count, item) => count + item.quantity, 0);
};

export const useCartTotal = () => {
  return useCartStore((state) => state.cart.total);
};

export const useIsCartEmpty = () => {
  const items = useCartStore((state) => state.cart.items);
  return items.length === 0;
};