import styles from "./index.module.css";
import { Range, getTrackBackground } from "react-range";
import { useState } from "react";

type Props = {
  max?: number;
};

export default function PriceRangeSlider({ max = 1000000 }: Props) {
  const [values, setValues] = useState([0, max]);
  return (
    <div className={styles.rangeWarp}>
      <output id="output" className={styles.rangeTop}>
        <span>₩ {values[0].toLocaleString()}</span>
        <span>₩ {values[1].toLocaleString()}</span>
      </output>
      <Range
        step={1000} // 이동 단위
        min={0} // 최소값
        max={max} // 최대값
        values={values} // 현재 값 (배열!)
        onChange={(values) => setValues(values)} // 변경
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              height: "6px",
              width: "100%",
              background: getTrackBackground({
                values,
                colors: [
                  "var(--color-gray-100)",
                  "var(--color-primary-red)",
                  "var(--color-gray-100)",
                ],
                min: 0,
                max: max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              borderRadius: "10px",
              border: "1px solid var(--color-gray-200)",
              backgroundColor: "var(--color-white)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        )}
      />
    </div>
  );
}
