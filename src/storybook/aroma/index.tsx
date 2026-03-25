import { ReviewAroma, DetailAroma } from "@/components/common/Aroma";
// import { useState } from "react";

export default function AromaStoryBook() {
  const [usersCount] = useState<number>(0);
  const [selectedAromaIds] = useState<string[]>([]);
  // const [usersCount, setUsersCount] = useState<number>(0);
  // const [selectedAromaIds, setselectedAromaIds] = useState<string[]>([]);

  const usersCount = 0;
  const selectedAromaIds: string[] = [];

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
        <DetailAroma usersCount={32} selectedAromaIds={["cherry", "herb"]} />
        <h2>상세 페이지 - 맛 없을 때</h2>
        <DetailAroma
          usersCount={usersCount}
          selectedAromaIds={selectedAromaIds}
        />
      </div>
    </div>
  );
}
