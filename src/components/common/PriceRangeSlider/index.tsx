import styles from './index.module.css';
import { Range, getTrackBackground } from 'react-range';

type Props = {
  value: number[];
  onChange: (values: number[]) => void;
  max?: number;
};

export default function PriceRangeSlider({
  value,
  onChange,
  max = 1000000,
}: Props) {
  return (
    <div className={styles.rangeWarp}>
      <output id="output" className={styles.rangeTop}>
        <span>₩ {value[0].toLocaleString()}</span>
        <span>₩ {value[1].toLocaleString()}</span>
      </output>
      <Range
        step={1000} // 이동 단위
        min={0} // 최소값
        max={max} // 최대값
        values={value} // 현재 값 (배열!)
        onChange={onChange} // 변경
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              height: '6px',
              width: '100%',
              background: getTrackBackground({
                values: value,
                colors: [
                  'var(--color-gray-100)',
                  'var(--color-primary-red)',
                  'var(--color-gray-100)',
                ],
                min: 0,
                max: max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              borderRadius: '10px',
              border: '1px solid var(--color-gray-200)',
              backgroundColor: 'var(--color-white)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          ></div>
        )}
      />
    </div>
  );
}
