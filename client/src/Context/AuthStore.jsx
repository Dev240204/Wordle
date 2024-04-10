// authStore.js
import {create} from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
  login: (userData) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    set({ isAuthenticated: true, user: userData });
  },
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
