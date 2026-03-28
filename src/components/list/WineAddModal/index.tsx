import Modal from '@/components/common/Modal';
import styles from './index.module.css';
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import ImgAddButton from '@/components/common/ImgAddButton';
import Input from '@/components/common/Input';
import WineType from '@/components/common/WineType';

import {
  WINE_TYPE_KEYS,
  type WineTypeKind,
} from '@/constants/WineType.constants';

/*와인 등록 모달*/
export default function WineAddModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<WineTypeKind | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //나중에 form 데이터 처리
    setIsOpen(false);
  };

  const modalFooter = (
    <Button color="black" size="stretch" type="submit" form="wineAddForm">
      와인 등록하기
    </Button>
  );

  return (
    <div>
      <Button color="red" size="stretch" onClick={() => setIsOpen(true)}>
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

            <div className={styles.origin}>
              <label htmlFor="origin">원산지</label>
              <Input />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
