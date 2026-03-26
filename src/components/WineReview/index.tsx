import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import styles from './index.module.css';
import Modal from '@/components/common/Modal';
import { useState, type FormEvent } from 'react';
import Textarea from '@/components/common/Textarea';
import ReviewAromaCheckbox from '@/components/common/ReviewAromaCheckbox';
import WineTasteSlider from '@/components/common/WineTasteSlider';
import { addWineReview } from '@/apis/WineDetail';
import type { WineDetail } from '@/pages/WineDetail/WineDetail.types';
import ReviewCard from '@/components/common/ReviewCard';

type Props = {
  data: WineDetail | null;
  onSuccess: () => void;
};

export default function WineReview({ data, onSuccess }: Props) {
  if (!data) {
    return <div>로딩중...</div>;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [rating, setRating] = useState(3);
  const [content, setContent] = useState('');
  const [aroma, setAroma] = useState<string[]>([]);
  const [taste, setTaste] = useState({
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
  });

  const sliderInitialScores: Record<
    'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic',
    number
  > = {
    lightBold: taste.lightBold,
    smoothTannic: taste.smoothTannic,
    drySweet: taste.drySweet,
    softAcidic: taste.softAcidic,
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!data?.id || isLoading) {
      return;
    }
    const trimmedContent = content.trim();
    const normalizedRating = Math.max(1, Math.min(5, Math.round(rating)));
    if (!trimmedContent) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }
    const normalizedAroma = Array.from(new Set(aroma)).filter(Boolean);
    if (normalizedAroma.length === 0) {
      alert('향을 최소 1개 선택해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      await addWineReview({
        rating: normalizedRating,
        lightBold: taste.lightBold,
        smoothTannic: taste.smoothTannic,
        drySweet: taste.drySweet,
        softAcidic: taste.softAcidic,
        aroma: normalizedAroma,
        content: trimmedContent,
        wineId: data.id,
      });

      onSuccess();
      setIsOpen(false);
    } catch {
      alert('리뷰 등록에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }
  const modalButton = (
    <Button color="black" size="stretch" type="submit" form="reviewForm">
      {isLoading ? '등록 중...' : '리뷰 남기기'}
    </Button>
  );
  const allReviews = data.reviews;

  return (
    <>
      <div className={styles.reviewWrap}>
        {allReviews.map((review) => {
          return <ReviewCard key={review.id} data={review} type={'detail'} />;
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
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="리뷰 등록"
        footer={modalButton}
      >
        <form
          className={styles.reviewModal}
          onSubmit={handleSubmit}
          id="reviewForm"
        >
          <div className={styles.reviewTop}>
            <div className={styles.wineInfo}>
              <div className={styles.imgWrap}>
                <img src={data.image} alt={data.name} />
              </div>
              <div className={styles.NameAndRegion}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.region}>{data.region}</p>
              </div>
            </div>
            <div className={styles.wineRating}>
              <p className={styles.label}>별점 선택</p>
              <StarRating
                mode="interactive"
                size="modal"
                value={rating}
                onChange={(val) => {
                  setRating(val);
                }}
              />
            </div>
            <div className={styles.wineReview}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="후기를 작성해주세요"
                maxLength={400}
              />
            </div>
          </div>
          <div className={styles.reviewBottom}>
            <div className={styles.taste}>
              <p className={styles.q}>와인 맛은 어땠나요?</p>
              <WineTasteSlider
                initialScores={sliderInitialScores}
                onChange={(scores) => {
                  setTaste({
                    lightBold: scores.lightBold,
                    smoothTannic: scores.smoothTannic,
                    drySweet: scores.drySweet,
                    softAcidic: scores.softAcidic,
                  });
                }}
              />
            </div>
            <div className={styles.aroma}>
              <p className={styles.q}>기억에 남는 향이 있나요?</p>
              <ReviewAromaCheckbox value={aroma} onChange={setAroma} />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
