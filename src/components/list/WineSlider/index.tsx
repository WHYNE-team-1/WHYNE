// RecommendedWineSlider.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import styles from './index.module.css';
import { Link } from 'react-router-dom';

type Wine = {
  id: number;
  name: string;
  image: string;
  region?: string;
  country?: string;
  avgRating: number;
  price?: number;
};

type Props = {
  wines: Wine[];
};

export default function RecommendedWineSlider({ wines }: Props) {
  // 평점 4.3 초과인 와인만
const HIGH_RATING_THRESHOLD = 4.3;

// ... 컴포넌트 내부
const highRatedWines = wines.filter((wine) => wine.avgRating > HIGH_RATING_THRESHOLD);

  if (highRatedWines.length === 0) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>이번 달 추천 와인</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {highRatedWines.map((wine) => (
          <SwiperSlide key={wine.id}>
            <Link to={`/wines/${wine.id}`} className={styles.card}>
              <div className={styles.imageWrap}>
                <img
                  src={wine.image}
                  alt={wine.name}
                  className={styles.image}
                />
              </div>

              <p className={styles.name}>{wine.name}</p>
              <p className={styles.sub}>
                {[wine.region, wine.country].filter(Boolean).join(', ')}
              </p>
              <p className={styles.rating}>⭐ {wine.avgRating.toFixed(1)}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
