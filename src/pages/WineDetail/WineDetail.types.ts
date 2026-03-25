// 1. 가장 작은 것부터
export interface ReviewUser {
  id: number;
  nickname: string;
  image: string | null;
}

// 2. 공통 리뷰
export interface Review {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

// 3. 확장
export interface ReviewListItem extends Review {
  isLiked: boolean;
}

export interface RecentReview extends Review {
  likes: unknown[];
}

// 4. 메인
export interface WineDetail {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: string;
  avgRating: number;
  reviewCount: number;

  recentReview: RecentReview;

  userId: number;
  reviews: ReviewListItem[];

  avgRatings: Record<number, number>;
}
