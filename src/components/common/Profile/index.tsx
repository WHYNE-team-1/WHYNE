import styles from "./index.module.css";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import cameraIcon from "@/assets/icons/ic-camera.svg";
import defaultProfileIcon from "@/assets/icons/ic-default-profile.svg";

type ProfileProps = {
  imageUrl?: string;
  nickname?: string;
};

export default function Profile({
  imageUrl,
  nickname = "주말에 와인",
}: ProfileProps) {
  const profileSrc = imageUrl?.trim() ? imageUrl : defaultProfileIcon;

  return (
    <div className={styles.profileCardInner}>
      <div className={styles.profileCard}>
        <div className={styles.profileCardImg}>
          <img src={profileSrc} alt="프로필 이미지" />

          <button
            type="button"
            className={styles.imageOverlay}
            aria-label="프로필 이미지 변경"
          >
            <img
              src={cameraIcon}
              alt=""
              aria-hidden="true"
              className={styles.cameraIcon}
            />
          </button>
        </div>

        <div className={styles.profileCardName}>{nickname}</div>
      </div>

      <div className={styles.profileCardInfo}>
        <Input
          label="닉네임"
          placeholder="닉네임을 입력해주세요"
          defaultValue={nickname}
          className={styles.profileCardField}
        />
        <span className={styles.profileCardBtn}>
          <Button color="black" size="BtnS">
            변경하기
          </Button>
        </span>
      </div>
    </div>
  );
}
