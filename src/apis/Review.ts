import { ENV } from "./env";

export async function getReviews(id: string) {
  const res = await fetch(`${ENV.API_TEAM_BASE_URL}/reviews/${id}`);

  if (!res.ok) {
    throw new Error("리뷰 조회 실패");
  }

  return res.json();
}
