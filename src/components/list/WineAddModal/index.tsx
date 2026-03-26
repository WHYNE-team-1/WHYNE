import Modal from '@/components/common/Modal';
import styles from './index.module.css';
import { useState } from 'react';
import Button from '@/components/common/Button';
import ImgAddButton from '@/components/common/ImgAddButton';
import Input from '@/components/common/Input';
import WineType from '@/components/common/WineType';
import { ENV } from '@/apis/env'; /*'@/src/apis/env';*/

import {
  WINE_TYPE_KEYS,
  type WineTypeKind,
} from '@/constants/WineType.constants';

async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`${ENV.API_TEAM_BASE_URL}/images/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  const data = await response.json();
  return data.url;
}

/*와인 등록 모달*/
export default function WineAddModal() {
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

    if (!imageFile) return;

    try {
      const uploadedImageUrl = await uploadImage(imageFile);
      const requestBody = {
        name: name.trim(),
        region: region.trim(),
        image: uploadedImageUrl,
        price: Number(price),
        type: selectedType,
      };

      console.log('등록 요청 데이터:', requestBody);

      const response = await fetch(`${ENV.API_TEAM_BASE_URL}/wines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('와인 등록에 실패했습니다.');
      }

      const newWine = await response.json();
      console.log('등록 성공:', newWine);
      setName('');
      setPrice('');
      setRegion('');
      setSelectedType(null);
      setImageFile(null);
      setImageError(false);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert('와인 등록 중 오류가 발생했습니다.');
    }
  };

  const modalFooter = (
    <Button color="black" size="stretch" type="submit" form="wineAddForm">
      와인 등록하기
    </Button>
  );

  return (
    <div>
      <Button color="red" size="wineAddRed" onClick={() => setIsOpen(true)}>
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
    </div>
  );
}
