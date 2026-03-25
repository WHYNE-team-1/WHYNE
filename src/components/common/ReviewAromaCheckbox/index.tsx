import styles from './index.module.css';
import cn from 'classnames';

export default function ReviewAromaCheckbox({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (newSelectedScents: string[]) => void;
}) {
  const aromas = [
    { id: 'apple', label: '사과' },
    { id: 'cherry', label: '체리' },
    { id: 'chocolate', label: '초콜렛' },
    { id: 'citrus', label: '시트러스' },
    { id: 'coconut', label: '코코넛' },
    { id: 'flower', label: '꽃' },
    { id: 'grass', label: '풀' },
    { id: 'herb', label: '허브' },
    { id: 'mineral', label: '미네랄' },
    { id: 'oak', label: '오크' },
    { id: 'peach', label: '복숭아' },
    { id: 'grape', label: '포도' },
    { id: 'toast', label: '제빵' },
    { id: 'tropical', label: '트로피칼' },
    { id: 'WetSoil', label: '흙흙' },
  ];

  function handleChange(id: string) {
    const newSelectedAromas = value.includes(id)
      ? value.filter((v) => v !== id)
      : [...value, id];
    onChange(newSelectedAromas); // 부모 컴포넌트의 onChange 핸들러를 호출합니다.
  }
  return (
    <div className={styles.aromaWrap}>
      {aromas.map((aroma) => (
        <label
          key={aroma.id}
          className={cn(
            styles.aroma,
            value.includes(aroma.id) && styles.active // selectedScents 대신 value 사용
          )}
        >
          <input
            type="checkbox"
            checked={value.includes(aroma.id)} // selectedScents 대신 value 사용
            onChange={() => handleChange(aroma.id)}
          />
          {aroma.label}
        </label>
      ))}
    </div>
  );
}
