import { useState } from "react";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";

export default function ModalTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  const footer = (
    <Button color="black" size="stretch" type="submit">
      리뷰 남기기
    </Button>
  );

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 700 }}>
        Modal 컴포넌트 테스트
      </h1>

      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            border: "none",
            borderRadius: "12px",
            padding: "12px 16px",
            backgroundColor: "#2d3034",
            color: "#ffffff",
            cursor: "pointer",
          }}
        >
          모달 열기
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="리뷰 등록"
        footer={footer}
      >
        <p>children 영역입니다.</p>
      </Modal>
    </div>
  );
}
