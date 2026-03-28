import Button from '@/components/common/Button';
import FilterIcon from '@/assets/icons/ic-filter.svg';
import { useEffect, useState } from 'react';
import { useWineStore } from '@/store/useWineStore';
import styles from './index.module.css';
import Modal from '@/components/common/Modal';
import WineFilter from '../WineFilter';

interface WineFilterModalProps {
  onApply: () => void; // 필터 적용 시 서버 데이터를 다시 불러오는 함수
}

function WineFilterModal({ onApply }: WineFilterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { resetFilters } = useWineStore(); // zustand에서 초기화 함수 가져오기

  // 모달 오픈 시 뒷배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트가 언마운트될 때 혹시 모르니 스크롤을 다시 풀어줌.
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 필터 적용 버튼 핸들러
  const handleApply = () => {
    onApply(); // 부모(WinesList)의 데이터 페칭 함수 실행
    setIsOpen(false); // 모달 닫기
  };

  // 초기화 버튼 핸들러
  const handleReset = () => {
    resetFilters(); // 필터 상태 리셋
  };

  const modalFooter = (
    <div className={styles.modalFooter}>
      <Button color="black" size="stretch" onClick={handleApply}>
        필터 적용하기
      </Button>
      <Button color="white" size="stretch" onClick={handleReset}>
        초기화
      </Button>
    </div>
  );

  return (
    <>
      {/* 태블릿/모바일에서 보일 필터 버튼 */}
      <Button
        color="pureLine"
        size="iconBtn"
        onClick={() => setIsOpen(true)}
        leftIcon={<img src={FilterIcon} alt="필터 아이콘" />}
      />

      {/* 필터 모달 */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="필터"
        footer={modalFooter}
      >
        <div className={styles.modalMain}>
          {/* isModalMode={true}를 줘서 내부의 중복된 '필터 적용하기' 버튼을 숨김. */}
          <WineFilter onApply={handleApply} isModalMode={true} />
        </div>
      </Modal>
    </>
  );
}

export default WineFilterModal;
