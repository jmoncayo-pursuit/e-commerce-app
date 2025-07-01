import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProductStore = create(
  persist(
    (set, get) => ({
      products: [],
      selectedProduct: null,
      loading: false,
      error: null,
      filters: {
        category: '',
        condition: '',
        priceRange: { min: 0, max: 10000 },
        sortBy: 'newest',
      },

      setProducts: (products) => set({ products }),
      setSelectedProduct: (product) => set({ selectedProduct: product }),
      clearSelectedProduct: () => set({ selectedProduct: null }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setFilters: (filters) => set({ filters: { ...get().filters, ...filters } }),

      fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
          const mockProducts = [
            {
              id: '1',
              name: 'Deadpool #1 (1997)',
              description: 'First solo series of Deadpool. Near mint condition with original cover. This is the iconic first issue that established Deadpool as a solo character.',
              price: 1800,
              category: 'comics',
              condition: 'near-mint',
              year: 1997,
              publisher: 'Marvel Comics',
              images: [
                {
                  id: 'img1',
                  productId: '1',
                  imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
                  isPrimary: true
                }
              ],
              seller: {
                id: '1',
                name: 'ComicCollector',
                rating: 4.8,
                totalSales: 150,
                memberSince: '2018',
                responseTime: 'within 24 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80'
              },
              stock: 1,
              location: 'New York, NY',
              shipping: {
                price: 15,
                method: 'Priority Mail',
                estimatedDelivery: '3-5 business days'
              },
              details: {
                grade: 'CGC 9.4',
                pageQuality: 'White',
                coverType: 'Newsstand',
                issueNumber: '1',
                certification: 'CGC Certified'
              }
            },
            {
              id: '2',
              name: 'NES Action Set (1988)',
              description: 'Complete in box Nintendo Entertainment System Action Set. Includes console, controllers, and Duck Hunt/Mario Bros. cartridge. All original packaging and manuals.',
              price: 450,
              category: 'retro-games',
              condition: 'good',
              year: 1988,
              manufacturer: 'Nintendo',
              images: [
                {
                  id: 'img2',
                  productId: '2',
                  imageUrl: 'https://images.unsplash.com/photo-1519121788664-1b1c1c6a0c85?auto=format&fit=crop&w=800&q=80',
                  isPrimary: true
                }
              ],
              seller: {
                id: '2',
                name: 'RetroGamer',
                rating: 4.9,
                totalSales: 89,
                memberSince: '2019',
                responseTime: 'within 12 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
              },
              stock: 1,
              location: 'Los Angeles, CA',
              shipping: {
                price: 25,
                method: 'Ground Shipping',
                estimatedDelivery: '5-7 business days'
              },
              details: {
                completeness: 'Complete in Box',
                consoleCondition: 'Tested & Working',
                includedGames: 'Duck Hunt/Mario Bros.',
                accessories: '2 Controllers, Zapper, Manuals'
              }
            },
            {
              id: '3',
              name: 'Star Wars Black Series - Darth Vader',
              description: 'Hasbro Black Series 6-inch Darth Vader figure. Highly detailed with multiple points of articulation.',
              price: 49.99,
              category: 'action-figures',
              condition: 'mint',
              year: 2020,
              manufacturer: 'Hasbro',
              images: [
                {
                  id: 'img3',
                  productId: '3',
                  imageUrl: 'https://images.unsplash.com/photo-1519121788664-1b1c1c6a0c85?auto=format&fit=crop&w=800&q=80',
                  isPrimary: true
                }
              ],
              seller: {
                id: '3',
                name: 'FigureCollector',
                rating: 4.7,
                totalSales: 203,
                memberSince: '2017',
                responseTime: 'within 24 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
              },
              stock: 1,
              location: 'Chicago, IL',
              shipping: {
                price: 20,
                method: 'Priority Mail',
                estimatedDelivery: '3-5 business days'
              },
              details: {
                setCompleteness: 'Complete Set',
                figureCount: '12 Figures',
                accessories: 'All Original',
                packaging: 'Original Cardbacks'
              }
            },
            {
              id: '4',
              name: 'Pokemon Base Set Charizard (1999)',
              description: 'First Edition Charizard from the original Pokemon Base Set. PSA 8 graded card with excellent centering and minimal wear.',
              price: 1800,
              category: 'trading-cards',
              condition: 'excellent',
              year: 1999,
              publisher: 'Wizards of the Coast',
              images: [
                {
                  id: 'img4',
                  productId: '4',
                  imageUrl: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
                  isPrimary: true
                }
              ],
              seller: {
                id: '4',
                name: 'CardCollector',
                rating: 4.9,
                totalSales: 312,
                memberSince: '2016',
                responseTime: 'within 6 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
              },
              stock: 1,
              location: 'Seattle, WA',
              shipping: {
                price: 15,
                method: 'Priority Mail',
                estimatedDelivery: '2-3 business days'
              },
              details: {
                grade: 'PSA 8',
                edition: 'First Edition',
                cardNumber: '4/102',
                certification: 'PSA Certified'
              }
            }
          ];
          set({ products: mockProducts, loading: false });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      filterProducts: () => {
        const { products, filters } = get();
        return products.filter(product => {
          const matchesCategory = !filters.category || product.category === filters.category;
          const matchesCondition = !filters.condition || product.condition === filters.condition;
          const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
          return matchesCategory && matchesCondition && matchesPrice;
        });
      },

      sortProducts: (products) => {
        const { filters } = get();
        const sortedProducts = [...products];
        
        switch (filters.sortBy) {
          case 'price-low':
            return sortedProducts.sort((a, b) => a.price - b.price);
          case 'price-high':
            return sortedProducts.sort((a, b) => b.price - a.price);
          case 'newest':
            return sortedProducts.sort((a, b) => b.year - a.year);
          case 'oldest':
            return sortedProducts.sort((a, b) => a.year - b.year);
          default:
            return sortedProducts;
        }
      }
    }),
    {
      name: 'product-storage',
    }
  )
);

export default useProductStore; 