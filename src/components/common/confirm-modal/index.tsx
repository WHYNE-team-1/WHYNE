import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";

interface ConfirmModalProps {
  // 부모 컴포넌트가 열림/닫힘 상태를 직접 제어한다.
  isOpen: boolean;
  // 취소 버튼, ESC, 배경 클릭 시 호출된다.
  onClose: () => void;
  // 확인 버튼 클릭 시 호출된다.
  onConfirm: () => void;
  // 모달 상단에 표시할 제목이다.
  title?: ReactNode;
  // 제목 아래에 표시할 설명 텍스트다.
  description?: string;
  // 확인 버튼 라벨 (기본값: "확인")
  confirmText?: string;
  // 취소 버튼 라벨 (기본값: "취소")
  cancelText?: string;
}

// 확인/취소 두 버튼이 고정된 컨펌 모달 컴포넌트다.
// 공용 모달 CSS 의존 없이 confirm-modal 전용 CSS만 사용한다.
export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className={styles.overlay}
    >
      <div onClick={stopPropagation} className={styles.container}>
        <div className={styles.content}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
          <div className={styles.buttons}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={styles.confirmButton}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
