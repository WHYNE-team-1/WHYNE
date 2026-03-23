import {
  useId,
  type InputHTMLAttributes,
  type SubmitEventHandler,
} from "react";
import styles from "./index.module.css";
import IcSearch from "@/assets/icons/ic-search.svg";

export type SearchBarProps = InputHTMLAttributes<HTMLInputElement> & {
  onSearchSubmit?: SubmitEventHandler<HTMLFormElement>;
};

export default function SearchBar({
  id,
  className,
  placeholder = "와인을 검색해 보세요",
  onSearchSubmit,
  ...props
}: SearchBarProps) {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  return (
    <form
      className={`${styles.wrapper} ${className || ""}`}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSearchSubmit) {
          onSearchSubmit(e);
        }
      }}
    >
      <div className={styles.searchContainer}>
        <button type="submit" className={styles.searchButton}>
          <img src={IcSearch} alt="" className={styles.searchIcon} />
        </button>

        <input
          id={inputId}
          className={styles.input}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </form>
  );
}
