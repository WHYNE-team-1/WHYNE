import { useState } from 'react';
import MyWines from './MyWines';
import { myReviewCount, registeredWineItems } from './mock';
import styles from './myReviews.module.css';

type TabKey = 'reviews' | 'wines';

const tabs = [
  { key: 'reviews' as const, label: '내가 쓴 후기', count: myReviewCount },
  {
    key: 'wines' as const,
    label: '나의 등록 와인',
    count: registeredWineItems.length,
  },
];

export default function MyReviews() {
  // 선택한 탭에 따라 후기 영역과 등록 와인 영역을 전환한다.
  const [activeTab, setActiveTab] = useState<TabKey>('reviews');

  return (
    <section className={styles.section}>
      {/* 프로필 활동 탭 버튼 목록 */}
      <div
        className={styles.tabList}
        role="tablist"
        aria-label="프로필 활동 탭"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span>{tab.label}</span>
              <strong>{tab.count}</strong>
            </button>
          );
        })}
      </div>

      {/* 현재는 후기 탭은 placeholder만 두고, 등록 와인 탭만 실제 컴포넌트를 연결했다. */}
      {activeTab === 'reviews' ? (
        <div className={styles.panel} role="tabpanel">
          <p className={styles.cardMeta}>내가 쓴 후기 영역</p>
        </div>
      ) : (
        <MyWines items={registeredWineItems} />
      )}
    </section>
  );
}
