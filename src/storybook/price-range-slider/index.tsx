import PriceRangeSlider from '@/components/common/PriceRangeSlider';
import { useState } from 'react';

export default function PriceRangeSliderStory() {
  const [values, setValues] = useState([0, 100000]);
  return (
    <div style={{ padding: '50px' }}>
      <h1>가격 컴포넌트 테스트</h1>
      <PriceRangeSlider value={values} onChange={setValues} max={100000} />
    </div>
  );
}
