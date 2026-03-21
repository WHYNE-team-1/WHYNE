import { useState } from "react";
import ConfirmModal from "@/components/common/confirm-modal";
import styles from "@/components/common/confirm-modal/index.module.css";

// 부모에서 닉네임을 전달받기 위한 props 타입
type ConfirmModalTestPageProps = {
  nickname?: string;
};

export default function ConfirmModalTestPage({
  // 닉네임이 전달되지 않으면 기본값 사용
  nickname = "와인고르는 중",
}: ConfirmModalTestPageProps) {
  // 삭제 확인 모달 열림/닫힘 상태
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // 닉네임 변경 확인 모달 열림/닫힘 상태
  const [isNicknameOpen, setIsNicknameOpen] = useState(false);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>ConfirmModal 컴포넌트 테스트</h1>

      {/* 각 모달을 여는 테스트 버튼 영역 */}
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

      {/* 삭제 확인 모달 */}
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

      {/* 닉네임 변경 확인 모달 */}
      <ConfirmModal
        isOpen={isNicknameOpen}
        onClose={() => setIsNicknameOpen(false)}
        onConfirm={() => {
          alert("닉네임 변경 동작이 실행되었습니다.");
          setIsNicknameOpen(false);
        }}
        title={
          <>
            "{nickname}"으로 <br /> 닉네임을 변경할까요?
          </>
        }
        confirmText="변경하기"
        cancelText="취소"
      />
    </div>
  );
}
