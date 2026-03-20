import { useState } from "react";
import Modal from "@/components/common/modal";
import styles from "@/components/common/modal/index.module.css";

export default function ModalTestPage() {
  // 실제 사용처처럼 부모 컴포넌트가 모달 열림 상태를 관리한다.
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

      {/* children에 전달한 JSX가 모달 본문으로 그대로 렌더링된다. */}
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
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
              <p>children 영역입니다.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              // TODO: 리뷰 등록 API 호출 후 성공 시 setIsOpen(false) 실행
              alert("리뷰 등록 로직이 들어갈 자리입니다.");
            }}
            className={styles.contentButton}
          >
            리뷰 남기기
          </button>
        </div>
      </Modal>
    </div>
  );
}
