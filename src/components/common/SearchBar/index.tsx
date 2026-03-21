import { useId, type InputHTMLAttributes } from "react";
import styles from "./index.module.css";
import SearchIcon from "@/assets/icons/ic-search.svg";

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement>;

export default function SearchBar({
  id,
  className,
  placeholder = "와인을 검색해 보세요",
  ...props
}: SearchBarProps) {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <div className={styles.searchContainer}>
        <img src={SearchIcon} alt="" className={styles.searchIcon} />

        <input
          id={inputId}
          className={styles.input}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
}
