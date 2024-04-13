// authStore.js
import {create} from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  user: JSON.parse(localStorage.getItem('user')) || null,
  isGame: localStorage.getItem('isGame') === 'true',
  login: (userData) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isGame', 'true');
    set({ isAuthenticated: true, user: userData, isGame: true});
  },
  logout: () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('isGame');
    set({ isAuthenticated: false, user: null });
  },
  isGameTrue: () => {
    localStorage.setItem('isGame', 'true');
    set({ isGame: true });
  }
}));

export default useAuthStore;
