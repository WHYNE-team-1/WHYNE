import styles from './myWines.module.css';

export type MyWineItem = {
  id: number;
  name: string;
  region: string;
  price: string;
  status: string;
};

const DEFAULT_WINE_IMAGE = '/assets/images/img-productImage-01.png';

type MyWinesProps = {
  items: MyWineItem[];
  isLoading?: boolean;
  errorMessage?: string | null;
};

export default function MyWines({
  items,
  isLoading = false,
  errorMessage = null,
}: MyWinesProps) {
  if (isLoading) {
    return (
      <div className={styles.panel} role="tabpanel">
        <p className={styles.cardMeta}>등록 와인 정보를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={styles.panel} role="tabpanel">
        <p className={styles.cardMeta}>{errorMessage}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.panel} role="tabpanel">
        <p className={styles.cardMeta}>등록한 와인이 아직 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel} role="tabpanel">
      {items.map((wine) => {
        const { id, name, region, price, status } = wine;

        return (
          <article key={id} className={styles.wineCard}>
            <div className={styles.wineInfo}>
              <div className={styles.reviewInfo}>
                <img
                  src={DEFAULT_WINE_IMAGE}
                  alt={`${name} 이미지`}
                  className={styles.productImage}
                />

                <div>
                  <h3 className={styles.cardTitle}>{name}</h3>
                  <p className={styles.cardMeta}>{region}</p>
                </div>
              </div>
              <strong className={styles.cardTitle}>{price}</strong>
            </div>

            <span className={styles.statusBadge}>{status}</span>
          </article>
        );
      })}
    </div>
  );
}
