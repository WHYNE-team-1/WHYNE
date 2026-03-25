import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getWineDetail } from '@/apis/WineDetail';
import WineReview from '@/components/WineReview';
import type { WineDetail } from './WineDetail.types';
import styles from './index.module.css';

function WineDetail() {
  const { id } = useParams();
  const [wine, setWine] = useState<WineDetail | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) {
      return;
    }
    const data = await getWineDetail(id);
    setWine(data);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!wine) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <div>와인 상세</div>
      <div className={styles.reviewWrap}>
        <WineReview data={wine} onSuccess={fetchData} />
      </div>
    </div>
  );
}

export default WineDetail;
