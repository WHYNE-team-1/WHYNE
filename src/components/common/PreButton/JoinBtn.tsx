import styles from './JoinBtn.module.css';

export default function JoinBtn() {
  return (
    <button className={styles.button}>
      <span className={styles.font}>회원가입</span>
    </button>
  );
}
