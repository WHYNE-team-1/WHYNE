import PriceRangeSlider from "@/components/common/PriceRangeSlider";

export default function PriceRangeSliderStory() {
  return (
    <div style={{ padding: "50px" }}>
      <h1>가격 컴포넌트 테스트</h1>
      <PriceRangeSlider max={100000} />
    </div>
  );
}
