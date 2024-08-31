import { create } from 'zustand';
import { loginUser,logoutUser,refreshAccessToken } from '../services/auth.js';

const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const response=await loginUser(email, password);
      set({ user: {response}, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await logoutUser();
      set({ user: null, isAuthenticated: false, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  refreshSession: async () => {
    set({ loading: true });
    try {
      await refreshAccessToken();
      set({ loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useAuthStore;
