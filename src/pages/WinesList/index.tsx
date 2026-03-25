import { getWines, type GetWinesParams } from '@/apis/wine';
import WineListGrid, { type Wine } from '@/components/list/WineListGrid';
import { useEffect, useState } from 'react';

function WinesList() {
  // 서버에서 받아온 와인 목록을 저장할 상태(State)
  const [wines, setWines] = useState<Wine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트가 처음 나타날 때 데이터를 불러오는 함수 실행
  useEffect(() => {
    const fetchWinesData = async () => {
      try {
        setIsLoading(true);

        // API 파라미터 설정 (50개만 먼저 가져와보기)
        const params: GetWinesParams = { limit: 50 };
        const data = await getWines(params);

        // 서버 응답 객체 안의 'list' 배열만 골라내서 저장
        setWines(data.list || []);
      } catch (error) {
        console.error('와인 목록 로드 실패:', error);
      } finally {
        setIsLoading(false); // 성공/실패 상관없이 끝나면 로딩 false
      }
    };

    fetchWinesData();
  }, []);

  // 로딩 중일 때 보여줄 화면
  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        와인 정보를 불러오고 있어요... 🍷
      </div>
    );
  }

  return (
    <div>
      <WineListGrid wines={wines} />
    </div>
  );
}

export default WinesList;
