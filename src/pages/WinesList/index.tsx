import { useEffect, useState } from 'react';
import { getWines } from '@/apis/wine';
import WineListGrid, { type Wine } from '@/components/list/WineListGrid';
import SearchBar from '@/components/common/SearchBar';
import styles from './index.module.css';
import WineAddModal from '@/components/list/WineAddModal';

function WinesList() {
  const [wines, setWines] = useState<Wine[]>([]); // 화면에 보여줄 와인 목록 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [keyword, setKeyword] = useState(''); // 사용자가 입력 창에 타이핑하는 글자 상태

  // 데이터를 가져오고 필터링하는 공통 함수
  const fetchWinesData = async (searchName: string) => {
    try {
      setIsLoading(true);
      // 1. 서버에는 검색어 없이 전체 데이터를 요청함.
      const data = await getWines({ limit: 100 });
      const allWines = data.list || [];

      // 2. 프론트엔드 메모리 상에서 대소문자를 무시하고 필터링함.
      const filtered = allWines.filter((wine: Wine) =>
        // wine.name(데이터)과 searchName(검색어)을 둘 다 소문자로 바꿔서 비교함.
        wine.name.toLowerCase().includes(searchName.toLowerCase())
      );

      // 3. 필터링된 결과만 화면에 그리도록 상태를 업데이트 함.
      setWines(filtered);
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 처음 진입 시 전체 목록 로드 (검색어 없음)
  useEffect(() => {
    fetchWinesData('');
  }, []);

  // 검색 버튼 클릭 또는 엔터 시 실행
  const handleSearchSubmit = () => {
    fetchWinesData(keyword); // 사용자가 입력창에 쳐둔 keyword 값을 가지고 필터링 함수를 호출함.
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
            필터 & 와인 등록하기 버튼 예정지
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
              onSearchSubmit={handleSearchSubmit}
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
