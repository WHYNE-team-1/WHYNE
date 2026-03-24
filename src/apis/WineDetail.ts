import { ENV } from "./env";

const TOKEN = localStorage.getItem("accessToken");

export async function getWineDetail(id: string) {
  // 토큰이 없으면 요청조차 보내지 않도록 방어 로직 추가
  if (!TOKEN) {
    console.error("토큰이 없습니다. 로그인이 필요합니다.");
    return;
  }
  const res = await fetch(`${ENV.API_TEAM_BASE_URL}/wines/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`, // 공백 하나가 정확히 있는지 확인
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log("에러:", error); // 👈 이거 꼭 찍어
    throw new Error("와인 상세 조회 실패");
  }

  return res.json();
}

export async function addWineReview(_data: {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: [];
  content: string;
  wineID: number;
}) {
  const res = await fetch(`${ENV.API_TEAM_BASE_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`, // 공백 하나가 정확히 있는지 확인
    },
    body: JSON.stringify(_data),
  });
  if (!res.ok) {
    const error = await res.json();
    console.log("에러:", error); // 👈 이거 꼭 찍어
    throw new Error("와인 등록 실패");
  }

  return res.json();
}
