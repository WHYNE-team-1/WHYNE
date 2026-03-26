import styles from './index.module.css';
import cn from 'classnames';

export default function ReviewAromaCheckbox({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (newSelectedScents: string[]) => void;
}) {
  // 서버에서 `aroma`에 허용하는 enum 값(대문자)을 그대로 전달합니다.
  // (예: herb는 서버에서 GRASS로 취급되는 것으로 확인됨)
  const aromas = [
    { value: 'APPLE', label: '사과' },
    { value: 'BAKING', label: '제빵' },
    { value: 'BERRY', label: '베리' },
    { value: 'CARAMEL', label: '카라멜' },
    { value: 'CHERRY', label: '체리' },
    { value: 'CHOCOLATE', label: '초콜릿' },
    { value: 'CITRUS', label: '시트러스' },
    { value: 'EARTH', label: '흙' },
    { value: 'FLOWER', label: '꽃' },
    { value: 'GRASS', label: '풀' },
    { value: 'LEATHER', label: '가죽' },
    { value: 'MINERAL', label: '미네랄' },
    { value: 'OAK', label: '오크' },
    { value: 'PEACH', label: '복숭아' },
    { value: 'PEPPER', label: '후추' },
    { value: 'SPICE', label: '향신료' },
    { value: 'TOBACCO', label: '담배' },
    { value: 'TROPICAL', label: '트로피컬' },
    { value: 'VANILLA', label: '바닐라' },
  ];

  function handleChange(selectedValue: string) {
    const newSelectedAromas = value.includes(selectedValue)
      ? value.filter((v) => v !== selectedValue)
      : [...value, selectedValue];
    onChange(newSelectedAromas); // 부모 컴포넌트의 onChange 핸들러를 호출합니다.
  }
  return (
    <div className={styles.aromaWrap}>
      {aromas.map((aroma, idx) => (
        <label
          key={`${aroma.value}_${idx}`}
          className={cn(
            styles.aroma,
            value.includes(aroma.value) && styles.active // selectedScents 대신 value 사용
          )}
        >
          <input
            type="checkbox"
            checked={value.includes(aroma.value)} // selectedScents 대신 value 사용
            onChange={() => handleChange(aroma.value)}
          />
          {aroma.label}
        </label>
      ))}
    </div>
  );
}
