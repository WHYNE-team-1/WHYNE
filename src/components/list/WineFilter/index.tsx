import FilterTypeCheckbox from '@/components/common/FilterTypeCheckbox';
import PriceRangeSlider from '@/components/common/PriceRangeSlider';
import FilterRatingCheckbox from '@/components/common/FilterRatingCheckbox';
import styles from './index.module.css';
import Button from '@/components/common/Button';

interface WineFilterProps {
  selectedTypes: string[]; // 선택된 와인 타입 리스트
  setSelectedTypes: (types: string[]) => void; // 와인 타입 변경 핸들러
  priceRange: number[]; // 최소 가격, 최대 가격 배열
  setPriceRange: (range: number[]) => void; // 가격 범위 변경 핸들러
  selectedRatings: string[]; // 선택된 평점 구간 리스트
  setSelectedRatings: (ratings: string[]) => void; // 평점 선택 변경 핸들러
  onApply: () => void; // 필터 적용하기 버튼 클릭 시 실행될 함수
}

function WineFilter({
  selectedTypes,
  setSelectedTypes,
  priceRange,
  setPriceRange,
  selectedRatings,
  setSelectedRatings,
  onApply,
}: WineFilterProps) {
  return (
    <div className={styles.filterContainer}>
      {/* 와인 타입 필터 */}
      <section className={styles.filterSection}>
        <h3 className={styles.filterTitle}>타입</h3>
        <FilterTypeCheckbox value={selectedTypes} onChange={setSelectedTypes} />
      </section>

      {/* 가격 범위 필터 */}
      <section className={styles.filterSection}>
        <h3 className={styles.filterTitle}>가격</h3>
        <PriceRangeSlider value={priceRange} onChange={setPriceRange} />
      </section>

      {/* 평점 필터 */}
      <section className={styles.filterSection}>
        <h3 className={styles.filterTitle}>평점</h3>
        <FilterRatingCheckbox
          value={selectedRatings}
          onChange={setSelectedRatings}
        />
      </section>

      {/* 필터 적용하기 버튼 */}
      <div className={styles.buttonWrapper}>
        <Button size="stretch" color="black" onClick={onApply}>
          필터 적용하기
        </Button>
      </div>
    </div>
  );
}

export default WineFilter;
