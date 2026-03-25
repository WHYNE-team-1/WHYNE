import styles from './index.module.css';
import cn from 'classnames';
import IconRed from '@/assets/icons/ic-wine-red.svg';
import IconWhite from '@/assets/icons/ic-wine-white.svg';
import IconSparkling from '@/assets/icons/ic-wine-sparkling.svg';

export default function FilterTypeCheckbox({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (newSelectedScents: string[]) => void;
}) {
  const types = ['Red', 'White', 'Sparkling'];

  function handleChange(type: string) {
    const newSelectedType = value.includes(type) // 해당 칩의 타입이 이미 선택 되었나?
      ? value.filter((v) => v !== type) // 선택 되었으면 그거 빼고 나머지만 남기고
      : [...value, type]; // 선택 안되었으면 기본 value에 이번에 선택된 것도 추가

    onChange(newSelectedType); // 여기서 그 값을 부모 컴포넌트의 onChange 핸들러 호출합니다.
  }
  return (
    <div className={styles.typeWrap}>
      {types.map((type) => (
        <label
          key={type}
          className={cn(styles.type, value.includes(type) && styles.active)}
        >
          <input
            type="checkbox"
            checked={value.includes(type)}
            onChange={() => handleChange(type)}
          />
          <img
            src={
              type === 'Red'
                ? IconRed
                : type === 'White'
                  ? IconWhite
                  : IconSparkling
            }
            alt="wine icon"
            width="32"
            height="32"
          />
          {type}
        </label>
      ))}
    </div>
  );
}
