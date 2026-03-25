import { useEffect, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './index.module.css';
import Button from '@/components/common/Button';
import X from '@/assets/icons/X.svg';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  closeOnBackdropClick?: boolean;
  title?: string;
  footer?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  closeOnBackdropClick = true,
  title,
  footer,
}: ModalProps) {
  // 모달이 열려 있을 때만 ESC 키로 닫기 이벤트를 연결한다.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
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
    // 모달은 document.body에 포털로 렌더링해 레이아웃 영향 없이 띄운다.
    <div
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
      className={styles.overlay}
    >
      {/* 내부 클릭이 overlay로 전파되지 않도록 막는다. */}
      <div onClick={stopPropagation} className={styles.container}>
        <div className={styles.button}>
          <Button
            onClick={onClose}
            size="X"
            color="pure"
            leftIcon={<img src={X} alt="X" />}
          />
        </div>
        <div className={styles.modalContent}>
          {title && <h2 className={styles.contentTitle}>{title}</h2>}
          <div className={styles.contentDescription}>{children}</div>
          {footer && <div className={styles.contentButton}>{footer}</div>}
        </div>
      </div>
    </div>,
    document.body
  );
}
