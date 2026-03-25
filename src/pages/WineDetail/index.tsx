import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getWineDetail } from '@/apis/WineDetail';
import WineReview from '@/components/WineReview';
import type { WineDetail } from './WineDetail.types';

function WineDetail() {
  const { id } = useParams();
  const [wine, setWine] = useState<WineDetail | null>(null);

  async function fetchData() {
    const data = await getWineDetail(id!);
    setWine(data);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  if (!wine) return <div>로딩중...</div>;

  return (
    <div>
      <div>와인 상세</div>
      <div>
        <WineReview data={wine} onSuccess={fetchData} />
      </div>
    </div>
  );
}

export default WineDetail;
