import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import ModalBtn from "@/components/common/Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: ReactNode;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  // 확인 버튼 스타일 제어 (기본: danger)
  confirmVariant?: "danger" | "primary" | "cancel";
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "확인",
  cancelText = "취소",
  confirmVariant = "danger",
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
            <ModalBtn
              color="white"
              size="Btn"
              variant={confirmVariant}
              onClick={onClose}
            >
              {cancelText}
            </ModalBtn>
            <ModalBtn
              color="black"
              size="Btn"
              variant={confirmVariant}
              onClick={onConfirm}
            >
              {confirmText}
            </ModalBtn>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
