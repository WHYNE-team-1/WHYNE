import styles from './AddReviewBtn.module.css';

type Props = {
  onClick?: () => void;
};

export default function AddReviewBtn({ onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.button}>
      <span className={styles.font}>리뷰 남기기</span>
    </button>
  );
}
