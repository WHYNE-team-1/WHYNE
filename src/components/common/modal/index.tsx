import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import XBtn2 from "@/components/common/button/IconBtn/XBtn2";
import styles from "./index.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  closeOnBackdropClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdropClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose?.();
    }
  };

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className={styles.overlay}
    >
      <div onClick={stopPropagation} className={styles.container}>
        <div className={styles.button}>
          <XBtn2 onClick={onClose} />
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
