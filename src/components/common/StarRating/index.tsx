// import React, { useState } from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './index.module.css';
import StarGray from '@/assets/icons/ic-star-gray.svg';
import StarRed from '@/assets/icons/ic-star-red.svg';

const cx = classNames.bind(styles);

const StarIcon = ({ type }: { type: 'filled' | 'empty' }) => {
  const src = type === 'filled' ? StarRed : StarGray;
  return (
    <img
      src={src}
      className={styles.starIcon}
      alt={type === 'filled' ? '별점' : '빈 별'}
    />
  );
};

interface StarRatingProps {
  // 'interactive' = 모달에서만 | 'displayOnly' (나머지 보이는 부분)
  mode?: 'interactive' | 'displayOnly';

  // interactive 모드에서는 초기 선택값, displayOnly 모드에서는 선택,평균 점수
  value?: number;

  // 참여자 수 (displayOnly 모드에서만 사용)
  count?: number;

  // 상세페이지 맨 위 , 리뷰목록 안 , 통계그래프 근처, 모달 안 , 내가 쓴 후기
  size?: 'detail' | 'list' | 'graph' | 'modal' | 'profile';

  // 점수가 변경될 때 실행될 콜백 (interactive 모드 전용)
  onChange?: (rating: number) => void;

  // 5.0 만점 표시여부
  showMaxScore?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({
  mode = 'displayOnly', // 기본값은 표시용
  value = 0, // 기본값 0점
  count = 0,
  size = 'detail', // 기본 크기
  onChange,
  showMaxScore = false,
}) => {
  // 인터랙티브 모드 전용 상태, 사용자가 최종 선택한 점수
  const [selectedValue, setSelectedValue] = useState<number>(
    mode === 'interactive' ? value : 0
  );
  // 인터랙티브 모드 전용 상태, 마우스를 올렸을 때 임시로 보여주는 점수
  const [hoverValue, setHoverValue] = useState<number>(0);

  // 인터랙티브 모드 클릭 핸들러
  const handleStarClick = (rating: number) => {
    if (mode === 'displayOnly') return;
    setSelectedValue(rating);
    onChange?.(rating);
  };

  // 반점 계산
  const renderDisplayStars = () => {
    const stars = [];
    const floorRating = Math.floor(value);
    const hasHalfStar = value - floorRating >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= floorRating) {
        // 꽉 찬 별 starWrapper로 감싸기 ( 사이즈 바뀌는 이슈 있었음)
        stars.push(
          <div key={i} className={styles.starWrapper}>
            <StarIcon type="filled" />
          </div>
        );
      } else if (i === floorRating + 1 && hasHalfStar) {
        // 반점 (이건 원래 잘 되어 있었음)
        stars.push(
          <div key={i} className={styles.starWrapper}>
            <StarIcon type="empty" />
            <div className={styles.halfStarWrapper}>
              <StarIcon type="filled" />
            </div>
          </div>
        );
      } else {
        // 빈 별도 starWrapper로 감싸기
        stars.push(
          <div key={i} className={styles.starWrapper}>
            <StarIcon type="empty" />
          </div>
        );
      }
    }
    return <div className={styles.starsGroup}>{stars}</div>;
  };

  //  인터랙티브 모드 별 렌더링 로직
  const renderInteractiveStars = () => {
    const currentValue = hoverValue || selectedValue;

    return [...Array(5)].map((_, index) => {
      const full = index + 1;
      const half = index + 0.5;

      return (
        <div key={index} className={styles.starWrapper}>
          {/* 별 왼쪽 (0.5) */}
          <div
            className={styles.halfArea}
            onClick={() => handleStarClick(half)}
            onMouseEnter={() => setHoverValue(half)}
            onMouseLeave={() => setHoverValue(0)}
          />

          {/* 별 오른쪽 (1) */}
          <div
            className={styles.halfAreaRight}
            onClick={() => handleStarClick(full)}
            onMouseEnter={() => setHoverValue(full)}
            onMouseLeave={() => setHoverValue(0)}
          />

          {/* 기본 별 */}
          <StarIcon type={currentValue >= full ? 'filled' : 'empty'} />

          {/*  반점 overlay */}
          {currentValue >= half && currentValue < full && (
            <div className={styles.halfStarOverlay}>
              <StarIcon type="filled" />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    // classNames/bind cx를 사용해서 mode와 size에 따라 CSS 클래스를 동적으로 붙여줌
    <div className={cx('container', mode, size)}>
      {/* Display 모드 */}
      {mode === 'displayOnly' && (
        <>
          {renderDisplayStars()}
          <div className={styles.ratingInfo}>
            <span className={styles.scoreText}>
              {value.toFixed(1)}
              {showMaxScore && <span className={styles.maxScore}> / 5.0</span>}
            </span>
            {count > 0 && (
              <span className={styles.countText}>
                {count.toLocaleString()}개의 후기
              </span>
            )}
          </div>
        </>
      )}

      {mode === 'interactive' && renderInteractiveStars()}
    </div>
  );
};

export default StarRating;
