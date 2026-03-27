import { useState, type FormEvent } from 'react';
import Textarea from '@/components/common/Textarea';
import Button from '@/components/common/Button';
import ReviewAromaCheckbox from '@/components/common/ReviewAromaCheckbox';
import WineTasteSlider from '@/components/common/WineTasteSlider';
import StarRating from '@/components/common/StarRating';
import Modal from '@/components/common/Modal';
import styles from './index.module.css';
import { addWineReview, editWineReview } from '@/apis/WineDetail';

type ReviewModalProps = {
  type: 'edit' | 'create';
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onClose: () => void;
  title: string;
  wineData: { id: number; name: string; image: string; region: string };
  reviewData?: any;
  onSuccess: () => void;
};

export default function ReviewModal({
  type,
  isOpen,
  setIsOpen,
  onClose,
  title,
  wineData, // 와인 정보
  reviewData, // 리뷰 정보 (edit일 때만)
  onSuccess,
}: ReviewModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [rating, setRating] = useState(reviewData?.rating ?? 3);
  const [content, setContent] = useState(reviewData?.content ?? '');
  const [aroma, setAroma] = useState<string[]>(reviewData?.aroma ?? []);
  const [taste, setTaste] = useState({
    lightBold: reviewData?.lightBold ?? 0,
    smoothTannic: reviewData?.smoothTannic ?? 0,
    drySweet: reviewData?.drySweet ?? 0,
    softAcidic: reviewData?.softAcidic ?? 0,
  });

  const buttonText = isLoading
    ? '등록 중...'
    : type === 'edit'
      ? '리뷰 수정하기'
      : '리뷰 남기기';

  const modalButton = (
    <Button color="black" size="stretch" type="submit" form="reviewForm">
      {buttonText}
    </Button>
  );

  const sliderInitialScores: Record<
    'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic',
    number
  > = {
    lightBold: taste.lightBold,
    smoothTannic: taste.smoothTannic,
    drySweet: taste.drySweet,
    softAcidic: taste.softAcidic,
  };
  function resetForm() {
    setRating(3);
    setContent('');
    setAroma([]);
    setTaste({
      lightBold: 0,
      smoothTannic: 0,
      drySweet: 0,
      softAcidic: 0,
    });
  }
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!wineData?.id || isLoading) {
      return;
    } // data?.id → wineData.id

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

    const payload = {
      rating: normalizedRating,
      lightBold: taste.lightBold,
      smoothTannic: taste.smoothTannic,
      drySweet: taste.drySweet,
      softAcidic: taste.softAcidic,
      aroma: normalizedAroma,
      content: trimmedContent,
    };

    try {
      setIsLoading(true);

      if (type === 'edit') {
        await editWineReview(reviewData.id, payload); // PATCH
      } else {
        await addWineReview({ ...payload, wineId: wineData.id }); // POST
      }

      onSuccess();
      resetForm(); // 추가
      setIsOpen(false);
      setIsOpen(false);
    } catch (error) {
      //   console.error('리뷰 제출 실패:', error);
      alert(
        type === 'edit'
          ? '리뷰 수정에 실패했습니다.'
          : '리뷰 등록에 실패했습니다.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        setIsOpen(false);
      }}
      title={title}
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
              <img src={wineData.image} alt={wineData.name} />
            </div>
            <div className={styles.NameAndRegion}>
              <p className={styles.name}>{wineData.name}</p>
              <p className={styles.region}>{wineData.region}</p>
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
  );
}
