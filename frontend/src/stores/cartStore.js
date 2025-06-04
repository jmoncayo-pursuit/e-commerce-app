import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartService } from '../services/api';
import { useAuthStore } from './authStore';
import { toast } from 'react-hot-toast';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      error: null,

      addItem: async (product, quantity = 1) => {
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) {
          toast.error('Please log in to add items to cart');
          return;
        }

        set({ loading: true, error: null });
        try {
          const response = await cartService.addItem({
            productId: product.id,
            quantity
          });
          set({ items: response.data.items, loading: false });
          toast.success('Added to cart!');
        } catch (err) {
          set({ error: err.message, loading: false });
          toast.error('Failed to add item to cart');
        }
      },

      removeItem: async (productId) => {
        set({ loading: true, error: null });
        try {
          const response = await cartService.removeItem(productId);
          set({ items: response.data.items, loading: false });
          toast.success('Item removed from cart');
        } catch (err) {
          set({ error: err.message, loading: false });
          toast.error('Failed to remove item from cart');
        }
      },

      updateQuantity: async (productId, quantity) => {
        if (quantity < 1) return;
        set({ loading: true, error: null });
        try {
          const response = await cartService.updateItem({
            productId,
            quantity
          });
          set({ items: response.data.items, loading: false });
        } catch (err) {
          set({ error: err.message, loading: false });
          toast.error('Failed to update quantity');
        }
      },
      
      clearCart: async () => {
        set({ loading: true, error: null });
        try {
          await cartService.clearCart();
          await cartService.addFreeGiftBag();
          set({ items: [{
            id: 'free-gift-bag',
            productId: 'free-gift-bag',
            name: 'Free Mystery Collectible Gift Bag',
            price: 0,
            condition: 'New',
            imageUrl: '/gift-bag.jpg',
            quantity: 1
          }], loading: false });
          toast.success('Cart updated with free gift bag!');
        } catch (err) {
          set({ error: err.message, loading: false });
          toast.error('Failed to update cart');
        }
      },
      
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + (item.price || item.product?.price || 0) * item.quantity, 
          0
        );
      },

      fetchCart: async () => {
        const { isAuthenticated } = useAuthStore.getState();
        if (!isAuthenticated) return;

        set({ loading: true, error: null });
        try {
          const response = await cartService.getCart();
          set({ items: response.data.items, loading: false });
        } catch (err) {
          set({ error: err.message, loading: false });
          toast.error('Failed to fetch cart');
        }
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);