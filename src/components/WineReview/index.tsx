import Button from "@/components/common/Button";
import StarRating from "@/components/common/StarRating";
import styles from "./index.module.css";
import Modal from "@/components/common/Modal";
import { useState } from "react";
import Textarea from "@/components/common/Textarea";
import ReviewAromaCheckbox from "@/components/common/ReviewAromaCheckbox";
import WineTasteSlider from "../common/WineTasteSlider";

type Review = any;

export default function WineReview({ data }: { data: Review | null }) {
  if (!data) return <div>로딩중...</div>;
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [aromas, setAromas] = useState<string[]>([]);

  const [rating, setRating] = useState(3);

  const modalButton = (
    <Button color="black" size="stretch" type="submit">
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
            <WineTasteSlider />
          </div>
          <div className={styles.aroma}>
            <p className={styles.q}>기억에 남는 향이 있나요?</p>
            <ReviewAromaCheckbox value={aromas} onChange={setAromas} />
          </div>
        </div>
      </Modal>
    </>
  );
}
