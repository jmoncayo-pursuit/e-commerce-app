import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      addToCart: (product) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            total: get().total + product.price
          });
        } else {
          set({
            items: [...items, { ...product, quantity: 1 }],
            total: get().total + product.price
          });
        }
      },

      removeFromCart: (productId) => {
        const { items } = get();
        const itemToRemove = items.find(item => item.id === productId);
        
        if (itemToRemove) {
          set({
            items: items.filter(item => item.id !== productId),
            total: get().total - (itemToRemove.price * itemToRemove.quantity)
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        
        const { items } = get();
        const item = items.find(item => item.id === productId);
        
        if (item) {
          const quantityDiff = quantity - item.quantity;
          set({
            items: items.map(item =>
              item.id === productId
                ? { ...item, quantity }
                : item
            ),
            total: get().total + (item.price * quantityDiff)
          });
        }
      },

      clearCart: () => {
        set({ items: [], total: 0 });
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore; 