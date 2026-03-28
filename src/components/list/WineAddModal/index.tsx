import Modal from '@/components/common/Modal';
import styles from './index.module.css';
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import ImgAddButton from '@/components/common/ImgAddButton';
import Input from '@/components/common/Input';
import WineType from '@/components/common/WineType';
import { addWine } from '@/apis/WineAdd';
import { uploadWineImage } from '@/apis/WineAdd';
import { useNavigate } from 'react-router-dom';

import {
  WINE_TYPE_KEYS,
  type WineTypeKind,
} from '@/constants/WineType.constants';

/*와인 등록 모달*/
export default function WineAddModal() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  /*폼 입력 데이터 저장 */
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [region, setRegion] = useState('');
  const [selectedType, setSelectedType] = useState<WineTypeKind | null>(null);

  /*입력값 상태관리(에러) */
  const [nameStatus, setNameStatus] = useState<'default' | 'modalError'>(
    'default'
  );
  const [nameError, setNameError] = useState('');
  const [priceStatus, setPriceStatus] = useState<'default' | 'modalError'>(
    'default'
  );
  const [priceError, setPriceError] = useState('');
  const [regionStatus, setRegionStatus] = useState<'default' | 'modalError'>(
    'default'
  );
  const [regionError, setRegionError] = useState('');

  const [imageError, setImageError] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const validateName = () => {
    if (!name.trim()) {
      setNameStatus('modalError');
      setNameError('와인 이름을 입력해주세요.');
      return false;
    }

    setNameStatus('default');
    setNameError('');
    return true;
  };

  const validatePrice = () => {
    if (!price.trim()) {
      setPriceStatus('modalError');
      setPriceError('가격을 입력해주세요.');
      return false;
    }

    if (Number.isNaN(Number(price)) || Number(price) <= 0) {
      setPriceStatus('modalError');
      setPriceError('올바른 가격을 입력해주세요.');
      return false;
    }

    setPriceStatus('default');
    setPriceError('');
    return true;
  };

  const validateRegion = () => {
    if (!region.trim()) {
      setRegionStatus('modalError');
      setRegionError('원산지를 입력해주세요.');
      return false;
    }

    setRegionStatus('default');
    setRegionError('');
    return true;
  };

  const validateImage = () => {
    if (!imageFile) {
      setImageError(true);
      return false;
    }

    setImageError(false);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isNameValid = validateName();
    const isPriceValid = validatePrice();
    const isRegionValid = validateRegion();
    const isImageValid = validateImage();

    if (!selectedType) {
      alert('와인 타입을 선택해주세요.');
      return;
    }

    if (!isNameValid || !isPriceValid || !isRegionValid || !isImageValid) {
      return;
    }

    if (!imageFile) {
      alert('이미지를 업로드해주세요.');
      return;
    }

    try {
      //1.이미지 업로드
      const imageUrl = await uploadWineImage(imageFile);

      //2. 와인 등록
      const result = await addWine({
        name,
        price: Number(price),
        region,
        type: selectedType,
        image: imageUrl,
      });

      console.log(result);
      alert('와인이 등록되었습니다.');

      //해당 와인 상세 페이지로 이동
      navigate(`/wines/${result.id}`);
    } catch (error) {
      console.error('와인 등록 실패: ', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('와인 등록에 실패했습니다.');
      }
    }

    //나중에 form 데이터 처리
    setIsOpen(false);
  };

  const modalFooter = (
    <Button color="black" size="stretch" type="submit" form="wineAddForm">
      와인 등록하기
    </Button>
  );

  return (
    <>
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
              <ImgAddButton
                error={imageError}
                onChangeFile={(file) => {
                  setImageFile(file);
                  setImageError(false);
                }}
              />
            </div>

            <div className={styles.field}>
              <Input
                id="name"
                name="name"
                label="와인 이름"
                placeholder="와인 이름을 입력해주세요."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameStatus === 'modalError') {
                    setNameStatus('default');
                    setNameError('');
                  }
                }}
                onBlur={validateName}
                status={nameStatus}
                errorMessage={nameError}
              />
            </div>
            <div className={styles.field}>
              <Input
                id="price"
                name="price"
                label="가격"
                type="number"
                placeholder="가격을 입력해 주세요"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (priceStatus === 'modalError') {
                    setPriceStatus('default');
                    setPriceError('');
                  }
                }}
                onBlur={validatePrice}
                status={priceStatus}
                errorMessage={priceError}
              />
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
              <Input
                id="region"
                name="region"
                label="원산지"
                placeholder="원산지를 입력해 주세요"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  if (regionStatus === 'modalError') {
                    setRegionStatus('default');
                    setRegionError('');
                  }
                }}
                onBlur={validateRegion}
                status={regionStatus}
                errorMessage={regionError}
              />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
