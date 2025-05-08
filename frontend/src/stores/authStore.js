import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (userData, token) => set({ 
        isAuthenticated: true, 
        user: userData, 
        token 
      }),
      logout: () => {
        localStorage.removeItem('auth-storage');
        set({ isAuthenticated: false, user: null, token: null });
      },
      initialize: () => {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          const { state } = JSON.parse(stored);
          if (state?.token) {
            set({ 
              isAuthenticated: true, 
              user: { 
                username: state.username,
                email: state.email 
              }, 
              token: state.token 
            });
          }
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
); 