import styles from "./index.module.css";
import ModalBtn from "@/components/common/button/Modal/ModalBtn";
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
        <label>닉네임</label>
        <input type="text" placeholder="이름" defaultValue={nickname} />
        <span className={styles.profileCardBtn}>
          <ModalBtn variant="primary">변경하기</ModalBtn>
        </span>
      </div>
    </div>
  );
}
