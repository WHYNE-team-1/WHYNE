import { apiFetch } from './fetchClient';
export async function getWineDetail(id: string) {
  const data = await apiFetch(`/wines/${id}`);
  return data;
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
  const result = await apiFetch('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return result;
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
    content: string;
  }
) {
  const result = await apiFetch(`/reviews/${id}`, {
    // /wines → /reviews
    method: 'PATCH',
    body: JSON.stringify(data), // headers 제거
  });
  return result;
}

export async function deleteWineReview(id: number) {
  const result = await apiFetch(`/reviews/${id}`, {
    method: 'DELETE',
  });
  return result;
}
