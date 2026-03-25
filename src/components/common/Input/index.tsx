import { useId, forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './index.module.css';
import ErrorIcon from '@/assets/icons/ic-error.svg';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error' | 'modalError';
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, status = 'default', errorMessage, id, className, ...props },
    ref
  ) => {
    const uniqueId = useId();
    const inputId = id || uniqueId;

    const inputStatusClass =
      status === 'error' || status === 'modalError' ? styles.inputError : '';

    return (
      <div className={`${styles.wrapper} ${className || ''}`}>
        {(label || status === 'modalError') && (
          <div className={styles.labelWrapper}>
            {label && (
              <label htmlFor={inputId} className={styles.label}>
                {label}
              </label>
            )}
            {status === 'modalError' && errorMessage && (
              <span className={styles.topErrorMessage}>{errorMessage}</span>
            )}
          </div>
        )}

        <div className={styles.inputContainer}>
          <input
            ref={ref}
            id={inputId}
            className={`${styles.input} ${inputStatusClass}`}
            {...props}
          />

          {(status === 'error' || status === 'modalError') && (
            <img src={ErrorIcon} alt="" className={styles.errorIcon} />
          )}
        </div>

        <div className={styles.errorWrap}>
          {status === 'error' && errorMessage && (
            <span className={styles.bottomErrorMessage}>{errorMessage}</span>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
