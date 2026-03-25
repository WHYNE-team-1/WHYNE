import styles from './LoginBtn.module.css';

export default function LoginBtn() {
  return (
    <button className={styles.button}>
      <span className={styles.font}>로그인</span>
    </button>
  );
}
