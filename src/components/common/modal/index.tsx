import { useEffect, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import Button from "@/components/common/Button";
import X from "@/assets/icons/X.svg";

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
          <Button
            onClick={onClose}
            size="X"
            color="pure"
            leftIcon={<img src={X} alt="X" />}
          />
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
}
