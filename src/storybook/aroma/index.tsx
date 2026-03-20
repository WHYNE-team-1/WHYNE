import { ReviewAroma, DetailAroma } from "@/components/common/Aroma";

export default function AromaStoryBook() {
  return (
    <div
      style={{
        margin: 24,
        display: "flex",
        gap: 24,
        flexDirection: "column",
      }}
    >
      <div>
        <h2>리뷰 - 맛 </h2>
        -
        <ReviewAroma />
      </div>
      <div>
        <h2>상세 페이지 - 맛</h2>
        -
        <DetailAroma />
      </div>
    </div>
  );
}
