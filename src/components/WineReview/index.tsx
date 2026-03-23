import Button from "@/components/common/button";
import StarRating from "@/components/common/StarRating";
import styles from "./index.module.css";
import Modal from "@/components/common/modal";
import { useState } from "react";

type Review = any;

export default function WineReview({ data }: { data: Review | null }) {
  if (!data) return <div>로딩중...</div>;
  const [isOpen, setIsOpen] = useState(false);

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
        // title="리뷰 등록"
        // buttonText="리뷰 등록하기기"
      >
        ㅋㅋㅋ
      </Modal>
    </>
  );
}
