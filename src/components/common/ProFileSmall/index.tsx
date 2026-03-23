import styles from "./index.module.css";
import defaultProfileIcon from "@/assets/icons/ic-default-profile.svg";

type ProfileSmallProps = {
  imageUrl?: string;
  nickname?: string;
  timeAgo?: number;
};

export default function ProfileSmall({
  imageUrl,
  nickname = "와인 고르는 중",
  timeAgo = 10,
}: ProfileSmallProps) {
  const profileSrc = imageUrl?.trim() ? imageUrl : defaultProfileIcon;

  return (
    <article className={styles.profile}>
      <figure className={styles.profileIcon}>
        <img src={profileSrc} alt={`${nickname} 프로필 이미지`} />
      </figure>
      <div className={styles.profileInfo}>
        <strong className={styles.name}>{nickname}</strong>
        <time className={styles.time} dateTime={`PT${timeAgo}H`}>
          {timeAgo}시간 전
        </time>
      </div>
    </article>
  );
}