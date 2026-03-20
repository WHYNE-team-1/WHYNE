import {
  useEffect,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import closeIcon from "@/assets/icons/ic-close.svg";
import styles from "./index.module.css";

interface ModalProps {
  // 부모 컴포넌트가 모달의 열림/닫힘 상태를 직접 제어한다.
  isOpen: boolean;
  // 닫기 버튼, ESC, 배경 클릭 시 공통으로 호출되는 닫기 핸들러다.
  onClose?: () => void;
  // 모달 본문에 렌더링할 실제 콘텐츠다.
  children?: ReactNode;
  // 오버레이 클릭으로 닫힐지 여부를 제어한다.
  closeOnBackdropClick?: boolean;
}

// 사용처에서 상태를 제어하는 controlled modal 컴포넌트다.
export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdropClick = true,
}: ModalProps) {
  // 모달이 열려 있을 때만 ESC 키로 닫기를 처리한다.
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

  // 닫힌 상태에서는 모달 DOM 자체를 렌더링하지 않는다.
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    if (closeOnBackdropClick) {
      onClose?.();
    }
  };

  // 팝업 내부 클릭이 오버레이 클릭으로 전달되지 않게 막는다.
  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  // body 아래에 직접 렌더링해 부모 레이아웃이나 z-index 영향을 줄인다.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      onKeyDown={(event: ReactKeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
          onClose?.();
        }
      }}
      className={styles.overlay}
    >
      <div onClick={stopPropagation} className={styles.container}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="닫기"
          title="닫기"
        >
          <img src={closeIcon} alt="닫기" className={styles.closeIcon} />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
