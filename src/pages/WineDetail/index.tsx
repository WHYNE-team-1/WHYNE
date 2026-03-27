import { useParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { getWineDetail } from '@/apis/WineDetail';
import { DetailAroma } from '@/components/common/Aroma';
import WineReview from '@/components/WineReview';
import StarRating from '@/components/common/StarRating';
import WineTasteSlider from '@/components/common/WineTasteSlider';
import type { WineDetail } from './WineDetail.types';
import styles from './index.module.css';
import iconRed from '@/assets/icons/ic-wine-red.svg';
import iconWhite from '@/assets/icons/ic-wine-white.svg';
import iconSparkling from '@/assets/icons/ic-wine-sparkling.svg';

// 와인타입 이미지.텍스트 매핑 객체
const WINE_TYPE_MAP: Record<
  string,
  { label: string; image: string; bgImage: string }
> = {
  RED: {
    label: 'Red',
    image: iconRed,
    bgImage: '/assets/images/img-wine-bg-red.svg',
  },
  WHITE: {
    label: 'White',
    image: iconWhite,
    bgImage: '/assets/images/img-wine-bg-white.svg',
  },
  SPARKLING: {
    label: 'Sparkling',
    image: iconSparkling,
    bgImage: '/assets/images/img-wine-bg-sparkling.svg',
  },
};

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

  const currentWineType = wine.type ? wine.type.toUpperCase() : 'RED';
  const typeInfo = WINE_TYPE_MAP[currentWineType];

  return (
    <div className={styles.container}>
      {/* 상단 와인 이미지 , 기본 정보 */}
      <div
        className={styles.topBackground}
        style={{ backgroundImage: `url(${typeInfo.bgImage})` }}
      >
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
              {typeInfo ? (
                <div className={styles.wineTypeChip}>
                  <img
                    src={typeInfo.image}
                    alt={typeInfo.label}
                    className={styles.typeIcon}
                  />
                  <span className={styles.typeLabel}>{typeInfo.label}</span>
                </div>
              ) : (
                <div className={styles.wineTypeChip}>{wine.type}</div>
              )}
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
        <div className={styles.flavorArea}>
          <DetailAroma
            usersCount={wine.reviewCount}
            // 💡 리뷰 목록에서 향(aroma) 데이터만 쏙쏙 뽑아서 중복을 제거한 배열로 만들어 넘겨줍니다!
            selectedAromaIds={
              wine.reviews
                ? Array.from(
                    new Set(wine.reviews.flatMap((review) => review.aroma))
                  )
                : []
            }
          />
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
