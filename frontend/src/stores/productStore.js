import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUnsplashImage, CATEGORY_FALLBACK_IMAGES } from '../utils/imageUtils';

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
          // For now, use mock data since we don't have an API endpoint yet
          const mockProducts = [
            {
              id: '1',
              name: 'Deadpool #1 (1997)',
              description: 'First solo series of Deadpool. Near mint condition with original cover.',
              price: 1800,
              category: 'comics',
              condition: 'near-mint',
              year: 1997,
              location: 'New York, NY',
              seller: {
                name: 'ComicCollector',
                rating: 4.8,
                totalSales: 150,
                memberSince: '2018',
                responseTime: 'within 24 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=800&q=80'
              }
            },
            {
              id: '2',
              name: 'NES Action Set (1988)',
              description: 'Complete in box Nintendo Entertainment System Action Set.',
              price: 450,
              category: 'retro-games',
              condition: 'good',
              year: 1988,
              location: 'Los Angeles, CA',
              seller: {
                name: 'RetroGamer',
                rating: 4.9,
                totalSales: 89,
                memberSince: '2019',
                responseTime: 'within 12 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
              }
            },
            {
              id: '3',
              name: 'Star Wars Black Series - Darth Vader',
              description: 'Hasbro Black Series 6-inch Darth Vader figure.',
              price: 49.99,
              category: 'figures',
              condition: 'mint',
              year: 2020,
              location: 'Chicago, IL',
              seller: {
                name: 'FigureCollector',
                rating: 4.7,
                totalSales: 203,
                memberSince: '2017',
                responseTime: 'within 24 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
              }
            },
            {
              id: '4',
              name: 'Pokemon Base Set Charizard (1999)',
              description: 'First Edition Charizard from the original Pokemon Base Set.',
              price: 1800,
              category: 'cards',
              condition: 'excellent',
              year: 1999,
              location: 'Seattle, WA',
              seller: {
                name: 'CardCollector',
                rating: 4.9,
                totalSales: 312,
                memberSince: '2016',
                responseTime: 'within 6 hours',
                profileImageUrl: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
              }
            }
          ];

          // Enhance products with Unsplash images
          const enhancedProducts = await Promise.all(
            mockProducts.map(async (product) => {
              try {
                // Try to get a specific image for the product
                const imageData = await getUnsplashImage(`${product.category} ${product.name}`);
                
                return {
                  ...product,
                  images: imageData ? [{
                    id: '1',
                    imageUrl: imageData.imageUrl,
                    photographer: imageData.photographer,
                    photographerUrl: imageData.photographerUrl
                  }] : [{
                    id: '1',
                    imageUrl: CATEGORY_FALLBACK_IMAGES[product.category] || '/images/collectiverse-icon.png'
                  }],
                  seller: product.seller || {
                    name: 'Anonymous Seller',
                    rating: 'N/A',
                    totalSales: 0,
                    memberSince: 'N/A',
                    responseTime: 'N/A',
                    profileImageUrl: '/images/collectiverse-icon.png'
                  },
                  location: product.location || 'Location not specified',
                  shipping: product.shipping || {
                    method: 'Standard Shipping',
                    price: 5.99,
                    estimatedDelivery: '3-5 business days'
                  },
                  details: product.details || {
                    Condition: product.condition,
                    Year: product.year,
                    Category: product.category
                  }
                };
              } catch (error) {
                console.error(`Error enhancing product ${product.id}:`, error);
                return {
                  ...product,
                  images: [{
                    id: '1',
                    imageUrl: CATEGORY_FALLBACK_IMAGES[product.category] || '/images/collectiverse-icon.png'
                  }]
                };
              }
            })
          );

          set({ products: enhancedProducts, loading: false });
        } catch (error) {
          console.error('Error fetching products:', error);
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