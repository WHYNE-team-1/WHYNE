import { useEffect, useState, type ChangeEvent } from 'react';
import styles from './index.module.css';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import cameraIcon from '@/assets/icons/ic-camera.svg';
import defaultProfileIcon from '@/assets/icons/ic-default-profile.svg';

const DEFAULT_PROFILE_NICKNAME = '\uc640\uc778\uace0\ub974\ub294 \uc911';
const PROFILE_IMAGE_ALT_SUFFIX = '\uc758 \ud504\ub85c\ud544 \uc0ac\uc9c4';
const PROFILE_IMAGE_ARIA_LABEL =
  '\ud504\ub85c\ud544 \uc774\ubbf8\uc9c0 \ubcc0\uacbd';
const NICKNAME_LABEL = '\ub2c9\ub124\uc784';
const NICKNAME_PLACEHOLDER =
  '\ub2c9\ub124\uc784\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694';
const LOADING_TEXT = '\ucc98\ub9ac \uc911...';
const SAVE_BUTTON_TEXT = '\ubcc0\uacbd\ud558\uae30';

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

  useEffect(() => {
    setNicknameInput(nickname);
    setProfileNickname(nickname);
  }, [nickname]);

  useEffect(() => {
    setProfileImage(imageUrl);
  }, [imageUrl]);

  const profileSrc = profileImage.trim() ? profileImage : defaultProfileIcon;

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
