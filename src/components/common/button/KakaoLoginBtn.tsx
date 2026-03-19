import styles from "./LoginBtn.module.css";
import kakaoIcon from "@/assets/icons/ic-kakao.svg";

export default function KakaoLoginBtn() {
  return (
    <button className={styles.social}>
      <img src={kakaoIcon} alt="Google" />
      <span className={styles.text}> Kakao로 시작하기</span>
    </button>
  );
}
