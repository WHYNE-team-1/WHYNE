import { useState, useEffect } from "react";
import styles from "./index.module.css";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import cameraIcon from "@/assets/icons/ic-camera.svg";
import defaultProfileIcon from "@/assets/icons/ic-default-profile.svg";

// 프로필 카드 컴포넌트
type ProfileProps = {
  imageUrl?: string;
  nickname?: string;
  onImageChange?: (imageUrl: string, file?: File) => void;
  onNicknameChange?: (nickname: string) => void;
  onSave?: () => void | Promise<void>;
  isLoading?: boolean;
};

export default function Profile({
  imageUrl = "",
  nickname = "주말에 와인",
  onImageChange,
  onNicknameChange,
  onSave,
  isLoading = false,
}: ProfileProps) {
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [profileNickname, setProfileNickname] = useState(nickname);
  const [profileImage, setProfileImage] = useState(imageUrl);
  const [isImageError, setIsImageError] = useState(false);

  useEffect(() => {
    setNicknameInput(nickname);
    setProfileNickname(nickname);
  }, [nickname]);

  useEffect(() => {
    setProfileImage(imageUrl);
    setIsImageError(false);
  }, [imageUrl]);

  const profileSrc =
    !isImageError && profileImage?.trim() ? profileImage : defaultProfileIcon;

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          setProfileImage(imageUrl);
          if (onImageChange) {
            onImageChange(imageUrl, file);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNicknameInput(newNickname);
    if (onNicknameChange) {
      onNicknameChange(newNickname);
    }
  };

  const handleSave = async () => {
    // 프로필 이름 업데이트
    setProfileNickname(nicknameInput);
    
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
            alt={`${profileNickname}님의 프로필 사진`}
            onError={() => setIsImageError(true)}
          />

          <button
            type="button"
            className={styles.imageOverlay}
            aria-label="프로필 이미지 변경"
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
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
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
            {isLoading ? "처리 중..." : "변경하기"}
          </Button>
        </span>
      </div>
    </div>
  );
}

