import styles from './index.module.css';

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
  maxLength?: number; // 최대 글자 수
}

export default function Textarea({
  value,
  onChange,
  placeholder,
  name,
  maxLength,
}: TextareaProps) {
  return (
    <div className={styles.container}>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        maxLength={maxLength}
      />
    </div>
  );
}
