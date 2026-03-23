import { ENV } from "./env";

export async function getWineDetail(id: string) {
  const token = localStorage.getItem("accessToken");

  // 토큰이 없으면 요청조차 보내지 않도록 방어 로직 추가
  if (!token) {
    console.error("토큰이 없습니다. 로그인이 필요합니다.");
    return;
  }
  const res = await fetch(`${ENV.API_TEAM_BASE_URL}/wines/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 공백 하나가 정확히 있는지 확인
    },
  });
  if (!res.ok) {
    const error = await res.json();
    console.log("에러:", error); // 👈 이거 꼭 찍어
    throw new Error("와인 상세 조회 실패");
  }

  return res.json();
}
