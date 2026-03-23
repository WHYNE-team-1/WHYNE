import { useState } from "react";
import ConfirmModal from "@/components/common/ModalConfirm";
import Button from "@/components/common/Button";

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
    <div style={{ padding: "40px" }}>
      <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 700 }}>
        ConfirmModal 컴포넌트 테스트
      </h1>

      {/* 각 모달을 여는 테스트 버튼 영역 */}
      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => setIsDeleteOpen(true)}
          style={{
            border: "none",
            borderRadius: "12px",
            padding: "12px 16px",
            backgroundColor: "#2d3034",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          삭제 컨펌 모달 열기
        </button>
        <button
          type="button"
          onClick={() => setIsNicknameOpen(true)}
          style={{
            border: "none",
            borderRadius: "12px",
            padding: "12px 16px",
            backgroundColor: "#2d3034",
            color: "#ffffff",
            cursor: "pointer",
          }}
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
        confirmButton={
          <Button
            color="black"
            size="Btn"
            onClick={() => {
              alert("삭제 동작이 실행되었습니다.");
              setIsDeleteOpen(false);
            }}
          >
            삭제하기
          </Button>
        }
        cancelButton={
          <Button color="white" size="Btn" onClick={() => setIsDeleteOpen(false)}>
            취소
          </Button>
        }
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
        confirmButton={
          <Button
            color="black"
            size="Btn"
            onClick={() => {
              alert("닉네임 변경 동작이 실행되었습니다.");
              setIsNicknameOpen(false);
            }}
          >
            변경하기
          </Button>
        }
        cancelButton={
          <Button color="white" size="Btn" onClick={() => setIsNicknameOpen(false)}>
            취소
          </Button>
        }
      />
    </div>
  );
}
