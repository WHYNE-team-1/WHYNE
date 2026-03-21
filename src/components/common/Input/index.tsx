import { useId } from "react";
import type { InputHTMLAttributes } from "react";
import styles from "./index.module.css";
import ErrorIcon from "@/assets/icons/ic-error.svg";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: "default" | "error" | "modalError";
  errorMessage?: string;
}

export default function Input({
  label,
  status = "default",
  errorMessage,
  id,
  className,
  ...props
}: InputProps) {
  const uniqueId = useId();
  const inputId = id || uniqueId;

  const inputStatusClass =
    status === "error" || status === "modalError" ? styles.inputError : "";

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      {(label || status === "modalError") && (
        <div className={styles.labelWrapper}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          )}
          {status === "modalError" && errorMessage && (
            <span className={styles.topErrorMessage}>{errorMessage}</span>
          )}
        </div>
      )}

      <div className={styles.inputContainer}>
        <input
          id={inputId}
          className={`${styles.input} ${inputStatusClass}`}
          {...props}
        />

        {(status === "error" || status === "modalError") && (
          <img src={ErrorIcon} alt="" className={styles.errorIcon} />
        )}
      </div>

      {status === "error" && errorMessage && (
        <span className={styles.bottomErrorMessage}>{errorMessage}</span>
      )}
    </div>
  );
}
