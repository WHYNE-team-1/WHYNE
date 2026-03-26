import { ENV } from './env';

const BASE_URL = ENV.API_TEAM_BASE_URL;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
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

    if (refreshToken) {
      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh-token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const newToken = await refreshResponse.json();

          localStorage.setItem('accessToken', newToken.accessToken);

          headers.Authorization = `Bearer ${newToken.accessToken}`;
          response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
          });
        } else {
          throw new Error('리프레시 토큰 만료');
        }
      } catch {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
        throw new Error('세션 만료');
      }
    } else {
      localStorage.removeItem('accessToken');
      window.location.href = '/signin';
      throw new Error('인증 토큰 없음');
    }
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API 요청 실패: ${response.status}`);
  }

  return response.json();
};
