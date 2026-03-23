import { ENV } from "./env";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjkzMiwidGVhbUlkIjoiMjIiLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTc3NDIzOTEyMiwiZXhwIjoxNzc0MjQwOTIyLCJpc3MiOiJzcC1lcGlncmFtIn0.BmTeFWdW4g8YYw-2_9BwTUMkYf_tmMYF0JmMb610YtI";

export async function getReviews(id: string) {
  const res = await fetch(`${ENV.API_TEAM_BASE_URL}/reviews/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("리뷰 조회 실패");
  }

  return res.json();
}
