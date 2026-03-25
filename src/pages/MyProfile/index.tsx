import { useEffect, useState } from "react";
import { ENV } from "@/apis/env";
import ConfirmModal from "@/components/common/ModalConfirm";
import ProFile from "@/components/common/ProFile";

const PROFILE_STORAGE_KEY = "myProfileDraft";
const ACCESS_TOKEN_KEY = "accessToken";
const DEFAULT_NICKNAME = "light797";
const MISSING_TOKEN_MESSAGE = "accessToken\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.";
const SAVE_ERROR_PREFIX = "\ud504\ub85c\ud544 \uc800\uc7a5 \uc2e4\ud328";
const SAVE_ERROR_MESSAGE = "\ud504\ub85c\ud544 \uc800\uc7a5\uc5d0 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4.";
const CONFIRM_TEXT = "\ubcc0\uacbd\ud558\uae30";
const CANCEL_TEXT = "\ucde8\uc18c";
const CONFIRM_SUFFIX = "\"(\uc73c)\ub85c";
const CONFIRM_QUESTION = "\ub2c9\ub124\uc784\uc744 \ubcc0\uacbd\ud560\uae4c\uc694?";

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
  const [nickname, setNickname] = useState(storedProfile.nickname);
  const [draftNickname, setDraftNickname] = useState(storedProfile.nickname);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        image,
        nickname,
      }),
    );
  }, [image, nickname]);

  const handleImageChange = (imageUrl: string, file?: File) => {
    setImage(imageUrl);
    setSelectedFile(file ?? null);
  };

  const handleNicknameChange = (nextNickname: string) => {
    setDraftNickname(nextNickname);
  };

  const handleOpenConfirm = () => {
    if (!isLoading) {
      setIsConfirmOpen(true);
    }
  };

  const handleCloseConfirm = () => {
    if (!isLoading) {
      setIsConfirmOpen(false);
    }
  };

  const handleSave = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)?.trim();

    if (!accessToken) {
      alert(MISSING_TOKEN_MESSAGE);
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
        throw new Error(`${SAVE_ERROR_PREFIX}: ${response.status}`);
      }

      const data = (await response.json()) as ProfileResponse;

      setNickname(data.nickname);
      setDraftNickname(data.nickname);
      setImage(data.image ?? "");
      setSelectedFile(null);
      setIsConfirmOpen(false);
      console.log("profile save success", data);
    } catch (error) {
      console.error("profile save failed", error);
      alert(SAVE_ERROR_MESSAGE);
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
      <ProFile
        imageUrl={image}
        nickname={nickname}
        onImageChange={handleImageChange}
        onNicknameChange={handleNicknameChange}
        onSave={handleOpenConfirm}
        isLoading={isLoading}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleSave}
        title={
          <>
            "{draftNickname}
            {CONFIRM_SUFFIX}
            <br />
            {CONFIRM_QUESTION}
          </>
        }
        confirmText={CONFIRM_TEXT}
        cancelText={CANCEL_TEXT}
        confirmVariant="primary"
      />
    </main>
  );
}
