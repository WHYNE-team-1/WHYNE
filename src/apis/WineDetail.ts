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
