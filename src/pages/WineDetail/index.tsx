import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWineDetail } from "@/apis/WineDetail";
import WineReview from "@/components/WineReview";

function WineDetail() {
  const { id } = useParams();
  const [wine, setWine] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getWineDetail(id!);
      console.log("와인 데이터:", data);
      setWine(data);
    }

    fetchData();
  }, [id]);

  if (!wine) return <div>로딩중...</div>;

  return (
    <div>
      <div>와인 상세</div>
      <div>
        <WineReview data={wine} />
      </div>
    </div>
  );
}

export default WineDetail;
