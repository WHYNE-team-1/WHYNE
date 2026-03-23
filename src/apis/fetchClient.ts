import {ENV} from './env';

const BASE_URL = ENV.API_TEAM_BASE_URL;

// fetch 대신 사용할 함수
export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  console.log(BASE_URL)
  const token = localStorage.getItem("accessToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
};