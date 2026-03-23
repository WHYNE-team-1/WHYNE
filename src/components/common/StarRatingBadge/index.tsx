import React from 'react';
import styles from './index.module.css';
import StarRed from '@/assets/icons/ic-star-red.svg'; // ⭐️ 경로가 맞는지 확인해 주세요!

interface RatingBadgeProps {
  rating: number; // 예: 4.5
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
  return (
    <div className={styles.badge}>
      <img src={StarRed} alt="별점" className={styles.starIcon} />
      <span className={styles.ratingText}>{rating.toFixed(1)}</span>
    </div>
  );
}