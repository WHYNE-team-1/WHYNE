import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "@/apis/Review";
import WineReview from "@/components/WineReview";

function WinesDetail() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  console.log("부모 data:", data);

  useEffect(() => {
    if (!id) return;

    getReviews(id).then(setData);
  }, [id]);
  return (
    <div>
      <div>와인 상세</div>
      <div>{data && <WineReview data={data} />}</div>
    </div>
  );
}

export default WinesDetail;
