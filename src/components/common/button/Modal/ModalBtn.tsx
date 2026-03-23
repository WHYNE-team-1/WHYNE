import styles from "./ModalBtn.module.css";

type Props = {
  variant?: "cancel" | "primary" | "danger";
  children: React.ReactNode; //컴포넌트 태그 사이에 들어가는 내용을 받음
  onClick?: () => void;
};

export default function ModalBtn({
  variant = "primary",
  children,
  onClick,
}: Props) {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
}
