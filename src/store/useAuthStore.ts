import { create } from 'zustand';

export interface User {
  id: number;
  email: string;
  nickname: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string | null;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setLogin: (_user: User) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  user: null,

  setLogin: (userData) => set({ isLoggedIn: true, user: userData }),
  setLogout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ isLoggedIn: false, user: null });
  },
}));
