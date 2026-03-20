import styles from "./index.module.css";
import cn from "classnames";

export default function FilterRatingCheckbox({
  value = [],
  onChange,
}: {
  value: string[];
  onChange: (newSelectedRatings: string[]) => void;
}) {
  const ratings = [
    "전체",
    "4.1 - 5.0",
    "3.1 - 4.0",
    "2.1 - 3.0",
    "1.1 - 2.0",
    "0.1 - 1.0",
  ];

  function handleChange(rating: string) {
    if (rating === "전체") {
      onChange(["전체"]);
      return;
    }
    const newValues = value.includes(rating)
      ? value.filter((v) => v !== rating)
      : [...value.filter((v) => v !== "전체"), rating];

    if (newValues.length === 0) {
      onChange(["전체"]);
      return;
    }
    onChange(newValues);
  }

  return (
    <div className={styles.ratingWrap}>
      {ratings.map((rating) => (
        <label
          key={rating}
          className={cn(styles.rating, value.includes(rating) && styles.active)}
        >
          <input
            type="checkbox"
            checked={value.includes(rating)}
            onChange={() => handleChange(rating)}
          />
          <span className={styles.checkboxBorder}>
            <span className={styles.checkboxChecker}></span>
          </span>
          {rating}
        </label>
      ))}
    </div>
  );
}
