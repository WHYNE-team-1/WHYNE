import { useState } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import IconRed from "@/assets/icons/ic-wine-red.svg";
import IconWhite from "@/assets/icons/ic-wine-white.svg";
import IconSparkling from "@/assets/icons/ic-wine-sparkling.svg";

export function ReviewScentCheckbox({}) {
  const [selectedScents, setSelectedScents] = useState([]);

  const scents = [
    { id: "apple", label: "사과" },
    { id: "cherry", label: "체리" },
    { id: "chocolate", label: "초콜렛" },
    { id: "citrus", label: "시트러스" },
    { id: "coconut", label: "코코넛" },
    { id: "flower", label: "꽃" },
    { id: "grass", label: "풀" },
    { id: "herb", label: "허브" },
    { id: "mineral", label: "미네랄" },
    { id: "oak", label: "오크" },
    { id: "peach", label: "복숭아" },
    { id: "grape", label: "포도" },
    { id: "toast", label: "제빵" },
    { id: "tropical", label: "트로피칼" },
    { id: "WetSoil", label: "흙흙" },
  ];

  function handleChange(id: string) {
    setSelectedScents((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2>리뷰 - 향</h2>
      <div className={styles.scentWrap}>
        {scents.map((scent) => (
          <label
            key={scent.id}
            className={cn(
              styles.scent,
              selectedScents.includes(scent.id) && styles.active,
            )}
          >
            <input
              type="checkbox"
              checked={selectedScents.includes(scent.id)}
              onChange={() => handleChange(scent.id)}
            />
            {scent.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export function FilterTypeCheckbox({}) {
  const types = ["Red", "White", "Sparkling"];

  const [selectedTypes, setSelectedTypes] = useState([]);

  function handleChange(value: string) {
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2>필터 - 타입</h2>
      <div className={styles.typeWrap}>
        {types.map((type) => (
          <label
            key={type}
            className={cn(
              styles.type,
              selectedTypes.includes(type) && styles.active,
            )}
          >
            <input
              type="checkbox"
              checked={selectedTypes.includes(type)}
              onChange={() => handleChange(type)}
            />
            <img
              src={
                type === "Red"
                  ? IconRed
                  : type === "White"
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
    </div>
  );
}

export function FilterRatingCheckbox({}) {
  const ratings = [
    "전체",
    "4.1 - 5.0",
    "3.1 - 4.0",
    "2.1 - 3.0",
    "1.1 - 2.0",
    "0.1 - 1.0",
  ];

  const [selectedRatings, setSelectedRatings] = useState([]);

  function handleChange(value: string) {
    setSelectedRatings((prev) => {
      // 1️⃣ "전체" 클릭한 경우
      if (value === "전체") {
        return ["전체"]; // 나머지 다 제거하고 전체만
      }

      // 2️⃣ 다른 항목 클릭한 경우
      const newValues = prev.includes(value)
        ? prev.filter((v) => v !== value) // 제거
        : [...prev.filter((v) => v !== "전체"), value]; // "전체" 제거 후 추가

      return newValues;
    });
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2>필터 - 평점</h2>
      <div className={styles.ratingWrap}>
        {ratings.map((rating) => (
          <label
            key={rating}
            className={cn(
              styles.rating,
              selectedRatings.includes(rating) && styles.active,
            )}
          >
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating)}
              onChange={() => handleChange(rating)}
            />
            <span className={styles.checkboxBorder}>
              <span className={styles.checkboxChecker}></span>
            </span>
            {rating}
          </label>
        ))}
      </div>
    </div>
  );
}
