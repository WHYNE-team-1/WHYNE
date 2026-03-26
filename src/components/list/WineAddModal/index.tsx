import Modal from '@/components/common/Modal';
import styles from './index.module.css';
import { useState } from 'react';
import Button from '@/components/common/Button';
import ImgAddButton from '@/components/common/ImgAddButton';
import Input from '@/components/common/Input';
import WineType from '@/components/common/WineType';

import {
  WINE_TYPE_KEYS,
  type WineTypeKind,
} from '@/constants/WineType.constants';

interface WineTypeProps {
  type: WineTypeKind; // 와인 종류 (상수로 정의해둠.)
  isReadOnly?: boolean; // 읽기 전용(칩 모드)인지 여부 / 칩 모드, 라디오 버튼 모드가 있음.
  isSelected?: boolean; // 현재 선택된 상태인지 여부
  onSelect?: (type: WineTypeKind) => void; // 클릭했을 때 실행할 함수 (어떤 것이 클릭됐는지 전달)
}

/*와인 등록 모달*/
export default function WineAddModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<WineTypeKind | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //나중에 form 데이터 처리
    console.log('와인 등록');
    setIsOpen(false);
  };

  const modalFooter = (
    <Button color="black" size="stretch" type="submit" form="reviewForm">
      와인 등록하기
    </Button>
  );

  return (
    <div>
      <Button color="red" onClick={() => setIsOpen(true)}>
        와인 등록하기
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="와인 등록"
        footer={modalFooter}
      >
        <div className={styles.modalContent}>
          <form
            id="wineAddForm"
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <div className={styles.imageWrapper}>
              <ImgAddButton />
            </div>

            <div className={styles.field}>
              <label htmlFor="name">와인 이름</label>
              <Input />
            </div>
            <div className={styles.field}>
              <label htmlFor="price">가격</label>
              <Input />
            </div>

            <div className={styles.field}>
              <span>타입</span>

              <div style={{ display: 'flex', gap: '12px' }}>
                {WINE_TYPE_KEYS.map((type) => (
                  <WineType
                    key={type}
                    type={type}
                    isSelected={selectedType === type}
                    onSelect={setSelectedType}
                  />
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="origin">원산지</label>
              <Input />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
