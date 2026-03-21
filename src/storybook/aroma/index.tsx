import { ReviewAroma, DetailAroma } from "@/components/common/Aroma";
import { useState } from "react";

export default function AromaStoryBook() {
  const [usersCount, setUsersCount] = useState<number>(10);
  const [selectedAromaIds, setselectedAromaIds] = useState<string[]>([
    "cherry",
    "herb",
  ]);

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
        <ReviewAroma selectedAromaIds={selectedAromaIds} />
      </div>
      <div>
        <h2>상세 페이지 - 맛</h2>
        -
        <DetailAroma
          usersCount={usersCount}
          selectedAromaIds={selectedAromaIds}
        />
      </div>
    </div>
  );
}
