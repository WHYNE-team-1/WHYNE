import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import styles from './index.module.css';
import { useState } from 'react';
import type { WineDetail } from '@/pages/WineDetail/WineDetail.types';
import ReviewCard from '@/components/common/ReviewCard';
import ReviewModal from '@/components/ReviewModal';
import { useAuthStore } from '@/store/useAuthStore';
import { deleteWineReview } from '@/apis/WineDetail';

const formatTimeAgo = (dateString: string) => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffMin < 1) {
    return '방금 전';
  }
  if (diffMin < 60) {
    return `${diffMin}분 전`;
  }
  if (diffHour < 24) {
    return `${diffHour}시간 전`;
  }
  if (diffDay < 30) {
    return `${diffDay}일 전`;
  }

  return `${past.getFullYear()}.${String(past.getMonth() + 1).padStart(2, '0')}.${String(past.getDate()).padStart(2, '0')}`;
};

type Props = {
  data: WineDetail | null;
  onSuccess: () => void;
};

export default function WineReview({ data, onSuccess }: Props) {
  if (!data) {
    return <div>로딩중...</div>;
  }

  const user = useAuthStore((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const allReviews = data.reviews;
  return (
    <>
      <div className={styles.reviewWrap}>
        {allReviews.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              data={review}
              type="detail"
              time={formatTimeAgo(review.createdAt)}
              loginUser={user ?? { id: 0 }} // fallback 값
              wineData={{
                id: data.id,
                name: data.name ?? '',
                image: data.image ?? '',
                region: data.region ?? '',
              }}
              onEdit={onSuccess}
              onDelete={async () => {
                await deleteWineReview(review.id);
                onSuccess(); // 삭제 후 목록 새로고침
              }}
            />
          );
        })}
      </div>
      <div className={styles.ratingsWrap}>
        <div className={styles.rating}>
          <StarRating
            mode="displayOnly"
            size="graph"
            value={data.avgRating}
            showMaxScore={true}
          />
        </div>
        <div className={styles.tableBtn}>
          <Button size="stretch" onClick={() => setIsOpen(true)}>
            리뷰 남기기
          </Button>
        </div>
        <div className={styles.ratingDetails}>
          {Object.entries(data.avgRatings as Record<string, number>).map(
            ([key, value]) => (
              <div className={styles.ratingDetail} key={key}>
                <span className={styles.label}>{key}점</span>
                <div className={styles.barbg}>
                  <div
                    className={styles.bar}
                    style={{
                      width:
                        data.reviewCount > 0
                          ? `${(value / data.reviewCount) * 100}%`
                          : '0%',
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.basicBtn}>
          <Button size="stretch" onClick={() => setIsOpen(true)}>
            리뷰 남기기
          </Button>
        </div>
      </div>
      <ReviewModal
        type="create"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        title="리뷰 등록"
        wineData={{
          id: data.id,
          name: data.name,
          image: data.image,
          region: data.region,
        }}
        onSuccess={() => onSuccess?.()}
      />
    </>
  );
}
