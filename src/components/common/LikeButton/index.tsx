import styles from "./index.module.css";
import likeActiveIcon from "@/assets/icons/ic-like-active.svg";
import likeInActiveIcon from "@/assets/icons/ic-like-inactive.svg";
import { useState } from "react";

type Props = {
  initialLiked?: boolean;
  count?: number;
  size: "sm" | "md";
};

export default function LikeButton({
  initialLiked = false,
  count = 0,
  size = "md",
}: Props) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(count);

  const handleClick = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked((prev) => !prev);
  };

  return (
    <button
      className={`${styles.like} ${styles[size]} ${liked ? styles.active : styles.inActive}`}
      onClick={handleClick}
    >
      <span className={styles.icon}>
        {liked ? <img className={styles.smallIcon} src={likeActiveIcon} /> : <img className={styles.smallIcon}src={likeInActiveIcon} />}
      </span>
      <span>{likeCount}</span>
    </button>
  );
}
