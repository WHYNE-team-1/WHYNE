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
  setLogin: (user: User) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // 로그인 된 상태
  isLoggedIn: true,

  // 목업 데이터
  user: {
    id: 2933,
    email: 'test000@email.com',
    nickname: 'test000',
    teamId: '22-1',
    updatedAt: '2026-03-23T05:01:18.701Z',
    createdAt: '2026-03-23T05:01:18.701Z',
    image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=200&auto=format&fit=crop',
  },

  // 추후 API와 연동할 때 사용할 상태 변경 함수들
  setLogin: (userData) => set({ isLoggedIn: true, user: userData }),
  setLogout: () => set({ isLoggedIn: false, user: null }),
}));
