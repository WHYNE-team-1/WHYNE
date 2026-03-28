import { useEffect } from 'react';
import ReviewCard from '@/components/common/ReviewCard';
import type { ReviewListItem } from '@/pages/WineDetail/WineDetail.types';

const sampleWineData = {
  id: 1,
  name: '샤또 마고 2018',
  image:
    'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop',
  region: '보르도 · 프랑스',
};

const sampleFlavorScores = {
  lightBold: 4,
  smoothTannic: 3,
  drySweet: 2,
  softAcidic: 1,
};

const sampleContent =
  '첫 모금에서 느껴지는 진한 블랙베리와 블랙커런트의 깊은 풍미가 인상적이었어요. 오크통 숙성에서 오는 은은한 바닐라와 초콜릿 향이 더해져 복합미가 뛰어납니다.';

const loginUserMe = { id: 1 };
const loginUserVisitor = { id: 99 };

const reviewProfileMine: ReviewListItem = {
  id: 101,
  rating: 4,
  lightBold: 4,
  smoothTannic: 3,
  drySweet: 2,
  softAcidic: 1,
  aroma: [],
  content: sampleContent,
  createdAt: '2026-03-01T10:00:00.000Z',
  updatedAt: '2026-03-01T10:00:00.000Z',
  user: {
    id: 1,
    nickname: '성준',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  isLiked: false,
};

const reviewDetailOther: ReviewListItem = {
  id: 102,
  rating: 4,
  lightBold: 3,
  smoothTannic: 4,
  drySweet: 2,
  softAcidic: 3,
  aroma: ['cherry', 'oak', 'caramel', 'citrus', 'flower'],
  content: sampleContent,
  createdAt: '2026-03-25T10:00:00.000Z',
  updatedAt: '2026-03-25T10:00:00.000Z',
  user: {
    id: 2,
    nickname: '와인러버',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  isLiked: true,
};

const reviewDetailMine: ReviewListItem = {
  id: 103,
  rating: 5,
  lightBold: 5,
  smoothTannic: 2,
  drySweet: 3,
  softAcidic: 2,
  aroma: ['berry', 'vanilla'],
  content: '내가 남긴 리뷰 — 스토리북용 더미',
  createdAt: '2026-03-28T12:00:00.000Z',
  updatedAt: '2026-03-28T12:00:00.000Z',
  user: {
    id: 1,
    nickname: '성준',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  isLiked: false,
};

const ReviewCardStorybook = () => {
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7243/ingest/af76bd00-d03b-42a4-8320-ade9dd99b4cc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'bfd2b0',
      },
      body: JSON.stringify({
        sessionId: 'bfd2b0',
        location: 'storybook/review-card/index.tsx:mount',
        message: 'ReviewCardStorybook mounted',
        data: { loginUserIds: [loginUserMe.id, loginUserVisitor.id] },
        timestamp: Date.now(),
        hypothesisId: 'H1',
      }),
    }).catch(() => {});
  }, []);
  // #endregion

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <ReviewCard
        type="profile"
        loginUser={loginUserMe}
        data={reviewProfileMine}
        wineData={sampleWineData}
        time="10시간 전"
        flavorScores={sampleFlavorScores}
        likeCount={24}
      />

      <ReviewCard
        type="detail"
        loginUser={loginUserVisitor}
        data={reviewDetailOther}
        wineData={sampleWineData}
        time="3일 전"
        flavorScores={sampleFlavorScores}
        likeCount={156}
      />

      <ReviewCard
        type="detail"
        loginUser={loginUserMe}
        data={reviewDetailMine}
        wineData={sampleWineData}
        time="방금 전"
        flavorScores={sampleFlavorScores}
        likeCount={0}
        onEdit={() => alert('수정')}
        onDelete={() => alert('삭제')}
      />
    </div>
  );
};

export default ReviewCardStorybook;
