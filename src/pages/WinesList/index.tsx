import { useEffect, useState } from 'react';
import { getWines, type GetWinesParams } from '@/apis/wine';
import WineListGrid, { type Wine } from '@/components/list/WineListGrid';
import SearchBar from '@/components/common/SearchBar';
import WineFilter from '@/components/list/WineFilter';
import styles from './index.module.css';
import WineAddModal from '@/components/list/WineAddModal';
import RecommendedWineSlider from '@/components/list/WineSlider';

function WinesList() {
  const [allWines2, setAllWines2] = useState<Wine[]>(
    []
  ); /*와인 추천 슬라이더 전용 지역변수*/

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
      const params: GetWinesParams = {
        limit: 100,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      };

      // 2. 서버에서 가격 범위에 맞는 와인 목록을 먼저 가져옴.
      const data = await getWines(params);
      const allWines = data.list || [];

      setAllWines2(allWines); /**전체 wine리스트 try구문 밖으로 빼는 용 */

      // 3. 이름 검색어, 평점 구간, 와인 타입을 동시에 골라냄.
      const filtered = allWines.filter((wine: Wine) => {
        // 이름 검색 확인: 서버 API는 대소문자를 엄격하게 구별해서, 프론트에서 대소문자를 무시하게 함.
        const isMatchName = wine.name
          .toLowerCase()
          .includes(keyword.toLowerCase());

        // 와인 타입 확인: 서버 API는 단일 타입 선택만 지원해서, 프론트에서 다중 선택 기능을 구현함.
        // 아무것도 선택하지 않았으면 모든 타입을 보여줌.
        const isMatchType =
          selectedTypes.length === 0 ||
          selectedTypes.some((type) => type.toUpperCase() === wine.type);

        // 평점 확인 : 서버 API는 단일 평점 선택만 지원해서, 프론트에서 다중 선택 기능을 구현함.
        if (selectedRatings.includes('전체') || selectedRatings.length === 0) {
          return isMatchName && isMatchType; // 평점이 전체면 이름과 타입만 맞으면 통과
        }

        // 선택된 평점 범위들 중 하나라도 해당되는지 확인
        const isMatchRating = selectedRatings.some((rangeText) => {
          // '3.1 - 4.0' 문자열을 숫자 3.1과 4.0으로 분리
          const [min, max] = rangeText.split(' - ').map(parseFloat);
          // 와인의 평균 평점이 해당 범위 안에 있는지 확인
          return wine.avgRating >= min && wine.avgRating <= max;
        });

        // 이름과 평점 조건이 모두 맞아야 최종 리스트에 포함됨.
        return isMatchName && isMatchType && isMatchRating;
      });

      // 4. 최종 결과물을 화면에 그림.
      setWines(filtered);
    } catch (error) {
      // eslint 무시 주석 추가
      // eslint-disable-next-line no-console
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지가 처음 렌더링될 때 전체 목록 불러옴.
  useEffect(() => {
    fetchWinesData();
    // 의존성 배열을 비워둠으로써 실시간이 아닌 직접 호출 시에만 실행되도록 함.
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
        <RecommendedWineSlider wines={winesForSlider} />
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
            <WineAddModal />
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
