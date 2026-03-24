import Button from "@/components/common/Button";
import StarRating from "@/components/common/StarRating";
import styles from "./index.module.css";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import Textarea from "@/components/common/Textarea";
import ReviewAromaCheckbox from "@/components/common/ReviewAromaCheckbox";
import WineTasteSlider from "@/components/common/WineTasteSlider";
import { addWineReview } from "@/apis/WineDetail";

type Review = any;

export default function WineReview({ data }: { data: Review | null }) {
  if (!data) return <div>로딩중...</div>;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [aromas, setAromas] = useState<string[]>([]);
  const [rating, setRating] = useState(3);
  const [taste, setTaste] = useState({
    lightBold: 0,
    smoothTannic: 0,
    drySweet: 0,
    softAcidic: 0,
  });

  // WineTasteSlider는 body/tannin/sweetness/acidity 스코어를 요구하므로,
  // WineReview의 맛 필드명과 매핑해서 전달합니다.
  const sliderInitialScores: Record<
    "body" | "tannin" | "sweetness" | "acidity",
    number
  > = {
    body: taste.lightBold,
    tannin: taste.smoothTannic,
    sweetness: taste.drySweet,
    acidity: taste.softAcidic,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!data?.id) return;

    await addWineReview({
      rating,
      lightBold: taste.lightBold,
      smoothTannic: taste.smoothTannic,
      drySweet: taste.drySweet,
      softAcidic: taste.softAcidic,
      aroma: aromas,
      content,
      wineID: data.id,
    });
  }
  const modalButton = (
    <Button color="black" size="stretch" type="submit" form="reviewForm">
      리뷰 남기기
    </Button>
  );
  return (
    <>
      {" "}
      <div className={styles.ratingsWrap}>
        <div className={styles.rating}>
          <StarRating value={data.avgRating} />
        </div>
        <div className={styles.tableBtn}>
          <Button size="stretch">리뷰 남기기</Button>
        </div>
        <div className={styles.ratingDetails}>
          {Object.entries(data.avgRatings as Record<string, number>).map(
            ([key, value]) => (
              <div className={styles.ratingDetail} key={key}>
                <span className={styles.label}>{key}점</span>
                <div className={styles.barbg}>
                  <div
                    className={styles.bar}
                    style={{
                      width:
                        data.reviewCount > 0
                          ? `${(value / data.reviewCount) * 100}%`
                          : "0%",
                    }}
                  ></div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className={styles.basicBtn}>
          <Button size="stretch" onClick={() => setIsOpen(true)}>
            리뷰 남기기
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="리뷰 등록"
        footer={modalButton}
      >
        <form
          className={styles.reviewModal}
          onSubmit={handleSubmit}
          id="reviewForm"
        >
          <div className={styles.reviewTop}>
            <div className={styles.wineInfo}>
              <div className={styles.imgWrap}>
                <img src={data.image} alt={data.image} />
              </div>
              <div className={styles.NameAndRegion}>
                <p className={styles.name}>{data.name}</p>
                <p className={styles.region}>{data.region}</p>
              </div>
            </div>
            <div className={styles.wineRating}>
              <p className={styles.label}>별점 선택</p>
              <StarRating
                mode="interactive"
                size="modal"
                value={rating}
                onChange={(val) => {
                  setRating(val); //
                }}
              />
            </div>
            <div className={styles.wineReview}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="후기를 작성해주세요"
                maxLength={400}
              />
            </div>
          </div>
          <div className={styles.reviewBottom}>
            <div className={styles.taste}>
              <p className={styles.q}>와인 맛은 어땠나요?</p>
              <WineTasteSlider
                initialScores={sliderInitialScores}
                onChange={(scores) => {
                  setTaste({
                    lightBold: scores.body,
                    smoothTannic: scores.tannin,
                    drySweet: scores.sweetness,
                    softAcidic: scores.acidity,
                  });
                }}
              />
            </div>
            <div className={styles.aroma}>
              <p className={styles.q}>기억에 남는 향이 있나요?</p>
              <ReviewAromaCheckbox value={aromas} onChange={setAromas} />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
