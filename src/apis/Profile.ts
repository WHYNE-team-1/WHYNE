import { apiFetch } from "./fetchClient";
import type { User } from "@/store/useAuthStore";

type UploadImageResponse = {
  url: string;
};

export async function uploadProfileImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiFetch("/images/upload", {
    method: "POST",
    body: formData,
  });

  return (response as UploadImageResponse).url;
}

type UpdateProfileBody = {
  nickname: string;
  image: string | null;
};

export async function updateMyProfile(body: UpdateProfileBody): Promise<User> {
  const response = await apiFetch("/users/me", {
    method: "PATCH",
    body: JSON.stringify(body),
  });

  return response as User;
}
