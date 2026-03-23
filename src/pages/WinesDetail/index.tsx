import styels from "./index.module.css";
import ReviewRating from "@/components/WineReview";

function WinesDetail() {
  return (
    <div>
      <div>와인 상세</div>
      <div className={styels.WineReviewWrap}>
        {/* <ReviewList /> */}
        <ReviewRating />
      </div>
    </div>
  );
}

export default WinesDetail;
