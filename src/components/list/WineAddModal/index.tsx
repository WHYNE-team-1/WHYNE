import Modal from '@/components/common/Modal';
import styles from './index.module.css';
import { useState } from 'react';
import Button from '@/components/common/Button';
import cameraIcon from '@/assets/icons/ic-camera.svg';
import icRed from '@/assets/icons/ic-wine-red.svg';
import icWhite from '@/assets/icons/ic-wine-white.svg';
import icSparkling from '@/assets/icons/ic-wine-sparkling.svg';

/*와인 등록 모달*/
export default function WineAddModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'red' | 'white' | 'sparkling'>('red');

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
              <Button size="image" color="pureLine">
                <img src={cameraIcon} />
              </Button>
            </div>

            <div className={styles.field}>
              <label htmlFor="name">와인 이름</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="와인 이름 입력"
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="price">가격</label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="가격 입력"
              />
            </div>

            <div className={styles.field}>
              <span>타입</span>
              <div className={styles.typeList}>
                <Button
                  color="white"
                  size="wineTypeSelect"
                  leftIcon={<img src={icRed} alt="Red-Wine" />}
                  onClick={() => setType('red')}
                  className="typeButton"
                >
                  Red
                </Button>
                <Button
                  color="white"
                  size="wineTypeSelect"
                  leftIcon={<img src={icWhite} alt="White-Wine" />}
                  onClick={() => setType('white')}
                  className="typeButton"
                >
                  white
                </Button>
                <Button
                  color="white"
                  size="wineTypeSelect"
                  leftIcon={<img src={icSparkling} alt="Sparkling-Wine" />}
                  onClick={() => setType('sparkling')}
                  className="typeButton"
                >
                  sparkling
                </Button>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="origin">원산지</label>
              <input
                id="origin"
                name="origin"
                type="text"
                placeholder="원산지 입력"
              />
            </div>

            <input type="hidden" name="type" value={type} />
          </form>
        </div>
      </Modal>
    </div>
  );
}
