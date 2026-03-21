import { WINE_TYPES, type WineTypeKind } from '@/constants/WineType.constants';
import styles from './index.module.css';

interface WineTypeProps {
  type: WineTypeKind; // 와인 종류 (상수로 정의해둠.)
  isReadOnly?: boolean; // 읽기 전용(칩 모드)인지 여부 / 칩 모드, 라디오 버튼 모드가 있음.
  isSelected?: boolean; // 현재 선택된 상태인지 여부
  onSelect?: (type: WineTypeKind) => void; // 클릭했을 때 실행할 함수 (어떤 것이 클릭됐는지 전달)
}

export default function WineType({ 
  type, 
  isReadOnly = false, // 기본값은 라디오 버튼 모드
  isSelected = false, // 기본값은 미선택 상태
  onSelect
}: WineTypeProps) {
  const info = WINE_TYPES[type]; // WINE_TYPES 객체에서 현재 type(예: 'RED')에 맞는 정보(이미지, 라벨)를 꺼냄.

  // 조건에 따라 적용할 CSS 클래스 이름들 (기본 스타일, 칩 모드일 때 readOnly 클래스 추가, 선택 상태일 때 selected 클래스 추가)
  const containerClass = `
    ${styles.wrapper} 
    ${isReadOnly ? styles.readOnly : ''} 
    ${isSelected ? styles.selected : ''}
  `;

  return (
    <label 
      className={containerClass}
      // 칩 모드가 아니라면 클릭 시 onSelect 함수 실행
      onClick={() => !isReadOnly && onSelect?.(type)}
    >
      {/* 라디오 버튼일 때 */}
      {!isReadOnly && (
        <input 
          type="radio" 
          checked={isSelected} 
          className={styles.hiddenInput} 
          readOnly 
        />
      )}
      <img src={info.image} alt={info.label} className={styles.icon} />
      <span className={styles.label}>{info.label}</span>
    </label>
  );
}