import { ENV } from './env';

export async function getWineDetail(id: string) {
  const token = localStorage.getItem('accessToken');
  // 토큰이 없으면 요청조차 보내지 않도록 방어 로직 추가
  if (!token) {
    console.error('토큰이 없습니다. 로그인이 필요합니다.');
    return;
  }
  const res = await fetch(`${ENV.API_TEAM_BASE_URL}/wines/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    await res.json();
    throw new Error('와인 상세 조회 실패');
  }

  return res.json();
}

export async function addWineReview(data: {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  wineId: number;
}) {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    throw new Error('리뷰 등록 실패: 토큰이 없습니다. 다시 로그인해주세요.');
  }

  const res = await fetch(`${ENV.API_TEAM_BASE_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `와인 등록 실패 (${res.status}): ${errorText || '응답 본문 없음'}`
    );
  }

  return res.json();
}

export async function editWineReview(
  id: string,
  data: {
    rating: number;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    content: 'string';
  }
) {
  await fetch(`${ENV.API_TEAM_BASE_URL}/wines/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
