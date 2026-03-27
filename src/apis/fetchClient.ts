import { ENV } from './env';
import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = ENV.API_TEAM_BASE_URL;

let refreshPromise: Promise<string> | null = null;

export const apiFetch = async (
  endpoint: string,
  options: globalThis.RequestInit = {}
) => {
  const token = localStorage.getItem('accessToken');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers as Record<string, string>),
  };

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      useAuthStore.getState().setLogout();
      throw new Error('인증 토큰 없음');
    }

    // 이미 누가 토큰을 갱신하러 간 경우
    if (refreshPromise) {
      try {
        // 기다렸다가 새 토큰을 받아오기
        const newAccessToken = await refreshPromise;
        headers.Authorization = `Bearer ${newAccessToken}`;
        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers,
        });
        if (!response.ok) {
          throw new Error('대기 후 재요청 실패');
        }
        return response.json();
      } catch {
        throw new Error('동시 갱신 대기 중 에러');
      }
    }

    // 아무도 갱신하러 안 간 경우
    refreshPromise = fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('리프레시 토큰 만료');
        }
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
      })
      .finally(() => {
        // 대기 기록 초기화
        refreshPromise = null;
      });

    try {
      const newAccessToken = await refreshPromise;
      headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
    } catch {
      useAuthStore.getState().setLogout();
      throw new Error('세션 만료');
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
  }

  return response.json();
};
