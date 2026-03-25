import { useEffect, useState } from "react";
import Profile from "@/components/common/Profile";
import { ENV } from "@/apis/env";

const PROFILE_STORAGE_KEY = "myProfileDraft";
const ACCESS_TOKEN_KEY = "accessToken";
const DEFAULT_NICKNAME = "light797";

type StoredProfile = {
  image: string;
  nickname: string;
};

type ProfileResponse = {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
};

function getStoredProfile(): StoredProfile {
  const fallbackProfile = {
    image: "",
    nickname: DEFAULT_NICKNAME,
  };

  const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return fallbackProfile;
  }

  try {
    return JSON.parse(rawProfile) as StoredProfile;
  } catch {
    return fallbackProfile;
  }
}

export default function MyProfile() {
  const storedProfile = getStoredProfile();
  const [image, setImage] = useState(storedProfile.image);
  // 화면에 실제로 반영된 닉네임
  const [nickname, setNickname] = useState(storedProfile.nickname);
  // 입력창에서만 잠시 들고 있는 닉네임
  const [draftNickname, setDraftNickname] = useState(storedProfile.nickname);
  // 서버에 보낼 이미지 파일
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 새로고침 후에도 현재 프로필 값이 유지되도록 저장
  useEffect(() => {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        image,
        nickname,
      }),
    );
  }, [image, nickname]);

  // imageUrl은 미리보기용, file은 서버 전송용으로 따로 보관
  const handleImageChange = (imageUrl: string, file?: File) => {
    setImage(imageUrl);
    setSelectedFile(file ?? null);
  };

  // 입력 중에는 임시 닉네임만 변경
  const handleNicknameChange = (nextNickname: string) => {
    setDraftNickname(nextNickname);
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)?.trim();

    if (!accessToken) {
      alert("accessToken이 없습니다.");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nickname", draftNickname);

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await fetch(`${ENV.API_TEAM_BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`프로필 저장 실패: ${response.status}`);
      }

      const data = (await response.json()) as ProfileResponse;

      // 저장 성공 후 서버 응답값으로 화면 상태를 갱신
      setNickname(data.nickname);
      setDraftNickname(data.nickname);
      setImage(data.image ?? "");
      setSelectedFile(null);
      console.log("profile save success", data);
    } catch (error) {
      console.error("profile save failed", error);
      alert("프로필 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "48px 24px",
      }}
    >
      <Profile
        imageUrl={image}
        nickname={nickname}
        onImageChange={handleImageChange}
        onNicknameChange={handleNicknameChange}
        onSave={handleSave}
        isLoading={isLoading}
      />
    </main>
  );
}
