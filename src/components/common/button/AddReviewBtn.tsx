import styles from "./AddReviewBtn.module.css";

export default function AddReviewBtn() {
  return (
    <button className={styles.button}>
      <span className={styles.font}>리뷰 남기기</span>
    </button>
  );
}
