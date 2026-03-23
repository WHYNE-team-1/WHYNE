import styles from "./index.module.css";
type Review = any;

export default function WineReview({ data }: { data: Review | null }) {
  if (!data) return <div>로딩중...</div>;
  console.log("리뷰 데이터:", data);
  return (
    <div>
      <div className={styles.rating}></div>
      <button>리뷰 남기기기</button>
      <div className={styles.ratingDetail}></div>
      <button>리뷰 남기기기</button>
    </div>
  );
}
