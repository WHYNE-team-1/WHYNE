import type { WineTypeKind } from '@/constants/WineType.constants';
import WineListCard from '@/components/list/WineListCard';
import NoResultIcon from '@/assets/icons/ic-no-result.svg';
import styles from './index.module.css';

export interface Wine {
  id: number;
  name: string;
  image: string;
  avgRating: number;
  reviewCount: number;
  type: WineTypeKind;
  price: number;
  recentReview?: {
    content: string;
  };
}

interface WineListGridProps {
  wines: Wine[]; // any 대신 정의한 Wine 타입을 사용
}

function WineListGrid({ wines }: WineListGridProps) {
  // 초기 데이터 없을 때, 검색 결과 없을 때, 필터 조건에 맞는 결과가 없을 때 렌더링되는 화면
  if (!wines || wines.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyContent}>
          <img
            src={NoResultIcon}
            alt="검색 결과 없음 아이콘"
            className={styles.emptyIcon}
          />

          <p className={styles.emptyText}>아직 아무도 모르는 와인이네요!</p>
          <p className={styles.emptySubText}>
            지금 등록해서 다른 사람들에게 첫 번째로 소개해 보세요
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.gridContainer}>
      {/* 데이터 배열을 하나씩 순회하며 카드 컴포넌트로 변환함. */}
      {wines.map((wine) => (
        <WineListCard key={wine.id} {...wine} /> // {...wine} : 객체의 모든 속성을 카드 Props 이름과 동일하게 전달함.
      ))}
    </section>
  );
}

export default WineListGrid;
