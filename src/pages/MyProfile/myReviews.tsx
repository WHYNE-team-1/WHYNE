import { useState } from 'react';
import Dropdown from '@/components/common/Dropdown';
import type { DropdownOption } from '@/components/common/Dropdown';
import StarRating from '@/components/common/StarRating';
import WineTasteSlider from '@/components/common/WineTasteSlider';
import LikeButton from '@/components/common/LikeButton';
import IcHamburger from '@/assets/icons/ic-hamburger.svg';
import styles from './myReviews.module.css';
import EditReviewModal, { type EditableReview } from './EditReviewModal';

type TabKey = 'reviews' | 'wines';

type ReviewItem = EditableReview & {
  tastes: string[];
  rating: number;
  timeAgo: string;
};

type WineItem = {
  id: number;
  name: string;
  region: string;
  price: string;
  status: string;
};

const reviewItems: ReviewItem[] = [
  {
    id: 1,
    wineName: 'Chateau Lumiere',
    region: 'Bordeaux, France',
    imageUrl: '/assets/images/productImage-01.png',
    tastes: ['체리', '오크', '카라멜', '시트러스', '꽃'],
    rating: 4.5,
    timeAgo: '10시간 전',
    content:
      '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 향이 인상적이었어요. 입안을 가득 채우는 묵직한 바디감과 오크 숙성에서 오는 바닐라, 스파이스, 토스트의 풍미가 균형 있게 이어집니다.',
    flavorScores: {
      lightBold: 5,
      smoothTannic: 4,
      drySweet: 2,
      softAcidic: 3,
    },
  },
  {
    id: 2,
    wineName: 'Sonoma Crest',
    region: 'California, USA',
    imageUrl: '/assets/images/productImage-01.png',
    tastes: ['체리', '오크', '카라멜', '시트러스', '꽃'],
    rating: 4,
    timeAgo: '10시간 전',
    content: '탄닌이 부드럽고 산미가 과하지 않아서 입문용으로 좋았습니다.',
    flavorScores: {
      lightBold: 3,
      smoothTannic: 2,
      drySweet: 4,
      softAcidic: 3,
    },
  },
];

const registeredWineItems: WineItem[] = [
  {
    id: 1,
    name: 'Maison Vert Reserve',
    region: 'Loire, France',
    price: '₩42,000',
    status: '심사 완료',
  },
  {
    id: 2,
    name: 'Golden Field Riesling',
    region: 'Mosel, Germany',
    price: '₩36,000',
    status: '등록 대기',
  },
];

const tabs = [
  { key: 'reviews' as const, label: '내가 쓴 후기', count: 8 },
  { key: 'wines' as const, label: '내가 등록한 와인', count: 4 },
];

export default function MyReviews() {
  // 현재 선택된 탭에 따라 리뷰 목록과 등록 와인 목록을 전환한다.
  const [activeTab, setActiveTab] = useState<TabKey>('reviews');
  // 리뷰 카드별 별점 값을 id 기준으로 관리한다.
  const [ratings, setRatings] = useState<Record<number, number>>(
    Object.fromEntries(reviewItems.map((review) => [review.id, review.rating]))
  );
  // 수정 모달의 textarea 입력값을 별도로 보관한다.
  const [content, setContent] = useState('');
  const [aroma, setAroma] = useState<string[]>([]);
  // 드롭다운에서 선택한 리뷰를 수정 모달로 전달한다.
  const [editingReview, setEditingReview] = useState<EditableReview | null>(
    null
  );

  // 수정하기를 누르면 대상 리뷰를 찾아 모달 초기값으로 세팅한다.
  const handleOpenEditModal = (reviewId: number) => {
    const targetReview = reviewItems.find((review) => review.id === reviewId);

    if (targetReview) {
      setEditingReview(targetReview);
      setContent(targetReview.content);
      setAroma(targetReview.aromaIds ?? []);
    }
  };

  const handleCloseEditModal = () => {
    setEditingReview(null);
    setContent('');
    setAroma([]);
  };

  // 카드 우상단 드롭다운에서 사용할 액션 목록이다.
  const getReviewOptions = (reviewId: number): DropdownOption[] => [
    {
      label: '수정하기',
      onClick: () => {
        handleOpenEditModal(reviewId);
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        alert(`${reviewId}번 후기를 삭제합니다.`);
      },
    },
  ];

  return (
    <>
      {/* 상단 탭과 탭별 목록을 감싸는 메인 섹션 */}
      <section className={styles.section}>
        <div className={styles.tabList} role="tablist" aria-label="내 활동 탭">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <span>{tab.label}</span>
                <strong>{tab.count}</strong>
              </button>
            );
          })}
        </div>

        {/* 리뷰 탭에서는 카드 목록과 수정 가능한 상호작용을 보여준다. */}
        {activeTab === 'reviews' ? (
          <div className={styles.panel} role="tabpanel">
            {reviewItems.map((review) => (
              <article key={review.id} className={styles.reviewCard}>
                <p className={styles.reviewTime}>{review.timeAgo}</p>
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
                        <div className={styles.reviewRating}>
                          <StarRating
                            mode="interactive"
                            size="modal"
                            value={ratings[review.id]}
                            onChange={(val) => {
                              setRatings((prev) => ({
                                ...prev,
                                [review.id]: val,
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className={styles.dropdownWrap}>
                      <Dropdown
                        trigger={
                          <img
                            src={IcHamburger}
                            alt="리뷰 메뉴 열기"
                            className={styles.hamburgerIcon}
                          />
                        }
                        options={getReviewOptions(review.id)}
                        offset={12}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.reviewTaste}>
                  {review.tastes.map((taste) => (
                    <span key={taste} className={styles.reviewTasteItem}>
                      {taste}
                    </span>
                  ))}
                </div>

                <p className={styles.reviewContent}>{review.content}</p>

                <div className={styles.reviewSlider}>
                  <WineTasteSlider
                    readOnly
                    variant="grid"
                    hideLeftDesc
                    initialScores={review.flavorScores}
                  />
                </div>

                <div className={styles.likeButtonInline}>
                  <LikeButton size="md" />
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* 등록 와인 탭에서는 요약 정보만 간단히 노출한다. */
          <div className={styles.panel} role="tabpanel">
            {registeredWineItems.map((wine) => (
              <article key={wine.id} className={styles.wineCard}>
                <h2>테스트</h2>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 선택된 리뷰가 있을 때만 수정 모달을 열고 변경값을 연결한다. */}
      <EditReviewModal
        review={editingReview}
        rating={editingReview ? ratings[editingReview.id] : 0}
        content={content}
        aroma={aroma}
        onClose={handleCloseEditModal}
        onRatingChange={(value) => {
          if (!editingReview) {
            return;
          }

          setRatings((prev) => ({
            ...prev,
            [editingReview.id]: value,
          }));
        }}
        onContentChange={setContent}
        onAromaChange={setAroma}
      />
    </>
  );
}
