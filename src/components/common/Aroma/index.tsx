import styles from './index.module.css';
import noAromaImg from '@/assets/icons/ic-no-image.svg';
import cn from 'classnames';

const Aromas = [
  {
    id: 'apple',
    label: '사과',
    image: '/public/assets/images/img-variant-apple.png',
  },
  {
    id: 'cherry',
    label: '체리',
    image: '/public/assets/images/img-variant-cherry.png',
  },
  {
    id: 'chocolate',
    label: '초콜렛',
    image: '/public/assets/images/img-variant-chocolate.png',
  },
  {
    id: 'citrus',
    label: '시트러스',
    image: '/public/assets/images/img-variant-citrus.png',
  },
  {
    id: 'coconut',
    label: '코코넛',
    image: '/public/assets/images/img-variant-coconut.png',
  },
  {
    id: 'flower',
    label: '꽃',
    image: '/public/assets/images/img-variant-flower.png',
  },
  {
    id: 'grass',
    label: '풀',
    image: '/public/assets/images/img-variant-grass.png',
  },
  {
    id: 'herb',
    label: '허브',
    image: '/public/assets/images/img-variant-herb.png',
  },
  {
    id: 'mineral',
    label: '미네랄',
    image: '/public/assets/images/img-variant-mineral.png',
  },
  {
    id: 'oak',
    label: '오크',
    image: 'public/assets/images/img-variant-Oak-Cask.png',
  },
  {
    id: 'peach',
    label: '복숭아',
    image: '/public/assets/images/img-variant-peach.png',
  },
  {
    id: 'grape',
    label: '포도',
    image: '/public/assets/images/img-variant-grape.png',
  },
  {
    id: 'toast',
    label: '제빵',
    image: '/public/assets/images/img-variant-toast.png',
  },
  {
    id: 'tropical',
    label: '트로피칼',
    image: '/public/assets/images/img-variant-tropical.png',
  },
  {
    id: 'WetSoil',
    label: '흙',
    image: '/public/assets/images/img-variant-wet soil.png',
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
  const displayAromas = Aromas.filter((aroma) =>
    selectedAromaIds.includes(aroma.id)
  );
  return (
    <div className={styles.reviewAromaWrap}>
      {displayAromas.map((aroma) => (
        <div key={aroma.id} className={styles.reviewAroma}>
          {aroma.label}
        </div>
      ))}
    </div>
  );
}

export function DetailAroma({
  usersCount,
  selectedAromaIds,
}: DetailAromaProps) {
  const displayAromas = Aromas.filter((aroma) =>
    selectedAromaIds.includes(aroma.id)
  );
  return (
    <div className={styles.detailAromaContainer}>
      <div className={styles.detailAromaTop}>
        <p className={styles.title}>어떤 향이 있나요?</p>
        <p className={styles.users}>({usersCount}명 참여)</p>
      </div>
      <div className={cn(styles.detailAromaWrap, styles.emptyWrap)}>
        {displayAromas.length === 0 ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className={cn(styles.detailAroma, styles.empty)}>
              <img src={noAromaImg} alt="no Aroma Img" />
              <span className={styles.label}>-</span>
            </div>
          ))
        ) : (
          <div className={styles.detailAromaWrap}>
            {displayAromas.map((aroma) => (
              <div key={aroma.id} className={styles.detailAroma}>
                <img src={aroma.image} alt={aroma.label} />
                <span className={styles.label}>{aroma.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
