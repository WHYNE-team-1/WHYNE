import { useEffect, useState } from 'react';
import { getWines } from '@/apis/wine';
import WineListGrid, { type Wine } from '@/components/list/WineListGrid';
import SearchBar from '@/components/common/SearchBar';
import WineFilter from '@/components/list/WineFilter';
import styles from './index.module.css';

function WinesList() {
  const [wines, setWines] = useState<Wine[]>([]); // 화면에 보여줄 와인 목록 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [keyword, setKeyword] = useState(''); // 사용자가 입력 창에 타이핑하는 글자 상태

  // 필터 관련 상태들
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // 선택된 와인 타입
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000000]); // 가격 슬라이더 범위 [최소, 최대]
  const [selectedRatings, setSelectedRatings] = useState<string[]>(['전체']); // 선택된 평점 구간

  // 데이터를 가져오고 필터링하는 공통 함수
  const fetchWinesData = async () => {
    try {
      setIsLoading(true);

      // 1. 서버에 전달할 필터 데이터 조립함.
      const params: any = {
        limit: 100,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      // 타입 필터 (배열 중 첫 번째 값을 대문자로 변환해서 전송)
      if (selectedTypes.length > 0) {
        params.type = selectedTypes[0].toUpperCase();
      }

      // 평점 필터 (선택된 범위 중 최소값 추출)
      if (!selectedRatings.includes('전체') && selectedRatings.length > 0) {
        const minRating = Math.min(
          ...selectedRatings.map((r) => parseFloat(r.split(' - ')[0]))
        );
        params.rating = Math.floor(minRating);
      }

      // 2. 서버에서 1차 필터링된 와인 목록을 가져옴.
      const data = await getWines(params);
      const allWines = data.list || [];

      // 3. 가져온 목록 중 이름에 검색어가 포함된 것만 골라냄.
      // 프론트엔드 메모리 상에서 대소문자를 무시하고 필터링함.
      const filtered = allWines.filter((wine: Wine) =>
        wine.name.toLowerCase().includes(keyword.toLowerCase())
      );

      // 4. 최종 결과물을 화면에 그림.
      setWines(filtered);
    } catch (error) {
      // 콘솔 경고 지움.
      // eslint-disable-next-line no-console
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지가 처음 렌더링될 때 전체 목록 불러옴.
  useEffect(() => {
    fetchWinesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // '필터 적용하기' 버튼 클릭 / 검색 창에서 검색 버튼 클릭, 엔터 시 실행되는 핸들러
  const handleApplyFilters = () => {
    fetchWinesData();
  };

  return (
    <div className={styles.container}>
      {/* 수정님이 만드실 슬라이더 영역 */}
      <section className={styles.sliderPlaceholder}>
        {/* 여기에 와인 슬라이더가 들어올 예정 */}
      </section>

      {/* 메인 콘텐츠 영역 */}
      <div className={styles.mainContent}>
        {/* 좌측 필터 영역 */}
        <aside className={styles.filterAside}>
          <div className={styles.filterPlaceholder}>
            {/* 조립한 필터 컴포넌트에 상태 전달 */}
            <WineFilter
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              onApply={handleApplyFilters}
            />
          </div>
        </aside>

        {/* 우측 리스트 영역 */}
        {/* 검색창 영역 */}
        <div className={styles.contentRight}>
          <section className={styles.searchSection}>
            <SearchBar
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)} // 타이핑할 때마다 keyword 상태만 업데이트 (API 호출x)
              onSearchSubmit={handleApplyFilters}
            />
          </section>

          {/* 리스트 영역 */}
          <main className={styles.listSection}>
            {/* 로딩 상태에 따른 조건부 렌더링 */}
            {isLoading ? (
              <div className={styles.loading}>검색 중... 🍷</div>
            ) : (
              <WineListGrid wines={wines} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default WinesList;
