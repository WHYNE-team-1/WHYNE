import type { WineTypeKind } from '@/constants/WineType.constants';
import { apiFetch } from './fetchClient';

export interface GetWinesParams {
  limit: number; // 한 번에 가져올 데이터 개수
  cursor?: number; // 다음 페이지 데이터를 가져오기 위한 시작점
  type?: WineTypeKind; // 와인 종류
  name?: string; // 검색창에 입력한 와인 이름
  minPrice?: number; // 최소 가격 필터
  maxPrice?: number; // 최대 가격 필터
  rating?: number; // 평점 필터
}

/* 서버에 와인 목록 데이터를 요청하는 함수 */
export async function getWines(params: GetWinesParams) {
  const { limit, cursor, type, name, minPrice, maxPrice, rating } = params;

  const searchParams = new URLSearchParams({
    limit: limit.toString(),
  });

  // 선택적 파라미터 처리 : 값이 존재할 때만 URL에 추가함.
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

  // 최종 완성된 주소
  // apiFetch 내부에서 로그인 토큰(JWT)을 자동으로 헤더에 담아서 보냄.
  return apiFetch(`/wines?${searchParams.toString()}`);
}
