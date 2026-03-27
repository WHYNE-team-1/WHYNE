import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getWineDetail } from '@/apis/WineDetail';

import WineReview from '@/components/WineReview';
import StarRating from '@/components/common/StarRating';
import WineTasteSlider from '@/components/common/WineTasteSlider';
import type { WineDetail } from './WineDetail.types';
import styles from './index.module.css';

/* 임시 더미
const DUMMY_WINE: WineDetail = {
  id: 1,
  name: 'Sentinel Carbernet Sauvignon 2016',
  region: 'Western Cape, South Africa',
  image:
    'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=400&auto=format&fit=crop',
  price: 64990,
  type: 'Red',
  avgRating: 4.1, // 평균 별점
  reviewCount: 5446, // 리뷰 개수
  userId: 2930,
  recentReview: {
    
  } as any,
  avgRatings: { 1: 0, 2: 0, 3: 0, 4: 1, 5: 0 },
  reviews: [],
};
*/

function WineDetailPage() {
  const { id } = useParams();
  const [wine, setWine] = useState<WineDetail | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      const data = await getWineDetail(id);
      if (data) {
        setWine(data);
      } else {
        console.error(
          '와인 정보를 가져오지 못했습니다.' // (로그인 토큰 확인 필요)
        );
        // 나중에 필요하면 여기서 로그인 필요 모달이나 로그인 페이지로 이동
      }
    } catch (error) {
      console.error('데이터 불러오기 실패', error);
    }
  }, [id]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!wine) {
    return <div>로딩중...</div>;
  }

  return (
    <div className={styles.container}>
      {/* 상단 와인 이미지 , 기본 정보 */}
      <div className={styles.topBackground}>
        <section className={styles.topSection}>
          <div className={styles.imageWrapper}>
            <img
              src={wine.image}
              alt={wine.name}
              className={styles.wineImage}
            />
          </div>

          <div className={styles.infoWrapper}>
            <div className={styles.infoGroup}>
              <div className={styles.wineTypeChip}>{wine.type}</div>
              <h1 className={styles.wineName}>{wine.name}</h1>
              <p className={styles.wineRegion}>{wine.region}</p>

              <div className={styles.ratingGroup}>
                <StarRating value={wine.avgRating} count={wine.reviewCount} />
              </div>
            </div>

            <div className={styles.price}>{wine.price.toLocaleString()}원</div>
          </div>
        </section>
      </div>

      {/* 어떤 맛/향이 나나요? */}
      <section className={styles.middleSection}>
        {/* 맛 */}
        <div className={styles.tasteArea}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>어떤 맛이 나나요?</h3>
            {/* 리뷰개수로 카운팅? */}
            <span className={styles.participantCount}>
              ({wine.reviewCount}명 참여)
            </span>
          </div>

          <div className={styles.tasteSliders}>
            <WineTasteSlider
              variant="row"
              labelStyle="box"
              readOnly={true} // 보기 전용
              hideLeftDesc={true} // 왼쪽 숨김
              initialScores={{
                // 임시
                lightBold: 4,
                smoothTannic: 4,
                drySweet: 4,
                softAcidic: 4,
              }}
            />
          </div>
        </div>

        {/* 향 */}
        <div className={styles.flavorArea}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>어떤 향이 있나요?</h3>
            <span className={styles.participantCount}>
              ({wine.reviewCount}명 참여)
            </span>
          </div>

          <div className={styles.flavorIcons}>
            {/* 나중에 실제로 교체 */}
            <div className={styles.flavorItem}>🍒 체리</div>
            <div className={styles.flavorItem}>🍊 시트러스</div>
            <div className={styles.flavorItem}>🍫 초콜릿</div>
            <div className={styles.flavorItem}>🪵 오크</div>
          </div>
        </div>
      </section>

      <hr className={styles.divider} />

      {/* 리뷰 영역 */}
      <div className={styles.reviewWrap}>
        <WineReview data={wine} onSuccess={fetchData} />
      </div>
    </div>
  );
}

export default WineDetailPage;
