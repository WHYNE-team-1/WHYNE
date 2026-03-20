import { useState } from "react";
import ConfirmModal from "@/components/common/confirm-modal";
import styles from "@/components/common/confirm-modal/index.module.css";

export default function ConfirmModalTestPage() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isNicknameOpen, setIsNicknameOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>ConfirmModal 컴포넌트 테스트</h1>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={() => setIsDeleteOpen(true)}
          className={styles.actionButton}
        >
          삭제 컨펌 모달 열기
        </button>
        <button
          type="button"
          onClick={() => setIsNicknameOpen(true)}
          className={styles.actionButton}
        >
          닉네임 변경 컨펌 모달 열기
        </button>
      </div>

      <ConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={() => {
          alert("삭제 동작이 실행되었습니다.");
          setIsDeleteOpen(false);
        }}
        title="정말 삭제하시겠습니까?"
        confirmText="삭제하기"
        cancelText="취소"
      />

      <ConfirmModal
        isOpen={isNicknameOpen}
        onClose={() => setIsNicknameOpen(false)}
        onConfirm={() => {
          alert("닉네임 변경 동작이 실행되었습니다.");
          setIsNicknameOpen(false);
        }}
        title={
          <>
            "와인고르는 중"으로 <br /> 닉네임을 변경할까요?
          </>
        }
        confirmText="변경하기"
        cancelText="취소"
      />
    </div>
  );
}
