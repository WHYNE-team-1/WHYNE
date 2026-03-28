import FilterTypeCheckbox from '@/components/common/FilterTypeCheckbox';
import PriceRangeSlider from '@/components/common/PriceRangeSlider';
import FilterRatingCheckbox from '@/components/common/FilterRatingCheckbox';
import styles from './index.module.css';
import Button from '@/components/common/Button';
import { useWineStore } from '@/store/useWineStore';

interface WineFilterProps {
  onApply: () => void;
  isModalMode?: boolean;
}

function WineFilter({ onApply, isModalMode = false }: WineFilterProps) {
  // 스토어에서 필요한 상태와 함수를 꺼내 씀.
  const {
    selectedTypes,
    setSelectedTypes,
    priceRange,
    setPriceRange,
    selectedRatings,
    setSelectedRatings,
  } = useWineStore();

  return (
    <div
      className={`${styles.filterContainer} ${isModalMode ? styles.modalMode : ''}`}
    >
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

      {/* 모달 모드가 아닐 때(PC 버전)만 '필터 적용하기' 버튼을 보여줌 */}
      {!isModalMode && (
        <div className={styles.buttonWrapper}>
          <Button size="stretch" color="black" onClick={onApply}>
            필터 적용하기
          </Button>
        </div>
      )}
    </div>
  );
}

export default WineFilter;
