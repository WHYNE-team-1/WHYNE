import { useEffect, useState, type ChangeEvent } from 'react';
import styles from './index.module.css';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import cameraIcon from '@/assets/icons/ic-camera.svg';
import defaultProfileIcon from '@/assets/icons/ic-default-profile.svg';

const DEFAULT_PROFILE_NICKNAME = '주말에 와인';
const PROFILE_IMAGE_ALT_SUFFIX = '님의 프로필 사진';
const PROFILE_IMAGE_ARIA_LABEL = '프로필 이미지 변경';
const NICKNAME_LABEL = '닉네임';
const NICKNAME_PLACEHOLDER = '닉네임을 입력해주세요';
const LOADING_TEXT = '처리 중...';
const SAVE_BUTTON_TEXT = '변경하기';

type ProfileProps = {
  imageUrl?: string;
  nickname?: string;
  onImageChange?: (imageUrl: string, file?: File) => void;
  onNicknameChange?: (nickname: string) => void;
  onSave?: () => void | Promise<void>;
  isLoading?: boolean;
};

export default function ProFile({
  imageUrl = '',
  nickname = DEFAULT_PROFILE_NICKNAME,
  onImageChange,
  onNicknameChange,
  onSave,
  isLoading = false,
}: ProfileProps) {
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [profileNickname, setProfileNickname] = useState(nickname);
  const [profileImage, setProfileImage] = useState(imageUrl);

  // 부모에서 내려온 최신 프로필 값으로 내부 입력 상태를 동기화한다.
  useEffect(() => {
    setNicknameInput(nickname);
    setProfileNickname(nickname);
  }, [nickname]);

  useEffect(() => {
    setProfileImage(imageUrl);
  }, [imageUrl]);

  const profileSrc = profileImage.trim() ? profileImage : defaultProfileIcon;

  // 파일 선택 즉시 미리보기 URL을 만들고 부모에도 원본 파일을 전달한다.
  const handleImageClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const nextImageUrl = loadEvent.target?.result as string;
        setProfileImage(nextImageUrl);
        onImageChange?.(nextImageUrl, file);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextNickname = event.target.value;
    setNicknameInput(nextNickname);
    onNicknameChange?.(nextNickname);
  };

  const handleSave = async () => {
    if (onSave) {
      await onSave();
    }
  };

  return (
    <div className={styles.profileCardInner}>
      <div className={styles.profileCard}>
        <div className={styles.profileCardImg}>
          <img
            src={profileSrc}
            alt={`${profileNickname}${PROFILE_IMAGE_ALT_SUFFIX}`}
          />

          <button
            type="button"
            className={styles.imageOverlay}
            aria-label={PROFILE_IMAGE_ARIA_LABEL}
            onClick={handleImageClick}
            disabled={isLoading}
          >
            <img
              src={cameraIcon}
              alt=""
              aria-hidden="true"
              className={styles.cameraIcon}
            />
          </button>
        </div>
        <div className={styles.profileCardName}>{profileNickname}</div>
      </div>

      <div className={styles.profileCardInfo}>
        <Input
          label={NICKNAME_LABEL}
          placeholder={NICKNAME_PLACEHOLDER}
          value={nicknameInput}
          onChange={handleNicknameChange}
          disabled={isLoading}
          className={styles.profileCardField}
        />
        <span className={styles.profileCardBtn}>
          <Button
            color="black"
            size="BtnS"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? LOADING_TEXT : SAVE_BUTTON_TEXT}
          </Button>
        </span>
      </div>
    </div>
  );
}
