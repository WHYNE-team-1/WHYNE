import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

export default function ModalTestPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>
        Modal 컴포넌트 테스트
      </h1>

      <div style={{ marginTop: 20 }}>
        <Button color="black" size="Btn" onClick={() => setIsOpen(true)}>
          모달 열기
        </Button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="기본 모달"
        footer={
          <Button color="black" size="Btn" onClick={() => setIsOpen(false)}>
            닫기
          </Button>
        }
      >
        <p style={{ margin: 0 }}>
          공통 Modal 컴포넌트 동작을 확인하는 테스트 페이지입니다.
        </p>
      </Modal>
    </div>
  );
}
