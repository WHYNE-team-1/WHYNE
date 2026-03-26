import { useState } from 'react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Dropdown from '@/components/common/Dropdown';
import IcHamburger from '@/assets/icons/ic-hamburger.svg';
import type { DropdownOption } from '@/components/common/Dropdown';
import styles from './myWines.module.css';
import ImgAddButton from '@/components/common/ImgAddButton';
import Input from '@/components/common/Input';

export type MyWineItem = {
  id: number;
  name: string;
  region: string;
  price: string;
  status: string;
};

const DEFAULT_WINE_IMAGE = '/assets/images/img-productImage-01.png';

type MyWinesProps = {
  items: MyWineItem[];
  isLoading?: boolean;
  errorMessage?: string | null;
};

export default function MyWines({
  items,
  isLoading = false,
  errorMessage = null,
}: MyWinesProps) {
  // 수정 중인 와인과 모달 입력값을 함께 관리한다.
  const [editingWine, setEditingWine] = useState<MyWineItem | null>(null);
  const [modalName, setModalName] = useState('');
  const [modalNameStatus, setModalNameStatus] = useState<
    'default' | 'modalError'
  >('default');
  const [modalNameError, setModalNameError] = useState('');
  const [modalPrice, setModalPrice] = useState('');
  const [modalPriceStatus, setModalPriceStatus] = useState<
    'default' | 'modalError'
  >('default');
  const [modalPriceError, setModalPriceError] = useState('');

  // 모달을 닫을 때 입력값과 에러 상태도 함께 초기화한다.
  const handleCloseModal = () => {
    setEditingWine(null);
    setModalName('');
    setModalNameStatus('default');
    setModalNameError('');
    setModalPrice('');
    setModalPriceStatus('default');
    setModalPriceError('');
  };

  // 드롭다운에서 수정하기를 누르면 선택한 와인 값으로 모달을 채운다.
  const handleOpenEditModal = (wine: MyWineItem) => {
    setEditingWine(wine);
    setModalName(wine.name);
    setModalNameStatus('default');
    setModalNameError('');
    setModalPrice(wine.price);
    setModalPriceStatus('default');
    setModalPriceError('');
  };

  const handleModalNameBlur = () => {
    if (modalName.trim() === '') {
      setModalNameStatus('modalError');
      setModalNameError('이름을 입력해주세요');
    } else {
      setModalNameStatus('default');
      setModalNameError('');
    }
  };

  const handleModalPriceBlur = () => {
    if (modalPrice.trim() === '') {
      setModalPriceStatus('modalError');
      setModalPriceError('가격을 입력해주세요');
    } else {
      setModalPriceStatus('default');
      setModalPriceError('');
    }
  };

  const footer = (
    <Button
      color="black"
      size="stretch"
      type="button"
      onClick={handleCloseModal}
    >
      와인 등록하기
    </Button>
  );

  if (isLoading) {
    return (
      <div className={styles.panel} role="tabpanel">
        <p className={styles.cardMeta}>등록 와인 정보를 불러오는 중입니다.</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className={styles.panel} role="tabpanel">
        <p className={styles.cardMeta}>{errorMessage}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.panel} role="tabpanel">
        <p className={styles.cardMeta}>등록한 와인이 아직 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.panel} role="tabpanel">
        {items.map((wine) => {
          const { id, name, region, price } = wine;
          // 카드마다 개별 액션을 연결한다.
          const editOptions: DropdownOption[] = [
            {
              label: '수정하기',
              onClick: () => handleOpenEditModal(wine),
            },
            {
              label: '삭제하기',
              onClick: () => alert('삭제되었습니다.'),
            },
          ];

          return (
            <article key={id} className={styles.wineCard}>
              <div className={styles.wineInfo}>
                <div className={styles.reviewInfo}>
                  <div className={styles.cardImgWrapper}>
                    <img
                      src={DEFAULT_WINE_IMAGE}
                      alt={`${name} 이미지`}
                      className={styles.productImage}
                    />
                  </div>
                </div>
                <div className={styles.cardTextWrapper}>
                  <h3 className={styles.cardTitle}>{name}</h3>
                  <p className={styles.cardMeta}>{region}</p>
                  <strong className={styles.cardTitle}>{price}</strong>
                  <div className={styles.dropdownWrapper}>
                    <Dropdown
                      trigger={
                        <img
                          src={IcHamburger}
                          alt="더보기 메뉴 열기"
                          style={{
                            width: '24px',
                            height: '24px',
                            display: 'block',
                          }}
                        />
                      }
                      options={editOptions}
                      offset={26}
                    />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <Modal
        isOpen={editingWine !== null}
        onClose={handleCloseModal}
        title="와인 수정"
        footer={footer}
      >
        {/* 선택한 와인이 있을 때만 수정 폼을 노출한다. */}
        {editingWine && (
          <div>
            <ImgAddButton />
            <Input
              label="와인 이름"
              placeholder="와인 이름을 입력"
              value={modalName}
              onChange={(e) => {
                setModalName(e.target.value);
                if (modalNameStatus === 'modalError') {
                  setModalNameStatus('default');
                  setModalNameError('');
                }
              }}
              onBlur={handleModalNameBlur}
              status={modalNameStatus}
              errorMessage={modalNameError}
            />

            <Input
              label="가격"
              placeholder="가격 입력"
              value={modalPrice}
              onChange={(e) => {
                setModalPrice(e.target.value);
                if (modalPriceStatus === 'modalError') {
                  setModalPriceStatus('default');
                  setModalPriceError('');
                }
              }}
              onBlur={handleModalPriceBlur}
              status={modalPriceStatus}
              errorMessage={modalPriceError}
            />
          </div>
        )}
      </Modal>
    </>
  );
}
