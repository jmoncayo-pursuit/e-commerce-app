import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      initialize: () => {
        // Check if there's a stored user in localStorage
        const storedUser = localStorage.getItem('auth-storage');
        if (storedUser) {
          try {
            const { state } = JSON.parse(storedUser);
            if (state.user && state.token) {
              set({ user: state.user, token: state.token, isAuthenticated: true });
            }
          } catch (error) {
            console.error('Error initializing auth state:', error);
          }
        }
      },

      setUser: (user, token) => set({ user, token, isAuthenticated: !!user }),
      
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Login failed');
          }

          const authResponse = await response.json();
          set({ 
            user: { 
              username: authResponse.username,
              email: authResponse.email 
            }, 
            token: authResponse.token,
            isAuthenticated: true, 
            isLoading: false 
          });
          return authResponse;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || data.message || 'Registration failed');
          }

          set({ 
            user: { 
              username: data.username,
              email: data.email 
            }, 
            token: data.token,
            isAuthenticated: true, 
            isLoading: false 
          });
          return data;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/users/profile', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${useAuthStore.getState().token}`
            },
            body: JSON.stringify(profileData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Profile update failed');
          }

          const updatedUser = await response.json();
          set({ user: updatedUser, isLoading: false });
          return updatedUser;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export { useAuthStore }; 