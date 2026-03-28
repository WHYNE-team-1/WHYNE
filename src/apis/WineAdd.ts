import { ENV } from './env';
import { useAuthStore } from '@/store/useAuthStore';
import { apiFetch } from './fetchClient';

export interface AddWineRequest {
  name: string;
  price: number;
  region: string;
  type: string;
  image: string;
}

let refreshPromise: Promise<string> | null = null;

export async function uploadWineImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);

  let accessToken = localStorage.getItem('accessToken');

  let response = await fetch(`${ENV.API_TEAM_BASE_URL}/images/upload`, {
    method: 'POST',
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    body: formData,
  });

  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      useAuthStore.getState().setLogout();
      throw new Error('로그인이 만료되었습니다. 다시 로그인해주세요.');
    }

    if (!refreshPromise) {
      refreshPromise = fetch(`${ENV.API_TEAM_BASE_URL}/auth/refresh-token`, {
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
          return data.accessToken as string;
        })
        .finally(() => {
          refreshPromise = null;
        });
    }

    try {
      const newAccessToken = await refreshPromise;

      response = await fetch(`${ENV.API_TEAM_BASE_URL}/images/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${newAccessToken}` },
        body: formData,
      });
    } catch {
      useAuthStore.getState().setLogout();
      throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `이미지 업로드 실패: ${response.status}`);
  }

  return data.url as string;
}

export async function addWine(data: AddWineRequest) {
  const result = await apiFetch('/wines', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return result;
}
