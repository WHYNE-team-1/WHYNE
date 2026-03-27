import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import styles from './index.module.css';
import { useState } from 'react';
import type { WineDetail } from '@/pages/WineDetail/WineDetail.types';
import ReviewCard from '@/components/common/ReviewCard';
import ReviewModal from '@/components/ReviewModal';
import { useAuthStore } from '@/store/useAuthStore';

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
              loginUser={user ?? { id: 0 }} // fallback 값
              wineData={{
                id: data.id,
                name: data.name ?? '',
                image: data.image ?? '',
                region: data.region ?? '',
              }}
              onEdit={onSuccess}
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
