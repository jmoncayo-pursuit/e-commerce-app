import { create } from 'zustand';

const useSearchStore = create((set) => ({
  searchQuery: '',
  searchResults: [],
  filters: {
    category: '',
    condition: '',
    priceRange: { min: 0, max: 10000 },
    year: '',
  },
  sortBy: 'newest',
  isLoading: false,
  error: null,

  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),

  setSortBy: (sortBy) => set({ sortBy }),

  clearFilters: () => set({
    filters: {
      category: '',
      condition: '',
      priceRange: { min: 0, max: 10000 },
      year: '',
    },
    sortBy: 'newest'
  }),

  searchProducts: async (query, filters, sortBy) => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call
      const mockResults = [
        {
          id: '1',
          name: 'Deadpool #1 (1997)',
          description: 'First solo series of Deadpool. Near mint condition with original cover.',
          price: 1800,
          category: 'comics',
          condition: 'near-mint',
          year: 1997,
          publisher: 'Marvel Comics',
          images: [
            {
              id: '1',
              imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f44e830872e?w=800&auto=format&fit=crop&q=60'
            }
          ],
          seller: {
            id: '1',
            name: 'ComicCollector',
            rating: 4.8,
            totalSales: 150,
            memberSince: '2018',
            responseTime: 'within 24 hours',
            profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60'
          }
        },
        {
          id: '2',
          name: 'Batman: The Dark Knight Returns',
          description: 'Frank Miller\'s iconic Batman story. First printing in excellent condition.',
          price: 1200,
          category: 'comics',
          condition: 'excellent',
          year: 1986,
          publisher: 'DC Comics',
          images: [
            {
              id: '1',
              imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f44e830872e?w=800&auto=format&fit=crop&q=60'
            }
          ],
          seller: {
            id: '2',
            name: 'BatmanFan',
            rating: 4.9,
            totalSales: 200,
            memberSince: '2019',
            responseTime: 'within 12 hours',
            profileImageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60'
          }
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Apply filters
      let filteredResults = mockResults.filter(product => {
        if (filters.category && product.category !== filters.category) return false;
        if (filters.condition && product.condition !== filters.condition) return false;
        if (filters.year && product.year !== parseInt(filters.year)) return false;
        if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
        return true;
      });

      // Apply sorting
      filteredResults.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'newest':
            return b.year - a.year;
          case 'oldest':
            return a.year - b.year;
          default:
            return 0;
        }
      });

      set({ 
        searchResults: filteredResults,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch search results',
        isLoading: false 
      });
    }
  }
}));

export default useSearchStore; 