import type { WineTypeKind } from '@/constants/WineType.constants';
import styles from './index.module.css';
import StarRating from '@/components/common/StarRating';

interface WineListCardProps {
  id: number; // 와인 상세 페이지 이동을 위한 ID
  image: string; // 와인 이미지 경로
  name: string; // 와인 이름
  avgRating: number; // 평균 별점
  reviewCount: number; // 총 리뷰 개수
  type: WineTypeKind; // 와인 타입
  price: number; // 가격
  recentReview?: {
    content: string; // 최신 후기 내용
  };
}

function WineListCard({
  id,
  image,
  name,
  avgRating,
  reviewCount,
  type,
  price,
  recentReview,
}: WineListCardProps) {
  return (
    <article className={styles.cardContainer}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.wineImage} />
      </div>

      <div className={styles.infoContent}>
        <h3 className={styles.wineName}>{name}</h3>

        <div className={styles.ratingRow}>
          <StarRating
            mode={'displayOnly'}
            value={avgRating}
            count={reviewCount}
            size={'list'}
          />
        </div>

        {/* 최신 후기가 있을 때만 렌더링 */}
        {recentReview && (
          <div className={styles.latestReviewSection}>
            {recentReview ? (
              // 후기가 있을 때: 라벨 + 내용 모두 노출
              <>
                <p className={styles.reviewLabel}>최신 후기</p>
                <p className={styles.reviewText}>{recentReview.content}</p>
              </>
            ) : (
              // 후기가 없을 때: 안내 문구 노출
              <p className={styles.reviewText}>
                아직 후기가 없어요. 첫 후기를 남겨주세요!
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default WineListCard;
