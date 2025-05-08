import { create } from 'zustand';

const useStore = create((set) => ({
  // Auth state
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  // Cart state
  cart: [],
  addToCart: (product) => set((state) => ({
    cart: [...state.cart, { ...product, quantity: 1 }]
  })),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  updateCartItemQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),

  // Products state
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),
  updateProduct: (productId, updatedProduct) => set((state) => ({
    products: state.products.map(product =>
      product.id === productId ? { ...product, ...updatedProduct } : product
    )
  })),
  deleteProduct: (productId) => set((state) => ({
    products: state.products.filter(product => product.id !== productId)
  }))
}));

export default useStore; 