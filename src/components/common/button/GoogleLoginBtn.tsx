import styles from "./LoginBtn.module.css";
import googleIcon from "@/assets/icons/ic-google.svg";

export default function GoogleLoginBtn() {
  return (
    <button className={styles.social}>
      <img src={googleIcon} alt="Google" />
      <span className={styles.text}> Google로 시작하기</span>
    </button>
  );
}
