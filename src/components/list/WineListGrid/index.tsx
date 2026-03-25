import type { WineTypeKind } from '@/constants/WineType.constants';
import WineListCard from '../WineListCard';
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
  // 데이터가 없을 때 방어 로직 추가 (나중에 시안대로 수정)
  if (!wines || wines.length === 0) {
    return <div className={styles.empty}>등록된 와인이 없습니다. 🍷</div>;
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
