import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import StarRating from '@/components/common/StarRating';
import Textarea from '@/components/common/Textarea';
import WineTasteSlider from '@/components/common/WineTasteSlider';
import ReviewAromaCheckbox from '@/components/common/ReviewAromaCheckbox';
import styles from './myReviews.module.css';

type FlavorScores = {
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
};

export type EditableReview = {
  id: number;
  wineName: string;
  region: string;
  imageUrl: string;
  content: string;
  flavorScores: FlavorScores;
  aromaIds?: string[];
};

type Props = {
  review: EditableReview | null;
  rating: number;
  content: string;
  aroma: string[];
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onRatingChange(value: number): void;
  // eslint-disable-next-line no-unused-vars
  onContentChange(value: string): void;
  // eslint-disable-next-line no-unused-vars
  onAromaChange(value: string[]): void;
};

export default function EditReviewModal({
  review,
  rating,
  content,
  aroma,
  onClose,
  onRatingChange,
  onContentChange,
  onAromaChange,
}: Props) {
  // 공통 Modal footer 영역에 들어갈 닫기 버튼이다.
  const footer = (
    <Button color="black" size="Btn" onClick={onClose}>
      리뷰 남기기
    </Button>
  );

  return (
    <Modal
      isOpen={review !== null}
      onClose={onClose}
      title="리뷰 수정하기"
      footer={footer}
    >
      {/* 선택된 리뷰가 있을 때만 수정 폼을 보여준다. */}
      {review && (
        <div className={styles.editModalBody}>
          <div className={styles.cardTop}>
            <div className={styles.cardHeader}>
              <div className={styles.reviewInfo}>
                <img
                  src={review.imageUrl}
                  alt={`${review.wineName} 이미지`}
                  className={styles.productImage}
                />

                <div className={styles.reviewTextGroup}>
                  <h3 className={styles.cardTitle}>{review.wineName}</h3>
                  <p className={styles.cardMeta}>{review.region}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 별점은 부모 상태와 연결해 즉시 반영한다. */}
          <StarRating
            mode="interactive"
            size="modal"
            value={rating}
            onChange={onRatingChange}
          />

          {/* 후기 본문은 부모 상태로 올려서 저장 흐름과 맞춘다. */}
          <Textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="후기를 작성해 주세요"
            maxLength={400}
          />

          <h4>와인의 맛은 어땠나요?</h4>
          {/* 선택한 리뷰의 맛 프로필을 읽기 전용으로 보여준다. */}
          <WineTasteSlider
            initialScores={review.flavorScores}
            readOnly
            variant="row"
            labelStyle="text"
          />

          <h4>기억에 남는 향이 있나요?</h4>
          {/* 기억에 남는 아로마는 체크박스로 개별 선택한다. */}
          <ReviewAromaCheckbox value={aroma} onChange={onAromaChange} />
        </div>
      )}
    </Modal>
  );
}
