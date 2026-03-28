import { useEffect, useState } from 'react';
import { ENV } from '@/apis/env';
import ConfirmModal from '@/components/common/ModalConfirm';
import ProFile from '@/components/common/ProFile';
import MyReviews from './myReviews';
import styles from './index.module.css';

const PROFILE_STORAGE_KEY = 'myProfileDraft';
const ACCESS_TOKEN_KEY = 'accessToken';
const DEFAULT_NICKNAME = 'light797';
const MISSING_TOKEN_MESSAGE = 'accessToken이 없습니다.';
const SAVE_ERROR_PREFIX = '프로필 저장 실패';
const SAVE_ERROR_MESSAGE = '프로필 저장에 실패했습니다.';
const CONFIRM_TEXT = '변경하기';
const CANCEL_TEXT = '취소';
const CONFIRM_SUFFIX = '"(으)로';
const CONFIRM_QUESTION = '닉네임을 변경할까요?';

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
    image: '',
    nickname: DEFAULT_NICKNAME,
  };

  const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (!rawProfile) {
    return fallbackProfile;
  }

  try {
    return JSON.parse(rawProfile) as StoredProfile;
  } catch (error) {
    console.error('저장된 프로필 초안(Draft)을 분석하지 못했습니다.', error);
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

  // 저장 전까지는 현재 편집 중인 값을 로컬 스토리지에 보관한다.
  useEffect(() => {
    localStorage.setItem(
      PROFILE_STORAGE_KEY,
      JSON.stringify({
        image,
        nickname: draftNickname,
      })
    );
  }, [image, draftNickname]);

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

  // 닉네임과 이미지 파일을 FormData에 담아 프로필 API로 전송한다.
  const handleSave = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)?.trim();

    if (!accessToken) {
      alert(MISSING_TOKEN_MESSAGE);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('nickname', draftNickname);

      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const response = await fetch(`${ENV.API_TEAM_BASE_URL}/users/me`, {
        method: 'PATCH',
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
      setImage(data.image ?? '');
      setSelectedFile(null);
      setIsConfirmOpen(false);
    } catch (error) {
      console.error('Failed to save profile changes.', error);
      alert(SAVE_ERROR_MESSAGE);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <section className={styles.layout}>
          <ProFile
            imageUrl={image}
            nickname={nickname}
            onImageChange={handleImageChange}
            onNicknameChange={handleNicknameChange}
            onSave={handleOpenConfirm}
            isLoading={isLoading}
          />

          <div className={styles.reviewsColumn}>
            <MyReviews />
          </div>
        </section>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={handleSave}
        title={
          <>
            &quot;{draftNickname}
            {CONFIRM_SUFFIX}
            <br />
            {CONFIRM_QUESTION}
          </>
        }
        confirmText={CONFIRM_TEXT}
        cancelText={CANCEL_TEXT}
        confirmVariant="primary"
      />
    </>
  );
}
