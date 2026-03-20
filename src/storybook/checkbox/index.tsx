import { useState } from "react";
import ReviewAromaCheckbox from "@/components/common/ReviewAromaCheckbox";
import FilterTypeCheckbox from "@/components/common/FilterTypeCheckbox";
import FilterRatingCheckbox from "@/components/common/FilterRatingCheckbox";

export default function CheckBoxStory() {
  const [types, setTypes] = useState<string[]>([]);
  const [ratings, setRatings] = useState<string[]>([]);
  const [aromas, setAromas] = useState<string[]>([]);

  return (
    <div
      style={{
        margin: 24,
        display: "flex",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <h2>리뷰 - 향</h2>

      <ReviewAromaCheckbox value={aromas} onChange={setAromas} />
      <h2>필터 - 타입</h2>

      <FilterTypeCheckbox value={types} onChange={setTypes} />
      <h2>필터 - 평점</h2>

      <FilterRatingCheckbox value={ratings} onChange={setRatings} />
    </div>
  );
}
