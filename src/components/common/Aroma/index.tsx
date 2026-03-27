import styles from './index.module.css';
import noAromaImg from '@/assets/icons/ic-no-image.svg';
import cn from 'classnames';
import icArrowDown from '@/assets/icons/ic-arrow-down.svg';
import icArrowUp from '@/assets/icons/ic-arrow-up.svg';
import { useState } from 'react';

const Aromas = [
  {
    id: 'apple',
    value: 'APPLE',
    label: '사과',
    image: '/public/assets/images/img-variant-apple.png',
  },
  {
    id: 'baking',
    value: 'BAKING',
    label: '제빵',
    image: '/public/assets/images/img-variant-toast.png',
  },
  {
    id: 'berry',
    value: 'BERRY',
    label: '베리',
    image: '/public/assets/images/img-variant-grape.png', // 기존 포도 이미지 사용
  },
  {
    id: 'caramel',
    value: 'CARAMEL',
    label: '카라멜',
    image: '/public/assets/images/img-variant-caramel.png', // ❗ 이미지 없음
  },
  {
    id: 'cherry',
    value: 'CHERRY',
    label: '체리',
    image: '/public/assets/images/img-variant-cherry.png',
  },
  {
    id: 'chocolate',
    value: 'CHOCOLATE',
    label: '초콜릿',
    image: '/public/assets/images/img-variant-chocolate.png',
  },
  {
    id: 'citrus',
    value: 'CITRUS',
    label: '시트러스',
    image: '/public/assets/images/img-variant-citrus.png',
  },
  {
    id: 'earth',
    value: 'EARTH',
    label: '흙',
    image: '/public/assets/images/img-variant-wet soil.png',
  },
  {
    id: 'flower',
    value: 'FLOWER',
    label: '꽃',
    image: '/public/assets/images/img-variant-flower.png',
  },
  {
    id: 'grass',
    value: 'GRASS',
    label: '풀',
    image: '/public/assets/images/img-variant-grass.png',
  },
  {
    id: 'leather',
    value: 'LEATHER',
    label: '가죽',
    image: '/public/assets/images/img-variant-leather.png', // ❗ 이미지 없음
  },
  {
    id: 'mineral',
    value: 'MINERAL',
    label: '미네랄',
    image: '/public/assets/images/img-variant-mineral.png',
  },
  {
    id: 'oak',
    value: 'OAK',
    label: '오크',
    image: '/public/assets/images/img-variant-Oak-Cask.png',
  },
  {
    id: 'peach',
    value: 'PEACH',
    label: '복숭아',
    image: '/public/assets/images/img-variant-peach.png',
  },
  {
    id: 'pepper',
    value: 'PEPPER',
    label: '후추',
    image: '/public/assets/images/img-variant-papper.png', // ❗ 이미지 없음
  },
  {
    id: 'spice',
    value: 'SPICE',
    label: '향신료',
    image: '/public/assets/images/img-variant-spice.png', // ❗ 이미지 없음
  },
  {
    id: 'tobacco',
    value: 'TOBACCO',
    label: '담배',
    image: '/public/assets/images/img-variant-tabacco.png', // ❗ 이미지 없음
  },
  {
    id: 'tropical',
    value: 'TROPICAL',
    label: '트로피컬',
    image: '/public/assets/images/img-variant-tropical.png',
  },
  {
    id: 'vanilla',
    value: 'VANILLA',
    label: '바닐라',
    image: '/public/assets/images/img-variant-vanilla.png', // ❗ 이미지 없음
  },
];

type ReviewAromaProps = {
  selectedAromaIds: string[];
};

type DetailAromaProps = {
  usersCount?: number;
  selectedAromaIds: string[];
};

export function ReviewAroma({ selectedAromaIds }: ReviewAromaProps) {
  return (
    <div className={styles.reviewAromaWrap}>
      {selectedAromaIds.map((aromaId, index) => {
        const matched = Aromas.find(
          (item) => item.id.toLowerCase() === aromaId.toLowerCase()
        );

        return (
          <div key={`${index}-${aromaId}`} className={styles.reviewAroma}>
            {matched?.label ?? aromaId}
          </div>
        );
      })}
    </div>
  );
}

export function DetailAroma({
  usersCount,
  selectedAromaIds,
}: DetailAromaProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedSet = new Set(selectedAromaIds.map((id) => id.toLowerCase()));
  const displayAromas = Aromas.filter((aroma) =>
    selectedSet.has(aroma.id.toLowerCase())
  );

  const totalAromasCount = displayAromas.length;
  const hasMore = totalAromasCount > 4;

  const visibleAromas = isExpanded ? displayAromas : displayAromas.slice(0, 4);

  return (
    <div className={styles.detailAromaContainer}>
      <div className={styles.detailAromaTop}>
        <p className={styles.title}>어떤 향이 있나요?</p>
        <p className={styles.users}>({usersCount}명 참여)</p>
      </div>

      <div
        className={cn(styles.detailAromaWrap, {
          [styles.emptyWrap]: totalAromasCount === 0,
        })}
      >
        {totalAromasCount === 0
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={cn(styles.detailAroma, styles.empty)}>
                <img src={noAromaImg} alt="no Aroma Img" />
                <span className={styles.label}>-</span>
              </div>
            ))
          : visibleAromas.map((aroma) => (
              <div key={aroma.id} className={styles.detailAroma}>
                <img src={aroma.image} alt={aroma.label} />
                <span className={styles.label}>{aroma.label}</span>
              </div>
            ))}
      </div>

      {hasMore && (
        <button
          type="button"
          className={styles.expandBtn}
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? '접기' : '더보기'}
        >
          <img
            src={isExpanded ? icArrowUp : icArrowDown}
            alt="펼치기/접기 아이콘"
            className={styles.arrowIcon}
          />
        </button>
      )}
    </div>
  );
}
