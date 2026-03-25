import { apiFetch } from './fetchClient';

export interface GetWinesParams {
  limit: number;
  cursor?: number;
  type?: 'RED' | 'WHITE' | 'SPARKLING';
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
}

/**
 * 와인 목록 조회 (fetchClient 활용 버전)
 */
export async function getWines(params: GetWinesParams) {
  const { limit, cursor, type, name, minPrice, maxPrice, rating } = params;

  const searchParams = new URLSearchParams({
    limit: limit.toString(),
  });

  // 파라미터가 있을 때만 추가
  if (cursor) {
    searchParams.append('cursor', cursor.toString());
  }
  if (type) {
    searchParams.append('type', type);
  }
  if (name) {
    searchParams.append('name', name);
  }
  if (minPrice) {
    searchParams.append('minPrice', minPrice.toString());
  }
  if (maxPrice) {
    searchParams.append('maxPrice', maxPrice.toString());
  }
  if (rating) {
    searchParams.append('rating', rating.toString());
  }

  // apiFetch가 내부적으로 토큰을 꺼내서 헤더에 넣어줍니다!
  // /22-1/wines?limit=10...
  return apiFetch(`/wines?${searchParams.toString()}`);
}
