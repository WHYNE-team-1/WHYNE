import { useState } from 'react';
import StarRating from '@/components/common/StarRating';
import StarRatingBadge from '@/components/common/StarRatingBadge';

export default function StarRatingTestPage() {

  const [rating, setRating] = useState(3);

  return (
    <div style={{ padding: '40px' }}>
  


      <h3> 와인 상세페이지 </h3>
      <StarRating mode="displayOnly" size="detail" value={rating} count={128} />

      <div style={{ height: '40px' }} />

      <h3> 중간 리뷰 목록 안 </h3>
      <StarRating mode="displayOnly" size="list" value={rating} count={42} />

      <div style={{ height: '40px' }} />


      <h3> 만점 5.0 표시 </h3>
      <StarRating 
        mode="displayOnly" 
        size="graph" 
        value={rating} 
        showMaxScore={true}
      />

      <h3> 유저 리뷰 뱃지 (StarRatingBadge) </h3>
      <StarRatingBadge rating={rating} />

      <div style={{ height: '40px' }} />
      <h3> 리뷰 남기기 모달 </h3>
      
      <StarRating
        mode="interactive"
        size="modal"
        value={rating}
        onChange={(val) => {
          setRating(val); // 
        }}
      />

      <p>
        현재 선택된 값: {rating}
      </p>
    </div>
  );
}
