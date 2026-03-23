import { useState } from "react";
import Modal from "@/components/common/modal";
import styles from "@/components/common/modal/index.module.css";
import AddReviewBtn from "@/components/common/Button";

export default function ModalTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Modal 컴포넌트 테스트</h1>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={styles.actionButton}
        >
          모달 열기
        </button>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className={styles.modalContent}>
          <h2 className={styles.contentTitle}>리뷰 등록</h2>
          <div className={styles.contentDescription}>
            <div>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>
                <button type="button">
                  {" "}
                  <span>버튼</span>
                </button>
              </p>
              <p style={{ height: 1200, backgroundColor: "#D1D1D1" }}>
                children 영역입니다.
              </p>
            </div>
          </div>

          <div className={styles.contentButton}>
            <AddReviewBtn
              color="black"
              size="Review"
              onClick={() => {
                alert("리뷰 등록 로직이 들어갈 자리입니다.");
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
